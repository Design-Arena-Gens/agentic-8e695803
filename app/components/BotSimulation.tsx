'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Bot {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  status: 'idle' | 'moving' | 'attacking' | 'covering'
  health: number
  kills: number
}

interface Target {
  id: number
  x: number
  y: number
  health: number
}

interface BotSimulationProps {
  damageMultiplier: number
  movementSpeed: 'standard' | 'fast' | 'very-fast'
  aiEnabled: boolean
}

export default function BotSimulation({
  damageMultiplier,
  movementSpeed,
  aiEnabled,
}: BotSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [bots, setBots] = useState<Bot[]>([])
  const [targets, setTargets] = useState<Target[]>([])
  const [stats, setStats] = useState({ totalKills: 0, accuracy: 0 })

  useEffect(() => {
    // Initialize bots
    const initialBots: Bot[] = [
      { id: 1, x: 50, y: 250, targetX: 50, targetY: 250, status: 'idle', health: 100, kills: 0 },
      { id: 2, x: 50, y: 350, targetX: 50, targetY: 350, status: 'idle', health: 100, kills: 0 },
      { id: 3, x: 150, y: 300, targetX: 150, targetY: 300, status: 'idle', health: 100, kills: 0 },
    ]
    setBots(initialBots)

    // Initialize targets
    spawnTargets()
  }, [])

  const spawnTargets = () => {
    const newTargets: Target[] = []
    for (let i = 0; i < 5; i++) {
      newTargets.push({
        id: Date.now() + i,
        x: 600 + Math.random() * 200,
        y: 100 + Math.random() * 400,
        health: 100,
      })
    }
    setTargets(newTargets)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const getSpeedMultiplier = () => {
      switch (movementSpeed) {
        case 'standard': return 1
        case 'fast': return 1.5
        case 'very-fast': return 2.5
        default: return 1
      }
    }

    const interval = setInterval(() => {
      // Clear canvas
      ctx.fillStyle = 'rgba(10, 14, 39, 0.95)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Update and draw targets
      const updatedTargets = [...targets]
      updatedTargets.forEach((target, idx) => {
        if (target.health > 0) {
          // Draw target
          ctx.fillStyle = 'rgba(255, 50, 50, 0.8)'
          ctx.beginPath()
          ctx.arc(target.x, target.y, 15, 0, Math.PI * 2)
          ctx.fill()

          // Draw health bar
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
          ctx.fillRect(target.x - 20, target.y - 30, 40, 5)
          ctx.fillStyle = 'rgba(255, 0, 0, 0.8)'
          ctx.fillRect(target.x - 20, target.y - 30, 40 * (target.health / 100), 5)
        }
      })

      // Update and draw bots
      const updatedBots = bots.map((bot) => {
        if (!aiEnabled) {
          bot.status = 'idle'
        } else {
          // AI Logic: Find nearest target
          const nearestTarget = updatedTargets
            .filter((t) => t.health > 0)
            .reduce((nearest, target) => {
              const dist = Math.hypot(target.x - bot.x, target.y - bot.y)
              const nearestDist = nearest ? Math.hypot(nearest.x - bot.x, nearest.y - bot.y) : Infinity
              return dist < nearestDist ? target : nearest
            }, null as Target | null)

          if (nearestTarget) {
            const distance = Math.hypot(nearestTarget.x - bot.x, nearestTarget.y - bot.y)

            if (distance > 200) {
              // Move towards target
              bot.status = 'moving'
              const angle = Math.atan2(nearestTarget.y - bot.y, nearestTarget.x - bot.x)
              const speed = 2 * getSpeedMultiplier()
              bot.x += Math.cos(angle) * speed
              bot.y += Math.sin(angle) * speed
            } else if (distance > 150) {
              // Provide cover fire
              bot.status = 'covering'
              if (Math.random() < 0.1) {
                const damage = 10 * damageMultiplier
                nearestTarget.health -= damage
                if (nearestTarget.health <= 0) {
                  bot.kills++
                  setStats((prev) => ({ ...prev, totalKills: prev.totalKills + 1 }))
                }
              }
            } else {
              // Attack
              bot.status = 'attacking'
              if (Math.random() < 0.15) {
                const damage = 15 * damageMultiplier
                nearestTarget.health -= damage
                if (nearestTarget.health <= 0) {
                  bot.kills++
                  setStats((prev) => ({ ...prev, totalKills: prev.totalKills + 1 }))
                }

                // Draw laser
                ctx.strokeStyle = 'rgba(0, 212, 255, 0.8)'
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(bot.x, bot.y)
                ctx.lineTo(nearestTarget.x, nearestTarget.y)
                ctx.stroke()
              }
            }
          } else {
            bot.status = 'idle'
          }
        }

        // Draw bot
        const botColors = {
          idle: 'rgba(100, 200, 255, 0.8)',
          moving: 'rgba(100, 255, 200, 0.8)',
          attacking: 'rgba(255, 200, 0, 0.8)',
          covering: 'rgba(200, 100, 255, 0.8)',
        }

        ctx.fillStyle = botColors[bot.status]
        ctx.beginPath()
        ctx.arc(bot.x, bot.y, 12, 0, Math.PI * 2)
        ctx.fill()

        // Draw bot outline
        ctx.strokeStyle = '#00d4ff'
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw status indicator
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 10px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(`#${bot.id}`, bot.x, bot.y - 20)
        ctx.fillText(`K:${bot.kills}`, bot.x, bot.y + 30)

        return bot
      })

      setBots(updatedBots)
      setTargets(updatedTargets.filter((t) => t.health > 0))

      // Respawn targets if all eliminated
      if (updatedTargets.every((t) => t.health <= 0)) {
        setTimeout(() => spawnTargets(), 1000)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [bots, targets, damageMultiplier, movementSpeed, aiEnabled])

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🎮 Live Bot Simulation</h2>
        <div style={styles.statsContainer}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Total Kills:</span>
            <span style={styles.statValue}>{stats.totalKills}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Active Bots:</span>
            <span style={styles.statValue}>{bots.length}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Enemies:</span>
            <span style={styles.statValue}>{targets.length}</span>
          </div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        style={styles.canvas}
      />
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, background: '#64c8ff' }}></span>
          <span>Idle</span>
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, background: '#64ffc8' }}></span>
          <span>Moving</span>
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, background: '#ffc864' }}></span>
          <span>Attacking</span>
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, background: '#c864ff' }}></span>
          <span>Cover Fire</span>
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, background: '#ff3232' }}></span>
          <span>Enemy</span>
        </div>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: 'rgba(26, 31, 58, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(100, 200, 255, 0.3)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '15px',
  },
  statsContainer: {
    display: 'flex',
    gap: '20px',
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0, 212, 255, 0.1)',
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 212, 255, 0.3)',
  },
  statLabel: {
    fontSize: '14px',
    color: '#a0a0a0',
  },
  statValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  canvas: {
    width: '100%',
    border: '2px solid rgba(0, 212, 255, 0.5)',
    borderRadius: '8px',
    background: 'rgba(10, 14, 39, 0.95)',
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '15px',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#a0a0a0',
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'inline-block',
  },
}
