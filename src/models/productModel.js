import { Product, Provider } from '../config/models/index.js'


export const productModel = {
    getAllProducts: async () => {
        const products = await Product.findAll({
            include: [{ model: Provider, as: 'provider', ATTRIBUTES: ['id','name'] }]
        })

        return products.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.peice,
            stock: p.stock,
            providerId: p.provider ? p.provider.id: null,
            providerName: p.provider ? p.provider.name : null
        }) ) 

    },

    getProductById: async (id) => {
        const results = await Product.findByPk(id)
        return results ? results.toJSON() : undefined
    },

    createNewProduct: async (name, description, price, stock, providerId) => {
        const results = await Product.create({ name, description, price, stock, providerId })
        return results.toJSON()
    },

    updateProductBd: async (id, name, description, price, stock, providerId) => {
        const results = await Product.findByPk(id)
        if(!results) return undefined
        results.set({ name, description, price, stock, providerId })
        await results.save()
        return results.toJSON()
    },

    deleteProductBd: async (id) => {
        const results = await Product.destroy({ where: { id } })
        return results
    }
}

