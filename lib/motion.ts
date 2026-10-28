export type Model = "mru" | "mrua" | "function";
export type Params = { x0: number; v0: number; a: number; t: number };
export type State = { x: number; v: number; a: number; dx: number };
export function calculate(model: Model, p: Params, fn = "0+2*t"): State {
  const { x0, v0, a, t } = p;
  let x: number, v: number, acc: number, xStart = x0;
  if (model === "mru") { x=x0+v0*t; v=v0; acc=0; }
  else if (model === "mrua") { x=x0+v0*t+0.5*a*t*t; v=v0+a*t; acc=a; }
  else {
    // Function mode accepts a position function of t; derivatives are estimated numerically.
    const { evaluate } = require("mathjs") as typeof import("mathjs");
    const at=(q:number)=>Number(evaluate(fn,{t:q}));
    x=at(t); xStart=at(0); const h=Math.max(1e-3,Math.abs(t)*1e-4);
    v=(at(t+h)-at(t-h))/(2*h); acc=(at(t+h)-2*x+at(t-h))/(h*h);
  }
  const values=[x,v,acc,x-xStart];
  if (!values.every(Number.isFinite)) throw new Error("Los valores producen un resultado no finito. Revisa la función y el tiempo.");
  return {x,v,a:acc,dx:x-xStart};
}
export function sample(model: Model,p:Params,fn="0+2*t",n=100){
 const start=Math.min(0,p.t), end=Math.max(0,p.t);
 if (start===end) return Array.from({length:n+1},()=>({t:p.t,...calculate(model,p,fn)}));
 return Array.from({length:n+1},(_,i)=>{const t=start+(end-start)*i/n; const s=calculate(model,{...p,t},fn); return {t,...s};});
}
