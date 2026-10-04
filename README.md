# Supermercado MarketSoft

Sistema de gestión de supermercado: backend (API REST) + frontend (SPA en React).

```
supermercado-app/
├── backend/    API REST — Node.js, Express, Sequelize, PostgreSQL
└── frontend/   SPA — React, Vite, React Router, Axios, Bootstrap
```

## Integrantes

- Victor Manuel Grajales Roman

## Arquitectura

- **Backend**: arquitectura MVC (routes → controllers → models con Sequelize), validación de datos con `express-validator`, CORS habilitado para el frontend, documentación interactiva en `/api-docs` (Swagger).
- **Frontend**: SPA en React con `react-router-dom` para las rutas, Axios centralizado para consumir la API, y un hook genérico (`useCrud`) reutilizado por los 4 módulos (Productos, Proveedores, Usuarios, Ventas) para no duplicar lógica.
- **Conexión entre ambos**: el frontend lee la URL del backend desde la variable de entorno `VITE_API_URL`, y el backend tiene CORS habilitado explícitamente para el origen del frontend (`http://localhost:5173`).

---

## Instructivo de ejecución

### Requisitos previos

- Node.js 18 o superior
- PostgreSQL instalado y corriendo localmente
- Git
- Dos terminales abiertas (una para el backend, otra para el frontend)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/supermercado-app.git
cd supermercado-app
```

### 2. Configurar y ejecutar el backend

```bash
cd backend
cp .env.example .env
```

Abre el archivo `.env` recién creado y coloca tus credenciales reales de PostgreSQL:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=supermercado_db
DB_PASSWORD=tu_password
DB_PORT=5432
```

Asegúrate de que la base de datos y las tablas existan en PostgreSQL (`users`, `providers`, `products`, `sales`, `sale_details`) antes de continuar.

Instala las dependencias y arranca el servidor:
```bash
npm install
node index.js
```

Confirma en consola:
```
Servidor de supermercado activo en http://localhost:3000
Documentación Swagger disponible en http://localhost:3000/api-docs
```

### 3. Configurar y ejecutar el frontend

En una **segunda terminal**:
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Esto abre la aplicación en `http://localhost:5173`.

### 4. Verificación de que todo funciona

| Paso | Qué revisar |
|------|-------------|
| Backend solo | Abre `http://localhost:3000/api-docs` — debe cargar la documentación Swagger |
| Frontend carga | Abre `http://localhost:5173` — debe mostrar la página de inicio con 4 tarjetas de módulos |
| Conexión real | Entra a cualquier módulo (Productos, Proveedores, Usuarios, Ventas) — debe mostrar datos reales de tu base de datos |
| CRUD completo | Crea, edita y elimina un registro de prueba en cualquier módulo para confirmar que el flujo completo funciona |

### 5. Problemas comunes

| Síntoma | Causa probable | Solución |
|---------|-----------------|----------|
| `Cannot find module 'X'` al iniciar el backend | Faltan dependencias | `npm install` dentro de `backend/` |
| Página en blanco en el frontend | Error de JavaScript | Abre la consola del navegador (F12) y revisa el mensaje de error |
| Error de CORS en la consola | El backend no tiene habilitado el origen del frontend | Revisa que `backend/index.js` tenga el middleware `cors` configurado para `http://localhost:5173` |
| Los módulos cargan vacíos sin error | El backend no está corriendo, o `VITE_API_URL` apunta mal | Verifica que el backend esté activo y que `frontend/.env` apunte al puerto correcto |
| `Invalid hook call` en consola | Versiones de React incompatibles o duplicadas | Borra `node_modules` y `package-lock.json` en `frontend/`, reinstala |

### 6. Notas importantes

- El **backend debe estar corriendo antes** de usar el frontend.
- Si cambias el puerto del backend, actualiza `VITE_API_URL` en `frontend/.env`.
- Si cambias el puerto/dominio del frontend, actualiza `FRONTEND_URL` en `backend/.env` (o el valor por defecto en `backend/index.js`).
- Los archivos `.env` **no se suben a GitHub** (están en `.gitignore`); cada persona que clone el repo debe crear el suyo a partir del `.env.example` correspondiente.

---

## Endpoints principales

| Módulo     | Endpoints |
|------------|-----------|
| Usuarios   | `GET/POST /users`, `GET/PUT/DELETE /users/:id` |
| Proveedores| `GET/POST /providers`, `GET/PUT/DELETE /providers/:id` |
| Productos  | `GET/POST /products`, `GET/PUT/DELETE /products/:id` |
| Ventas     | `GET/POST /sales`, `GET /sales/:id` (sin editar/eliminar) |

Documentación interactiva completa (con ejemplos de request/response) disponible en `http://localhost:3000/api-docs` con el backend corriendo.
