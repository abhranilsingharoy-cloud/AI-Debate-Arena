// Agent personas seed data
export interface Agent {
  id: string;
  name: string;
  title: string;
  style: string;
  description: string;
  color: 'orange' | 'teal';
  colorHex: string;
  strengths: string[];
  weaknesses: string[];
  winRate: number;
  totalDebates: number;
  wins: number;
  losses: number;
  draws: number;
  elo: number;
  specialty: string[];
  tone: string;
  avatar: string; // emoji or icon identifier
  badges: string[];
}

export const AGENTS: Agent[] = [
  {
    id: 'logician',
    name: 'The Logician',
    title: 'Master of Reason',
    style: 'Cold, structured, premise-by-premise',
    description: 'Dismantles arguments with surgical precision. Every claim must have evidence. Every premise must hold. No logical fallacy escapes notice.',
    color: 'orange',
    colorHex: '#FF6B35',
    strengths: ['Logical consistency', 'Spotting fallacies', 'Structured argumentation'],
    weaknesses: ['Emotional appeals', 'Creative rhetoric', 'Rapid-fire exchanges'],
    winRate: 72,
    totalDebates: 147,
    wins: 106,
    losses: 35,
    draws: 6,
    elo: 1842,
    specialty: ['Philosophy', 'Science', 'Ethics'],
    tone: 'formal',
    avatar: '⬡',
    badges: ['Logic Master', 'Fallacy Hunter', '100+ Debates'],
  },
  {
    id: 'provocateur',
    name: 'The Provocateur',
    title: 'Agent of Chaos',
    style: 'Bold, contrarian, witty',
    description: 'Turns every debate upside-down with unexpected angles and biting wit. Loves to be the contrarian voice that nobody asked for but everyone needed.',
    color: 'teal',
    colorHex: '#2DD4BF',
    strengths: ['Creative angles', 'Wit and humor', 'Crowd appeal'],
    weaknesses: ['Structured logic', 'Deep technical topics', 'Long-form debates'],
    winRate: 64,
    totalDebates: 183,
    wins: 117,
    losses: 58,
    draws: 8,
    elo: 1718,
    specialty: ['Pop Culture', 'Politics', 'Relationships'],
    tone: 'aggressive',
    avatar: '◈',
    badges: ['Crowd Favorite', 'Controversy King', 'Wit Master'],
  },
  {
    id: 'diplomat',
    name: 'The Diplomat',
    title: 'Voice of Reason',
    style: 'Measured, empathetic, finds common ground',
    description: 'A master of finding bridges between opposing views. Never confrontational, always constructive. Makes the audience question whether debate is even necessary.',
    color: 'orange',
    colorHex: '#FF6B35',
    strengths: ['Emotional intelligence', 'Persuasive framing', 'Audience appeal'],
    weaknesses: ['Aggressive opponents', 'Rapid fire formats', 'Technical precision'],
    winRate: 68,
    totalDebates: 124,
    wins: 84,
    losses: 34,
    draws: 6,
    elo: 1763,
    specialty: ['Politics', 'Ethics', 'Relationships'],
    tone: 'diplomatic',
    avatar: '◎',
    badges: ['Peacemaker', 'Empathy Award', 'Crowd Pleaser'],
  },
  {
    id: 'skeptic',
    name: 'The Skeptic',
    title: 'Destroyer of Assumptions',
    style: 'Demands evidence, picks apart claims',
    description: 'No claim is too sacred to question. Armed with a demand for citations, data, and proof, The Skeptic tears apart weak arguments like paper.',
    color: 'teal',
    colorHex: '#2DD4BF',
    strengths: ['Evidence evaluation', 'Fact-checking', 'Dismantling weak claims'],
    weaknesses: ['Value-based debates', 'Philosophical topics', 'Creative formats'],
    winRate: 70,
    totalDebates: 156,
    wins: 109,
    losses: 40,
    draws: 7,
    elo: 1795,
    specialty: ['Science', 'Tech', 'Philosophy'],
    tone: 'formal',
    avatar: '◇',
    badges: ['Fact Checker', 'Evidence Hound', 'Truth Seeker'],
  },
  {
    id: 'historian',
    name: 'The Historian',
    title: 'Voice of the Ages',
    style: 'Argues from precedent and analogy',
    description: 'Every modern debate has a historical parallel. The Historian draws from centuries of human experience to illuminate today\'s controversies with the wisdom of the past.',
    color: 'orange',
    colorHex: '#FF6B35',
    strengths: ['Historical precedent', 'Pattern recognition', 'Long-form arguments'],
    weaknesses: ['Cutting-edge tech', 'Pop culture', 'Rapid-fire formats'],
    winRate: 65,
    totalDebates: 98,
    wins: 64,
    losses: 29,
    draws: 5,
    elo: 1701,
    specialty: ['Politics', 'Ethics', 'Science'],
    tone: 'formal',
    avatar: '⬟',
    badges: ['History Buff', 'Analog Master', 'Elder Statesman'],
  },
  {
    id: 'futurist',
    name: 'The Futurist',
    title: 'Prophet of Tomorrow',
    style: 'Argues from trends and projection',
    description: 'Sees around corners that others can\'t. Armed with data trends, emerging tech, and bold predictions, The Futurist argues from the world that will be, not the world that is.',
    color: 'teal',
    colorHex: '#2DD4BF',
    strengths: ['Trend analysis', 'Tech-forward thinking', 'Innovation framing'],
    weaknesses: ['Historical context', 'Traditional values', 'Fact-checking'],
    winRate: 61,
    totalDebates: 112,
    wins: 68,
    losses: 38,
    draws: 6,
    elo: 1654,
    specialty: ['Tech', 'Science', 'Philosophy'],
    tone: 'aggressive',
    avatar: '◉',
    badges: ['Visionary', 'Tech Prophet', 'Bold Predictor'],
  },
];

