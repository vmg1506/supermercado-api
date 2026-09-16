import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swagger.js";

import userRoutes from './src/routes/userRoutes.js'
import providerRoutes from './src/routes/providerRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import saleRoutes from './src/routes/saleRoutes.js'



const app = express()
const port = process.env.PORT || 3000


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

app.listen(port, () => {
    console.log(`Servidor de supermercado activo en http://localhost:${port}`)
    console.log(`Documentación Swagger disponible en http://localhost:${port}/api-docs`)
})