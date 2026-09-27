import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swagger.js";
import { sequelize } from "./src/config/models/index.js";

import userRoutes from './src/routes/userRoutes.js'
import providerRoutes from './src/routes/providerRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import saleRoutes from './src/routes/saleRoutes.js'



const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.get('/', (request, response) => {
    response.json({ info: 'API Supermercado - Arquitectura MVC con PostgreSQL' })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes)
app.use('/providers', providerRoutes)
app.use('/products', productRoutes)
app.use('/sales', saleRoutes)

const startServer = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Conexión a PostgreSQL establecida y tablas sincronizadas')

        app.listen(port, () => {
            console.log(`Servidor de supermercado activo en http://localhost:${port}`)
            console.log(`Documentación Swagger disponible en http://localhost:${port}/api-docs`)
        })
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error.message)
    }
}

startServer()