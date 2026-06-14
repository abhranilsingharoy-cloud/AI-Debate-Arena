# AI Debate Arena 🔥

A production-ready, multi-page web platform where **two AI agents debate any topic in real time** and **you are the judge**.

## ✨ Features

- 🎯 **Topic Browser** — 16+ curated debate topics across 8 categories with search & filtering
- 🤖 **6 AI Personas** — The Logician, The Provocateur, The Diplomat, The Skeptic, The Historian, The Futurist
- 🎭 **4 Debate Formats** — Oxford-Style, Rapid Fire, Lincoln-Douglas, Casual Roast
- 🌊 **Live Streaming** — Typewriter-effect debate turns with glowing active speaker indicators
- ⚖️ **Voting System** — 4-category sliders (Logic, Persuasion, Rebuttal, Clarity) per debater
- 👨‍⚖️ **AI Judge Panel** — 3 specialized AI judges with scorecards and rationale
- 📊 **Recharts Visualization** — Radar and bar charts for score breakdowns
- 🏆 **ELO Leaderboard** — Rankings with win rates, form streaks, and trend indicators
- 🎉 **Winner Celebration** — Particle burst animation on winner reveal
- 🌐 **3D Hero Arena** — React Three Fiber scene with holographic podiums and energy beam
- 🌑 **Dark/Light Mode** — Warm orange palette adapts to both themes
- 📱 **Fully Responsive** — Mobile, tablet, desktop, large desktop

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/abhranilsingharoy-cloud/AI-Debate-Arena
cd AI-Debate-Arena
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
# LLM API (optional — mock responses work without this)
OPENAI_API_KEY=your_openai_key_here
# OR
GOOGLE_AI_API_KEY=your_gemini_key_here

# Database (optional — in-memory mocks work without this)
DATABASE_URL=postgresql://...

# Auth (optional)
NEXTAUTH_SECRET=your_secret
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🗺️ Site Map

| Route | Page |
|-------|------|
| `/` | Home / Landing |
| `/arena` | Debate Arena (core experience) |
| `/topics` | Browse Topics |
| `/create` | Create Custom Debate |
| `/agents` | Agent Roster |
| `/agents/[id]` | Agent Profile |
| `/leaderboard` | ELO Leaderboard |
| `/archive` | Debate Archive |
| `/community` | Community Feed |
| `/about` | How It Works |
| `/profile` | User Profile |

## 🤖 Adding New Agent Personas

Edit [`src/lib/data.ts`](src/lib/data.ts) and add an entry to the `AGENTS` array:

```typescript
{
  id: 'my-new-agent',
  name: 'The Contrarian',
  title: 'Professional Disagreer',
  style: 'Opposes any position regardless of merit',
  description: 'A full bio...',
  color: 'orange', // or 'teal'
  colorHex: '#FF6B35',
  strengths: ['Creative opposition', 'Shock value'],
  weaknesses: ['Consistency', 'Long debates'],
  winRate: 55,
  totalDebates: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  elo: 1500,
  specialty: ['Philosophy', 'Pop Culture'],
  tone: 'aggressive',
  avatar: '◈',
  badges: [],
}
```

## 📝 Adding New Topics

Edit the `TOPICS` array in [`src/lib/data.ts`](src/lib/data.ts):

```typescript
{
  id: 'my-topic',
  title: 'Your debate topic here',
  category: 'Tech', // See Category type
  description: 'Brief description...',
  tags: ['tag1', 'tag2'],
  trending: false,
  debates: 0,
  difficulty: 'Medium', // Easy | Medium | Hard | Expert
}
```

## 🔧 Integrating a Real LLM

Replace the mock in [`src/app/api/debate/generate/route.ts`](src/app/api/debate/generate/route.ts) with real LLM calls:

```typescript
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// In the POST handler:
const completion = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: `You are ${agentPersona.name}. ${agentPersona.description}` },
    { role: 'user', content: `Debate topic: "${topic}". Your turn: ${roundLabel}` },
  ],
  stream: true,
})
```

## 🎨 Design System

The project uses a custom Tailwind CSS configuration with the **Orange Arena** design tokens:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#FF6B35` | Brand orange |
| `--color-agent-a` | `#FF6B35` | Debater A color |
| `--color-agent-b` | `#2DD4BF` | Debater B color |
| `--color-accent` | `#FFC857` | Highlights, badges |
| `--color-bg-dark` | `#0B0B0F` | Dark background |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **3D**: React Three Fiber + @react-three/drei + Three.js
- **Animations**: Framer Motion + custom CSS keyframes
- **Charts**: Recharts (radar + bar)
- **Styling**: Tailwind CSS with custom tokens
- **Icons**: Lucide React
- **State**: React hooks + Zustand (ready)
- **Hosting**: Vercel

## 📄 License

MIT — free to use, modify, and deploy.
