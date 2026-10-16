import type { InterviewQuestion, InterviewType } from "../types/interview.ts";

export interface CompetencyDefinition {
  name: string;
  description: string;
  weight: number;
}

export const COMPETENCY_MAP: Record<string, CompetencyDefinition[]> = {
  "Frontend Engineer": [
    { name: "Component Architecture & State", description: "Design modular, maintainable UI systems and manage state cleanly", weight: 0.25 },
    { name: "Web Performance & Core Vitals", description: "Optimize rendering, asset loading, bundle size, and runtime efficiency", weight: 0.25 },
    { name: "Browser APIs & Asynchronous Flow", description: "Master DOM APIs, network requests, caching, and async resilience", weight: 0.2 },
    { name: "System Trade-offs & Code Quality", description: "Balance tech debt, testing, DX, and framework selection", weight: 0.15 },
    { name: "Collaboration & Communication", description: "Articulate architectural reasoning and resolve cross-functional friction", weight: 0.15 },
  ],
  "Backend Engineer": [
    { name: "API & Distributed Systems", description: "Architect resilient endpoints, microservices, and network protocols", weight: 0.25 },
    { name: "Database Design & Concurrency", description: "Optimize schema, indexing, transaction isolation, and query plans", weight: 0.25 },
    { name: "Caching & High Availability", description: "Implement caching tiers, rate limiters, and fault tolerance", weight: 0.2 },
    { name: "Reliability & Observability", description: "Design logging, telemetry, alerting, and incident recovery pipelines", weight: 0.15 },
    { name: "Engineering Leadership & Ownership", description: "Demonstrate post-mortem learning, code review rigor, and teamwork", weight: 0.15 },
  ],
  "Full-Stack Engineer": [
    { name: "End-to-End System Integration", description: "Coordinate client state, API contracts, and transactional backends", weight: 0.25 },
    { name: "Security & Authentication", description: "Implement secure session management, OAuth/JWT, CORS, and data sanitation", weight: 0.2 },
    { name: "Performance Across Tiers", description: "Diagnose bottlenecks across database, network, rendering, and caching", weight: 0.2 },
    { name: "Data Modeling & Architecture", description: "Design schemas and services that scale with evolving product requirements", weight: 0.2 },
    { name: "Product Delivery & Trade-offs", description: "Balance pragmatic business timelines with long-term codebase health", weight: 0.15 },
  ],
  "HR / Behavioral": [
    { name: "Ownership & Initiative", description: "Take proactive accountability for end-to-end outcomes beyond job description", weight: 0.25 },
    { name: "Conflict Resolution & Alignment", description: "Resolve differing technical or organizational viewpoints constructively", weight: 0.25 },
    { name: "Navigating Ambiguity", description: "Make structured decisions and deliver value when requirements are unclear", weight: 0.2 },
    { name: "Reflection & Growth Mindset", description: "Learn systematically from past mistakes, feedback, and technical regressions", weight: 0.15 },
    { name: "Communication Clarity", description: "Explain complex reasoning clearly, concisely, and with structured context (STAR)", weight: 0.15 },
  ],
};

