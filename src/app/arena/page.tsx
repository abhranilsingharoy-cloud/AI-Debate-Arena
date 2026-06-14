'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, Volume2, VolumeX, Trophy, BarChart3, ChevronDown, ChevronUp, Check, Loader2, Award } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import AgentAvatar from '@/components/ui/AgentAvatar'
import TypewriterText from '@/components/ui/TypewriterText'
import ParticleBurst from '@/components/ui/Particles'
import { AGENTS, TOPICS, DEBATE_FORMATS, Agent, DebateFormat } from '@/lib/data'
import { cn, randomInt } from '@/lib/utils'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts'

type DebatePhase = 'setup' | 'debating' | 'voting' | 'results'

interface Turn {
  agentId: string
  round: number
  roundLabel: string
  content: string
  timestamp: number
}

interface VoteScores {
  logic: number
  persuasion: number
  rebuttal: number
  clarity: number
}

interface JudgeScore {
  judgeId: string
  judgeName: string
  icon: string
  agentAScore: number
  agentBScore: number
  rationale: string
  winner: 'A' | 'B' | 'draw'
}

const JUDGES = [
  { id: 'logician', name: 'The Logician', icon: '⬡', specialty: 'Logic & Structure' },
  { id: 'empiricist', name: 'The Empiricist', icon: '◇', specialty: 'Evidence & Facts' },
  { id: 'rhetorician', name: 'The Rhetorician', icon: '◎', specialty: 'Persuasion & Delivery' },
]

const JUDGE_RATIONALES_A = [
  "Agent A demonstrated superior logical consistency throughout, with minimal fallacies detected.",
  "Agent A's evidence-based approach and citation of concrete data clearly outperformed.",
  "Agent A's rhetorical command and persuasive delivery resonated strongly with the core audience.",
]

const JUDGE_RATIONALES_B = [
  "Agent B's structured argumentation and systematic rebuttal strategy proved more effective.",
  "Agent B's empirical grounding and factual precision gave their arguments greater credibility.",
  "Agent B's innovative framing and unexpected angles generated superior persuasive impact.",
]

