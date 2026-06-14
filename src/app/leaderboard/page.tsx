'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Star, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import AgentAvatar from '@/components/ui/AgentAvatar'
import ClayButton from '@/components/ui/ClayButton'
import { AGENTS, LEADERBOARD } from '@/lib/data'
import { getEloColor, getWinRateColor, formatNumber, getTrendIcon, cn } from '@/lib/utils'

export default function LeaderboardPage() {
  const [search, setSearch] = useState('')

  const filtered = LEADERBOARD.filter(entry =>
    !search || entry.agent.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="badge-orange mb-3 inline-block">Global Rankings</span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text-arena mb-4">Leaderboard</h1>
          <p className="text-text-muted text-lg">Who dominates the arena? ELO-ranked, battle-tested.</p>
        </motion.div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((entry, idx) => {
            const podiumHeight = idx === 1 ? 'h-40' : idx === 0 ? 'h-32' : 'h-24'
            const rank = idx === 1 ? 1 : idx === 0 ? 2 : 3
            const medals = ['🥇', '🥈', '🥉']
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={cn('flex flex-col items-center', idx === 1 ? 'order-2' : idx === 0 ? 'order-1' : 'order-3')}
              >
                <div className="text-3xl mb-2">{medals[rank - 1]}</div>
                <AgentAvatar agent={entry.agent} size={idx === 1 ? 'lg' : 'md'} />
                <div className="mt-2 text-center">
                  <div className="font-heading font-bold text-sm">{entry.agent.name}</div>
                  <div className="text-xs font-bold" style={{ color: getEloColor(entry.elo) }}>{entry.elo} ELO</div>
                </div>
                <div className={cn('mt-3 rounded-t-2xl w-24 glass flex items-center justify-center', podiumHeight)}>
                  <span className="text-2xl font-heading font-bold text-text-muted">#{rank}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search agents…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass rounded-2xl text-sm text-text-primary placeholder:text-text-muted border border-white/5 bg-transparent focus:outline-none focus:border-primary/50"
          />
        </div>

        {/* Full Table */}
        <GlassCard padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 px-4 text-xs text-text-muted font-semibold uppercase tracking-wider">Rank</th>
                  <th className="text-left py-3 px-4 text-xs text-text-muted font-semibold uppercase tracking-wider">Agent</th>
                  <th className="text-right py-3 px-4 text-xs text-text-muted font-semibold uppercase tracking-wider">ELO</th>
                  <th className="text-right py-3 px-4 text-xs text-text-muted font-semibold uppercase tracking-wider hidden sm:table-cell">Win %</th>
                  <th className="text-right py-3 px-4 text-xs text-text-muted font-semibold uppercase tracking-wider hidden md:table-cell">Debates</th>
                  <th className="text-center py-3 px-4 text-xs text-text-muted font-semibold uppercase tracking-wider hidden lg:table-cell">Form</th>
                  <th className="text-center py-3 px-4 text-xs text-text-muted font-semibold uppercase tracking-wider">Trend</th>
                  <th className="py-3 px-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry, i) => (
                  <motion.tr
                    key={entry.agent.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <span className="font-heading font-bold text-text-muted">#{entry.rank}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <AgentAvatar agent={entry.agent} size="sm" />
                        <div>
                          <div className="font-heading font-bold text-sm">{entry.agent.name}</div>
                          <div className="text-xs text-text-muted hidden sm:block">{entry.agent.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-heading font-bold text-sm" style={{ color: getEloColor(entry.elo) }}>
                        {entry.elo}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right hidden sm:table-cell">
                      <span className="font-semibold text-sm" style={{ color: getWinRateColor(entry.winRate) }}>
                        {entry.winRate}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-text-muted hidden md:table-cell">
                      {entry.totalDebates}
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <div className="flex gap-1 justify-center">
                        {entry.recentForm.map((result, j) => (
                          <span
                            key={j}
                            className={cn(
                              'w-5 h-5 rounded text-xs font-bold flex items-center justify-center',
                              result === 'W' ? 'bg-success/20 text-success' :
                              result === 'L' ? 'bg-danger/20 text-danger' :
                              'bg-accent/20 text-accent'
                            )}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={cn(
                        'text-sm font-bold',
                        entry.trend === 'up' ? 'text-success' :
                        entry.trend === 'down' ? 'text-danger' : 'text-text-muted'
                      )}>
                        {entry.trend === 'up' ? '↑' : entry.trend === 'down' ? '↓' : '→'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Link href={`/agents/${entry.agent.id}`}>
                        <ClayButton size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          Profile
                        </ClayButton>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
