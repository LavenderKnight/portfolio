type DiagramStep = { label: string; detail: string }

export type Project = {
  id: string
  title: string
  category: string
  icon: 'trophy' | 'bot' | 'bell' | 'credit' | 'map' | 'chart' | 'code'
  summary: string
  context: string
  problem: string
  requirements: string
  architecture: DiagramStep[]
  stack: string[]
  contribution: string
  challenge: string
  tradeoff: string
  outcome: string
  lesson: string
  source?: string
}

export const projects: Project[] = [
  {
    id: 'gamification', title: 'Gamification & Leaderboard Engine', category: 'Backend engineering', icon: 'trophy',
    summary: 'Event-driven rewards and live rankings for a retail partner network.',
    context: 'Onsitego · Production project. The diagram shows a simplified logical flow.',
    problem: 'Give retail partners a reason to return and a clear view of how they rank, while letting operations configure challenges and rewards.',
    requirements: 'Support leaderboards and achievements, process repeated deliveries safely, and keep rank queries fast as participation grows.',
    architecture: [
      { label: 'Retail events', detail: 'A qualifying activity arrives with a stable event identifier and the information needed to evaluate the reward rule.' },
      { label: 'Reward rules', detail: 'Evaluate the rule and record the award by idempotency key. Reprocessing an event should preserve the original award.' },
      { label: 'Redis ranks', detail: 'Maintain a sorted set per leaderboard or season. Read top entries and individual rank from the same score index.' },
    ],
    stack: ['Python', 'Django', 'Redis sorted sets', 'REST APIs'],
    contribution: 'Architected and developed the gamification platform, including leaderboards, achievements, and configurable rewards.',
    challenge: 'Retries and overlapping rules can award points twice. Use stable deduplication keys and a durable reward record so the rank view can be reconciled.',
    tradeoff: 'A heavier messaging system could provide replay and stronger operational isolation. Its cost is another system to monitor and a more complex ordering and recovery model.',
    outcome: 'The résumé reports more than 80,000 retailers served and a 35% increase in retailer engagement.',
    lesson: 'Keep the reward ledger authoritative and treat the ranking index as a projection you can rebuild.',
  },
  {
    id: 'rag-assistant', title: 'RAG-based AI Knowledge Assistant', category: 'AI engineering', icon: 'bot',
    summary: 'A support chatbot grounded in a company knowledge base.',
    context: 'Onsitego · Production project. RAG and LLM integration are confirmed. The detailed pipeline illustrates possible design choices.',
    problem: 'Help visitors find specific support answers in a knowledge base without manually browsing every article.',
    requirements: 'Retrieve relevant context, handle incomplete evidence, and keep the answer experience responsive.',
    architecture: [
      { label: 'Prepare & index', detail: 'Parse support documents and chunk by section. Embed chunks with metadata and retain source references.' },
      { label: 'Retrieve & rank', detail: 'Query the index for candidates and optionally rerank a small batch. Apply a relevance threshold before building context.' },
      { label: 'Generate', detail: 'Send a bounded set of excerpts to the LLM. Return a grounded answer or a handoff when evidence is weak.' },
    ],
    stack: ['RAG', 'LLM integration', 'Embeddings (illustrative)', 'Reranking (illustrative)'],
    contribution: 'Designed and implemented the customer support chatbot and integrated the LLM with the organization’s knowledge base.',
    challenge: 'Similar support policies can produce plausible matches for the wrong product. Evaluate retrieval against realistic questions before tuning answer prompts.',
    tradeoff: 'Reranking may improve relevance while adding a request and compute cost. Context limits help control token cost and response latency.',
    outcome: 'Enabled context-aware customer self-service on the company website.',
    lesson: 'Measure retrieval quality and answer quality separately. A fluent answer can mask weak evidence.',
  },
  {
    id: 'notifications', title: 'Enterprise Notification Platform', category: 'Platform engineering', icon: 'bell',
    summary: 'Centralized, audience-targeted push notifications across multiple apps.',
    context: 'Onsitego · Production project. The diagram illustrates a provider-agnostic design.',
    problem: 'Give operations a consistent way to reach the right audience across mobile applications.',
    requirements: 'Target by audience and app, handle token churn, and track the results of asynchronous sends.',
    architecture: [
      { label: 'Campaign & rules', detail: 'Validate the template, target application, and audience criteria before scheduling delivery.' },
      { label: 'Delivery jobs', detail: 'Fan out sends in bounded batches, respecting per-provider rate limits and stable job identifiers.' },
      { label: 'Push providers', detail: 'Record failures by type. Retry transient errors and retire invalid device tokens.' },
    ],
    stack: ['Push notifications', 'Audience targeting', 'Asynchronous jobs (illustrative)'],
    contribution: 'Architected a centralized notification management platform with audience-targeted push delivery.',
    challenge: 'Large campaigns can overwhelm delivery workers. Set concurrency and rate limits per destination and expose backlog visibility.',
    tradeoff: 'Snapshotting the audience makes runs easier to audit. Computing membership at send time better reflects recent eligibility changes.',
    outcome: 'Centralized operational control for push notifications across multiple mobile apps.',
    lesson: 'Track provider acceptance and device delivery as distinct outcomes.',
  },
  {
    id: 'merchant-lending', title: 'Merchant Lending & Onboarding Platform', category: 'Workflow design', icon: 'credit',
    summary: 'A design study for onboarding merchants and coordinating lending decisions.',
    context: 'Illustrative case study · Employer implementation and outcomes are unconfirmed.',
    problem: 'Let merchants resume incomplete applications and give reviewers a consistent record of what has been checked.',
    requirements: 'Validate submissions, protect PII, record state transitions, and process duplicate callbacks safely.',
    architecture: [
      { label: 'Application', detail: 'Persist a draft and validate mandatory fields before allowing submission.' },
      { label: 'Review queue', detail: 'Route identity checks and document reviews through controlled state transitions with audit events.' },
      { label: 'Decision', detail: 'Record a decision and reconcile asynchronous integration callbacks by correlation ID.' },
    ],
    stack: ['REST APIs', 'Relational database', 'State machine', 'Audit log'],
    contribution: 'This study sketches an application state model, review workflow, and integration boundary.',
    challenge: 'External responses can arrive after a reviewer changes the application. Make updates conditional on current state and version.',
    tradeoff: 'Synchronous checks simplify simple screens. Background checks support longer processing and require explicit pending and recovery states.',
    outcome: 'The design defines a resumable flow with auditable decisions.',
    lesson: 'Model the application lifecycle before integrating external decision services.',
  },
  {
    id: 'workforce', title: 'Geo-Enabled Workforce & Visit Management', category: 'Backend & mobile', icon: 'map',
    summary: 'Field visit tracking, route visibility, and operational monitoring.',
    context: 'Onsitego · Production project. The diagram uses a simplified design for handling event ingestion.',
    problem: 'Give operations visibility into field visits and routes while field devices move between reliable and unreliable networks.',
    requirements: 'Capture visit events with time and position, surface route and visit status, and keep access scoped to the relevant workforce.',
    architecture: [
      { label: 'Mobile check-in', detail: 'Capture position and event time. Queue an event locally when the device lacks connectivity.' },
      { label: 'Visit API', detail: 'Validate actor and assignment, accept a stable event ID, and retain both reported and received timestamps.' },
      { label: 'Route view', detail: 'Read the latest valid visit state and route points for the authorized operations user.' },
    ],
    stack: ['Mobile applications', 'Geolocation', 'Operations monitoring', 'REST APIs (illustrative)'],
    contribution: 'Designed and delivered a field workforce management system with real-time visits and route visibility.',
    challenge: 'Late or imprecise location reports can change an apparent sequence. Keep raw observations distinct from derived visit state.',
    tradeoff: 'Frequent samples yield denser routes and increase battery use, data volume, and privacy exposure.',
    outcome: 'Enabled operational monitoring of field visits and routes.',
    lesson: 'Design the offline and late-event experience with the same care as the live map.',
  },
  {
    id: 'loss-ratio', title: 'Retail Loss Ratio Analytics Engine', category: 'Analytics design', icon: 'chart',
    summary: 'A design study for traceable cohort-level loss reporting.',
    context: 'Illustrative case study · Employer implementation and outcomes are unconfirmed.',
    problem: 'Produce a consistent view of recognized losses against earned revenue by period and cohort.',
    requirements: 'Define numerator and denominator, reconcile source totals, and handle restatements and empty denominators.',
    architecture: [
      { label: 'Source facts', detail: 'Ingest loss and earned revenue facts with product, period, and stable transaction identifiers.' },
      { label: 'Cohort rollup', detail: 'Aggregate numerator and denominator separately by cohort and reporting version.' },
      { label: 'Ratio report', detail: 'Divide totals at the requested grain and display an undefined value for a zero denominator.' },
    ],
    stack: ['SQL', 'Aggregation jobs', 'Materialized rollups'],
    contribution: 'This study sketches the metric contract, aggregation grain, and reconciliation boundary.',
    challenge: 'Late adjustments change earlier periods. Retain input lineage and surface the report’s effective date.',
    tradeoff: 'Precomputed rollups improve recurring reads. They require a recomputation strategy when business definitions or input facts change.',
    outcome: 'The design defines reproducible reports with drill-down to source totals.',
    lesson: 'Aggregate the numerator and denominator before dividing. Averaging row-level ratios can distort the result.',
  },
  {
    id: 'codecompass', title: 'CodeCompass AI', category: 'Personal project', icon: 'code',
    summary: 'A source-aware RAG tool for exploring unfamiliar codebases.',
    context: 'Personal project · Architecture summarized from the résumé.',
    problem: 'Help developers locate relevant code and ask questions about a repository with traceable answers.',
    requirements: 'Index ZIP files and public GitHub repositories, bound input size, and return file-, symbol-, and line-level evidence.',
    architecture: [
      { label: 'Ingest code', detail: 'Validate input paths and sizes, filter supported sources, and extract Python chunks using the AST.' },
      { label: 'Search Chroma', detail: 'Embed chunks, store source locations, and apply a relevance threshold to retrieved candidates.' },
      { label: 'Answer & cite', detail: 'Use an OpenAI or Gemini adapter to generate a grounded response with file and line references.' },
    ],
    stack: ['FastAPI', 'React', 'Chroma', 'Docker Compose', 'Gemini', 'OpenAI'],
    contribution: 'Built ingestion, semantic retrieval, provider adapters, and deterministic tests for input, retrieval, and provider failure paths.',
    challenge: 'Provider errors and weak retrieval need distinguishable handling so users know whether to retry, configure a provider, or rephrase their question.',
    tradeoff: 'AST-based chunking preserves Python symbol boundaries. Other languages need their own parser or a simpler fallback.',
    outcome: 'A containerized application with a linked source repository.',
    lesson: 'Preserve source references from ingestion onward so a user can verify an answer in context.',
    source: 'https://github.com/LavenderKnight/codecompass-ai/',
  },
]
