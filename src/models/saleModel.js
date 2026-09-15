import { sequelize, Sale, SaleDetail, Product } from '../config/models/index.js'

export const saleModel = {
    createSaleWithDetails: async (userId, items) => {
        return sequelize.transaction(async (t) => {
            const sale = await Sale.create({ userId, total: 0 }, { transaction: t })
            let calculatedTotal = 0
            for (const item of items) {
                const { productId, quantity } = item
                const product = await Product.findByPk(productId, { transaction: t, lock: t.LOCK.UPDATE })
                if (!product) {
                    throw new Error(`Producto con ID ${productId} no existe`)
                }
                if (product.stock < quantity) {
                    throw new Error(`Stock insuficiente para el producto ID ${productId}`)
                }
                const itemSubtotal = Number(product.price) * quantity
                calculatedTotal += itemSubtotal
                await SaleDetail.create({
                    saleId: sale.id,
                    productId,
                    quantity,
                    price: product.price
                }, { transaction: t })
                product.stock -= quantity
                await product.save({ transaction: t })
            }
            sale.total = calculatedTotal
            await sale.save({ transaction: t })
            return sale.toJSON()
        })
       
    },
    getAllSales: async () => {
        const sales = await Sale.findAll({ order: [['id', 'DESC']] })
        return sales.map(s => s.toJSON())
    },
    getSaleById: async (id) => {
        const sale = await Sale.findByPk(id, {
            include: [{
                model: SaleDetail,
                as: 'details',
                include: [{ model: Product, as: 'product', attributes: ['name'] }]
            }]
        })
        if (!sale) return null
        const plain = sale.toJSON()
        return {
            ...plain,
            details: plain.details.map(d => ({
                id: d.id,
                productId: d.productId,
                productName: d.product ? d.product.name : null,
                quantity: d.quantity,
                price: d.price
            }))
        }
    }
}
