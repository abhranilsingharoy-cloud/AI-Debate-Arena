# ⚔️ AI Debate Arena

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-R3F-purple?style=for-the-badge&logo=threedotjs" alt="Three.js" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-ff0055?style=for-the-badge&logo=framer" alt="Framer Motion" />
</div>

<br/>

> **Where AI Titans Clash. You are the Judge.**
> AI Debate Arena is an immersive, 3D, multi-page platform where users can configure, watch, and judge real-time turn-based debates between advanced AI personas.

---

## 🌟 Features

- **🎮 3D Real-Time Arena:** Built with React Three Fiber, featuring holographic podiums, dynamic lighting, energy beams, and floating particle physics.
- **⚡ Live AI Streaming:** Turn-by-turn debate generation simulating a real-time LLM typing effect (Typewriter text reveals).
- **🗣️ Advanced AI Personas:** Choose from distinct AI fighters, each with unique system prompts, ELO ratings, and debate styles (e.g., *The Logician*, *The Pragmatist*, *The Visionary*).
- **⚖️ Interactive Judging System:** Cast votes in real time using interactive sliders (Logic, Persuasion, Rebuttal, Clarity) and compare your verdict against a simulated panel of AI Judges.
- **📊 Real-Time Analytics:** Visualize debate outcomes and agent performance using Recharts-powered radar charts and form trackers.
- **🎨 Modern "Orange Arena" Aesthetics:** Premium dark mode UI, complete with glassmorphism, claymorphism, neon glows, and micro-animations via Framer Motion.
- **🌓 Dynamic Light/Dark Mode:** Full support for seamless theme switching.
- **📱 Fully Responsive:** Carefully crafted layouts that scale perfectly from desktop ultra-wide monitors down to mobile screens.

---

## 🏗️ Architecture & Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS (for advanced CSS variables and custom effects)
- **3D Engine:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Visualization:** [Recharts](https://recharts.org/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/AI-Debate-Arena.git
   cd AI-Debate-Arena
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Visit the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
.
├── src/
│   ├── app/                    # Next.js 14 App Router pages and layouts
│   │   ├── api/                # Mock API routes for debate streaming
│   │   ├── arena/              # The core debate engine page
│   │   ├── create/             # 4-step wizard to initialize a debate
│   │   ├── leaderboard/        # Global agent rankings
│   │   ├── topics/             # Debate topic browser
│   │   └── globals.css         # Core CSS tokens, glass/clay utilities
│   ├── components/             
│   │   ├── 3d/                 # React Three Fiber Canvas & Components
│   │   ├── layout/             # Navbar, Footer
│   │   └── ui/                 # Reusable UI (GlassCard, Buttons, Avatars)
│   ├── lib/
│   │   ├── data.ts             # Mock data (Agents, Topics, Stats)
│   │   └── utils.ts            # Utility functions (cn, number formatters)
```

---

## 🧠 How The Debate Engine Works

1. **Configuration (`/create`)**: The user selects a Topic, two opposing AI Agents, and a Debate Format (e.g., Oxford-style, Rapid Fire).
2. **Initialization (`/arena`)**: The UI loads the 3D scene and prepares the live transcript console.
3. **Turn Generation (`/api/debate/generate`)**: A mock API handles turn-by-turn generation based on the selected agents' personalities and the current round context.
4. **Judging**: After all rounds complete, the user is prompted to vote using 4 distinct criteria.
5. **Results**: An AI Judge panel processes the debate and user scores to declare a winner, visualizing the final decision on a responsive Radar chart.

---

## 🎨 Design System

The application relies heavily on a custom token-based design system called **Orange Arena**. 
- **Primary Colors:** Neon Orange (`#FF6B35`) & Teal (`#2DD4BF`).
- **Surface Materials:** Custom implementations of `glass` (blur + translucent borders) and `clay` (heavy drop shadows + inner highlights).
- **Typography:** `Space Grotesk` (Headings) + `Inter` (Body).

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <i>Built to push the boundaries of AI, Design, and 3D Web Experiences.</i>
</div>
