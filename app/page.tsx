'use client'

import { useState, useEffect } from 'react'
import ModOptions from './components/ModOptions'
import BotSimulation from './components/BotSimulation'
import AILogicPanel from './components/AILogicPanel'

export default function Home() {
  const [damageMultiplier, setDamageMultiplier] = useState(1)
  const [movementSpeed, setMovementSpeed] = useState<'standard' | 'fast' | 'very-fast'>('standard')
  const [aiEnabled, setAiEnabled] = useState(true)
  const [showOptions, setShowOptions] = useState(false)

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>SmartTeammates</h1>
          <p style={styles.subtitle}>Advanced AI Teammate Bot System</p>
          <p style={styles.author}>by Skyline</p>
        </div>
        <button
          style={styles.optionsButton}
          onClick={() => setShowOptions(!showOptions)}
        >
          {showOptions ? '✕ Close Options' : '⚙️ Mod Options'}
        </button>
      </header>

      {showOptions && (
        <ModOptions
          damageMultiplier={damageMultiplier}
          setDamageMultiplier={setDamageMultiplier}
          movementSpeed={movementSpeed}
          setMovementSpeed={setMovementSpeed}
          aiEnabled={aiEnabled}
          setAiEnabled={setAiEnabled}
        />
      )}

      <div style={styles.content}>
        <div style={styles.leftPanel}>
          <BotSimulation
            damageMultiplier={damageMultiplier}
            movementSpeed={movementSpeed}
            aiEnabled={aiEnabled}
          />
        </div>

        <div style={styles.rightPanel}>
          <AILogicPanel aiEnabled={aiEnabled} />
        </div>
      </div>

      <footer style={styles.footer}>
        <p>SmartTeammates v1.0 | Damage: {damageMultiplier}x | Speed: {movementSpeed} | AI: {aiEnabled ? 'Active' : 'Disabled'}</p>
      </footer>
    </main>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'rgba(26, 31, 58, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(100, 200, 255, 0.3)',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#a0a0a0',
    marginBottom: '5px',
  },
  author: {
    fontSize: '14px',
    color: '#00d4ff',
    fontStyle: 'italic',
  },
  optionsButton: {
    background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)',
    border: 'none',
    borderRadius: '8px',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 212, 255, 0.4)',
  },
  content: {
    display: 'flex',
    gap: '20px',
    flex: 1,
    marginBottom: '20px',
  },
  leftPanel: {
    flex: 2,
  },
  rightPanel: {
    flex: 1,
  },
  footer: {
    background: 'rgba(26, 31, 58, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(100, 200, 255, 0.3)',
    borderRadius: '12px',
    padding: '15px',
    textAlign: 'center',
    color: '#a0a0a0',
    fontSize: '14px',
  },
}
