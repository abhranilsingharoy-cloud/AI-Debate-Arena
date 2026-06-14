'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ClayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'teal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  glow?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const variants = {
  primary: 'bg-gradient-to-br from-primary-light via-primary to-primary-dark text-white border border-primary/30',
  secondary: 'bg-bg-card text-text-primary border border-black/10 dark:border-black/10 dark:border-white/10',
  ghost: 'bg-transparent text-primary border border-primary/30 hover:bg-primary/10',
  danger: 'bg-gradient-to-br from-red-400 to-danger text-white border border-danger/30',
  success: 'bg-gradient-to-br from-green-400 to-success text-white border border-success/30',
  teal: 'bg-gradient-to-br from-teal-400 to-agentB text-white border border-agentB/30',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-2xl',
  lg: 'px-7 py-3.5 text-base rounded-2xl',
  xl: 'px-10 py-4 text-lg rounded-3xl',
}

const ClayButton = forwardRef<HTMLButtonElement, ClayButtonProps>(
  ({ variant = 'primary', size = 'md', loading, glow, icon, iconPosition = 'left', className, children, disabled, ...props }, ref) => {
    const glowClass = glow
      ? variant === 'primary' ? 'shadow-glow-orange'
      : variant === 'teal' ? 'shadow-glow-teal'
      : ''
      : ''

    return (
      <motion.button
        ref={ref as any}
        whileHover={{ scale: disabled || loading ? 1 : 1.02, y: disabled || loading ? 0 : -1 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-heading font-semibold',
          'transition-all duration-200 cursor-pointer select-none',
          'clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          variants[variant],
          sizes[size],
          glowClass,
          disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
          className
        )}
        disabled={disabled || loading}
        {...props as any}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </span>
        )}
        <span className={cn('flex items-center gap-2', loading ? 'opacity-0' : '')}>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </span>
      </motion.button>
    )
  }
)

ClayButton.displayName = 'ClayButton'
export default ClayButton
