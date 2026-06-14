'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Flame, Trophy, ChevronRight, TrendingUp, Zap, Users, BarChart3, Play, Star, ArrowRight } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import AgentAvatar from '@/components/ui/AgentAvatar'
import { AGENTS, TOPICS, PLATFORM_STATS } from '@/lib/data'
import { formatNumber } from '@/lib/utils'

import dynamic from 'next/dynamic'

const ArenaScene = dynamic(() => import('@/components/3d/ArenaScene'), { ssr: false })
function StatTicker() {
  const [counts, setCounts] = useState({ debates: 0, votes: 0, users: 0, topics: 0 })

  useEffect(() => {
    const duration = 2000
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCounts({
        debates: Math.floor(ease * PLATFORM_STATS.totalDebates),
        votes: Math.floor(ease * PLATFORM_STATS.totalVotes),
        users: Math.floor(ease * PLATFORM_STATS.activeUsers),
        topics: Math.floor(ease * PLATFORM_STATS.topicsAvailable),
      })
      if (progress === 1) clearInterval(interval)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { label: 'Debates Run', value: formatNumber(counts.debates), icon: Flame, color: 'text-primary' },
    { label: 'Votes Cast', value: formatNumber(counts.votes), icon: BarChart3, color: 'text-accent' },
    { label: 'Active Users', value: formatNumber(counts.users), icon: Users, color: 'text-agentB' },
    { label: 'Topics', value: formatNumber(counts.topics), icon: TrendingUp, color: 'text-primary-light' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <GlassCard padding="md" className="text-center">
            <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
            <div className={`text-2xl font-heading font-bold ${color}`}>{value}</div>
            <div className="text-text-muted text-xs mt-1">{label}</div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Pick Your Topic', desc: 'Browse hundreds of debate topics or hit Surprise Me for a random one.', icon: '🎯', color: '#FF6B35' },
    { n: '02', title: 'Choose Your Fighters', desc: 'Select two AI personas from our roster, or let the system auto-match contrasting styles.', icon: '⚔️', color: '#FFC857' },
    { n: '03', title: 'Watch Them Clash', desc: 'The debate streams live, turn-by-turn, with a typewriter effect and glowing speaker indicators.', icon: '⚡', color: '#2DD4BF' },
    { n: '04', title: 'Cast Your Verdict', desc: 'Vote on logic, rhetoric, and evidence. See how you compare to our AI judge panel.', icon: '⚖️', color: '#FF6B35' },
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-orange mb-4 inline-block">The Process</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            How the <span className="gradient-text-orange">Arena</span> Works
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Four steps from spectator to judge. The whole process takes less than a minute to start.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard padding="lg" hover className="h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 font-heading font-bold text-5xl opacity-5 text-white">{step.n}</div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <div
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: step.color }}
                >
                  Step {step.n}
                </div>
                <h3 className="font-heading font-bold text-lg text-text-primary mb-2">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedAgents() {
  const featured = AGENTS.slice(0, 4)

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="badge-teal mb-3 inline-block">Meet the Fighters</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              <span className="gradient-text-arena">AI Debater</span> Roster
            </h2>
          </div>
          <Link href="/agents">
            <ClayButton variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              View All
            </ClayButton>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Link href={`/agents/${agent.id}`}>
                <GlassCard
                  padding="md"
                  hover
                  className="text-center group"
                  variant={agent.color === 'orange' ? 'orange' : 'teal'}
                >
                  <div className="flex justify-center mb-3">
                    <AgentAvatar agent={agent} size="md" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-text-primary">{agent.name}</h3>
                  <p className="text-text-muted text-xs mt-1">{agent.title}</p>
                  <div className="mt-3 flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 text-accent" fill="currentColor" />
                    <span className="text-xs text-accent font-semibold">{agent.elo} ELO</span>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrendingTopics() {
  const trending = TOPICS.filter(t => t.trending).slice(0, 4)

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="badge-orange mb-3 inline-block">🔥 Hot Right Now</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Trending <span className="gradient-text-orange">Debates</span>
            </h2>
          </div>
          <Link href="/topics">
            <ClayButton variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Browse All
            </ClayButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trending.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/create?topic=${topic.id}`}>
                <GlassCard padding="md" hover className="group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="badge-orange text-xs mb-2 inline-block">{topic.category}</span>
                      <h3 className="font-heading font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-text-muted text-sm mt-1 line-clamp-2">{topic.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-primary font-bold text-lg">{formatNumber(topic.debates)}</div>
                      <div className="text-text-muted text-xs">debates</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    {topic.tags.map(tag => (
                      <span key={tag} className="text-xs text-text-muted bg-white/5 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -100])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const [isClient, setIsClient] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => { 
    setIsClient(true) 
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-arena-hero">
        {/* 3D Scene */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {isClient && !reducedMotion && (
            <Suspense fallback={
              <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-agentB/10" />
            }>
              <ArenaScene />
            </Suspense>
          )}
          {(!isClient || reducedMotion) && (
            <div className="w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-agentB/10" />
              <div className="absolute inset-0 grid-bg opacity-30" />
            </div>
          )}
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-orange mb-6 inline-block text-sm tracking-widest">
              🔥 The Future of Debate is Here
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold leading-none mb-6"
          >
            <span className="gradient-text-arena">AI Debate</span>
            <br />
            <span className="text-text-primary">Arena</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Two AI titans enter. One leaves victorious.
            <span className="text-text-primary"> You are the judge.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/create">
              <ClayButton size="xl" glow icon={<Zap className="w-5 h-5" />}>
                Enter the Arena
              </ClayButton>
            </Link>
            <Link href="/topics">
              <ClayButton size="xl" variant="secondary" icon={<Play className="w-5 h-5" />}>
                Browse Topics
              </ClayButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats ticker */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <StatTicker />
        </div>
      </section>

      <div className="section-divider" />

      {/* How it works */}
      <HowItWorks />

      <div className="section-divider" />

      {/* Featured agents */}
      <FeaturedAgents />

      <div className="section-divider" />

      {/* Trending topics */}
      <TrendingTopics />

      {/* CTA */}
      <section className="py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Ready to <span className="gradient-text-orange">Judge?</span>
            </h2>
            <p className="text-text-muted text-xl mb-10">
              The arena awaits. Thousands of debates have already been decided.
              This one needs your verdict.
            </p>
            <Link href="/create">
              <ClayButton size="xl" glow icon={<ChevronRight className="w-6 h-6" />} iconPosition="right">
                Start Your First Debate
              </ClayButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
