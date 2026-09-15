
import { UserModel } from "../models/userModel.js";

const ALLOWED_ROLES = ['client', 'admin']

export const getUsers = async (request, response) => {
    try {
        const users = await UserModel.getAll()
        response.status(200).json(users)
    } catch (error) {
        response.status(500).json({ error: 'Error al obtener usuarios'})
    }
}

export const getUserById = async (request, response) => {
    try {
        const id = parseInt(request.params.id, 10)
        const user = await UserModel.getById(id)
        if (!user) {
            return response.status(404).json({ message: 'Usuario no encontrado'})
        }
        response.status(200).json(user)
    } catch (error) {
        response.status(500).json({ error: 'Error al buscar el usuario' })
    }
}

export const createUser = async (request, response) => {
    try {
        const { name, email, role } = request.body
        if (!name || !email) {
            return response.status(400).json({ error: 'Nombre y email son requerids' })
        }
        if (role !== undefined && !ALLOWED_ROLES.includes(role)) {
            return response.status(400).json({ error: `Rol inválido. Valores permitidos: ${ALLOWED_ROLES.join(', ')}` })
        }
        const nuevoUsuario = await UserModel.create(name, email, role)
        response.status(201).send(`Usuario agregado con el ID: ${nuevoUsuario.id}`)
    } catch (error) {
        response.status(500).json({ error: 'error al crear usuario' })
    }
}

export const updateUser = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    const { name, email, role } = request.body
    if (role !== undefined && !ALLOWED_ROLES.includes(role)) {
        return response.status(400).json({ error: `Rol inválido. Valores permitidos: ${ALLOWED_ROLES.join(', ')}` })
    }
    try {
        const updatedUser = await UserModel.update(id, name, email, role)
        if (!updatedUser) {
            return response.status(404).json({ message: 'Usuario no encontrado para actualizar' })
        }
        response.status(200).json({ message: 'Usuario actualizado', users: updatedUser })
    } catch (error) {
        response.status(500).json({ message: 'Error al actualizar usuario', error: error.message })
    }
}

export const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    try {
        const deleted = await UserModel.delete(id)
        if (!deleted) {
            return response.status(404).json({ message: 'Usuario no encontrado para eliminar' })
        }
        response.status(200).json({ message: `Usuario con ID ${id} eliminado con exito` })
    } catch (error) {
        response.status(500).json({ message: 'Error al eliminar usuario', error: error.message })
    }
}