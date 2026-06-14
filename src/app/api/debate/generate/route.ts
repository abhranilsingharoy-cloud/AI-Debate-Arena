import { NextResponse } from 'next/server'

// Debate content generation using AI (mocked with rich content)
// In production, replace with actual LLM API calls

const DEBATE_RESPONSES: Record<string, string[]> = {
  logician: [
    "Let me establish the foundational premise clearly. The data indicates a statistically significant correlation that cannot be dismissed.",
    "My opponent's argument contains a clear non-sequitur. The conclusion simply does not follow from the stated premises.",
    "Consider the following syllogism: If A implies B, and B implies C, then by transitivity, A implies C. The evidence supports this chain entirely.",
    "I must point out the confirmation bias inherent in my opponent's selection of evidence. A complete analysis reveals a different picture.",
    "The logical structure here is impeccable: premise one stands, premise two stands, therefore the conclusion is inescapable.",
  ],
  provocateur: [
    "Oh, how delightfully predictable. Let me offer an angle that nobody in this arena has considered yet.",
    "My distinguished opponent just spent two minutes building an elaborate sandcastle. Fascinating. Allow me to bring the tide.",
    "Here's the thing nobody wants to say out loud: the conventional wisdom on this is completely backwards.",
    "I'll grant my opponent one thing — they argued that point with admirable confidence. Unfortunately, confidence isn't evidence.",
    "Plot twist: what if the question itself is wrong? What if we've all been arguing about the wrong variable this entire time?",
  ],
  diplomat: [
    "Both perspectives here have merit, and I think the truth lies in synthesis rather than opposition.",
    "What my opponent raises is important, and I want to honor that concern while also noting where we might find common ground.",
    "The most productive path forward isn't to declare one side victorious, but to extract the wisdom from each position.",
    "I hear the underlying concern in my opponent's argument — and it's a valid one. Here's how we can address it without sacrificing the other value.",
    "Rather than treating this as binary, consider how these two positions might actually complement each other in practice.",
  ],
  skeptic: [
    "Extraordinary claims require extraordinary evidence. Where is the peer-reviewed data supporting this assertion?",
    "I notice my opponent cited a single study. Let me point out that this study had a sample size of 47 and was funded by interested parties.",
    "What's the mechanism? Correlation has been presented, but causation has not been established. This is a fundamental error.",
    "I need sources. I need methodology. I need sample sizes and confidence intervals. What I've heard so far is anecdote dressed as analysis.",
    "Let's apply Occam's Razor here. The simpler explanation — requiring no extraordinary assumptions — is far more likely.",
  ],
  historian: [
    "This situation has a striking parallel in history. In 1873, society faced an almost identical dilemma, and the outcome was instructive.",
    "Those who ignore history are condemned to repeat it. The pattern we see today was documented extensively in the industrial revolution.",
    "Historical precedent is unambiguous here. Every time humanity has faced this crossroads, the consequences of the alternative path were severe.",
    "We must contextualize this within its proper historical moment. Decontextualized data is not history — it's mythology.",
    "The arc of history bends toward certain truths. And the evidence of centuries clearly supports one position over the other.",
  ],
  futurist: [
    "Current trends, extrapolated forward, paint a picture that makes this debate almost quaint in retrospect.",
    "By 2030, the technology landscape will have shifted so dramatically that today's conventional wisdom becomes obsolete.",
    "The exponential curves don't lie. We are at an inflection point, and the data projects toward an outcome my opponent hasn't accounted for.",
    "My opponent is arguing from the rearview mirror. The future isn't where we've been — it's where the vectors of change are pointing.",
    "Three converging technological trends make the conclusion here inevitable: AI capability growth, distributed infrastructure, and shifting user behavior.",
  ],
};

export async function POST(req: Request) {
  try {
    const { agentId, topic, round, roundLabel, previousTurns } = await req.json()

    // Simulate AI response generation with a delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const responses = DEBATE_RESPONSES[agentId] || DEBATE_RESPONSES.logician
    const baseResponse = responses[Math.floor(Math.random() * responses.length)]

    // Add topic-specific context
    const topicContext = topic ? ` As it relates to "${topic}" — ${baseResponse}` : baseResponse

    // Simulate streaming by returning segments
    const fullResponse = topicContext + " " + getContextualAddition(round, roundLabel)

    return NextResponse.json({
      content: fullResponse,
      agentId,
      round,
      roundLabel,
      timestamp: Date.now(),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate debate turn' }, { status: 500 })
  }
}

function getContextualAddition(round: number, label: string): string {
  const additions: Record<string, string[]> = {
    'Opening Statement': [
      "This is the foundation upon which my entire argument rests.",
      "I invite the audience to hold this framework in mind throughout our exchange.",
      "My case will be built upon three unassailable pillars of evidence.",
    ],
    'Rebuttal': [
      "My opponent's opening position crumbles under scrutiny.",
      "A careful listener will have noticed the critical omissions in that argument.",
      "Let me dismantle that point-by-point, because the devil is very much in the details.",
    ],
    'Closing Statement': [
      "In summary, the evidence has spoken clearly tonight.",
      "I rest my case on the strength of what we've established together in this arena.",
      "The conclusion is inescapable, and I trust the judges to see it clearly.",
    ],
  }

  const labelAdditions = additions[label] || additions['Opening Statement']
  return labelAdditions[Math.floor(Math.random() * labelAdditions.length)]
}
