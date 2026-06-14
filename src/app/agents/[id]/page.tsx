import { AGENTS } from '@/lib/data'
import AgentProfileClient from './AgentProfileClient'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return AGENTS.map(agent => ({ id: agent.id }))
}

export default function AgentProfilePage({ params }: { params: { id: string } }) {
  const agent = AGENTS.find(a => a.id === params.id)
  if (!agent) notFound()
  return <AgentProfileClient agent={agent} />
}
