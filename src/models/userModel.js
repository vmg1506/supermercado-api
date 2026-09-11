import { pool } from "../config/db.js";


export const UserModel = {
    getAll: async () => {
        const results = await pool.query('SELECT * FROM users ORDER BY id ASC')
        return results.rows
    },

    getById: async (id) => {
        const results = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        return results.rows[0]
    },

    create: async (name, email) => {
        const results = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        )
        return results.rows[0]
    },

    update: async (id, name, email) => {
        await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])
        return true
    }, 
    
    delete: async (id) => {
        await pool.query('DELETE FROM users WHERE id = $1', [id])
        return true
    }
}