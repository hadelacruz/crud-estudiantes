# CRUD Estudiantes

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vue Router](https://img.shields.io/badge/Vue_Router-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

Proyecto full stack para gestión de estudiantes y carreras.

Incluye:
- Backend API REST con Node.js, Express, Sequelize y MySQL.
- Frontend con Vue 2, Vue Router, Axios y Tailwind CSS.

## Estado Actual

- Backend funcional
- Frontend funcional
- Validaciones de formulario en frontend y backend (email y fecha de nacimiento)

## Estructura del Proyecto

```text
crud-estudiantes/
├── backend/
├── frontend/
└── database/
```

## Requisitos

- Node.js 18+
- npm 9+
- MySQL 8+

## 1) Configuración de Base de Datos

1. Inicia MySQL.
2. Ejecuta el script `database/schema.sql`.


## 2) Configuración del Backend

Desde la carpeta `backend`:

```bash
copy .env.example .env
npm install
npm run dev
```


## 3) Configuración del Frontend

Desde la carpeta `frontend`:

```bash
copy .env.example .env
npm install

```
Para desarrollo:

```bash
npm run serve
```

Para build de producción:

```bash
npm run build
```


## 4) Ejecutar Proyecto Completo

1. Levanta MySQL y crea esquema con `database/schema.sql`.
2. En una terminal, ejecuta backend (`backend`: `npm run dev`).
3. En otra terminal, ejecuta frontend (`frontend`: `npm run serve`).

## Endpoints Backend

Base URL: `http://localhost:3000/api`

Carreras:
- `GET /carreras`
- `POST /carreras`

Estudiantes:
- `GET /estudiantes`
- `GET /estudiantes/:id`
- `POST /estudiantes`
- `PUT /estudiantes/:id`
- `DELETE /estudiantes/:id`
