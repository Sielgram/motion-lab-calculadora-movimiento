import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { createRequire } from "node:module";
const require=createRequire(import.meta.url);
const source=fs.readFileSync(new URL("../lib/motion.ts",import.meta.url),"utf8");
const js=ts.transpile(source,{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020});
const mod={exports:{}};new Function("require","module","exports",js)(require,mod,mod.exports);
const {calculate,sample}=mod.exports;
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-6,`${actual} != ${expected}`);
test("MRU: positivo, negativo, cero, tiempo cero y entradas decimales",()=>{
 close(calculate("mru",{x0:-1.5,v0:2.25,a:0,t:4}).x,7.5);
 close(calculate("mru",{x0:2,v0:-3,a:0,t:2}).x,-4);
 close(calculate("mru",{x0:2,v0:0,a:0,t:8}).x,2);
 close(calculate("mru",{x0:2,v0:3,a:0,t:0}).x,2);
});
test("MRUA: aceleración positiva, negativa y cero",()=>{
 const p={x0:-2.5,v0:3,a:2,t:4}; const r=calculate("mrua",p); close(r.x,25.5);close(r.v,11);close(r.a,2);close(r.dx,28);
 close(calculate("mrua",{...p,a:-2}).x,-6.5);close(calculate("mrua",{...p,a:0}).x,9.5);
});
test("función de posición y muestreo con tiempo negativo",()=>{
 const r=calculate("function",{x0:0,v0:0,a:0,t:2},"2+3*t+t^2");close(r.x,12);close(r.v,7);close(r.a,2);close(r.dx,10);
 const points=sample("mru",{x0:0,v0:2,a:0,t:-3});close(points[0].t,-3);close(points.at(-1).t,0);close(points[0].x,-6);
});
test("rechaza resultados no finitos",()=>{assert.throws(()=>calculate("mrua",{x0:1e308,v0:1e308,a:1e308,t:1e308}),/no finito/i)});
