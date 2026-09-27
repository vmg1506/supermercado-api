# supermercado-api

# Nombres: victor Manuel Grajales Roman
 # Responsabilidades: Desarrollo de todo el proyecto


# ENDPOINTS

Usuarios (/users)
Método	Endpoint	Descripción
GET	/users	Lista todos los usuarios
GET	/users/:id	Obtiene un usuario por id
POST	/users	Crea un usuario
PUT	/users/:id	Actualiza un usuario (parcial)
DELETE	/users/:id	Elimina un usuario


Proveedores (/providers)
Método	Endpoint	Descripción
GET	/providers	Lista todos los proveedores
GET	/providers/:id	Obtiene un proveedor por id
POST	/providers	Crea un proveedor
PUT	/providers/:id	Actualiza un proveedor (parcial)
DELETE	/providers/:id	Elimina un proveedor

Productos (/products)
Método	Endpoint	Descripción
GET	/products	Lista todos los productos (con nombre del proveedor)
GET	/products/:id	Obtiene un producto por id
POST	/products	Crea un producto
PUT	/products/:id	Actualiza un producto (parcial)
DELETE	/products/:id	Elimina un producto

Método	Endpoint	Descripción
GET	/sales	Lista todas las ventas
GET	/sales/:id	Obtiene una venta con el detalle de productos
POST	/sales	Registra una venta (transacción: descuenta stock)

# INSTRUCCIONES DE EJECUCION

# Requisitos previos
- Node.js 18 o superior
- PostgreSQL instalado y corriendo localmente

- Instala dependencias y arranca el servidor:

        bash
        npm install
        node index.js

Deberías ver en consola:

Servidor de supermercado activo en http://localhost:3000
Documentación Swagger disponible en http://localhost:3000/api-docs

# .env

.env.example
DB_USER=postgres
DB_HOST=localhost
DB_NAME=supermercado_db
DB_PASSWORD=tu_password_aqui
DB_PORT=5432