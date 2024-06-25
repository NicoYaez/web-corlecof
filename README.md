## CORLECOF WEB 1.0

Este es un proyecto basado en [Next.js](https://nextjs.org/) para gestionar citas médicas entre profesionales y pacientes.

## Empezando

Para comenzar, sigue estos pasos:

```bash
git clone https://github.com/NicoYaez/web-corlecof.git
cd web-corlecof
```

Instala las dependencias y corre el servidor de desarrollo:

```bash
npm install
# o
yarn install
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Api

`https://github.com/NicoYaez/api-corlecof`

## Rutas Web

http://localhost:300/auth/login
http://localhost:3000/auth/forgot-password

http://localhost:3000/dashboard/secretary

http://localhost:3000/talleres/list-talleres
http://localhost:3000/talleres/crear-taller
http://localhost:3000/talleres/editar-taller/:id
http://localhost:3000/talleres/agregar?tallerId=:id

http://localhost:3000/cita/agendar
http://localhost:3000/cita/lista

http://localhost:3000/profesional/register
http://localhost:3000/auth/register
