
import { providerModel } from '../models/providerModel.js'

export const getProviders = async (request, response)  => {
    try {
        const providers = await providerModel.getAllProviders()
        response.status(200).json(providers)
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener proveedores', error: error.message })
    }
}

export const getProvidersId = async (request, response)  => {
    try {
        const provider = await providerModel.getProviderById(parseInt(request.params.id, 10))
        if(!provider) return response.status(404).json({ message: 'Proveedor no encontrdo'})
        response.status(200).json(provider)
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener proveedor', error: error.message })
    }
}

export const createProvider = async (req, res) => {
    const { name, phone, email, city } = req.body
    if (!name) return res.status(400).json({ message: 'El nombre del proveedor es obligatorio' })

    try {
        const newProvider = await providerModel.createNewProvider(name, phone, email, city)
        res.status(201).json(newProvider)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proveedor', error: error.message })
    }
}

export const updateProvider = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    const { name, phone, email, city } = request.body
    try {
        const updated = await providerModel.updateProvider(id, name, phone, email, city)
        if(!updated) return response.status(404).json({ message: 'Proveedor no encontrado' })
        response.status(200).json(updated)
    } catch (error) {
        response.status(500).json({ message: 'Error al actualizar provedor', error: error.message })
    }
}

export const deleteProvider = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    console.log(`Intentando eliminar el proveedor con ID: ${id}`)

    try {
        const deleted = await providerModel.deleteProviderdb(id)
        if (!deleted) return response.status(404).json({ message: 'Proveedor no encontrado' })
        response.status(200).json({ message: 'Proveedor eliminado exitosamente' })
    } catch (error) {
        response.status(500).json({ message: 'Error al eliminar proveedor', error: error.message })
    }
}
