import { callOpenRouter } from '../config/openrouter.js'


export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required and must be a non-empty string',
      })
    }

    const aiResponse = await callOpenRouter(prompt.trim())

    return res.status(200).json({
      success: true,
      response: aiResponse,
    })
  } catch (error) {
    console.error('❌ askAI error:', error.message)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to get AI response',
    })
  }
}
