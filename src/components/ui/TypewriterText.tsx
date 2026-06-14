'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TypewriterTextProps {
  text: string
  speed?: number // ms per character
  onComplete?: () => void
  className?: string
  showCursor?: boolean
  startDelay?: number
}

export default function TypewriterText({
  text,
  speed = 18,
  onComplete,
  className,
  showCursor = true,
  startDelay = 0,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    const startTimer = setTimeout(() => {
      timerRef.current = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayed(prev => prev + text[indexRef.current])
          indexRef.current++
        } else {
          if (timerRef.current) clearInterval(timerRef.current)
          setDone(true)
          onComplete?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [text, speed, startDelay, onComplete])

  return (
    <span className={cn('', className)}>
      {displayed}
      {showCursor && !done && (
        <motion.span
          className="text-primary font-bold"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  )
}
