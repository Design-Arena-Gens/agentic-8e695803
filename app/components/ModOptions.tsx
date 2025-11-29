'use client'

import React from 'react'

interface ModOptionsProps {
  damageMultiplier: number
  setDamageMultiplier: (value: number) => void
  movementSpeed: 'standard' | 'fast' | 'very-fast'
  setMovementSpeed: (value: 'standard' | 'fast' | 'very-fast') => void
  aiEnabled: boolean
  setAiEnabled: (value: boolean) => void
}

export default function ModOptions({
  damageMultiplier,
  setDamageMultiplier,
  movementSpeed,
  setMovementSpeed,
  aiEnabled,
  setAiEnabled,
}: ModOptionsProps) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⚙️ Mod Configuration</h2>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Damage Multiplier</h3>
          <span style={styles.valueDisplay}>{damageMultiplier}x</span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={damageMultiplier}
          onChange={(e) => setDamageMultiplier(parseFloat(e.target.value))}
          style={styles.slider}
        />
        <div style={styles.sliderLabels}>
          <span>1x</span>
          <span>2x</span>
          <span>3x</span>
          <span>4x</span>
          <span>5x</span>
        </div>
        <p style={styles.description}>
          Controls the damage output of bot attacks. Higher values make bots more lethal.
        </p>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Movement Speed</h3>
          <span style={styles.valueDisplay}>{movementSpeed.replace('-', ' ').toUpperCase()}</span>
        </div>
        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.speedButton,
              ...(movementSpeed === 'standard' ? styles.speedButtonActive : {}),
            }}
            onClick={() => setMovementSpeed('standard')}
          >
            Standard
          </button>
          <button
            style={{
              ...styles.speedButton,
              ...(movementSpeed === 'fast' ? styles.speedButtonActive : {}),
            }}
            onClick={() => setMovementSpeed('fast')}
          >
            Fast
          </button>
          <button
            style={{
              ...styles.speedButton,
              ...(movementSpeed === 'very-fast' ? styles.speedButtonActive : {}),
            }}
            onClick={() => setMovementSpeed('very-fast')}
          >
            Very Fast
          </button>
        </div>
        <p style={styles.description}>
          Adjusts bot movement and navigation speed across the battlefield.
        </p>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>AI Logic System</h3>
          <label style={styles.switch}>
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
              style={styles.checkbox}
            />
            <span style={styles.slider2}></span>
          </label>
        </div>
        <p style={styles.description}>
          Enable advanced AI for intelligent targeting, navigation, and tactical decision-making.
        </p>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: 'rgba(26, 31, 58, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(0, 212, 255, 0.5)',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(0, 212, 255, 0.2)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '25px',
    textAlign: 'center',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    background: 'rgba(10, 14, 39, 0.5)',
    borderRadius: '8px',
    border: '1px solid rgba(100, 200, 255, 0.2)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
  },
  valueDisplay: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00d4ff',
    background: 'rgba(0, 212, 255, 0.2)',
    padding: '5px 15px',
    borderRadius: '20px',
  },
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '5px',
    background: 'rgba(100, 200, 255, 0.2)',
    outline: 'none',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#a0a0a0',
    marginBottom: '10px',
  },
  description: {
    fontSize: '14px',
    color: '#a0a0a0',
    lineHeight: '1.5',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  speedButton: {
    flex: 1,
    padding: '12px',
    background: 'rgba(100, 200, 255, 0.1)',
    border: '2px solid rgba(100, 200, 255, 0.3)',
    borderRadius: '8px',
    color: '#a0a0a0',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  speedButtonActive: {
    background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)',
    border: '2px solid #00d4ff',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(0, 212, 255, 0.4)',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '34px',
  },
  checkbox: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  slider2: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(100, 200, 255, 0.2)',
    transition: '0.4s',
    borderRadius: '34px',
    border: '2px solid rgba(100, 200, 255, 0.3)',
  },
}
