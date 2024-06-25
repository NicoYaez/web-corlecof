# CORLECOF WEB 1.0

Este proyecto está basado en [Next.js](https://nextjs.org/) y está diseñado para gestionar citas médicas entre profesionales y pacientes.

## Empezando

Para comenzar con el proyecto, sigue estos pasos:

```bash
git clone https://github.com/NicoYaez/web-corlecof.git
cd web-corlecof
```

Instala las dependencias y ejecuta el servidor de desarrollo:

```bash
npm install
# o
yarn install
```

Una vez instaladas las dependencias, inicia el servidor:

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## API

Para el backend, utiliza la API disponible en:

[https://github.com/NicoYaez/api-corlecof](https://github.com/NicoYaez/api-corlecof)

## EQUIPO DE DESARROLLO

- https://github.com/NicoYaez
- https://github.com/acorreap
- https://github.com/Avidalfort

## Rutas Web

A continuación se detallan las principales rutas de la aplicación:

### Autenticación

- Login:
  `http://localhost:3000/auth/login`

- Olvidaste tu contraseña:
  `http://localhost:3000/auth/forgot-password`

### Dashboard

- Panel de secretaría:
  `http://localhost:3000/dashboard/secretary`

### Talleres

- Lista de talleres:
  `http://localhost:3000/talleres/list-talleres`

- Crear taller:
  `http://localhost:3000/talleres/crear-taller`

- Editar taller:
  `http://localhost:3000/talleres/editar-taller/:id` (donde `:id` es el ID del taller)

- Agregar participantes a un taller específico:
  `http://localhost:3000/talleres/agregar?tallerId=:id` (donde `:id` es el ID del taller)

### Citas

- Agendar cita:
  `http://localhost:3000/cita/agendar`

- Lista de citas:
  `http://localhost:3000/cita/lista`

### Profesional

- Registro de profesional:
  `http://localhost:3000/profesional/register`

### Registro

- Registro de usuario:
  `http://localhost:3000/auth/register`

Este README proporciona una guía básica para comenzar con el proyecto, incluyendo cómo clonar el repositorio, instalar las dependencias necesarias, y acceder a las diferentes secciones de la aplicación a través de sus URLs correspondientes.
