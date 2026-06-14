'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, BarChart3, Clock, Award, Target } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import { ACHIEVEMENTS, PLATFORM_STATS } from '@/lib/data'
import { formatNumber } from '@/lib/utils'
import Link from 'next/link'

// Mock user profile data
const USER_PROFILE = {
  username: 'DebateMaster',
  avatar: '🧑',
  joined: 'January 2026',
  debatesJudged: 47,
  agreementWithAI: 72,
  favoriteCategory: 'Technology',
  longestStreak: 8,
  votesThisWeek: 12,
  badges: ['first-vote', 'debate-streak', 'all-formats'],
}

export default function ProfilePage() {
  const earnedAchievements = ACHIEVEMENTS.filter(a => USER_PROFILE.badges.includes(a.id))
  const lockedAchievements = ACHIEVEMENTS.filter(a => !USER_PROFILE.badges.includes(a.id))

  const rarityColors: Record<string, string> = {
    common: '#9A958E',
    uncommon: '#4ADE80',
    rare: '#2DD4BF',
    epic: '#FFC857',
    legendary: '#FF6B35',
  }

  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="badge-orange mb-3 inline-block">Your Arena Identity</span>
          <h1 className="text-4xl font-heading font-bold gradient-text-arena mb-2">Judge Profile</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <GlassCard padding="lg" variant="orange" className="text-center">
                <div className="text-6xl mb-3">{USER_PROFILE.avatar}</div>
                <h2 className="font-heading font-bold text-xl text-text-primary">{USER_PROFILE.username}</h2>
                <p className="text-text-muted text-sm">Member since {USER_PROFILE.joined}</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="glass rounded-xl p-3">
                    <div className="text-xl font-heading font-bold text-primary">{USER_PROFILE.debatesJudged}</div>
                    <div className="text-xs text-text-muted">Debates Judged</div>
                  </div>
                  <div className="glass rounded-xl p-3">
                    <div className="text-xl font-heading font-bold text-success">{USER_PROFILE.agreementWithAI}%</div>
                    <div className="text-xs text-text-muted">AI Agreement</div>
                  </div>
                </div>
                <p className="text-xs text-text-muted mt-3 italic">
                  You agreed with the AI judges {USER_PROFILE.agreementWithAI}% of the time
                </p>
              </GlassCard>
            </motion.div>

            <GlassCard padding="md">
              <h3 className="font-heading font-bold text-sm mb-3">Stats At a Glance</h3>
              <div className="space-y-3">
                {[
                  { label: 'Favorite Category', value: USER_PROFILE.favoriteCategory, icon: Target },
                  { label: 'Longest Streak', value: `${USER_PROFILE.longestStreak} debates`, icon: Trophy },
                  { label: 'Votes This Week', value: USER_PROFILE.votesThisWeek, icon: BarChart3 },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs text-text-muted">{label}</div>
                      <div className="text-sm font-semibold text-text-primary">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <Link href="/create">
              <ClayButton glow className="w-full" icon={<Star className="w-4 h-4" />}>
                Judge a New Debate
              </ClayButton>
            </Link>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <GlassCard padding="lg">
                <div className="flex items-center gap-2 mb-5">
                  <Award className="w-5 h-5 text-accent" />
                  <h2 className="font-heading font-bold text-xl">Achievements</h2>
                  <span className="ml-auto badge-orange">{earnedAchievements.length} / {ACHIEVEMENTS.length}</span>
                </div>

                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-success mb-3">Earned</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {earnedAchievements.map((a, i) => (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <GlassCard padding="sm" className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                            style={{ background: `${rarityColors[a.rarity]}20`, border: `1px solid ${rarityColors[a.rarity]}40` }}
                          >
                            {a.icon}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-text-primary">{a.name}</div>
                            <div className="text-xs text-text-muted">{a.description}</div>
                            <div className="text-xs font-semibold capitalize mt-0.5" style={{ color: rarityColors[a.rarity] }}>
                              {a.rarity}
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-text-muted mb-3">Locked</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lockedAchievements.map(a => (
                      <GlassCard key={a.id} padding="sm" className="flex items-center gap-3 opacity-50">
                        <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-xl flex-shrink-0 grayscale">
                          {a.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-text-muted">{a.name}</div>
                          <div className="text-xs text-text-muted">{a.description}</div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
