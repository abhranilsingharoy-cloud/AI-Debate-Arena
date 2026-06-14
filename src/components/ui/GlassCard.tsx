'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'orange' | 'teal' | 'light'
  hover?: boolean
  glow?: boolean
  glowColor?: 'orange' | 'teal'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  animate?: boolean
}

const variants = {
  default: 'glass',
  orange: 'glass-orange',
  teal: 'glass-teal',
  light: 'glass-light',
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function GlassCard({
  variant = 'default',
  hover = false,
  glow = false,
  glowColor = 'orange',
  padding = 'md',
  animate = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  const glowClass = glow
    ? glowColor === 'orange' ? 'glow-orange' : 'glow-teal'
    : ''

  const Comp = animate ? motion.div : 'div'
  const animateProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
      }
    : {}

  return (
    <Comp
      className={cn(
        'rounded-3xl',
        variants[variant],
        paddings[padding],
        glow ? glowClass : '',
        hover ? 'hover:border-primary/30 transition-all duration-300 cursor-pointer hover:scale-[1.01]' : '',
        className
      )}
      {...animateProps}
      {...props}
    >
      {children}
    </Comp>
  )
}
