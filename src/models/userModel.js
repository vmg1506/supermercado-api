import { User } from "../config/models/User.js"


export const UserModel = {
    getAll: async () => {
        const results = await User.findAll({ order: [['id', 'ASC']] })
        return results.map(u => u.toJSON())
    },

    getById: async (id) => {
        const results = await User.findByPk(id)
        return results ? results.toJSON(): undefined
    },

    create: async (name, email, role) => {
        const results = {name, email}
        if (role !== undefined) results.role = role
        const user = await User.create(results)
        return user.toJSON()
    },

    update: async (id, name, email, role ) => {
        const results = {name, email}
        if (role !== undefined) results.role = role
        const [affectedRows] = await User.update(results, { where: { id }})
        return affectedRows > 0
    }, 
    
    delete: async (id) => {
        const deletedRows = await User.destroy({where: { id } })
        return deletedRows > 0
    }
}



