import { Router } from "express";
import { getProviders, getProvidersId, createProvider, updateProvider, deleteProvider } from "../controllers/providerController.js";
const router = Router()
/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: Gestión de proveedores
 */
/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Lista todos los proveedores
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provider'
 */
router.get('/', getProviders)
/**
 * @swagger
 * /providers/{id}:
 *   get:
 *     summary: Obtiene un proveedor por su id
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       404:
 *         description: Proveedor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getProvidersId)
/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Crea un nuevo proveedor
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProviderInput'
 *     responses:
 *       201:
 *         description: Proveedor creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 */
router.post('/', createProvider)
/**
 * @swagger
 * /providers/{id}:
 *   put:
 *     summary: Actualiza un proveedor existente (actualización parcial)
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProviderInput'
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *       404:
 *         description: Proveedor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', updateProvider)
/**
 * @swagger
 * /providers/{id}:
 *   delete:
 *     summary: Elimina un proveedor
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor eliminado
 *       404:
 *         description: Proveedor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deleteProvider)
export default router