export const QUESTION_BANK: Record<string, InterviewQuestion[]> = {
  "Frontend Engineer": [
    {
      id: "fe-arch-1",
      text: "How would you design a scalable state management architecture for a complex SaaS application with frequent real-time updates and collaborative editing?",
      competency: "Component Architecture & State",
      difficulty: "senior",
      timeBudgetSeconds: 180,
      rubricCriteria: [
        "Separation of local UI state vs global domain state",
        "Handling race conditions and optimistic updates",
        "Minimizing redundant component re-renders",
        "Clear trade-offs between Zustand, Redux Toolkit, or React Context",
      ],
      hint: "Consider discussing optimistic rollbacks and fine-grained subscriber selectors.",
    },
    {
      id: "fe-perf-1",
      text: "Walk me through how you diagnose and eliminate an interaction latency (INP) bottleneck where a user experiences noticeable freezing while filtering a large data table.",
      competency: "Web Performance & Core Vitals",
      difficulty: "mid",
      timeBudgetSeconds: 150,
      rubricCriteria: [
        "Using Chrome DevTools Performance Profiler and Flamegraphs",
        "Virtualization (windowing) for DOM nodes",
        "Debouncing, throttling, or React 19 useTransition / startTransition",
        "Web Workers or off-main-thread computation for data transformations",
      ],
      hint: "Think about main thread blocking tasks and DOM element recycling.",
    },
    {
      id: "fe-async-1",
      text: "How do you handle flaky third-party API dependencies on the frontend to ensure users never see an unhandled blank screen or unrecoverable crash?",
      competency: "Browser APIs & Asynchronous Flow",
      difficulty: "mid",
      timeBudgetSeconds: 150,
      rubricCriteria: [
        "React Error Boundaries with fallback UI",
        "Exponential backoff retry mechanisms with jitter",
        "Stale-while-revalidate caching and offline degradation",
        "User-friendly contextual recovery buttons",
      ],
      hint: "Highlight granular error boundaries versus page-level crashes.",
    },
    {
      id: "fe-behav-1",
      text: "Tell me about a situation where a product manager wanted to ship a feature quickly, but you knew the code would introduce severe accessibility or performance debt. How did you handle it?",
      competency: "Collaboration & Communication",
      difficulty: "mid",
      timeBudgetSeconds: 150,
      rubricCriteria: [
        "Empathy for business deadlines and commercial context",
        "Data-backed communication (e.g. impact metrics, lighthouse scores)",
        "Negotiating a phased rollout or fast-follow mitigation ticket",
        "Maintaining professional and collaborative team dynamics",
      ],
      hint: "Use the STAR method: Situation, Task, Action, and Measurable Result.",
    },
  ],
  "Backend Engineer": [
    {
      id: "be-arch-1",
      text: "How would you design an idempotent payment processing endpoint that guarantees a customer is never double-charged even under network timeouts and mobile retry loops?",
      competency: "API & Distributed Systems",
      difficulty: "senior",
      timeBudgetSeconds: 180,
      rubricCriteria: [
        "Client-generated Idempotency Keys stored with unique constraints",
        "Atomic database transactions or distributed locking (e.g. Redis Redlock)",
        "Handling in-progress vs completed state with cached response replay",
        "Webhook verification and reconciliation jobs",
      ],
      hint: "Focus on distributed race conditions and atomic lock lifecycles.",
    },
    {
      id: "be-db-1",
      text: "Explain how you would troubleshoot a sudden 10x spike in p99 database query response times in a PostgreSQL or MySQL production cluster.",
      competency: "Database Design & Concurrency",
      difficulty: "senior",
      timeBudgetSeconds: 180,
      rubricCriteria: [
        "Inspecting pg_stat_activity, slow query logs, and connection pool saturation",
        "Running EXPLAIN (ANALYZE, BUFFERS) to detect sequential scans or missing indexes",
        "Checking lock contention and deadlocks on frequently updated rows",
        "Read replica offloading or caching strategies",
      ],
      hint: "Distinguish CPU starvation, disk I/O bottlenecks, and lock waits.",
    },
    {
      id: "be-cache-1",
      text: "Compare cache-aside versus write-through caching patterns. How do you prevent cache stampedes (thundering herd problem) when a hot key expires?",
      competency: "Caching & High Availability",
      difficulty: "mid",
      timeBudgetSeconds: 150,
      rubricCriteria: [
        "Clear definition and architectural flow of each pattern",
        "Probabilistic early expiration (XFetch algorithm) or mutex locking",
        "Adding jitter to TTL values to avoid synchronized expiry",
        "Graceful degradation when the cache cluster fails",
      ],
      hint: "Explain how single-flight or distributed mutexes protect the primary database.",
    },
    {
      id: "be-lead-1",
      text: "Describe a production outage or significant bug you were responsible for or investigated. What was the root cause, how did you recover, and what systemic safeguards were implemented?",
      competency: "Reliability & Observability",
      difficulty: "senior",
      timeBudgetSeconds: 180,
      rubricCriteria: [
        "Honest ownership and blameless post-mortem approach",
        "Clear timeline from alert detection to root cause identification",
        "Immediate containment action versus permanent architectural fix",
        "Automated regression tests, CI checks, or canary deployments added",
      ],
      hint: "Focus on systemic prevention rather than blaming human error.",
    },
  ],
  "Full-Stack Engineer": [
    {
      id: "fs-int-1",
      text: "How do you architect end-to-end data validation and type safety between a TypeScript React frontend and a Node.js/PostgreSQL backend?",
      competency: "End-to-End System Integration",
      difficulty: "senior",
      timeBudgetSeconds: 180,
      rubricCriteria: [
        "Shared schema validation (e.g. Zod, Valibot, or tRPC)",
        "Strict boundary checks at the network layer",
        "Database migrations and ORM/query builder typing (Prisma, Drizzle, Kysely)",
        "Handling validation error formatting for accessible client feedback",
      ],
      hint: "Emphasize why client validation is for UX while server validation is for security.",
    },
    {
      id: "fs-sec-1",
      text: "How do you securely handle user authentication in a single-page or Next.js application to protect against both XSS and CSRF attacks?",
      competency: "Security & Authentication",
      difficulty: "mid",
      timeBudgetSeconds: 150,
      rubricCriteria: [
        "HttpOnly, Secure, SameSite cookies for sensitive session tokens",
        "Risks of localStorage for access tokens regarding XSS",
        "CSRF protection tokens for state-changing mutating requests",
        "Content Security Policy (CSP) headers and input sanitization",
      ],
      hint: "Discuss cookie storage versus browser memory token storage.",
    },
    {
      id: "fs-perf-1",
      text: "When building a dashboard displaying analytics from millions of records, what optimizations do you implement across both the client and the backend?",
      competency: "Performance Across Tiers",
      difficulty: "senior",
      timeBudgetSeconds: 180,
      rubricCriteria: [
        "Pre-aggregated materialized views or roll-up tables on the backend",
        "Cursor-based pagination or streaming response chunking",
        "Server-side caching (Redis) with TTL or webhook invalidation",
        "Client-side virtualization and incremental chart rendering",
      ],
      hint: "Break your answer into database tier, API tier, and client rendering tier.",
    },
  ],
  "HR / Behavioral": [
    {
      id: "hr-conflict-1",
      text: "Describe a time when you strongly disagreed with a technical decision made by your lead or teammates. How did you express your point of view and what was the outcome?",
      competency: "Conflict Resolution & Alignment",
      difficulty: "mid",
      timeBudgetSeconds: 150,
      rubricCriteria: [
        "Objective, respectful, and evidence-driven discourse",
        "Active listening to the other party's constraints and priorities",
        "Building a prototype or benchmark to evaluate both options",
        "Committing fully once a team decision was made (disagree and commit)",
      ],
      hint: "Show constructive disagreement followed by united team execution.",
    },
    {
      id: "hr-ambiguity-1",
      text: "Tell me about a project where the requirements were vague or constantly shifting. How did you define milestones, keep stakeholders aligned, and ensure timely delivery?",
      competency: "Navigating Ambiguity",
      difficulty: "mid",
      timeBudgetSeconds: 150,
      rubricCriteria: [
        "Proactive discovery and stakeholder interviews",
        "Breaking work into verifiable weekly deliverables (spikes/RFCs)",
        "Documenting assumptions explicitly and validating early",
        "Risk management and scope negotiation",
      ],
      hint: "Focus on how you turned ambiguity into structured action.",
    },
    {
      id: "hr-growth-1",
      text: "Give an example of critical feedback you received about your work or communication style. How did you react in the moment, and what specific steps did you take to improve?",
      competency: "Reflection & Growth Mindset",
      difficulty: "mid",
      timeBudgetSeconds: 150,
      rubricCriteria: [
        "Non-defensive reception and willingness to listen",
        "Self-reflection on the underlying root behavior",
        "Actionable habit change or skill acquisition",
        "Follow-up with the feedback provider to evaluate progress",
      ],
      hint: "Select a real piece of feedback and emphasize the continuous improvement cycle.",
    },
  ],
};

