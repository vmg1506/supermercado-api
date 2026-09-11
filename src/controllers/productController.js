
import { productModel } from '../models/productModel.js'

export const getProducts = async  (request, response) => {
    try {
        const products = await productModel.getAllProducts()
        response.status(200).json(products)
    } catch (error) {
        response.status(500).json({ message: 'Error al obtner los productos', error: error.message })
    }
}

export const getProductsById = async (request, response) => {
    try {
        const product = await productModel.getProductById(parseInt(request.params.id, 10))
        if(!product) return response.status(404).json({ message: 'Porducto no encontrado' })
        response.status(200).json(product)
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener el producto', error: error.message })
    }
}

export const createProduct = async (request, response) => {
    const { name, description, price, stock, providerId } = request.body
    if (!name || price == null) return response.status(400).json({ message: 'Nombre y precio son requeridos' })
    
    try {
        const newProduct = await productModel.createNewProduct(name, description, price, stock, providerId)
        response.status(201).json(newProduct)
    } catch (error) {
        response.status(500).json({ message: 'Error al crear el producto', error: error.message })
    }
}

export const updateProductBd = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    const { name, description, price, stock, providerId } = request.body
    try {
        const updated = await productModel.updateProductBd(id, name, description, price, stock, providerId)
        if(!updated) return response.status(404).json({ message: 'Producto no encontrado' })
        response.status(200).json(updated)
    } catch (error) {
        response.status(500).json({ message: 'Error al actualizar el producto', error: error.message })
    }
}

export const deleteProduct = async (request, response) => {
    try{
        const deleted = await productModel.deleteProductBd(parseInt(request.params.id, 10))
        if(!deleted) return response.status(404).json({ message: 'Producto no encontrado' })
        response.status(200).json({ message: 'Producto eliminado exitosamente' })
    } catch (error) {
        response.status(500).json({ message: 'Error al eliminar producto', error: error.message })
    }

}
