import 'dotenv/config'
import app from './src/app.js'
import connectDB from './src/config/db.js'

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB()

    // Start Express server
    app.listen(PORT, () => {
      console.log('')
      console.log('┌─────────────────────────────────────────┐')
      console.log(`│  🚀  AI Flow Server running              │`)
      console.log(`│  📡  http://localhost:${PORT}              │`)
      console.log(`│  🌿  Environment: ${process.env.NODE_ENV || 'development'}            │`)
      console.log('└─────────────────────────────────────────┘')
      console.log('')
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error.message)
  process.exit(1)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('💥 Unhandled Rejection:', reason)
  process.exit(1)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received. Shutting down gracefully...')
  process.exit(0)
})

startServer()
