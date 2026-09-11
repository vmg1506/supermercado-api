import { Router } from "express";

import { createSale, getSales, getSaleById } from "../controllers/saleController.js";

const router = Router()

router.get('/', getSales)
router.get('/:id', getSaleById)
router.post('/', createSale)

export default router