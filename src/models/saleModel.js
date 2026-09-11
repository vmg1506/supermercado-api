import pool from '../config/db.js'

export const saleModel ={
    createSaleWithDetails:  async (userId, items) => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')

            const saleResult = await client.query(
                'INSERT INTO sales (user_id, total) VALUES ($1, 0) RETURNING *', [userId]
            )
            const saleId = saleResult.rows[0].id
            let calculatedTotal = 0

            for (const item of items) {
                const { productId, quantity } = item

                const productRes = await client.query('SELECT price, stock FROM products WHERE ID = $1', [productId])
                if (productRes.rows.length === 0) {
                    throw new Error(`Producto con ID ${productId} no existe`)
                }

                const { price, stock } = productRes.rows[0]
                if (stock < quantity) {
                    throw new Error(`Stock insuficiente para el producto ID ${productId}`)
                }

                const itemSubtotal = Number(price) * quantity
                calculatedTotal += itemSubtotal

                await client.query(
                    'INSERT INTO sale_details (sale_id, product_id, quantity, price) VALUES ($1,$2, $3, $4)', 
                    [saleId, productId, quantity, price]
                )

                await client.query(
                    'UPDATE products SET stock = stock - $1 WHERE id = $2', [quantity,productId]
                )
            }

            const finalSale = await client.query(
                'UPDATE sales SET total = $1 WHERE id = $2 RETURNING *',
                [calculatedTotal, saleId]
            )

            await client.query('COMMIT')
            return finalSale.rows[0]
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    },

    getAllSales: async () => {
        const results = await pool.query('SELECT * FROM sales ORDER BY id DESC')
        return results.rows
    },

    getSaleById: async (id) => {
        const saleQuery = 'SELECT * FROM sales WHERE id =$1'
        const detailsQuery = `
            SELECT sd.id, sd.product_id as "productId", p.name as "productName", sd.quantity, sd.price
            FROM sale_details sd
            JOIN products p on sd.product_id = p.id
            WHERE sd.sale_id =$1
        `
        const saleRes = await pool.query(saleQuery, [id])
        if (saleRes.rows.length === 0 ) return null

        const detailRes = await pool.query(detailsQuery, [id])
        return {
            ...saleRes.rows[0],
            details: detailRes.rows
        }
    }
}