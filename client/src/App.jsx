import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { GiBrain } from 'react-icons/gi'
import { FiSun, FiMoon, FiClock, FiHome } from 'react-icons/fi'
import Home from './pages/Home.jsx'
import History from './pages/History.jsx'

function App() {
  const [dark, setDark] = useState(true)
  const [history, setHistory] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const theme = dark ? darkTheme : lightTheme

  const addToHistory = (entry) => {
    setHistory(prev => [entry, ...prev])
  }

  return (
    <div style={{ ...styles.page, backgroundColor: theme.pageBg }}>
      <div style={styles.container}>

        <nav style={{ ...styles.nav, borderBottom: `1px solid ${theme.border}` }}>
          <div style={styles.navLeft}>
            <div style={styles.logoIcon}>
              <GiBrain size={20} color='#a855f7' />
            </div>
            <span style={styles.logoText}>text<span style={styles.logoAccent}>summarizer</span></span>
          </div>
          <div style={styles.navRight}>
            <button
              onClick={() => navigate(location.pathname === '/' ? '/history' : '/')}
              style={{ ...styles.navBtn, color: theme.muted, border: `1px solid ${theme.border}` }}
            >
              {location.pathname === '/' ? <><FiClock size={14} /> History</> : <><FiHome size={14} /> Home</>}
            </button>
            <button
              onClick={() => setDark(!dark)}
              style={{ ...styles.navBtn, color: theme.muted, border: `1px solid ${theme.border}` }}
            >
              {dark ? <FiSun size={14} /> : <FiMoon size={14} />}
            </button>
          </div>
        </nav>

        {location.pathname === '/' && (
          <div style={styles.hero}>
            <div style={styles.badge}>
              <span style={styles.badgeDot} />
              AI POWERED
            </div>
            <h1 style={styles.heroTitle}>
              Summarize
              <span style={styles.heroGradient}> anything.</span>
            </h1>
            <p style={{ ...styles.heroSub, color: theme.muted }}>
              Paste any text and get a clean structured summary 
            </p>
          </div>
        )}

        {location.pathname === '/history' && (
          <div style={styles.hero}>
            <h1 style={{ ...styles.heroTitle, fontSize: '40px' }}>
              Your <span style={styles.heroGradient}>History</span>
            </h1>
            <p style={{ ...styles.heroSub, color: theme.muted }}>
              All your previous summaries in one place
            </p>
          </div>
        )}

        <div style={{ ...styles.card, backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}>
          <Routes>
            <Route path="/" element={<Home theme={theme} addToHistory={addToHistory} />} />
            <Route path="/history" element={<History theme={theme} history={history} />} />
          </Routes>
        </div>

        <footer style={{ ...styles.footer, color: theme.muted, borderTop: `1px solid ${theme.border}` }}>
          Built with React + Groq AI
        </footer>
      </div>
    </div>
  )
}

const lightTheme = {
  pageBg: '#13001a',
  cardBg: '#1a0525',
  border: '#2d1040',
  text: '#e8d5ff',
  muted: '#9870bb',
  inputBg: '#0f0018',
  iconBg: '#2d1040',
  iconColor: '#c084fc',
  toggleBg: '#2d1040',
  buttonBg: '#2d1040',
  buttonText: '#e8d5ff',
  metricBg: '#0f0018',
  pointNumBg: '#2d1040',
  pointNumColor: '#c084fc',
  emptyBg: '#0f0018',
}

const darkTheme = {
  pageBg: '#0a0a0f',
  cardBg: '#12121a',
  border: '#1e1e2e',
  text: '#e8e0ff',
  muted: '#6b6580',
  inputBg: '#0d0d15',
  iconBg: '#1a1030',
  iconColor: '#a855f7',
  toggleBg: '#1a1a28',
  buttonBg: '#1a1a28',
  buttonText: '#e8e0ff',
  metricBg: '#0d0d15',
  pointNumBg: '#1a1030',
  pointNumColor: '#a855f7',
  emptyBg: '#0d0d15',
}

const styles = {
  page: {
    minHeight: '100vh',
    fontFamily: "'Inter', system-ui, sans-serif",
    transition: 'background-color 0.3s ease',
  },
  container: {
    maxWidth: '740px',
    margin: '0 auto',
    padding: '0 20px 60px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    marginBottom: '10px',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #1a1030, #2d1b4e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #3d2060',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#e8e0ff',
    letterSpacing: '-0.5px',
  },
  logoAccent: {
    color: '#a855f7',
  },
  navRight: {
    display: 'flex',
    gap: '8px',
  },
  navBtn: {
    padding: '7px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '500',
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
  },
  hero: {
    padding: '48px 0 36px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#1a1030',
    border: '1px solid #3d2060',
    borderRadius: '20px',
    padding: '5px 14px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#a855f7',
    letterSpacing: '0.08em',
    marginBottom: '20px',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#a855f7',
    display: 'inline-block',
    boxShadow: '0 0 6px #a855f7',
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: '800',
    color: '#e8e0ff',
    margin: '0 0 16px',
    lineHeight: '1.1',
    letterSpacing: '-1px',
  },
  heroGradient: {
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: {
    fontSize: '16px',
    lineHeight: '1.6',
    margin: 0,
    maxWidth: '480px',
  },
  card: {
    borderRadius: '16px',
    padding: '28px 32px',
    transition: 'all 0.3s ease',
  },
  footer: {
    textAlign: 'center',
    fontSize: '13px',
    padding: '24px 0 0',
    marginTop: '24px',
  },
}

export default App