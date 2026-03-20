import { memo } from 'react'
import { Handle, Position } from 'reactflow'

const ShimmerLines = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {[100, 82, 90, 55].map((w, i) => (
      <div
        key={i}
        className="shimmer-line"
        style={{ width: `${w}%`, height: 12, animationDelay: `${i * 0.1}s` }}
      />
    ))}
  </div>
)

const ResultNode = memo(({ data }) => {
  const { response, isLoading, error, isSaved } = data
  const isEmpty = !response && !isLoading && !error

  return (
    <div
      style={{
        width: 340,
        background: '#ffffff',
        border: '1px solid #e8e8e4',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ left: -5 }}
      />

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
          {isLoading ? 'Thinking…' : error ? 'Error' : 'Response'}
        </span>
        {isSaved && (
          <span style={{ fontSize: 11, color: '#aaa' }}>Saved ✓</span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: 16, minHeight: 120 }}>
        {isLoading && <ShimmerLines />}

        {error && !isLoading && (
          <p className="fade-in" style={{ margin: 0, fontSize: 13, color: '#e05252', lineHeight: 1.6 }}>
            {error}
          </p>
        )}

        {!isLoading && !error && response && (
          <p
            className="fade-in"
            style={{
              margin: 0,
              fontSize: 13,
              color: '#1a1a1a',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              maxHeight: 220,
              overflowY: 'auto',
            }}
          >
            {response}
          </p>
        )}

        {isEmpty && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 88 }}>
            <span style={{ fontSize: 12, color: '#ccc' }}>Awaiting response…</span>
          </div>
        )}
      </div>
    </div>
  )
})

ResultNode.displayName = 'ResultNode'
export default ResultNode