import React, { useState } from 'react'
import { FiSend, FiX } from 'react-icons/fi'
import ResultCard from '../components/ResultCard.jsx'

function Home({ theme, addToHistory }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize.')
      return
    }
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const response = await fetch('https://text-summarizer-voxm.onrender.com/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Something went wrong.')
      setResult(data)
      addToHistory({
        text: text.slice(0, 100) + (text.length > 100 ? '...' : ''),
        result: data,
        date: new Date().toLocaleString(),
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setText('')
    setResult(null)
    setError('')
  }

  return (
    <div>
      <label style={{ ...styles.label, color: theme.muted }}>Paste your text</label>

      <textarea
        style={{
          ...styles.textarea,
          backgroundColor: theme.inputBg,
          border: `1px solid ${theme.border}`,
          color: theme.text,
        }}
        placeholder="Paste any article, paragraph, or notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={7}
      />

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.buttonRow}>
        {(text || result) && (
          <button
            style={{
              ...styles.clearBtn,
              backgroundColor: theme.toggleBg,
              color: theme.muted,
              border: `1px solid ${theme.border}`,
            }}
            onClick={handleClear}
          >
            <FiX size={14} /> Clear
          </button>
        )}
        <button
          style={{
            ...styles.button,
            backgroundColor: theme.buttonBg,
            color: theme.buttonText,
            border: `1px solid ${theme.border}`,
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          <FiSend size={14} />
          {loading ? 'Analyzing...' : 'Summarize'}
        </button>
      </div>

      {result && <ResultCard result={result} theme={theme} />}
    </div>
  )
}

const styles = {
  label: {
    fontSize: '14px',
    display: 'block',
    marginBottom: '6px',
  },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '15px',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'system-ui, sans-serif',
    lineHeight: '1.7',
    transition: 'all 0.3s ease',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '10px',
  },
  button: {
    padding: '10px 22px',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '500',
  },
  clearBtn: {
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  error: {
    color: '#dc2626',
    fontSize: '13px',
    marginTop: '8px',
  },
}

export default Home