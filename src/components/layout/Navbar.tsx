'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Trophy, BookOpen, Users, BarChart3, Archive, Sun, Moon, Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import ClayButton from '@/components/ui/ClayButton'

const NAV_LINKS = [
  { href: '/', label: 'Arena', icon: Flame },
  { href: '/topics', label: 'Topics', icon: BookOpen },
  { href: '/agents', label: 'Agents', icon: Users },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/archive', label: 'Archive', icon: Archive },
  { href: '/about', label: 'How It Works', icon: BarChart3 },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="relative w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FFC857)' }}
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Zap className="w-4 h-4 text-white" />
              <div className="absolute inset-0 rounded-xl shadow-glow-orange opacity-60" />
            </motion.div>
            <span className="font-heading font-bold text-lg tracking-tight">
              <span className="gradient-text-orange">AI</span>
              <span className="text-text-primary"> Debate</span>
              <span className="gradient-text-orange"> Arena</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <Link key={href} href={href}>
                  <motion.div
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200',
                      active
                        ? 'bg-primary/15 text-primary'
                        : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className={cn('w-3.5 h-3.5', active ? 'text-primary' : '')} />
                    {label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-xl bg-primary/10"
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={dark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <Link href="/create">
              <ClayButton size="sm" glow className="hidden sm:inline-flex">
                ⚡ Start Debate
              </ClayButton>
            </Link>

            {/* Mobile menu */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl glass flex items-center justify-center text-text-muted"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden glass border-t border-white/5"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href
                  return (
                    <Link key={href} href={href} onClick={() => setMobileOpen(false)}>
                      <div className={cn(
                        'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        active ? 'bg-primary/15 text-primary' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                      )}>
                        <Icon className="w-4 h-4" />
                        {label}
                      </div>
                    </Link>
                  )
                })}
                <Link href="/create" onClick={() => setMobileOpen(false)}>
                  <ClayButton size="md" glow className="w-full mt-2">
                    ⚡ Start Debate
                  </ClayButton>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
