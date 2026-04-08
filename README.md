# CRUD Estudiantes

Este repositorio contiene un proyecto dividido en `backend`, `frontend` y `database`.

Estado actual:
- Backend funcional
- Frontend en construcción

## Stack del Backend

- Node.js
- Express
- Sequelize
- MySQL

## Estructura del Proyecto

```text
crud-estudiantes/
├── backend/
├── frontend/
└── database/
```

## Requisitos

- Node.js 18+
- MySQL 8+

## Configuración de Base de Datos

1. Abre MySQL.
2. Ejecuta el script SQL ubicado en `database/schema.sql`.

Este script crea:
- Base de datos `crud_estudiantes`
- Tabla `carreras`
- Tabla `estudiantes`

## Configuración del Backend

1. Ir a la carpeta `backend`.
2. Instalar dependencias.
3. Crear archivo `.env` con los valores de conexión.


Notas:
- `DB_SYNC=false` para usar la estructura definida en SQL.
- Si activas `DB_SYNC=true`, Sequelize intentará sincronizar modelos automáticamente.

## Ejecutar el Backend

Desde `backend`:

```bash
copy .env.example .env
npm install
npm run dev
```