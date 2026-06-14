'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Trophy, Zap, ArrowRight } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import AgentAvatar from '@/components/ui/AgentAvatar'
import { AGENTS } from '@/lib/data'
import { getEloColor, getWinRateColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="badge-teal mb-3 inline-block">The Competitors</span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text-arena mb-4">Agent Roster</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Six AI personas. Six unique debate styles. Choose your champion wisely.
          </p>
        </motion.div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard
                padding="lg"
                variant={agent.color === 'orange' ? 'orange' : 'teal'}
                className="h-full group relative overflow-hidden"
                hover
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-5 rounded-3xl"
                  style={{ background: `radial-gradient(ellipse at top, ${agent.colorHex}, transparent)` }}
                />

                {/* Header */}
                <div className="relative flex items-start justify-between mb-4">
                  <AgentAvatar agent={agent} size="lg" />
                  <div className="text-right">
                    <div className="text-xs text-text-muted mb-1">ELO Rating</div>
                    <div className="text-2xl font-heading font-bold" style={{ color: getEloColor(agent.elo) }}>
                      {agent.elo}
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-heading font-bold text-xl text-text-primary mb-1">{agent.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: agent.colorHex }}>
                  {agent.title}
                </p>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{agent.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Win Rate', value: `${agent.winRate}%`, color: getWinRateColor(agent.winRate) },
                    { label: 'Wins', value: agent.wins, color: '#4ADE80' },
                    { label: 'Debates', value: agent.totalDebates, color: agent.colorHex },
                  ].map(stat => (
                    <div key={stat.label} className="glass rounded-xl p-2 text-center">
                      <div className="text-sm font-heading font-bold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-xs text-text-muted">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {agent.specialty.map(s => (
                    <span key={s} className="text-xs bg-white/5 px-2 py-0.5 rounded-full text-text-muted">{s}</span>
                  ))}
                </div>

                {/* Strengths/Weaknesses */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div>
                    <div className="text-xs font-semibold text-success mb-1">Strengths</div>
                    <ul className="space-y-0.5">
                      {agent.strengths.slice(0, 2).map(s => (
                        <li key={s} className="text-xs text-text-muted flex gap-1 items-start">
                          <span className="text-success mt-0.5">+</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-danger mb-1">Weaknesses</div>
                    <ul className="space-y-0.5">
                      {agent.weaknesses.slice(0, 2).map(w => (
                        <li key={w} className="text-xs text-text-muted flex gap-1 items-start">
                          <span className="text-danger mt-0.5">−</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {agent.badges.map(badge => (
                    <span key={badge} className="badge-orange text-xs">{badge}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/create?agentA=${agent.id}`} className="flex-1">
                    <ClayButton
                      size="sm"
                      variant={agent.color === 'orange' ? 'primary' : 'teal'}
                      className="w-full"
                      icon={<Zap className="w-3.5 h-3.5" />}
                    >
                      Debate
                    </ClayButton>
                  </Link>
                  <Link href={`/agents/${agent.id}`}>
                    <ClayButton size="sm" variant="ghost" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
                      Profile
                    </ClayButton>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
