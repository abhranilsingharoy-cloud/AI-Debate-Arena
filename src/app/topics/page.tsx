'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Shuffle, TrendingUp, Filter, ChevronRight, Flame, Clock, Star } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import { TOPICS, CATEGORIES, Topic, Category } from '@/lib/data'
import { formatNumber, cn } from '@/lib/utils'

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: '#4ADE80',
  Medium: '#FFC857',
  Hard: '#FF9D5C',
  Expert: '#F87171',
}

function TopicCard({ topic, index }: { topic: Topic; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      layout
    >
      <Link href={`/create?topic=${topic.id}`}>
        <GlassCard padding="md" hover className="group h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex gap-2 flex-wrap">
              <span className="badge-orange text-xs">{topic.category}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: `${DIFFICULTY_COLORS[topic.difficulty]}20`,
                  color: DIFFICULTY_COLORS[topic.difficulty],
                  border: `1px solid ${DIFFICULTY_COLORS[topic.difficulty]}40`,
                }}
              >
                {topic.difficulty}
              </span>
              {topic.trending && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 font-semibold flex items-center gap-1">
                  <Flame className="w-2.5 h-2.5" /> Hot
                </span>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-primary font-bold text-sm">{formatNumber(topic.debates)}</div>
              <div className="text-text-muted text-xs">debates</div>
            </div>
          </div>

          <h3 className="font-heading font-bold text-text-primary group-hover:text-primary transition-colors leading-snug mb-2">
            {topic.title}
          </h3>
          <p className="text-text-muted text-sm line-clamp-2 mb-3">{topic.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1 flex-wrap">
              {topic.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs text-text-muted bg-white/5 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <span className="text-primary text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Debate this <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}

export default function TopicsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [sortBy, setSortBy] = useState<'trending' | 'debates' | 'newest'>('trending')

  const filtered = TOPICS
    .filter(t => {
      const matchesSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'trending') return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
      if (sortBy === 'debates') return b.debates - a.debates
      return 0
    })

  const randomTopic = () => {
    const random = TOPICS[Math.floor(Math.random() * TOPICS.length)]
    window.location.href = `/create?topic=${random.id}`
  }

  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="badge-orange mb-4 inline-block">Pick Your Battlefield</span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">
            <span className="gradient-text-arena">Browse Topics</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {TOPICS.length} debate topics across {CATEGORIES.length} categories. Something's bound to ignite the arena.
          </p>
        </motion.div>

        {/* Search + Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search topics, categories, tags…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-2xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 border border-white/5 bg-transparent transition-colors"
            />
          </div>
          <ClayButton
            variant="secondary"
            icon={<Shuffle className="w-4 h-4" />}
            onClick={randomTopic}
          >
            Surprise Me
          </ClayButton>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="glass rounded-2xl px-4 py-3 text-sm text-text-primary border border-white/5 bg-transparent focus:outline-none focus:border-primary/50 cursor-pointer"
          >
            <option value="trending" className="bg-bg-panel">🔥 Trending</option>
            <option value="debates" className="bg-bg-panel">📊 Most Debated</option>
            <option value="newest" className="bg-bg-panel">🆕 Newest</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {(['All', ...CATEGORIES] as const).map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat as any)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                activeCategory === cat
                  ? 'bg-primary text-white shadow-glow-orange'
                  : 'glass text-text-muted hover:text-text-primary hover:border-primary/30'
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-text-muted text-sm">{filtered.length} topics</span>
          {search && <span className="text-xs text-primary">matching "{search}"</span>}
        </div>

        {/* Topic Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((topic, i) => (
                <TopicCard key={topic.id} topic={topic} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-heading font-bold text-xl mb-2">No topics found</h3>
              <p className="text-text-muted">Try a different search term or category</p>
              <ClayButton variant="ghost" className="mt-4" onClick={() => { setSearch(''); setActiveCategory('All') }}>
                Clear filters
              </ClayButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
