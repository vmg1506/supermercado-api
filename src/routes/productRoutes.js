import { Router } from "express";
import { getProducts, getProductsById, createProduct, updateProductBd, deleteProduct } from "../controllers/productController.js";

const router = Router()
router.get('/', getProducts)
router.get('/:id', getProductsById)
router.post('/', createProduct)
router.put('/:id', updateProductBd)
router.delete('/:id', deleteProduct)


export default router