export function getQuestionsForConfig(
  role: string,
  interviewType: InterviewType,
  durationMinutes: number
): InterviewQuestion[] {
  // Determine question count based on duration (10 min -> 3 questions, 20 min -> 4 questions, 30 min -> 5 questions)
  const targetCount = durationMinutes <= 10 ? 3 : durationMinutes <= 20 ? 4 : 5;

  let pool: InterviewQuestion[] = [];

  if (interviewType === "HR / Behavioral") {
    pool = [...(QUESTION_BANK["HR / Behavioral"] || [])];
  } else if (interviewType === "Technical") {
    const roleKey = QUESTION_BANK[role] ? role : "Full-Stack Engineer";
    pool = [...(QUESTION_BANK[roleKey] || [])];
  } else {
    // Mixed
    const roleKey = QUESTION_BANK[role] ? role : "Full-Stack Engineer";
    const techPool = QUESTION_BANK[roleKey] || [];
    const behavPool = QUESTION_BANK["HR / Behavioral"] || [];
    pool = [...techPool.slice(0, 3), ...behavPool.slice(0, 2)];
  }

  // If role is custom or pool is smaller than target, add dynamically generated role questions
  if (pool.length < targetCount) {
    const generated = createCustomRoleQuestions(role, targetCount - pool.length);
    pool = [...pool, ...generated];
  }

  return pool.slice(0, targetCount);
}