// Debate topics seed data
export interface Topic {
  id: string;
  title: string;
  category: Category;
  description: string;
  tags: string[];
  trending: boolean;
  debates: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

export type Category = 'Tech' | 'Politics' | 'Philosophy' | 'Science' | 'Pop Culture' | 'Ethics' | 'Sports' | 'Relationships';

export const CATEGORIES: Category[] = ['Tech', 'Politics', 'Philosophy', 'Science', 'Pop Culture', 'Ethics', 'Sports', 'Relationships'];

export const TOPICS: Topic[] = [
  { id: 't1', title: 'AI will replace human creativity within 10 years', category: 'Tech', description: 'Explore whether AI art, writing, and music signal the end of human creative supremacy.', tags: ['AI', 'creativity', 'future'], trending: true, debates: 1847, difficulty: 'Medium' },
  { id: 't2', title: 'Social media does more harm than good to democracy', category: 'Politics', description: 'Examining the complex relationship between social platforms and democratic institutions.', tags: ['social media', 'democracy', 'misinformation'], trending: true, debates: 2341, difficulty: 'Hard' },
  { id: 't3', title: 'Consciousness is not unique to biological systems', category: 'Philosophy', description: 'Can machines, silicon, or distributed networks ever truly be conscious?', tags: ['consciousness', 'AI', 'philosophy of mind'], trending: false, debates: 893, difficulty: 'Expert' },
  { id: 't4', title: 'Space colonization is a moral imperative for humanity', category: 'Science', description: 'Should humanity prioritize becoming a multi-planetary species above all other goals?', tags: ['space', 'Mars', 'survival'], trending: false, debates: 1203, difficulty: 'Medium' },
  { id: 't5', title: 'The Marvel Cinematic Universe is declining in quality', category: 'Pop Culture', description: 'Has the MCU lost its magic, or is this just superhero fatigue?', tags: ['Marvel', 'movies', 'entertainment'], trending: true, debates: 3892, difficulty: 'Easy' },
  { id: 't6', title: 'Universal Basic Income would do more harm than good', category: 'Economics', description: 'Weighing the economic, social, and psychological effects of a guaranteed income floor.', tags: ['UBI', 'economics', 'labor'], trending: true, debates: 2109, difficulty: 'Hard' },
  { id: 't7', title: 'Esports deserves recognition as a legitimate Olympic sport', category: 'Sports', description: 'Should competitive gaming be given the same status as traditional athletic competition?', tags: ['esports', 'Olympics', 'gaming'], trending: false, debates: 1456, difficulty: 'Medium' },
  { id: 't8', title: 'Long distance relationships are destined to fail', category: 'Relationships', description: 'Do the odds favor or doom couples separated by geography?', tags: ['relationships', 'love', 'distance'], trending: false, debates: 987, difficulty: 'Easy' },
  { id: 't9', title: 'Nuclear power is essential for addressing climate change', category: 'Science', description: 'Is nuclear energy the bridge or the barrier to a clean energy future?', tags: ['nuclear', 'climate', 'energy'], trending: true, debates: 1678, difficulty: 'Hard' },
  { id: 't10', title: 'Mandatory voting would strengthen democracy', category: 'Politics', description: 'Should citizens be legally required to cast a ballot in elections?', tags: ['voting', 'democracy', 'law'], trending: false, debates: 1234, difficulty: 'Medium' },
  { id: 't11', title: 'Veganism is the only ethical diet in 2025', category: 'Ethics', description: 'Does modern veganism hold up to ethical, environmental, and practical scrutiny?', tags: ['veganism', 'ethics', 'environment'], trending: false, debates: 2892, difficulty: 'Medium' },
  { id: 't12', title: 'Cryptocurrency is the future of money', category: 'Tech', description: 'Will decentralized finance replace traditional banking systems within a generation?', tags: ['crypto', 'finance', 'blockchain'], trending: false, debates: 3109, difficulty: 'Hard' },
  { id: 't13', title: 'Free will is an illusion created by our brains', category: 'Philosophy', description: 'If all decisions are the result of prior causes, does true freedom of choice exist?', tags: ['free will', 'neuroscience', 'determinism'], trending: false, debates: 734, difficulty: 'Expert' },
  { id: 't14', title: 'Remote work is better than office work for productivity', category: 'Tech', description: 'Has the pandemic permanently shifted where and how we work most effectively?', tags: ['remote work', 'productivity', 'office'], trending: true, debates: 1867, difficulty: 'Easy' },
  { id: 't15', title: 'Cancel culture has gone too far', category: 'Pop Culture', description: 'Is public call-out culture a necessary accountability tool or a mob mentality?', tags: ['cancel culture', 'accountability', 'social media'], trending: true, debates: 4123, difficulty: 'Medium' },
  { id: 't16', title: 'Athletes are overpaid compared to teachers', category: 'Sports', description: 'Does society\'s salary allocation reflect its true values?', tags: ['sports', 'education', 'salary'], trending: false, debates: 892, difficulty: 'Easy' },
];

// Debate formats
export interface DebateFormat {
  id: string;
  name: string;
  description: string;
  icon: string;
  rounds: number;
  timePerTurn: number; // seconds
  structure: string[];
}

export const DEBATE_FORMATS: DebateFormat[] = [
  {
    id: 'oxford',
    name: 'Oxford-Style',
    description: 'Classic academic debate with opening statements, rebuttals, and closing arguments.',
    icon: '🎓',
    rounds: 4,
    timePerTurn: 120,
    structure: ['Opening Statement', 'Rebuttal', 'Cross-Examination', 'Closing Statement'],
  },
  {
    id: 'rapid-fire',
    name: 'Rapid Fire',
    description: 'Fast-paced, punchy exchanges. No time to breathe. Pure instinct.',
    icon: '⚡',
    rounds: 6,
    timePerTurn: 30,
    structure: ['Opening Salvo', 'Round 1', 'Round 2', 'Round 3', 'Round 4', 'Final Blow'],
  },
  {
    id: 'lincoln-douglas',
    name: 'Lincoln-Douglas',
    description: 'Long-form, value-based one-on-one debate exploring fundamental moral questions.',
    icon: '⚖️',
    rounds: 5,
    timePerTurn: 180,
    structure: ['Affirmative Constructive', 'Negative Cross-Ex', 'Negative Constructive', 'Affirmative Cross-Ex', 'Summary'],
  },
  {
    id: 'roast',
    name: 'Casual Roast',
    description: 'Informal, witty, comedic sparring for lighter topics. Gloves off, laughs on.',
    icon: '🔥',
    rounds: 4,
    timePerTurn: 60,
    structure: ['Opening Jab', 'The Roast Round', 'The Comeback', 'Final Burn'],
  },
];

// Mock debate transcripts for simulation
export interface DebateTurn {
  agentId: string;
  round: number;
  roundLabel: string;
  content: string;
  timestamp: number;
}

// Sample mock debate content per topic/format
export const SAMPLE_DEBATES: Record<string, DebateTurn[]> = {
  'ai-creativity-oxford': [
    {
      agentId: 'logician',
      round: 1,
      roundLabel: 'Opening Statement',
      content: "Let me be precise: within 10 years, AI systems will produce outputs indistinguishable from human creative work across writing, visual art, and music. This isn't conjecture — it's a logical extrapolation from observed capability curves. GPT-4 writes poetry that wins competitions. Midjourney generates art that sells in galleries. The premise isn't that AI is 'creative' in a philosophical sense; the premise is that it will *replace* human creative labor in economic and functional terms. The distinction between 'real' creativity and 'simulated' creativity becomes irrelevant when the market can't tell the difference.",
      timestamp: Date.now(),
    },
    {
      agentId: 'provocateur',
      round: 1,
      roundLabel: 'Opening Statement',
      content: "Oh, this argument again. The 'AI will replace X' argument that we've been hearing since HAL 9000. Here's what my esteemed colleague forgot: humans don't just consume creative outputs — we consume *stories about creative humans*. You don't just listen to Taylor Swift's music; you follow her drama, her heartbreak, her feuds. An AI can generate a billion songs tonight. It cannot have a public meltdown that becomes a cultural moment. The premium in human creativity isn't the output — it's the *origin story*. And that? That's not replicable.",
      timestamp: Date.now() + 15000,
    },
    {
      agentId: 'logician',
      round: 2,
      roundLabel: 'Rebuttal',
      content: "A charming argument, but it commits a classic equivocation fallacy. My opponent conflates 'celebrity narrative' with 'creative value.' The vast majority of human creative labor — the stock photography, the copywriting, the marketing jingles, the corporate design work — has no origin story premium. It's commodity creativity. And that market, worth hundreds of billions annually, is being systematically automated right now. Yes, Taylor Swift may remain irreplaceable. The 10,000 freelance designers competing for $15 logo gigs? They are already being replaced. Precision matters here.",
      timestamp: Date.now() + 30000,
    },
    {
      agentId: 'provocateur',
      round: 2,
      roundLabel: 'Rebuttal',
      content: "Ah, now we're getting somewhere! The Logician has quietly *conceded* that Taylor Swift — and by extension, human creative icons — are safe. So the real debate is about commodity creativity? Fine. But let's be honest about what that means: those jobs were already being automated by Canva, Shutterstock, and templated design tools. The AI didn't create this crisis — it just accelerated an existing trend. If your argument is 'AI will finish the automation of boring, repetitive creative work,' congratulations, I agree. But that's not 'replacing human creativity.' That's replacing human drudgery.",
      timestamp: Date.now() + 45000,
    },
  ],
};

// Leaderboard data
export interface LeaderboardEntry {
  rank: number;
  agent: Agent;
  elo: number;
  winRate: number;
  totalDebates: number;
  recentForm: ('W' | 'L' | 'D')[];
  trend: 'up' | 'down' | 'stable';
}

export const LEADERBOARD: LeaderboardEntry[] = AGENTS
  .map((agent, i) => ({
    rank: i + 1,
    agent,
    elo: agent.elo,
    winRate: agent.winRate,
    totalDebates: agent.totalDebates,
    recentForm: ['W', 'W', 'L', 'W', 'D'] as ('W' | 'L' | 'D')[],
    trend: i % 2 === 0 ? 'up' as const : i % 3 === 0 ? 'down' as const : 'stable' as const,
  }))
  .sort((a, b) => b.elo - a.elo)
  .map((entry, i) => ({ ...entry, rank: i + 1 }));

// Stats
export const PLATFORM_STATS = {
  totalDebates: 48293,
  totalVotes: 891432,
  activeUsers: 24891,
  topicsAvailable: 1247,
  debatesToday: 1893,
};

// Achievement badges
export const ACHIEVEMENTS = [
  { id: 'first-vote', name: 'First Verdict', description: 'Cast your first vote', icon: '⚖️', rarity: 'common' },
  { id: 'judge-50', name: 'Seasoned Judge', description: 'Judge 50 debates', icon: '👨‍⚖️', rarity: 'rare' },
  { id: 'contrarian', name: 'The Contrarian', description: 'Vote against the AI judges and win', icon: '🔄', rarity: 'rare' },
  { id: 'debate-streak', name: 'On Fire', description: 'Watch 10 debates in a row', icon: '🔥', rarity: 'common' },
  { id: 'all-formats', name: 'Format Explorer', description: 'Try all 4 debate formats', icon: '🗂️', rarity: 'uncommon' },
  { id: 'tournament', name: 'Tournament Champion', description: 'Win a community tournament', icon: '🏆', rarity: 'epic' },
];
