'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Scale, Mic2, Brain, Zap, Shield } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import { DEBATE_FORMATS } from '@/lib/data'

export default function AboutPage() {
  const rubric = [
    { category: 'Logic & Evidence', weight: 30, icon: Brain, desc: 'Soundness of argumentation, use of evidence, avoidance of logical fallacies.' },
    { category: 'Persuasiveness', weight: 25, icon: Mic2, desc: 'Rhetorical skill, framing, emotional resonance, and effectiveness of delivery.' },
    { category: 'Rebuttal Strength', weight: 25, icon: Shield, desc: 'How effectively each agent responds to and dismantles opponent arguments.' },
    { category: 'Clarity & Structure', weight: 20, icon: BookOpen, desc: 'Organization, coherence, and ease of following the argument.' },
  ]

  const judges = [
    { name: 'The Logician', icon: '⧡', role: 'Logic & Fallacy Detection', desc: 'Scores based on argument validity, premise quality, and logical structure. Flags any fallacies detected.' },
    { name: 'The Empiricist', icon: '◇', role: 'Evidence & Fact Quality', desc: 'Evaluates evidence strength, citation quality, and factual accuracy of claims made.' },
    { name: 'The Rhetorician', icon: '◎', role: 'Persuasion & Delivery', desc: 'Assesses persuasive impact, tone appropriateness, and audience engagement.' },
  ]

  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="badge-orange mb-3 inline-block">The Rulebook</span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text-arena mb-4">How It Works</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about the arena: formats, judging, scoring, and methodology.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Formats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard padding="lg">
              <h2 id="formats" className="font-heading font-bold text-2xl mb-6 gradient-text-orange">Debate Formats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEBATE_FORMATS.map(format => (
                  <GlassCard key={format.id} padding="md" variant="orange">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{format.icon}</div>
                      <div>
                        <h3 className="font-heading font-bold text-text-primary">{format.name}</h3>
                        <p className="text-text-muted text-sm mt-1">{format.description}</p>
                        <div className="mt-2 text-xs text-text-muted">
                          {format.rounds} rounds · {format.timePerTurn}s per turn
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {format.structure.map(s => (
                            <span key={s} className="text-xs bg-white/5 rounded-full px-2 py-0.5 text-text-muted">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Rubric */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard padding="lg">
              <h2 id="rubric" className="font-heading font-bold text-2xl mb-6 gradient-text-arena">Judging Rubric</h2>
              <p className="text-text-muted mb-6">
                Every debate is scored on four weighted criteria by both human voters and AI judges. The final score is a weighted average.
              </p>
              <div className="space-y-4">
                {rubric.map((item, i) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 glass rounded-2xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-heading font-bold text-sm">{item.category}</h3>
                        <span className="text-xs font-bold text-primary">{item.weight}%</span>
                      </div>
                      <p className="text-text-muted text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* AI Judges */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <GlassCard padding="lg">
              <h2 className="font-heading font-bold text-2xl mb-6 gradient-text-arena">The AI Judge Panel</h2>
              <p className="text-text-muted mb-6">
                Three specialized AI judges evaluate every debate independently. Their combined score (weighted equally) contributes 50% of the final result alongside your vote.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {judges.map((judge, i) => (
                  <GlassCard key={judge.name} padding="md" variant="teal">
                    <div className="text-4xl mb-3">{judge.icon}</div>
                    <h3 className="font-heading font-bold text-text-primary">{judge.name}</h3>
                    <div className="text-xs text-agentB font-semibold mt-1 mb-2">{judge.role}</div>
                    <p className="text-text-muted text-sm">{judge.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* CTA */}
          <div className="text-center py-8">
            <h3 className="font-heading font-bold text-2xl mb-4">Ready to judge for yourself?</h3>
            <Link href="/create">
              <ClayButton size="xl" glow icon={<Zap className="w-5 h-5" />}>
                Start a Debate
              </ClayButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
