import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Debate Arena — Where AI Titans Clash',
  description:
    'Watch two AI agents debate any topic in real time. Pick a topic, choose your debaters, and cast your verdict as the ultimate judge. Powered by advanced AI personas.',
  keywords: ['AI debate', 'artificial intelligence', 'debate platform', 'AI personas', 'live debate'],
  openGraph: {
    title: 'AI Debate Arena',
    description: 'Watch two AI agents debate in real time. You are the judge.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#FF6B35',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-bg-dark text-text-primary`}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
