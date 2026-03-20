const ControlPanel = ({ onRun, onSave, isLoading, isSaving, hasResponse, hasSaved, prompt }) => {
  const canRun = prompt.trim().length > 0 && !isLoading
  const canSave = hasResponse && !isSaving && !hasSaved

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '0 20px',
        height: 52,
        background: '#ffffff',
        borderBottom: '1px solid #e8e8e4',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 6,
          background: '#1a1a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.01em' }}>
          AI Flow
        </span>
      </div>

      {/* Divider */}
      <div style={{ flex: 1 }} />

      {/* Status */}
      {isLoading && (
        <span style={{ fontSize: 12, color: '#aaa', fontFamily: 'DM Sans, sans-serif' }}>
          Running…
        </span>
      )}

      {/* Run Flow */}
      <button
        onClick={onRun}
        disabled={!canRun}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '7px 16px',
          borderRadius: 8,
          border: 'none',
          background: canRun ? '#1a1a1a' : '#f0f0ec',
          color: canRun ? '#ffffff' : '#bbb',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
          fontSize: 13,
          cursor: canRun ? 'pointer' : 'not-allowed',
          transition: 'all 0.15s',
          opacity: isLoading ? 0.6 : 1,
        }}
        onMouseEnter={(e) => { if (canRun) e.currentTarget.style.background = '#333' }}
        onMouseLeave={(e) => { if (canRun) e.currentTarget.style.background = '#1a1a1a' }}
      >
        {isLoading ? (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 5"/>
            </svg>
            Running
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 2l7 4-7 4V2z" fill="currentColor"/>
            </svg>
            Run Flow
          </>
        )}
      </button>

      {/* Save to DB */}
      <button
        onClick={onSave}
        disabled={!canSave}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '7px 16px',
          borderRadius: 8,
          border: '1px solid #e8e8e4',
          background: hasSaved ? '#f4f4f0' : '#fff',
          color: hasSaved ? '#888' : canSave ? '#1a1a1a' : '#ccc',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
          fontSize: 13,
          cursor: canSave ? 'pointer' : 'not-allowed',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { if (canSave) e.currentTarget.style.background = '#f4f4f0' }}
        onMouseLeave={(e) => { if (canSave && !hasSaved) e.currentTarget.style.background = '#fff' }}
      >
        {isSaving ? (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 5"/>
            </svg>
            Saving
          </>
        ) : hasSaved ? (
          <>✓ Saved</>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4 1.5v3.5h4V1.5" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="2.5" y="7" width="7" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            Save to DB
          </>
        )}
      </button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default ControlPanel