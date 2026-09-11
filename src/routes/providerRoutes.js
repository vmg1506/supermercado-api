import { Router } from "express";
import { getProviders, getProvidersId, createProvider, updateProvider, deleteProvider  } from "../controllers/providerController.js";

const router = Router()

router.get('/', getProviders)
router.get('/:id', getProvidersId)
router.post('/', createProvider)
router.put('/:id', updateProvider)
router.delete('/:id', deleteProvider)

export default router