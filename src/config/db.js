
/* import pg from 'pg'


 const { Pool } = pg

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
})

export default pool */


/* ------------------------- */

import 'dotenv/config'
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        logging: false
    }
)

export default sequelize