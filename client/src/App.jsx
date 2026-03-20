import { useState, useCallback } from 'react'
import FlowCanvas from './components/FlowCanvas'
import ControlPanel from './components/Controls'
import { askAI, saveFlow } from './services/api'

function App() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleRun = useCallback(async () => {
    if (!prompt.trim()) return
    setIsLoading(true)
    setError('')
    setResponse('')
    setIsSaved(false)
    try {
      const data = await askAI(prompt.trim())
      setResponse(data.response)
      showToast('Response received')
    } catch (err) {
      setError(err.message || 'Failed to get AI response')
      showToast(err.message || 'Request failed', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [prompt])

  const handleSave = useCallback(async () => {
    if (!response || isSaved) return
    setIsSaving(true)
    try {
      await saveFlow(prompt, response)
      setIsSaved(true)
      showToast('Saved to database')
    } catch (err) {
      showToast(err.message || 'Failed to save', 'error')
    } finally {
      setIsSaving(false)
    }
  }, [prompt, response, isSaved])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden', background: '#f8f8f6' }}>
      <ControlPanel
        onRun={handleRun}
        onSave={handleSave}
        isLoading={isLoading}
        isSaving={isSaving}
        hasResponse={!!response}
        hasSaved={isSaved}
        prompt={prompt}
      />

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <FlowCanvas
          prompt={prompt}
          setPrompt={setPrompt}
          response={response}
          isLoading={isLoading}
          error={error}
          isSaved={isSaved}
        />
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fade-in"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 8,
            background: '#fff',
            border: '1px solid #e8e8e4',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            zIndex: 999,
          }}
        >
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: toast.type === 'error' ? '#e05252' : '#52a852',
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 13, color: '#1a1a1a', fontFamily: 'DM Sans, sans-serif' }}>
            {toast.message}
          </span>
        </div>
      )}
    </div>
  )
}

export default App