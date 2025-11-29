'use client'

import React, { useState, useEffect } from 'react'

interface AILogicPanelProps {
  aiEnabled: boolean
}

interface AILog {
  timestamp: string
  bot: number
  action: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export default function AILogicPanel({ aiEnabled }: AILogicPanelProps) {
  const [logs, setLogs] = useState<AILog[]>([])
  const [aiFeatures] = useState([
    {
      name: 'Target Prioritization',
      description: 'Bots identify and prioritize threats based on distance, health, and danger level.',
      status: aiEnabled,
      icon: '🎯',
    },
    {
      name: 'Smart Navigation',
      description: 'Advanced pathfinding to navigate obstacles and reach objectives efficiently.',
      status: aiEnabled,
      icon: '🗺️',
    },
    {
      name: 'Cover Fire',
      description: 'Bots provide suppressing fire while maintaining tactical positioning.',
      status: aiEnabled,
      icon: '🛡️',
    },
    {
      name: 'Ability Management',
      description: 'Strategic use of abilities based on situation analysis and cooldowns.',
      status: aiEnabled,
      icon: '⚡',
    },
    {
      name: 'Team Coordination',
      description: 'Bots coordinate attacks and movements for maximum effectiveness.',
      status: aiEnabled,
      icon: '🤝',
    },
    {
      name: 'Adaptive Behavior',
      description: 'AI adapts tactics based on enemy behavior and environmental factors.',
      status: aiEnabled,
      icon: '🧠',
    },
  ])

  useEffect(() => {
    if (!aiEnabled) {
      setLogs([])
      return
    }

    const actions = [
      'Target acquired - engaging enemy',
      'Moving to tactical position',
      'Providing cover fire',
      'Enemy eliminated - searching for new target',
      'Ability ready - awaiting optimal use',
      'Coordinating with teammate',
      'Repositioning for better angle',
      'Analyzing threat level',
      'Executing flanking maneuver',
      'Priority target identified',
    ]

    const types: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning']

    const interval = setInterval(() => {
      const newLog: AILog = {
        timestamp: new Date().toLocaleTimeString(),
        bot: Math.floor(Math.random() * 3) + 1,
        action: actions[Math.floor(Math.random() * actions.length)],
        type: types[Math.floor(Math.random() * types.length)],
      }

      setLogs((prev) => [newLog, ...prev].slice(0, 15))
    }, 2000)

    return () => clearInterval(interval)
  }, [aiEnabled])

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧠 AI Logic System</h2>

      <div style={styles.statusSection}>
        <div style={styles.statusBadge}>
          <span style={styles.statusDot(aiEnabled)}></span>
          <span style={styles.statusText}>{aiEnabled ? 'AI Active' : 'AI Disabled'}</span>
        </div>
      </div>

      <div style={styles.featuresSection}>
        <h3 style={styles.sectionTitle}>AI Features</h3>
        {aiFeatures.map((feature, index) => (
          <div key={index} style={styles.featureCard}>
            <div style={styles.featureHeader}>
              <span style={styles.featureIcon}>{feature.icon}</span>
              <span style={styles.featureName}>{feature.name}</span>
              <span style={styles.featureStatus(feature.status)}>
                {feature.status ? '✓' : '✕'}
              </span>
            </div>
            <p style={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>

      <div style={styles.logsSection}>
        <h3 style={styles.sectionTitle}>Activity Log</h3>
        <div style={styles.logsContainer}>
          {logs.length === 0 ? (
            <p style={styles.noLogs}>
              {aiEnabled ? 'Initializing AI systems...' : 'AI disabled - no activity'}
            </p>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={styles.logEntry(log.type)}>
                <span style={styles.logTime}>{log.timestamp}</span>
                <span style={styles.logBot}>Bot #{log.bot}</span>
                <span style={styles.logAction}>{log.action}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={styles.commandsSection}>
        <h3 style={styles.sectionTitle}>Available Commands</h3>
        <div style={styles.commandsList}>
          <div style={styles.command}>
            <code style={styles.commandCode}>FOLLOW</code>
            <span style={styles.commandDesc}>Bot follows player</span>
          </div>
          <div style={styles.command}>
            <code style={styles.commandCode}>ATTACK</code>
            <span style={styles.commandDesc}>Engage nearest enemy</span>
          </div>
          <div style={styles.command}>
            <code style={styles.commandCode}>DEFEND</code>
            <span style={styles.commandDesc}>Hold position</span>
          </div>
          <div style={styles.command}>
            <code style={styles.commandCode}>REGROUP</code>
            <span style={styles.commandDesc}>Return to team</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: { [key: string]: any } = {
  container: {
    background: 'rgba(26, 31, 58, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(100, 200, 255, 0.3)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    height: 'fit-content',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '20px',
  },
  statusSection: {
    marginBottom: '20px',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0, 212, 255, 0.1)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 212, 255, 0.3)',
  },
  statusDot: (active: boolean): React.CSSProperties => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: active ? '#00ff88' : '#ff0044',
    boxShadow: active ? '0 0 10px #00ff88' : '0 0 10px #ff0044',
  }),
  statusText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
  },
  featuresSection: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '12px',
  },
  featureCard: {
    background: 'rgba(10, 14, 39, 0.5)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(100, 200, 255, 0.2)',
    marginBottom: '10px',
  },
  featureHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  featureIcon: {
    fontSize: '18px',
  },
  featureName: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  featureStatus: (active: boolean): React.CSSProperties => ({
    fontSize: '16px',
    fontWeight: 'bold',
    color: active ? '#00ff88' : '#666',
  }),
  featureDescription: {
    fontSize: '12px',
    color: '#a0a0a0',
    lineHeight: '1.4',
  },
  logsSection: {
    marginBottom: '20px',
  },
  logsContainer: {
    background: 'rgba(10, 14, 39, 0.7)',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid rgba(100, 200, 255, 0.2)',
    maxHeight: '250px',
    overflowY: 'auto',
  },
  noLogs: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  logEntry: (type: string): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '6px',
    background:
      type === 'success'
        ? 'rgba(0, 255, 136, 0.1)'
        : type === 'warning'
        ? 'rgba(255, 200, 0, 0.1)'
        : 'rgba(0, 212, 255, 0.1)',
    borderLeft:
      type === 'success'
        ? '3px solid #00ff88'
        : type === 'warning'
        ? '3px solid #ffc800'
        : '3px solid #00d4ff',
  }),
  logTime: {
    fontSize: '11px',
    color: '#666',
    fontFamily: 'monospace',
  },
  logBot: {
    fontSize: '12px',
    color: '#00d4ff',
    fontWeight: 'bold',
  },
  logAction: {
    fontSize: '13px',
    color: '#e0e0e0',
  },
  commandsSection: {
    marginTop: '20px',
  },
  commandsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  command: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    background: 'rgba(10, 14, 39, 0.5)',
    borderRadius: '6px',
    border: '1px solid rgba(100, 200, 255, 0.2)',
  },
  commandCode: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#00ff88',
    background: 'rgba(0, 255, 136, 0.1)',
    padding: '4px 8px',
    borderRadius: '4px',
    fontFamily: 'monospace',
  },
  commandDesc: {
    fontSize: '13px',
    color: '#a0a0a0',
  },
}