function VoteSlider({ label, value, onChange, color }: {
  label: string
  value: number
  onChange: (v: number) => void
  color: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-text-muted font-medium">{label}</span>
        <span className="text-sm font-heading font-bold" style={{ color }}>{value}/10</span>
      </div>
      <div className="relative">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
          style={{ width: `${value * 10}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
        <input
          type="range"
          min={0}
          max={10}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="vote-slider w-full relative"
          aria-label={label}
        />
      </div>
    </div>
  )
}

function JudgeScorecard({ judge, scores, idx }: { judge: typeof JUDGES[0], scores: JudgeScore | null, idx: number }) {
  if (!scores) {
    return (
      <GlassCard padding="md" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-xl flex-shrink-0">
          {judge.icon}
        </div>
        <div>
          <div className="font-heading font-bold text-sm text-text-primary">{judge.name}</div>
          <div className="text-xs text-text-muted">{judge.specialty}</div>
        </div>
        <div className="ml-auto">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </div>
      </GlassCard>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.2 }}
    >
      <GlassCard padding="md" className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-xl flex-shrink-0">
            {judge.icon}
          </div>
          <div>
            <div className="font-heading font-bold text-sm text-text-primary">{judge.name}</div>
            <div className="text-xs text-text-muted">{judge.specialty}</div>
          </div>
          <div className="ml-auto text-xs font-semibold">
            {scores.winner === 'A'
              ? <span className="text-primary">→ Agent A</span>
              : scores.winner === 'B'
              ? <span className="text-agentB">→ Agent B</span>
              : <span className="text-accent">→ Draw</span>
            }
          </div>
        </div>
        <div className="flex gap-4 text-center">
          <div className="flex-1">
            <div className="text-lg font-heading font-bold text-primary">{scores.agentAScore}</div>
            <div className="text-xs text-text-muted">Agent A</div>
          </div>
          <div className="text-text-muted text-sm self-center">vs</div>
          <div className="flex-1">
            <div className="text-lg font-heading font-bold text-agentB">{scores.agentBScore}</div>
            <div className="text-xs text-text-muted">Agent B</div>
          </div>
        </div>
        <p className="text-xs text-text-muted italic leading-relaxed border-t border-white/5 pt-2">
          "{scores.rationale}"
        </p>
      </GlassCard>
    </motion.div>
  )
}

export default function ArenaPage() {
  const searchParams = useSearchParams()
  const topicId = searchParams?.get('topic')
  const agentAId = searchParams?.get('agentA')
  const agentBId = searchParams?.get('agentB')
  const formatId = searchParams?.get('format')

  const topic = TOPICS.find(t => t.id === topicId) || TOPICS[0]
  const agentA = AGENTS.find(a => a.id === agentAId) || AGENTS[0]
  const agentB = AGENTS.find(a => a.id === agentBId) || AGENTS[1]
  const format = DEBATE_FORMATS.find(f => f.id === formatId) || DEBATE_FORMATS[0]

  const [phase, setPhase] = useState<DebatePhase>('debating')
  const [turns, setTurns] = useState<Turn[]>([])
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0)
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)
  const [typewriterDone, setTypewriterDone] = useState(false)
  const [expandedTurns, setExpandedTurns] = useState<Set<number>>(new Set())
  const [showParticles, setShowParticles] = useState(false)
  const [winnerAgent, setWinnerAgent] = useState<Agent | null>(null)

  // Voting state
  const [userVoteA, setUserVoteA] = useState<VoteScores>({ logic: 7, persuasion: 6, rebuttal: 7, clarity: 8 })
  const [userVoteB, setUserVoteB] = useState<VoteScores>({ logic: 6, persuasion: 8, rebuttal: 5, clarity: 7 })
  const [voted, setVoted] = useState(false)
  const [judgeScores, setJudgeScores] = useState<(JudgeScore | null)[]>([null, null, null])

  const transcriptRef = useRef<HTMLDivElement>(null)

  const generateTurn = useCallback(async (round: number, agentId: string) => {
    setIsGenerating(true)
    setActiveSpeaker(agentId)

    try {
      const res = await fetch('/api/debate/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          topic: topic.title,
          round,
          roundLabel: format.structure[round] || `Round ${round + 1}`,
          previousTurns: turns,
        }),
      })
      const data = await res.json()

      setTurns(prev => [...prev, {
        agentId,
        round,
        roundLabel: format.structure[round] || `Round ${round + 1}`,
        content: data.content,
        timestamp: Date.now(),
      }])
    } catch (e) {
      // Fallback mock content
      setTurns(prev => [...prev, {
        agentId,
        round,
        roundLabel: format.structure[round] || `Round ${round + 1}`,
        content: `My position on "${topic.title}" is clear and well-reasoned. The evidence supports my stance unambiguously, and I challenge my opponent to refute these fundamental truths with equal rigor.`,
        timestamp: Date.now(),
      }])
    } finally {
      setIsGenerating(false)
    }
  }, [topic, format, turns])

  // Auto-advance debate
  useEffect(() => {
    if (!isPlaying || isGenerating || !typewriterDone) return
    if (phase !== 'debating') return

    const totalTurns = format.rounds * 2
    if (turns.length >= totalTurns) {
      setTimeout(() => setPhase('voting'), 1500)
      setActiveSpeaker(null)
      return
    }

    const delay = setTimeout(() => {
      const turnIdx = turns.length
      const round = Math.floor(turnIdx / 2)
      const agentId = turnIdx % 2 === 0 ? agentA.id : agentB.id
      setTypewriterDone(false)
      generateTurn(round, agentId)
    }, 1500)

    return () => clearTimeout(delay)
  }, [isPlaying, isGenerating, typewriterDone, turns, phase, format, agentA, agentB, generateTurn])

  // Start first turn
  useEffect(() => {
    if (turns.length === 0 && phase === 'debating') {
      setTypewriterDone(false)
      generateTurn(0, agentA.id)
    }
  }, [])

  // Scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [turns])

  const handleVoteSubmit = () => {
    setVoted(true)

    // Generate AI judge scores with delays
    JUDGES.forEach((judge, idx) => {
      setTimeout(() => {
        const aTotal = (userVoteA.logic + userVoteA.persuasion + userVoteA.rebuttal + userVoteA.clarity) / 4
        const bTotal = (userVoteB.logic + userVoteB.persuasion + userVoteB.rebuttal + userVoteB.clarity) / 4
        const jitter = randomInt(-15, 15)
        const aScore = Math.min(100, Math.max(40, Math.round(aTotal * 10 + jitter)))
        const bScore = Math.min(100, Math.max(40, Math.round(bTotal * 10 - jitter)))
        const winner = aScore > bScore ? 'A' : bScore > aScore ? 'B' : 'draw'

        setJudgeScores(prev => {
          const next = [...prev]
          next[idx] = {
            judgeId: judge.id,
            judgeName: judge.name,
            icon: judge.icon,
            agentAScore: aScore,
            agentBScore: bScore,
            rationale: winner === 'A' ? JUDGE_RATIONALES_A[idx] : JUDGE_RATIONALES_B[idx],
            winner,
          }
          return next
        })

        if (idx === JUDGES.length - 1) {
          setTimeout(() => {
            setPhase('results')
          }, 1000)
        }
      }, (idx + 1) * 1500)
    })
  }

  const handleRevealWinner = () => {
    const aScores = judgeScores.filter(Boolean).reduce((s, j) => s + (j?.agentAScore || 0), 0)
    const bScores = judgeScores.filter(Boolean).reduce((s, j) => s + (j?.agentBScore || 0), 0)
    const userA = (userVoteA.logic + userVoteA.persuasion + userVoteA.rebuttal + userVoteA.clarity) * 2.5
    const userB = (userVoteB.logic + userVoteB.persuasion + userVoteB.rebuttal + userVoteB.clarity) * 2.5
    const totalA = aScores + userA
    const totalB = bScores + userB
    setWinnerAgent(totalA >= totalB ? agentA : agentB)
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 3000)
  }

  const radarData = [
    { subject: 'Logic', A: userVoteA.logic * 10, B: userVoteB.logic * 10 },
    { subject: 'Persuasion', A: userVoteA.persuasion * 10, B: userVoteB.persuasion * 10 },
    { subject: 'Rebuttal', A: userVoteA.rebuttal * 10, B: userVoteB.rebuttal * 10 },
    { subject: 'Clarity', A: userVoteA.clarity * 10, B: userVoteB.clarity * 10 },
  ]

  return (
    <div className="min-h-screen bg-bg-dark">
      <ParticleBurst active={showParticles} />

      {/* Topic header */}
      <div className="glass border-b border-white/5 px-4 py-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <span className={`badge-orange text-xs`}>{topic.category} · {format.name}</span>
            <h1 className="font-heading font-bold text-text-primary mt-1 text-sm md:text-base line-clamp-1">
              {topic.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">
              Round {Math.min(Math.ceil(turns.length / 2), format.rounds)} / {format.rounds}
            </span>
            <div className="flex gap-1">
              {format.structure.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-1.5 rounded-full transition-all',
                    i < Math.ceil(turns.length / 2) ? 'bg-primary' : 'bg-white/10'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main debate area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Agent panels */}
            <div className="grid grid-cols-2 gap-4">
              {[agentA, agentB].map((agent, idx) => {
                const isActive = activeSpeaker === agent.id
                const colorClass = agent.color === 'orange' ? 'glass-orange neon-border-orange' : 'glass-teal neon-border-teal'
                return (
                  <motion.div
                    key={agent.id}
                    animate={isActive ? { scale: 1.01 } : { scale: 1 }}
                    className={cn('rounded-3xl p-4', colorClass, isActive ? (agent.color === 'orange' ? 'speaker-ring-orange' : 'speaker-ring-teal') : '')}
                  >
                    <div className="flex items-center gap-3">
                      <AgentAvatar agent={agent} size="sm" speaking={isActive} idle={!isActive} />
                      <div className="flex-1 min-w-0">
                        <div className="font-heading font-bold text-sm truncate">{agent.name}</div>
                        <div className="text-xs text-text-muted truncate">{agent.title}</div>
                      </div>
                      {isActive && (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2 h-2 rounded-full"
                          style={{ background: agent.colorHex }}
                        />
                      )}
                    </div>
                    <div className="mt-3 flex gap-3 text-center">
                      <div>
                        <div className="text-xs font-bold" style={{ color: agent.colorHex }}>{agent.elo}</div>
                        <div className="text-xs text-text-muted">ELO</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-success">{agent.winRate}%</div>
                        <div className="text-xs text-text-muted">Win Rate</div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Transcript */}
            <GlassCard padding="none" className="overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <span className="font-heading font-semibold text-sm">Live Transcript</span>
                <div className="flex items-center gap-2">
                  {isGenerating && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
                  <span className="text-xs text-text-muted">{turns.length} turns</span>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-text-muted hover:text-primary transition-colors"
                    aria-label={isPlaying ? 'Pause debate' : 'Resume debate'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div ref={transcriptRef} className="max-h-96 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {turns.map((turn, i) => {
                    const agent = turn.agentId === agentA.id ? agentA : agentB
                    const isLastTurn = i === turns.length - 1
                    const isExpanded = expandedTurns.has(i)

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          'flex gap-3',
                          turn.agentId === agentB.id ? 'flex-row-reverse' : ''
                        )}
                      >
                        <AgentAvatar agent={agent} size="sm" speaking={isLastTurn && isGenerating} />
                        <div className={cn(
                          'max-w-[80%] rounded-2xl p-3',
                          agent.color === 'orange' ? 'glass-orange' : 'glass-teal'
                        )}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold" style={{ color: agent.colorHex }}>
                              {agent.name}
                            </span>
                            <span className="text-xs text-text-muted">{turn.roundLabel}</span>
                          </div>
                          <p className="text-sm text-text-primary leading-relaxed">
                            {isLastTurn && !typewriterDone ? (
                              <TypewriterText
                                text={turn.content}
                                speed={15}
                                onComplete={() => setTypewriterDone(true)}
                              />
                            ) : (
                              turn.content
                            )}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>

                {isGenerating && turns.length === 0 && (
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    Preparing the arena…
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="glass w-8 h-8 rounded-xl flex items-center justify-center text-text-muted hover:text-primary transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      if (!isGenerating) {
                        const turnIdx = turns.length
                        const round = Math.floor(turnIdx / 2)
                        const agentId = turnIdx % 2 === 0 ? agentA.id : agentB.id
                        setTypewriterDone(false)
                        generateTurn(round, agentId)
                      }
                    }}
                    className="glass w-8 h-8 rounded-xl flex items-center justify-center text-text-muted hover:text-primary transition-colors"
                    aria-label="Skip to next turn"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
                {phase === 'debating' && turns.length >= format.rounds * 2 && (
                  <ClayButton size="sm" onClick={() => setPhase('voting')}>
                    Go to Vote →
                  </ClayButton>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Voting Panel */}
            {phase === 'debating' && (
              <GlassCard padding="md">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="font-heading font-semibold text-sm">Quick Vote</span>
                </div>
                <p className="text-text-muted text-xs mb-4">Rate each debater as the debate unfolds</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">{agentA.name}</h4>
                    <div className="space-y-2">
                      {(['logic', 'persuasion', 'rebuttal', 'clarity'] as const).map(k => (
                        <VoteSlider
                          key={k}
                          label={k.charAt(0).toUpperCase() + k.slice(1)}
                          value={userVoteA[k]}
                          onChange={v => setUserVoteA(prev => ({ ...prev, [k]: v }))}
                          color="#FF6B35"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="section-divider" />
                  <div>
                    <h4 className="text-xs font-semibold text-agentB mb-2 uppercase tracking-wider">{agentB.name}</h4>
                    <div className="space-y-2">
                      {(['logic', 'persuasion', 'rebuttal', 'clarity'] as const).map(k => (
                        <VoteSlider
                          key={k}
                          label={k.charAt(0).toUpperCase() + k.slice(1)}
                          value={userVoteB[k]}
                          onChange={v => setUserVoteB(prev => ({ ...prev, [k]: v }))}
                          color="#2DD4BF"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Voting Form */}
            {phase === 'voting' && !voted && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <GlassCard padding="md" variant="orange">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-4 h-4 text-accent" />
                    <span className="font-heading font-bold text-sm">Cast Your Verdict</span>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">{agentA.name}</h4>
                      <div className="space-y-2">
                        {(['logic', 'persuasion', 'rebuttal', 'clarity'] as const).map(k => (
                          <VoteSlider key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} value={userVoteA[k]} onChange={v => setUserVoteA(p => ({ ...p, [k]: v }))} color="#FF6B35" />
                        ))}
                      </div>
                    </div>
                    <div className="section-divider" />
                    <div>
                      <h4 className="text-xs font-semibold text-agentB mb-3 uppercase tracking-wider">{agentB.name}</h4>
                      <div className="space-y-2">
                        {(['logic', 'persuasion', 'rebuttal', 'clarity'] as const).map(k => (
                          <VoteSlider key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} value={userVoteB[k]} onChange={v => setUserVoteB(p => ({ ...p, [k]: v }))} color="#2DD4BF" />
                        ))}
                      </div>
                    </div>
                    <ClayButton onClick={handleVoteSubmit} className="w-full" glow icon={<Check className="w-4 h-4" />}>
                      Submit My Vote
                    </ClayButton>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Judge Scorecards */}
            {voted && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="font-heading font-semibold text-sm">AI Judge Panel</span>
                </div>
                {JUDGES.map((judge, i) => (
                  <JudgeScorecard key={judge.id} judge={judge} scores={judgeScores[i]} idx={i} />
                ))}
              </div>
            )}

            {/* Results */}
            {phase === 'results' && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <GlassCard padding="md" variant="orange" glow glowColor="orange">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{winnerAgent ? '🏆' : '⚡'}</div>
                    {!winnerAgent ? (
                      <ClayButton onClick={handleRevealWinner} glow className="w-full">
                        Reveal the Winner!
                      </ClayButton>
                    ) : (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                        <div className="text-xs text-text-muted mb-1 uppercase tracking-wider">Winner</div>
                        <div className="text-2xl font-heading font-bold gradient-text-orange">{winnerAgent.name}</div>
                        <div className="text-sm text-text-muted">{winnerAgent.title}</div>
                        <div className="mt-4">
                          <ResponsiveContainer width="100%" height={180}>
                            <RadarChart data={radarData}>
                              <PolarGrid stroke="rgba(255,255,255,0.1)" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9A958E', fontSize: 10 }} />
                              <Radar name={agentA.name} dataKey="A" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.2} />
                              <Radar name={agentB.name} dataKey="B" stroke="#2DD4BF" fill="#2DD4BF" fillOpacity={0.2} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
