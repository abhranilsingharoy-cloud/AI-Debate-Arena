'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Zap } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import AgentAvatar from '@/components/ui/AgentAvatar'
import { Agent, TOPICS } from '@/lib/data'
import { getEloColor, getWinRateColor } from '@/lib/utils'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

export default function AgentProfileClient({ agent }: { agent: Agent }) {
  const barData = [
    { name: 'Wins', value: agent.wins, color: '#4ADE80' },
    { name: 'Losses', value: agent.losses, color: '#F87171' },
    { name: 'Draws', value: agent.draws, color: '#FFC857' },
  ]

  const relatedTopics = TOPICS.filter(t =>
    agent.specialty.some(s => t.category.toLowerCase().includes(s.toLowerCase()))
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/agents">
          <ClayButton variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} className="mb-6">
            Back to Roster
          </ClayButton>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main profile */}
          <div className="lg:col-span-2 space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard padding="lg" variant={agent.color === 'orange' ? 'orange' : 'teal'}>
                <div className="flex items-start gap-5">
                  <AgentAvatar agent={agent} size="xl" />
                  <div className="flex-1">
                    <h1 className="text-3xl font-heading font-bold text-text-primary">{agent.name}</h1>
                    <p className="text-sm font-semibold uppercase tracking-widest mt-1" style={{ color: agent.colorHex }}>
                      {agent.title}
                    </p>
                    <p className="text-text-muted mt-3 leading-relaxed">{agent.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {agent.badges.map(b => (
                        <span key={b} className="badge-orange">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard padding="lg">
                <h2 className="font-heading font-bold text-lg mb-4">Battle Record</h2>
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { label: 'ELO', value: agent.elo, color: getEloColor(agent.elo) },
                    { label: 'Win Rate', value: `${agent.winRate}%`, color: getWinRateColor(agent.winRate) },
                    { label: 'Total', value: agent.totalDebates, color: agent.colorHex },
                    { label: 'Wins', value: agent.wins, color: '#4ADE80' },
                  ].map(stat => (
                    <div key={stat.label} className="glass rounded-2xl p-3 text-center">
                      <div className="text-xl font-heading font-bold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-xs text-text-muted">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" tick={{ fill: '#9A958E', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ background: '#16161C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {barData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            {/* Strengths & Weaknesses */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <GlassCard padding="lg">
                <h2 className="font-heading font-bold text-lg mb-4">Combat Analysis</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-semibold text-success mb-3">Strengths</div>
                    <ul className="space-y-2">
                      {agent.strengths.map(s => (
                        <li key={s} className="flex items-start gap-2 text-sm text-text-muted">
                          <span className="text-success font-bold mt-0.5">+</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-danger mb-3">Weaknesses</div>
                    <ul className="space-y-2">
                      {agent.weaknesses.map(w => (
                        <li key={w} className="flex items-start gap-2 text-sm text-text-muted">
                          <span className="text-danger font-bold mt-0.5">−</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <GlassCard padding="md">
              <h3 className="font-heading font-bold text-sm mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Style</span>
                  <span className="text-text-primary text-right text-xs">{agent.style}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Tone</span>
                  <span className="text-text-primary capitalize">{agent.tone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Specialty</span>
                  <span className="text-text-primary text-xs text-right">{agent.specialty.join(', ')}</span>
                </div>
              </div>
            </GlassCard>

            {relatedTopics.length > 0 && (
              <GlassCard padding="md">
                <h3 className="font-heading font-bold text-sm mb-3">Best Topics</h3>
                <div className="space-y-2">
                  {relatedTopics.map(topic => (
                    <Link key={topic.id} href={`/create?topic=${topic.id}&agentA=${agent.id}`}>
                      <div className="p-2 glass rounded-xl hover:border-primary/30 transition-colors cursor-pointer">
                        <div className="text-xs font-medium text-text-primary line-clamp-2">{topic.title}</div>
                        <div className="text-xs text-text-muted mt-0.5">{topic.category}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </GlassCard>
            )}

            <Link href={`/create?agentA=${agent.id}`}>
              <ClayButton
                size="lg"
                variant={agent.color === 'orange' ? 'primary' : 'teal'}
                glow
                icon={<Zap className="w-5 h-5" />}
                className="w-full"
              >
                Challenge {agent.name}
              </ClayButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
