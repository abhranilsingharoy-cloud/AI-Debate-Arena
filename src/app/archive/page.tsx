'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Trophy, Clock, Filter } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import AgentAvatar from '@/components/ui/AgentAvatar'
import { AGENTS, TOPICS, DEBATE_FORMATS } from '@/lib/data'
import { formatNumber, cn } from '@/lib/utils'

// Generate mock archive entries
const ARCHIVE = Array.from({ length: 24 }, (_, i) => {
  const agentA = AGENTS[i % AGENTS.length]
  const agentB = AGENTS[(i + 1) % AGENTS.length]
  const topic = TOPICS[i % TOPICS.length]
  const format = DEBATE_FORMATS[i % DEBATE_FORMATS.length]
  const aScore = Math.floor(Math.random() * 30) + 60
  const bScore = Math.floor(Math.random() * 30) + 60
  const winner = aScore >= bScore ? agentA : agentB
  const daysAgo = i + 1
  return {
    id: `debate-${i}`,
    topic,
    agentA,
    agentB,
    format,
    aScore,
    bScore,
    winner,
    votes: Math.floor(Math.random() * 500) + 50,
    daysAgo,
    date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }
})

export default function ArchivePage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const categories = ['All', ...new Set(TOPICS.map(t => t.category))]

  const filtered = ARCHIVE.filter(d => {
    const matchSearch = !search ||
      d.topic.title.toLowerCase().includes(search.toLowerCase()) ||
      d.agentA.name.toLowerCase().includes(search.toLowerCase()) ||
      d.agentB.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'All' || d.topic.category === categoryFilter
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="badge-orange mb-3 inline-block">History of the Arena</span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text-arena mb-4">Debate Archive</h1>
          <p className="text-text-muted text-lg">Every clash, every verdict, preserved for posterity.</p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search debates, topics, or agents…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-2xl text-sm text-text-primary placeholder:text-text-muted border border-white/5 bg-transparent focus:outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="glass rounded-2xl px-4 py-3 text-sm text-text-primary border border-white/5 bg-transparent focus:outline-none cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c} className="bg-bg-panel">{c}</option>
            ))}
          </select>
        </div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((debate, i) => (
            <motion.div
              key={debate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <GlassCard padding="md" hover className="group">
                {/* Topic */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="badge-orange text-xs mb-1 inline-block">{debate.topic.category} · {debate.format.name}</span>
                    <h3 className="font-heading font-semibold text-sm text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
                      {debate.topic.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {debate.date}
                  </div>
                </div>

                {/* Agents vs */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <AgentAvatar agent={debate.agentA} size="sm" />
                    <div>
                      <div className="text-xs font-semibold text-primary">{debate.agentA.name}</div>
                      <div className="text-xs font-bold text-text-primary">{debate.aScore}</div>
                    </div>
                  </div>
                  <div className="flex-1 text-center text-text-muted text-xs font-bold">VS</div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <AgentAvatar agent={debate.agentB} size="sm" />
                    <div className="text-right">
                      <div className="text-xs font-semibold text-agentB">{debate.agentB.name}</div>
                      <div className="text-xs font-bold text-text-primary">{debate.bScore}</div>
                    </div>
                  </div>
                </div>

                {/* Winner */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-accent" />
                    <span className="text-xs text-text-muted">Winner: </span>
                    <span className="text-xs font-bold" style={{ color: debate.winner.colorHex }}>{debate.winner.name}</span>
                  </div>
                  <span className="text-xs text-text-muted">{debate.votes} votes</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📜</div>
            <p className="text-text-muted">No debates found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
