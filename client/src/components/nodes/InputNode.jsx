import { memo, useCallback } from 'react'
import { Handle, Position } from 'reactflow'

const InputNode = memo(({ data }) => {
  const { prompt, setPrompt, isLoading } = data

  const handleChange = useCallback(
    (e) => setPrompt(e.target.value),
    [setPrompt]
  )

  return (
    <div
      style={{
        width: 300,
        background: '#ffffff',
        border: '1px solid #e8e8e4',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #f0f0ec',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Prompt
        </span>
        {prompt.length > 0 && (
          <span style={{ fontSize: 11, color: '#bbb' }}>{prompt.length} chars</span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: 16 }}>
        <textarea
          value={prompt}
          onChange={handleChange}
          disabled={isLoading}
          rows={5}
          placeholder="Type your prompt here..."
          style={{
            width: '100%',
            resize: 'none',
            outline: 'none',
            border: '1px solid #e8e8e4',
            borderRadius: 8,
            padding: '10px 12px',
            background: '#fafaf8',
            color: '#1a1a1a',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            lineHeight: 1.65,
            transition: 'border-color 0.15s',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#1a1a1a' }}
          onBlur={(e) => { e.target.style.borderColor = '#e8e8e4' }}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ right: -5 }}
      />
    </div>
  )
})

InputNode.displayName = 'InputNode'
export default InputNode