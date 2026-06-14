'use client'

import { motion } from 'framer-motion'
import { Agent } from '@/lib/data'
import { cn } from '@/lib/utils'

interface AgentAvatarProps {
  agent: Agent
  size?: 'sm' | 'md' | 'lg' | 'xl'
  speaking?: boolean
  idle?: boolean
  className?: string
}

const sizes = {
  sm: { outer: 48, inner: 32, fontSize: '14px' },
  md: { outer: 72, inner: 50, fontSize: '22px' },
  lg: { outer: 100, inner: 72, fontSize: '32px' },
  xl: { outer: 140, inner: 104, fontSize: '48px' },
}

export default function AgentAvatar({ agent, size = 'md', speaking = false, idle = false, className }: AgentAvatarProps) {
  const s = sizes[size]
  const color = agent.color === 'orange' ? '#FF6B35' : '#2DD4BF'
  const colorDim = agent.color === 'orange' ? 'rgba(255,107,53,0.15)' : 'rgba(45,212,191,0.15)'
  const colorGlow = agent.color === 'orange' ? 'rgba(255,107,53,0.6)' : 'rgba(45,212,191,0.6)'

  return (
    <div className={cn('relative flex items-center justify-center', className)} style={{ width: s.outer, height: s.outer }}>
      {/* Outer glow ring - pulses when speaking */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${colorGlow} 0%, transparent 70%)` }}
        animate={speaking
          ? { opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1] }
          : idle
          ? { opacity: [0.1, 0.2, 0.1] }
          : { opacity: 0.2 }
        }
        transition={speaking
          ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 3, repeat: Infinity }
        }
      />

      {/* Rotating ring when speaking */}
      {speaking && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px ${colorGlow}`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Static ring when idle */}
      {!speaking && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid ${color}`,
            opacity: idle ? 0.2 : 0.5,
          }}
        />
      )}

      {/* Avatar body */}
      <motion.div
        className="relative flex items-center justify-center rounded-full font-heading font-bold"
        style={{
          width: s.inner,
          height: s.inner,
          background: `radial-gradient(135deg, ${colorDim} 0%, rgba(22,22,28,0.9) 100%)`,
          border: `1px solid ${color}`,
          fontSize: s.fontSize,
          color: color,
          boxShadow: speaking
            ? `0 0 30px ${colorGlow}, inset 0 0 20px ${colorDim}`
            : `0 0 10px ${colorDim}`,
        }}
        animate={speaking
          ? { scale: [1, 1.08, 1] }
          : { scale: 1 }
        }
        transition={speaking
          ? { duration: 1, repeat: Infinity, ease: 'easeInOut' }
          : {}
        }
      >
        {agent.avatar}
      </motion.div>

      {/* Speaking indicator dots */}
      {speaking && (
        <div className="absolute -bottom-2 flex gap-0.5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: color }}
              animate={{ scaleY: [1, 2.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
