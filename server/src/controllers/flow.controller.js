import Flow from '../models/flow.model.js'

/**
 * POST /api/save
 * Save prompt + response to MongoDB
 */
export const saveFlow = async (req, res) => {
  try {
    const { prompt, response } = req.body

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required',
      })
    }

    if (!response || typeof response !== 'string' || response.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Response is required',
      })
    }

    const flowDoc = await Flow.create({
      prompt: prompt.trim(),
      response: response.trim(),
      createdAt: new Date(),
    })

    return res.status(201).json({
      success: true,
      message: 'Flow saved successfully',
      data: {
        id: flowDoc._id,
        prompt: flowDoc.prompt,
        response: flowDoc.response,
        createdAt: flowDoc.createdAt,
      },
    })
  } catch (error) {
    console.error('❌ saveFlow error:', error.message)

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      })
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to save flow',
    })
  }
}


// export const getFlows = async (req, res) => {
//   try {
//     const flows = await Flow.find({}).sort({ createdAt: -1 }).limit(50)

//     return res.status(200).json({
//       success: true,
//       count: flows.length,
//       data: flows,
//     })
//   } catch (error) {
//     console.error('❌ getFlows error:', error.message)
//     return res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to retrieve flows',
//     })
//   }
// }
