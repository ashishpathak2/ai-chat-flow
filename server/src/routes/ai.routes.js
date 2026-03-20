import { Router } from 'express'
import { askAI } from '../controllers/ai.controller.js'

const router = Router()

// POST /api/ask-ai
router.post('/ask-ai', askAI)

export default router
