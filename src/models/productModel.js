import pool from '../config/db.js';


export const productModel = {
    getAllProducts: async () => {
        const results = await pool.query(
            `
              SELECT p.id, p.name, p.description, p.price, p.stock, pr.id as "providerId", pr.name as "providerName"
              FROM products p 
              LEFT JOIN providers pr ON p.provider_id = pr.id
              ORDER BY p.id ASC
            `)
        return results.rows
    },

    getProductById: async (id) => {
        const results = await pool.query(
            `
             SELECT p.id, p.name, p.description, p.price, p.stock, p.provider_id as "providerId"
             FROM products p WHERE p.id = $1
            `, [id]
        )
        return results.rows[0]
    },

    createNewProduct: async (name, description, price, stock, providerId) => {
        const results = await pool.query(
            'INSERT INTO products (name, description, price, stock, provider_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, stock, providerId]
        )
        return results.rows[0]
    },

    updateProductBd: async (id, name, description, price, stock, providerId) => {
        const results = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, provider_id= $5 WHERE ID = $6 RETURNING *',
            [name, description, price, stock, providerId, id]
        )
        return results.rows[0]
    },

    deleteProductBd: async (id) => {
        const results = await pool.query(
            'DELETE FROM products WHERE id = $1', [id]
        )
        return results.rowCount > 0
    }
}