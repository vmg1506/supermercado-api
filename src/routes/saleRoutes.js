import { Router } from "express";
import { createSale, getSales, getSaleById } from "../controllers/saleController.js";
const router = Router()
/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Gestión de ventas
 */
/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Lista todas las ventas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 */
router.get('/', getSales)
/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Obtiene una venta por su id, incluyendo el detalle de productos
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleWithDetails'
 *       404:
 *         description: Venta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getSaleById)
/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Registra una nueva venta (transacción con descuento de stock)
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaleInput'
 *     responses:
 *       201:
 *         description: Venta registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       400:
 *         description: Error de validación o stock insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', createSale)
export default router