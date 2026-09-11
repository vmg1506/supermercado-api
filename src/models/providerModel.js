import pool from '../config/db.js'

export const providerModel = {

    getAllProviders: async () => {
        const results = await pool.query('SELECT * FROM providers ORDER BY id ASC')
        return results.rows
    },

    getProviderById: async (id) => {
        const results = await pool.query('SELECT * FROM providers WHERE id = $1', [id])
        return results.rows[0]
    },

    createNewProvider: async (name, phone, email, city) => {
        const results = await pool.query('insert into PROVIDERS (name, phone, email, city) VALUES ($1, $2, $3, $4) RETURNING *', [name, phone, email, city])
        return results.rows[0]
    },

    updateProvider: async (id, name, phone, email, city) => {
        const results = await pool.query('UPDATE providers SET name = $1, phone = $2, email = $3, city = $4 WHERE id = $5 RETURNING *', [name, phone, email, city, id])
        return results.rows[0]
    },

    deleteProviderdb: async (id) => {
        const { rowCount } = await pool.query('DELETE FROM providers WHERE id = $1 RETURNING id', [id])
        return rowCount > 0
    }
}


