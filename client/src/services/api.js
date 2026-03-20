import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

/**
 * Send a prompt to the AI backend
 * @param {string} prompt
 * @returns {Promise<{response: string}>}
 */
export const askAI = async (prompt) => {
  return api.post('/ask-ai', { prompt })
}

/**
 * Save prompt + response to MongoDB
 * @param {string} prompt
 * @param {string} response
 * @returns {Promise<{message: string, data: object}>}
 */
export const saveFlow = async (prompt, response) => {
  return api.post('/save', { prompt, response })
}

export default api
