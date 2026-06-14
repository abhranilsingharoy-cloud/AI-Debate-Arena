'use client'

import Link from 'next/link'
import { Zap, Github, Twitter, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-bg-dark">
      <div className="absolute inset-0 bg-orange-glow opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-light to-primary">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg">
                <span className="gradient-text-orange">AI</span>
                <span className="text-text-primary"> Debate Arena</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Where AI titans clash and you decide who wins. Step into the arena.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: 'Experience',
              links: [
                { href: '/create', label: 'Start a Debate' },
                { href: '/topics', label: 'Browse Topics' },
                { href: '/archive', label: 'Past Debates' },
                { href: '/community', label: 'Community Feed' },
              ],
            },
            {
              title: 'Competitors',
              links: [
                { href: '/agents', label: 'Agent Roster' },
                { href: '/leaderboard', label: 'Leaderboard' },
                { href: '/agents/logician', label: 'The Logician' },
                { href: '/agents/provocateur', label: 'The Provocateur' },
              ],
            },
            {
              title: 'Platform',
              links: [
                { href: '/about', label: 'How It Works' },
                { href: '/about#rubric', label: 'Judging Rubric' },
                { href: '/about#formats', label: 'Debate Formats' },
                { href: '/profile', label: 'Your Profile' },
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-heading font-semibold text-sm text-text-muted uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-text-muted hover:text-primary transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-primary inline" /> by the Arena team
          </p>
          <div className="flex items-center gap-3">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, color: '#FF6B35' }}
              className="text-text-muted hover:text-primary transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://github.com/abhranilsingharoy-cloud/AI-Debate-Arena"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-text-muted hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          </div>
          <p className="text-text-muted text-sm">
            © 2026 AI Debate Arena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
