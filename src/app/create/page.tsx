'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Shuffle, Zap, Check } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import AgentAvatar from '@/components/ui/AgentAvatar'
import { AGENTS, TOPICS, DEBATE_FORMATS, Agent, Topic, DebateFormat } from '@/lib/data'
import { cn } from '@/lib/utils'

type Step = 'topic' | 'agents' | 'format' | 'launch'

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('topic')
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [selectedAgentA, setSelectedAgentA] = useState<Agent | null>(null)
  const [selectedAgentB, setSelectedAgentB] = useState<Agent | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<DebateFormat | null>(null)

  const steps: Step[] = ['topic', 'agents', 'format', 'launch']
  const stepIndex = steps.indexOf(step)

  const randomize = () => {
    setSelectedTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)])
    const shuffled = [...AGENTS].sort(() => Math.random() - 0.5)
    setSelectedAgentA(shuffled[0])
    setSelectedAgentB(shuffled[1])
    setSelectedFormat(DEBATE_FORMATS[Math.floor(Math.random() * DEBATE_FORMATS.length)])
    setStep('launch')
  }

  const launch = () => {
    if (!selectedTopic || !selectedAgentA || !selectedAgentB || !selectedFormat) return
    router.push(
      `/arena?topic=${selectedTopic.id}&agentA=${selectedAgentA.id}&agentB=${selectedAgentB.id}&format=${selectedFormat.id}`
    )
  }

  const canAdvance = () => {
    if (step === 'topic') return !!selectedTopic
    if (step === 'agents') return !!selectedAgentA && !!selectedAgentB
    if (step === 'format') return !!selectedFormat
    return true
  }

  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <span className="badge-orange mb-3 inline-block">Configure Your Debate</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold gradient-text-arena mb-2">Build the Battle</h1>
          <p className="text-text-muted">Four steps to arena glory. Or hit Surprise Me.</p>
        </motion.div>

        {/* Surprise Me */}
        <div className="text-center mb-8">
          <ClayButton variant="secondary" icon={<Shuffle className="w-4 h-4" />} onClick={randomize}>
            Surprise Me — Full Random Setup
          </ClayButton>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <motion.div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all cursor-pointer',
                  stepIndex > i ? 'bg-success text-white' :
                  s === step ? 'bg-primary text-white shadow-glow-orange' :
                  'glass text-text-muted'
                )}
                whileHover={{ scale: 1.1 }}
                onClick={() => stepIndex > i && setStep(s)}
              >
                {stepIndex > i ? <Check className="w-4 h-4" /> : i + 1}
              </motion.div>
              <span className={cn('text-sm font-medium capitalize hidden sm:block', s === step ? 'text-primary' : 'text-text-muted')}>
                {s}
              </span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-white/10 hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Topic */}
          {step === 'topic' && (
            <motion.div key="topic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-heading font-bold text-xl mb-4">Choose Your Battlefield</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                {TOPICS.map(topic => (
                  <button key={topic.id} onClick={() => setSelectedTopic(topic)} className="text-left">
                    <GlassCard
                      padding="md"
                      className={cn(
                        'transition-all duration-200 cursor-pointer',
                        selectedTopic?.id === topic.id
                          ? 'neon-border-orange bg-primary/10'
                          : 'hover:border-white/20'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="badge-orange text-xs mb-1 inline-block">{topic.category}</span>
                          <h3 className="font-semibold text-sm text-text-primary leading-snug">{topic.title}</h3>
                        </div>
                        {selectedTopic?.id === topic.id && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Agents */}
          {step === 'agents' && (
            <motion.div key="agents" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-heading font-bold text-xl mb-2">Pick Your Fighters</h2>
              <p className="text-text-muted text-sm mb-4">Select one for each side. They can't be the same.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Agent A */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm font-semibold text-primary">Debater A (Orange Corner)</span>
                  </div>
                  <div className="space-y-2">
                    {AGENTS.map(agent => (
                      <button
                        key={agent.id}
                        onClick={() => {
                          if (selectedAgentB?.id === agent.id) return
                          setSelectedAgentA(agent)
                        }}
                        disabled={selectedAgentB?.id === agent.id}
                        className="w-full text-left"
                      >
                        <GlassCard
                          padding="sm"
                          className={cn(
                            'transition-all cursor-pointer flex items-center gap-3',
                            selectedAgentA?.id === agent.id ? 'neon-border-orange bg-primary/10' : 'hover:border-white/20',
                            selectedAgentB?.id === agent.id ? 'opacity-30 cursor-not-allowed' : ''
                          )}
                        >
                          <AgentAvatar agent={agent} size="sm" />
                          <div>
                            <div className="font-semibold text-sm">{agent.name}</div>
                            <div className="text-xs text-text-muted">{agent.style}</div>
                          </div>
                          {selectedAgentA?.id === agent.id && (
                            <Check className="w-4 h-4 text-primary ml-auto" />
                          )}
                        </GlassCard>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Agent B */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-agentB" />
                    <span className="text-sm font-semibold text-agentB">Debater B (Teal Corner)</span>
                  </div>
                  <div className="space-y-2">
                    {AGENTS.map(agent => (
                      <button
                        key={agent.id}
                        onClick={() => {
                          if (selectedAgentA?.id === agent.id) return
                          setSelectedAgentB(agent)
                        }}
                        disabled={selectedAgentA?.id === agent.id}
                        className="w-full text-left"
                      >
                        <GlassCard
                          padding="sm"
                          className={cn(
                            'transition-all cursor-pointer flex items-center gap-3',
                            selectedAgentB?.id === agent.id ? 'neon-border-teal bg-agentB/10' : 'hover:border-white/20',
                            selectedAgentA?.id === agent.id ? 'opacity-30 cursor-not-allowed' : ''
                          )}
                        >
                          <AgentAvatar agent={agent} size="sm" />
                          <div>
                            <div className="font-semibold text-sm">{agent.name}</div>
                            <div className="text-xs text-text-muted">{agent.style}</div>
                          </div>
                          {selectedAgentB?.id === agent.id && (
                            <Check className="w-4 h-4 text-agentB ml-auto" />
                          )}
                        </GlassCard>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Format */}
          {step === 'format' && (
            <motion.div key="format" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-heading font-bold text-xl mb-4">Choose Your Format</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEBATE_FORMATS.map(format => (
                  <button key={format.id} onClick={() => setSelectedFormat(format)} className="text-left">
                    <GlassCard
                      padding="md"
                      className={cn(
                        'cursor-pointer transition-all h-full',
                        selectedFormat?.id === format.id ? 'neon-border-orange bg-primary/10' : 'hover:border-white/20'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{format.icon}</div>
                        <div>
                          <div className="font-heading font-bold text-text-primary flex items-center gap-2">
                            {format.name}
                            {selectedFormat?.id === format.id && <Check className="w-4 h-4 text-primary" />}
                          </div>
                          <p className="text-text-muted text-sm mt-1">{format.description}</p>
                          <div className="mt-2 flex gap-3 text-xs text-text-muted">
                            <span>{format.rounds} rounds</span>
                            <span>{format.timePerTurn}s/turn</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {format.structure.map(s => (
                              <span key={s} className="text-xs bg-white/5 rounded-full px-2 py-0.5 text-text-muted">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Launch */}
          {step === 'launch' && (
            <motion.div key="launch" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <GlassCard padding="lg" variant="orange" className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h2 className="font-heading font-bold text-2xl gradient-text-orange mb-6">Ready to Rumble?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                  <GlassCard padding="md">
                    <div className="text-xs text-text-muted mb-1">Topic</div>
                    <div className="font-semibold text-sm">{selectedTopic?.title || '—'}</div>
                  </GlassCard>
                  <GlassCard padding="md">
                    <div className="text-xs text-text-muted mb-1">Fighters</div>
                    <div className="text-sm">
                      <span className="text-primary font-semibold">{selectedAgentA?.name || '—'}</span>
                      <span className="text-text-muted"> vs </span>
                      <span className="text-agentB font-semibold">{selectedAgentB?.name || '—'}</span>
                    </div>
                  </GlassCard>
                  <GlassCard padding="md">
                    <div className="text-xs text-text-muted mb-1">Format</div>
                    <div className="font-semibold text-sm">{selectedFormat?.name || '—'}</div>
                  </GlassCard>
                </div>
                <ClayButton
                  size="xl"
                  glow
                  onClick={launch}
                  disabled={!selectedTopic || !selectedAgentA || !selectedAgentB || !selectedFormat}
                  icon={<Zap className="w-5 h-5" />}
                >
                  Enter the Arena
                </ClayButton>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <ClayButton
            variant="secondary"
            icon={<ChevronLeft className="w-4 h-4" />}
            onClick={() => setStep(steps[stepIndex - 1])}
            className={stepIndex === 0 ? 'invisible' : ''}
          >
            Back
          </ClayButton>
          {step !== 'launch' && (
            <ClayButton
              icon={<ChevronRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => setStep(steps[stepIndex + 1])}
              disabled={!canAdvance()}
              glow={canAdvance()}
            >
              {step === 'format' ? 'Review & Launch' : 'Next'}
            </ClayButton>
          )}
        </div>
      </div>
    </div>
  )
}
