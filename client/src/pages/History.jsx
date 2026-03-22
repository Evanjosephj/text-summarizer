import React from 'react'
import { FiClock, FiFileText, FiThumbsUp, FiMinus, FiThumbsDown } from 'react-icons/fi'

function History({ theme, history }) {
  const sentimentConfig = {
    positive: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: <FiThumbsUp size={11} /> },
    neutral:  { color: '#b45309', bg: '#fffbeb', border: '#fde68a', icon: <FiMinus size={11} /> },
    negative: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: <FiThumbsDown size={11} /> },
  }

  if (history.length === 0) {
    return (
      <div style={{ ...styles.empty, backgroundColor: theme.emptyBg, border: `1px solid ${theme.border}` }}>
        <FiClock size={32} color={theme.muted} />
        <p style={{ color: theme.muted, marginTop: '12px', fontSize: '14px' }}>
          No history yet. Summarize some text first!
        </p>
      </div>
    )
  }

  return (
    <div style={styles.wrapper}>
      <p style={{ color: theme.muted, fontSize: '13px', marginBottom: '16px' }}>
        {history.length} summarized {history.length === 1 ? 'entry' : 'entries'}
      </p>
      {history.map((entry, i) => {
        const s = sentimentConfig[entry.result.sentiment] || sentimentConfig.neutral
        return (
          <div
            key={i}
            style={{
              ...styles.card,
              backgroundColor: theme.metricBg,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardLeft}>
                <FiFileText size={13} color={theme.muted} />
                <p style={{ ...styles.inputPreview, color: theme.muted }}>{entry.text}</p>
              </div>
              <span style={{
                ...styles.badge,
                color: s.color,
                backgroundColor: s.bg,
                border: `1px solid ${s.border}`,
              }}>
                {s.icon}
                {entry.result.sentiment}
              </span>
            </div>

            <p style={{ ...styles.summary, color: theme.text }}>{entry.result.summary}</p>

            <div style={styles.points}>
              {entry.result.keyPoints.map((point, j) => (
                <div key={j} style={styles.pointRow}>
                  <div style={{
                    ...styles.pointNum,
                    backgroundColor: theme.pointNumBg,
                    color: theme.pointNumColor,
                  }}>
                    {j + 1}
                  </div>
                  <p style={{ ...styles.pointText, color: theme.muted }}>{point}</p>
                </div>
              ))}
            </div>

            <p style={{ ...styles.date, color: theme.muted }}>{entry.date}</p>
          </div>
        )
      })}
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  empty: {
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    borderRadius: '12px',
    padding: '16px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '10px',
  },
  cardLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    flex: 1,
  },
  inputPreview: {
    margin: 0,
    fontSize: '13px',
    lineHeight: '1.5',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  summary: {
    margin: '0 0 10px',
    fontSize: '13px',
    lineHeight: '1.6',
    fontWeight: '500',
  },
  points: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '10px',
  },
  pointRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  pointNum: {
    width: '18px',
    height: '18px',
    minWidth: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '500',
  },
  pointText: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '1.5',
  },
  date: {
    margin: 0,
    fontSize: '11px',
  },
}

export default History