/* import express from 'express'
import * as db from './queries.js'



const app = express()
const port = 3000

app.use(express.json())
app.use(
    express.urlencoded({
        extend: true,
    })
)

app.get('/', (request, response) => {
    response.json({info: 'API hecha en Node.js, Express y PostgreSQL'})
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App runing on port: ${port}.`)
})

import express = require("express"); */

/* ------------------------------------------------------------- */

/* import express from "express"
import userRoutes  from './src/routes/userRoutes.js'

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.json({ info: 'API HECHA EN NODE.JS, EXPRESS Y POSTGRESQL' })
})

app.use('/users', userRoutes)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})
 */


/* ------------------------------------------------------------------ */

import express from "express";

import userRoutes from './src/routes/userRoutes.js'
import providerRoutes from './src/routes/providerRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import saleRoutes from './src/routes/saleRoutes.js'



const app = express()
const port = process.env.PORT || 3000


app.get('/', (request, response) => {
    response.json({ info: 'API Supermercado - Arquitectura MVC con PostgreSQL' })
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes)
app.use('/providers', providerRoutes)
app.use('/products', productRoutes)
app.use('/sales', saleRoutes)

app.listen(port, () => {
    console.log(`Servidor de supermercado activo en http://localhost:${port}`)
})



