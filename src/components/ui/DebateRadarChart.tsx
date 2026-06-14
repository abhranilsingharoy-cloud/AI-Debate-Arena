'use client'

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'

interface RadarData {
  subject: string
  A: number
  B: number
}

interface Props {
  data: RadarData[]
  agentAName: string
  agentBName: string
}

export default function DebateRadarChart({ data, agentAName, agentBName }: Props) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9A958E', fontSize: 10 }} />
        <Radar name={agentAName} dataKey="A" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.2} />
        <Radar name={agentBName} dataKey="B" stroke="#2DD4BF" fill="#2DD4BF" fillOpacity={0.2} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
