
import { saleModel } from "../models/saleModel.js";


export const createSale = async (request, response) => {
    const { userId, items } = request.body
    if(!userId || !Array.isArray(items) || items.length === 0) {
        return response.status(400).json({ message: 'userId y un arreglo con productId y quantity son requeridos' })
    }

    try {
        const sale = await saleModel.createSaleWithDetails(userId, items)
        response.status(201).json({ message: 'Venta registrada con exito', sale })
    } catch (error) {
        response.status(400).json({ message: 'Error al procesar la venta', error: error.message })
    }
}

export const getSales = async (request, response) => {
    try {
        const sales = await saleModel.getAllSales()
        response.status(200).json(sales)
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener ventas', error: error.message })
    }
}

export const getSaleById = async (request, response) => {
    try {
        const sale = await saleModel.getSaleById(parseInt(request.params.id,10))
        if (!sale) return response.status(404).json({ message: 'Venta no encontrada' })
        response.status(200).json(sale)
    } catch (error) {
        response.status(500).json({ message: 'Error al obtner la venta', error: error.message})
    }
} 

