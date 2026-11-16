export const posts = [
  {
    id: 'career',
    category: 'Career update',
    text: 'I started my career building Android apps. Somewhere along the way, I moved into React Native, fell in love with backend engineering, and eventually began leading engineering teams. Eight years later, I’m still curious about what happens under the hood.',
    action: { label: 'More about my journey', href: '#/info' },
  },
  {
    id: 'leaderboard',
    category: 'Project update',
    text: 'One of my favorite engineering challenges was building a gamification engine for retail partners. Redis sorted sets for leaderboards, idempotent event processing for rewards, and a lot of interesting trade-offs around consistency and scale.',
    project: 'gamification',
    action: { label: 'Read the case study', href: '#/projects/gamification' },
  },
  {
    id: 'knowledge-assistant',
    category: 'Project update',
    text: 'I built a RAG chatbot to help users find answers in a support knowledge base. Connecting an LLM to the documents was the easy part. The work that mattered was finding the right context, handling weak matches, and keeping answers fast enough to be useful.',
    action: { label: 'Explore the knowledge assistant', href: '#/projects/rag-assistant' },
  },
  {
    id: 'leadership',
    category: 'Technical leadership',
    text: 'Engineering leadership, for me, is a mix of writing code, making architectural decisions with the team, helping teammates grow, and checking that what we build actually solves the problem.',
    action: { label: 'See my work experience', href: '#/info/onsitego-lead' },
  },
  {
    id: 'architecture',
    category: 'System design',
    text: 'Some of the most important decisions in system design happen before you draw a new box. A small system with clear failure modes gives you a good baseline for deciding when another service is worth it.',
    action: { label: 'Read my notes', href: '#/notes' },
  },
]
