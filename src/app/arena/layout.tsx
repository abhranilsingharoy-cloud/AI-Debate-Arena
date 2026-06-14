'use client'

import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

export default function ArenaLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bg-dark">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-text-muted">Preparing the arena…</p>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  )
}
