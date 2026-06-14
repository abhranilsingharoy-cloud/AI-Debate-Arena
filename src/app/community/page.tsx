'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageSquare, Share2, Flame, ThumbsUp, Star } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ClayButton from '@/components/ui/ClayButton'
import AgentAvatar from '@/components/ui/AgentAvatar'
import { AGENTS, TOPICS } from '@/lib/data'
import { formatNumber, randomInt } from '@/lib/utils'

const COMMUNITY_POSTS = Array.from({ length: 12 }, (_, i) => {
  const agentA = AGENTS[i % AGENTS.length]
  const agentB = AGENTS[(i + 2) % AGENTS.length]
  const topic = TOPICS[i % TOPICS.length]
  const winner = i % 2 === 0 ? agentA : agentB
  return {
    id: `post-${i}`,
    user: `@user_${1000 + i}`,
    avatar: ['🧑', '👩', '👨', '🧕', '👦', '👧'][i % 6],
    topic,
    agentA,
    agentB,
    winner,
    comment: [
      `${winner.name} absolutely destroyed that argument in round 3. Never seen such a clean rebuttal.`,
      `I actually disagreed with the AI judges here. ${winner.name === agentA.name ? agentB.name : agentA.name} made better points but ${winner.name} had better delivery.`,
      `The ${topic.category} category debates are always the most heated. Today was no exception 🔥`,
      `${agentA.name} vs ${agentB.name} is the GOAT matchup. Two completely different styles, incredibly entertaining.`,
      `Voted ${winner.name} all the way. The historical analogies were spot on.`,
    ][i % 5],
    likes: randomInt(12, 847),
    comments: randomInt(3, 67),
    timeAgo: `${i + 1}h ago`,
    reactions: { fire: randomInt(5, 120), heart: randomInt(2, 80) },
  }
})

function PostCard({ post, index }: { post: typeof COMMUNITY_POSTS[0]; index: number }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(l => liked ? l - 1 : l + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlassCard padding="md" className="group">
        {/* User + time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-sm">
              {post.avatar}
            </div>
            <span className="text-sm font-semibold text-text-primary">{post.user}</span>
          </div>
          <span className="text-xs text-text-muted">{post.timeAgo}</span>
        </div>

        {/* Debate result card */}
        <div className="glass-orange rounded-2xl p-3 mb-3">
          <div className="text-xs text-text-muted mb-2 line-clamp-1">{post.topic.title}</div>
          <div className="flex items-center gap-2">
            <AgentAvatar agent={post.agentA} size="sm" />
            <div className="flex-1 text-center">
              <span className="text-xs text-text-muted">vs</span>
            </div>
            <AgentAvatar agent={post.agentB} size="sm" />
          </div>
          <div className="mt-2 text-center text-xs">
            <span className="text-accent font-semibold">🏆 {post.winner.name} wins</span>
          </div>
        </div>

        {/* Comment */}
        <p className="text-sm text-text-primary leading-relaxed mb-4">
          "{post.comment}"
        </p>

        {/* Reactions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-sm transition-colors ${liked ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            <span>{formatNumber(likes)}</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-text-muted hover:text-agentB transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors ml-auto">
            <Flame className="w-4 h-4" />
            <span>{post.reactions.fire}</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="badge-teal mb-3 inline-block">The Crowd Speaks</span>
          <h1 className="text-5xl font-heading font-bold gradient-text-arena mb-4">Community Feed</h1>
          <p className="text-text-muted">Reactions, hot takes, and verdicts from the crowd.</p>
        </motion.div>

        <div className="flex gap-3 mb-8 justify-center flex-wrap">
          {['🔥 Hot', '🆕 New', '⭐ Top Rated', '🎯 Controversial'].map(tab => (
            <button key={tab} className="glass px-4 py-2 rounded-xl text-sm text-text-muted hover:text-primary hover:border-primary/30 transition-all">
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMMUNITY_POSTS.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
