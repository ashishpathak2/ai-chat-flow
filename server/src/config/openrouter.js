const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'stepfun/step-3.5-flash:free'


export const callOpenRouter = async (prompt) => {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set in environment variables')
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'AI Flow App',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMsg = errorData?.error?.message || `OpenRouter API error: ${response.status} ${response.statusText}`
    throw new Error(errorMsg)
  }

  const data = await response.json()

  const content = data?.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('No response content received from AI')
  }

  return content.trim()
}

export default callOpenRouter;
