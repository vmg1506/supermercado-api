
import { Provider } from '../config/models/index.js'

export const providerModel = {

    getAllProviders: async () => {
        const results = await Provider.findAll({ order: [['id', 'ASC']] })
        return results.map(p => p.toJSON())
    },

    getProviderById: async (id) => {
        const results = await Provider.findByPk(id)
        return results ? results.toJSON() : undefined
    },

    createNewProvider: async (name, phone, email, city) => {
        const results = await Provider.create({ name, phone, email, city })
        return results.toJSON()
    },

    updateProvider: async (id, name, phone, email, city) => {
        const results = await Provider.findByPk(id)
        if(!results) return undefined
        results.set({ name, phone, email, city })
        await Provider.save()
        return provider.toJSON()
    },

    deleteProviderdb: async (id) => {
        const deletedRows = await Provider.destroy({ where: { id } })
        return deletedRows > 0
    }
}


