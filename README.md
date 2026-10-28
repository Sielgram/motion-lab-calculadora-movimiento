# Motion Lab — Calculadora de Movimiento

Aplicación educativa en español para explorar MRU, MRUA y movimiento definido por una función de posición. Los resultados se actualizan en vivo y Plotly dibuja posición, velocidad y aceleración contra tiempo.

## Requisitos

- Node.js 20 o posterior (incluye npm).
- Git solo si se publicará desde un repositorio nuevo.

Comprueba las instalaciones en PowerShell con `node -v`, `npm -v` y `git --version`. Si un comando no se reconoce, instala la versión LTS de Node.js desde nodejs.org y Git desde git-scm.com, y abre una nueva ventana de PowerShell.

## Ejecutar en Windows

Abre PowerShell en la carpeta `calculus-studio` (la que contiene `package.json`) y ejecuta:

```powershell
npm ci
npm run dev
```

Abre http://localhost:3000. Para detenerlo, vuelve a PowerShell y pulsa Ctrl+C. Para comprobar la versión final:

```powershell
npm run test:motion
npm run build
```

## Publicar en un repositorio nuevo de GitHub

1. Inicia sesión en github.com y pulsa **+ → New repository**.
2. Escribe `motion-lab-calculadora-movimiento` como nombre, elige **Public** o **Private** y deja sin marcar README, `.gitignore` y licencia (el proyecto ya tiene esos archivos). Pulsa **Create repository**.
3. En PowerShell, cambia a la carpeta del proyecto y sustituye `TU-USUARIO` por tu nombre de GitHub:

```powershell
cd "RUTA\A\calculus-studio"
git --version
git init
git add .
git commit -m "Crear Motion Lab"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/motion-lab-calculadora-movimiento.git
git push -u origin main
```

La primera vez, GitHub puede pedir autenticación en el navegador. No incluyas tokens ni contraseñas en los comandos. Si Git solicita nombre y correo, configúralos una sola vez con `git config --global user.name "Tu nombre"` y `git config --global user.email "tu-correo"`, y repite el commit.

## Desplegar en Vercel

1. Entra en vercel.com y elige **Continue with GitHub**.
2. Pulsa **Add New… → Project** y autoriza el acceso al repositorio si Vercel lo solicita.
3. Junto a `motion-lab-calculadora-movimiento`, pulsa **Import**.
4. Conserva el framework **Next.js**, no agregues variables de entorno y deja los comandos automáticos. Pulsa **Deploy**.
5. Cuando termine, usa el enlace `.vercel.app` que muestra Vercel. No se necesita backend ni secreto.

## Actualizar el sitio

Edita los archivos en la carpeta del proyecto y comprueba los cambios con `npm run test:motion` y `npm run build`. Después, desde PowerShell en esa misma carpeta:

```powershell
git add .
git commit -m "Describir el cambio"
git push
```

Vercel desplegará automáticamente cada cambio enviado a `main`.

## Errores frecuentes

- **`npm` no se reconoce:** instala Node.js LTS y reinicia PowerShell.
- **Puerto 3000 ocupado:** Next.js ofrecerá otro puerto; acepta el indicado o cierra la otra app.
- **No aparece el cambio:** confirma que guardaste los archivos y que `git push` terminó; revisa el registro de despliegues en Vercel.
- **`remote origin already exists`:** ejecuta `git remote -v` y corrige la URL con `git remote set-url origin https://github.com/TU-USUARIO/motion-lab-calculadora-movimiento.git`.
- **GitHub rechaza el primer envío:** confirma el acceso al repositorio y que se completó la autenticación en el navegador.
- **Falla la compilación en Vercel:** abre el proyecto → **Deployments** → despliegue fallido → **Build Logs**; revisa que el directorio raíz sea el que contiene `package.json`.

## Estructura principal

- `app/`: ruta, metadatos y estilos de la aplicación.
- `components/MotionLab.tsx`: interfaz y actualización en vivo.
- `components/MotionCharts.tsx`: las tres gráficas Plotly.
- `lib/motion.ts`: cálculo cinemático y muestreo temporal.
- `tests/motion.test.mjs`: verificaciones de los modelos.
