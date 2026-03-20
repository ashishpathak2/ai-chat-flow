import { Router } from 'express'
import { saveFlow } from '../controllers/flow.controller.js'

const router = Router()

// POST /api/save
router.post('/save', saveFlow)

// GET /api/flows 
// router.get('/flows', getFlows)

export default router
