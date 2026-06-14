'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { randomInt } from '@/lib/utils'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  life: number
  maxLife: number
}

interface ParticleBurstProps {
  active: boolean
  origin?: { x: number; y: number }
  colors?: string[]
  count?: number
}

export default function ParticleBurst({
  active,
  origin = { x: 50, y: 50 },
  colors = ['#FF6B35', '#FFC857', '#FF9D5C', '#2DD4BF', '#ffffff'],
  count = 60,
}: ParticleBurstProps) {
  if (!active) return null

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i / count) * 360 + randomInt(-20, 20),
    distance: randomInt(80, 250),
    color: colors[i % colors.length],
    size: randomInt(4, 10),
    delay: randomInt(0, 200),
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(p => {
        const rad = (p.angle * Math.PI) / 180
        const tx = Math.cos(rad) * p.distance
        const ty = Math.sin(rad) * p.distance

        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${origin.x}%`,
              top: `${origin.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: tx,
              y: ty,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1.2,
              delay: p.delay / 1000,
              ease: [0.2, 0.8, 0.4, 1],
            }}
          />
        )
      })}
    </div>
  )
}

// Ambient floating particles for background ambience
export function AmbientParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: randomInt(0, 100),
    delay: randomInt(0, 8),
    duration: randomInt(8, 20),
    size: randomInt(2, 6),
    opacity: (randomInt(20, 60)) / 100,
    color: i % 3 === 0 ? '#2DD4BF' : '#FF6B35',
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            filter: `blur(1px)`,
          }}
          animate={{
            y: [0, -window?.innerHeight || -800],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
