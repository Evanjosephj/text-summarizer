import React, { useState } from 'react'
import { GiBrain } from 'react-icons/gi'
import { FiSend, FiSun, FiMoon } from 'react-icons/fi'
import ResultCard from './components/ResultCard'

function App() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dark, setDark] = useState(false)

  const theme = dark ? darkTheme : lightTheme

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize.')
      return
    }
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Something went wrong.')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ ...styles.page, backgroundColor: theme.pageBg }}>
      <div style={{ ...styles.container, backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}>

        <div style={styles.header}>
          <div style={{ ...styles.iconBox, backgroundColor: theme.iconBg }}>
            <GiBrain size={22} color={theme.iconColor} />
          </div>
          <div>
            <h1 style={{ ...styles.title, color: theme.text }}>Text Summarizer</h1>
            <p style={{ ...styles.powered, color: theme.muted }}>Powered by Groq AI</p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            style={{ ...styles.toggleBtn, backgroundColor: theme.toggleBg, color: theme.text, border: `1px solid ${theme.border}`, marginLeft: 'auto' }}
          >
            {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>

        <div style={{ ...styles.divider, backgroundColor: theme.border }} />

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

        {result && <ResultCard result={result} theme={theme} dark={dark} />}
      </div>
    </div>
  )
}

const lightTheme = {
  pageBg: '#f0f4f8',
  cardBg: '#ffffff',
  border: '#e2e8f0',
  text: '#1a202c',
  muted: '#718096',
  inputBg: '#f7fafc',
  iconBg: '#ebf8ff',
  iconColor: '#2b6cb0',
  toggleBg: '#edf2f7',
  buttonBg: '#ffffff',
  buttonText: '#1a202c',
  metricBg: '#f7fafc',
  pointNumBg: '#ebf8ff',
  pointNumColor: '#2b6cb0',
}

const darkTheme = {
  pageBg: '#0f172a',
  cardBg: '#1e293b',
  border: '#334155',
  text: '#e2e8f0',
  muted: '#94a3b8',
  inputBg: '#0f172a',
  iconBg: '#1e3a5f',
  iconColor: '#93c5fd',
  toggleBg: '#334155',
  buttonBg: '#334155',
  buttonText: '#e2e8f0',
  metricBg: '#0f172a',
  pointNumBg: '#1e3a5f',
  pointNumColor: '#93c5fd',
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '40px 16px',
    fontFamily: 'system-ui, sans-serif',
    transition: 'background-color 0.3s ease',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    borderRadius: '16px',
    padding: '28px 32px',
    transition: 'all 0.3s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '6px',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
  },
  powered: {
    margin: 0,
    fontSize: '12px',
  },
  toggleBtn: {
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '500',
  },
  divider: {
    height: '1px',
    margin: '20px 0',
  },
  label: {
    fontSize: '13px',
    display: 'block',
    marginBottom: '6px',
  },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'system-ui, sans-serif',
    lineHeight: '1.6',
    transition: 'all 0.3s ease',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  button: {
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  error: {
    color: '#dc2626',
    fontSize: '13px',
    marginTop: '8px',
  },
}

export default App