export function createCustomRoleQuestions(role: string, count: number): InterviewQuestion[] {
  const templates = [
    {
      title: `Architectural principles in ${role}`,
      text: `When designing the core architecture for a high-priority system in ${role}, what foundational principles, modular patterns, and reliability trade-offs do you prioritize?`,
      competency: "System Trade-offs & Quality",
      criteria: ["Clear architectural patterns", "Discussion of scalability", "Testing and verification approach"],
    },
    {
      idSuffix: "deep-dive",
      title: `Challenging problem in ${role}`,
      text: `Can you walk through the most challenging technical or operational problem you encountered recently while working as a ${role}? What was your diagnosis and how did you resolve it?`,
      competency: "Problem-Solving & Depth",
      criteria: ["Systematic debugging/root-cause analysis", "Quantifiable results", "Lessons learned"],
    },
    {
      idSuffix: "collaboration",
      title: `Cross-functional ownership in ${role}`,
      text: `In your role as a ${role}, how do you ensure seamless collaboration with cross-functional partners when business constraints or technical blockers arise?`,
      competency: "Collaboration & Communication",
      criteria: ["Stakeholder communication", "Pragmatic compromise", "Clear ownership"],
    },
  ];

  return templates.slice(0, count).map((t, idx) => ({
    id: `custom-${idx + 1}`,
    text: t.text,
    competency: t.competency,
    difficulty: "mid",
    timeBudgetSeconds: 150,
    rubricCriteria: t.criteria,
    hint: "Structure your response with concrete examples from your past projects.",
  }));
}

export function generateFollowUpQuestion(
  parentQuestion: InterviewQuestion,
  candidateAnswer: string,
  followUpIndex: number
): InterviewQuestion {
  const answerLower = candidateAnswer.toLowerCase();

  let followUpText = "";
  let hint = "";

  if (followUpIndex === 1) {
    if (answerLower.includes("trade-off") || answerLower.includes("choice") || answerLower.includes("instead")) {
      followUpText = `You highlighted specific choices in your approach. What alternative solutions did you evaluate before settling on this, and what were the decisive trade-offs?`;
      hint = "Explain why you chose this path over another viable alternative.";
    } else if (answerLower.includes("team") || answerLower.includes("we ")) {
      followUpText = `You mentioned team execution. Could you zoom in on your specific personal ownership and key technical contributions to this solution?`;
      hint = "Focus on the decisions and implementations you personally drove.";
    } else {
      followUpText = `Interesting explanation. How did you verify the correctness and performance of this solution once deployed in production?`;
      hint = "Discuss testing, metrics, monitoring, or feedback loops you put in place.";
    }
  } else {
    // follow-up 2
    if (answerLower.includes("test") || answerLower.includes("metric") || answerLower.includes("monitor")) {
      followUpText = `If this system had to handle a 10x traffic spike or concurrent edge cases tomorrow, where would the first bottleneck appear, and how would you address it?`;
      hint = "Identify potential failure points under increased load.";
    } else {
      followUpText = `Looking back, if you were to re-architect this from scratch today with what you now know, what would you do differently?`;
      hint = "Reflect on hindsight, architectural maturity, and newer technologies.";
    }
  }

  return {
    id: `${parentQuestion.id}-fu-${followUpIndex}`,
    text: followUpText,
    competency: parentQuestion.competency,
    difficulty: parentQuestion.difficulty,
    timeBudgetSeconds: 120,
    rubricCriteria: [
      "Directly addresses the interviewer's follow-up prompt",
      "Demonstrates depth and personal accountability",
      "Connects theoretical choices to real-world outcomes",
    ],
    hint,
    isFollowUp: true,
    parentQuestionId: parentQuestion.id,
    followUpLevel: followUpIndex,
  };
}
