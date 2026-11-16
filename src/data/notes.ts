export const notes = [
  {
    id: 'idempotency',
    title: 'Why Idempotency Matters in Distributed Systems',
    topic: 'Distributed systems', time: '2 min read',
    summary: 'What happens when a request succeeds and the client never gets the response?',
    sections: [
      { heading: 'A timeout leaves the outcome unknown', body: 'Imagine an event awards points and the consumer times out before acknowledging it. The broker redelivers the event. If the handler increments the score again, a normal recovery path becomes a business error.' },
      { heading: 'Deduplicate where the effect happens', body: 'Choose an idempotency key that represents the operation, such as an event ID and reward rule. Enforce uniqueness in the database and record the key in the same transaction as the reward. A separate “have I seen this?” check can race with another worker.' },
      { heading: 'Plan for replay', body: 'Document which results repeat requests should receive and how long keys are retained. Downstream projections need their own replay story. For ranks, a projection can reconcile against a durable ledger after interrupted updates.' },
    ],
  },
  {
    id: 'redis-leaderboards',
    title: 'Redis Sorted Sets: Building a Real-Time Leaderboard',
    topic: 'Redis', time: '2 min read',
    summary: 'Keep scores and rank queries in the same data structure.',
    sections: [
      { heading: 'Model one set per season', body: 'A sorted set maps a member to a numeric score. Use a stable participant ID as the member and a season or competition as the key. ZREVRANK gives the zero-based rank from the top, and ZRANGE with REV returns the leading entries.' },
      { heading: 'Specify ties up front', body: 'Equal scores use lexicographic member order. If the product requires shared rank or earliest attainment, define that rule explicitly and choose a representation that preserves it.' },
      { heading: 'Make the index recoverable', body: 'Generate the rankings from a durable source of rewards. When reprocessing is possible, projecting an authoritative total with ZADD avoids applying an increment twice. Version updates or reconcile periodically so older totals cannot silently win.' },
    ],
  },
  {
    id: 'rag-pipeline',
    title: 'How a RAG Pipeline Actually Works',
    topic: 'AI engineering', time: '2 min read',
    summary: 'Follow a document from ingestion to a cited answer.',
    sections: [
      { heading: 'Prepare the knowledge base', body: 'Parse documents, break them into useful units, and embed each chunk. Keep metadata such as title, source, revision, and section so the answer can link to the evidence.' },
      { heading: 'Retrieve a small set of useful passages', body: 'Retrieve candidates from the index and optionally rerank them. Test realistic queries, including ones the knowledge base cannot answer. Context windows, extra retrieval calls, and reranking each have latency and cost implications.' },
      { heading: 'Generate with evidence', body: 'Ask the model to answer from the selected excerpts and cite them. Track retrieval failures separately from generation failures and give users an explicit handoff for weak evidence.' },
    ],
  },
  {
    id: 'database-scaling',
    title: 'Database Sharding vs Partitioning vs Replication',
    topic: 'Databases', time: '2 min read',
    summary: 'Choose based on the bottleneck you actually have.',
    sections: [
      { heading: 'Partition to limit the data a query touches', body: 'A partitioned table divides rows by a key such as time. Queries that constrain that key can prune partitions. Time partitions can also simplify expiration. A poorly chosen key leaves most queries scanning across partitions.' },
      { heading: 'Shard to spread ownership', body: 'Sharding distributes subsets of data across independent database nodes. Tenant IDs can make routing predictable, but cross-tenant queries, hot tenants, and rebalancing take extra work.' },
      { heading: 'Replicate for availability or reads', body: 'Replication copies data. Read replicas can absorb read traffic and introduce lag. Decide which paths need to see their own writes and route those to a sufficiently current copy.' },
    ],
  },
  {
    id: 'mobile-to-backend',
    title: 'What I Learned Moving from Mobile Development to Backend Engineering',
    topic: 'Engineering career', time: '2 min read',
    summary: 'The habits from mobile that I still use when building backend systems.',
    sections: [
      { heading: 'Think like the client', body: 'Mobile development taught me to expect slow networks, retries, and releases that take time to reach users. I still check whether an API change will work with older clients and whether a failed request can be retried safely.' },
      { heading: 'Make the system observable', body: 'A UI shows where a user is stuck. Backend work needs explicit signals for that. Request timing, error categories, and correlation IDs help the team connect a problem report to what happened.' },
      { heading: 'Own the workflow through production', body: 'I like reviewing the client contract, data model, and operational path together. That usually catches more problems than reviewing each layer in isolation.' },
    ],
  },
]
