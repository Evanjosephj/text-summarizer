import React from 'react'
import { FiFileText, FiList, FiThumbsUp, FiMinus, FiThumbsDown } from 'react-icons/fi'

function ResultCard({ result, theme }) {
  const sentimentConfig = {
    positive: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: <FiThumbsUp size={14} /> },
    neutral:  { color: '#b45309', bg: '#fffbeb', border: '#fde68a', icon: <FiMinus size={14} /> },
    negative: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: <FiThumbsDown size={14} /> },
  }

  const s = sentimentConfig[result.sentiment] || sentimentConfig.neutral

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.divider, backgroundColor: theme.border }} />

      <div style={styles.topGrid}>
        <div style={{ ...styles.metricCard, backgroundColor: theme.metricBg, border: `1px solid ${theme.border}` }}>
          <p style={{ ...styles.metricLabel, color: theme.muted }}>Sentiment</p>
          <span style={{ ...styles.badge, color: s.color, backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
            {s.icon}
            {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
          </span>
        </div>

        <div style={{ ...styles.metricCard, backgroundColor: theme.metricBg, border: `1px solid ${theme.border}`, gridColumn: 'span 2' }}>
          <p style={{ ...styles.metricLabel, color: theme.muted }}>
            <FiFileText size={13} style={{ marginRight: '5px' }} /> Summary
          </p>
          <p style={{ ...styles.summaryText, color: theme.text }}>{result.summary}</p>
        </div>
      </div>

      <div style={{ ...styles.keyPointsCard, backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}>
        <p style={{ ...styles.keyPointsTitle, color: theme.text }}>
          <FiList size={15} style={{ marginRight: '6px' }} />
          Key points
        </p>
        <div style={styles.pointsList}>
          {result.keyPoints.map((point, i) => (
            <div key={i} style={styles.pointRow}>
              <div style={{ ...styles.pointNumber, backgroundColor: theme.pointNumBg, color: theme.pointNumColor }}>
                {i + 1}
              </div>
              <p style={{ ...styles.pointText, color: theme.muted }}>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: { marginTop: '8px' },
  divider: { height: '1px', margin: '20px 0' },
  topGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '10px',
    marginBottom: '12px',
  },
  metricCard: {
    borderRadius: '10px',
    padding: '14px 16px',
  },
  metricLabel: {
    margin: '0 0 8px',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
  },
  summaryText: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '1.7',
  },
  keyPointsCard: {
    borderRadius: '12px',
    padding: '16px 18px',
  },
  keyPointsTitle: {
    margin: '0 0 14px',
    fontSize: '15px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
  },
  pointsList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  pointRow: { display: 'flex', alignItems: 'flex-start', gap: '10px' },
  pointNumber: {
    width: '22px',
    height: '22px',
    minWidth: '22px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '500',
  },
  pointText: { margin: 0, fontSize: '15px', lineHeight: '1.7' },
}

export default ResultCard