import express from 'express'
import cors from 'cors'
import aiRoutes from './routes/ai.routes.js'
import flowRoutes from './routes/flow.routes.js'

const app = express()

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', "https://ai-chat-flow-five.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ─── Request Logger (dev) ─────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`→ ${req.method} ${req.originalUrl}`)
  next()
})

// ─── Routes ──────────────────────────────────────────────────
app.use('/api', aiRoutes)
app.use('/api', flowRoutes)

// ─── Health Check ─────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// ─── 404 Handler ─────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('💥 Unhandled error:', err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

export default app
