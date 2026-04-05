import type {
  Review,
  Agent,
  Workflow,
  AuditEvent,
  ChecklistItem,
  ChatMessage,
} from "./types";

// ── Reviews ───────────────────────────────────────────────────────────────────

export const MOCK_REVIEWS: Review[] = [
  {
    id: "REV-2401",
    title: "Auth Service — OAuth2 Refresh Token Flow",
    type: "Security",
    risk: "high",
    status: "in-review",
    team: "Platform Eng",
    submitter: "Alex K.",
    age: "2d",
    tags: ["auth", "tokens", "session"],
    description:
      "Adding persistent refresh token storage in Redis for mobile clients. Requires security sign-off before production deploy.",
    complianceScore: 72,
    piiDetected: false,
    frameworks: ["SOC2", "NIST 800-63B"],
    aiConfidence: 96,
  },
  {
    id: "REV-2398",
    title: "User PII Export — GDPR Data Portability",
    type: "Privacy",
    risk: "critical",
    status: "flagged",
    team: "Data Platform",
    submitter: "Maria S.",
    age: "4d",
    tags: ["gdpr", "pii", "export"],
    description:
      "Bulk data export endpoint exposing name, email, location history, and payment info across 14 fields for GDPR compliance.",
    complianceScore: 94,
    piiDetected: true,
    frameworks: ["GDPR", "CCPA", "SOC2"],
    aiConfidence: 98,
  },
  {
    id: "REV-2395",
    title: "Third-party Analytics — Amplitude v2 Upgrade",
    type: "Privacy",
    risk: "medium",
    status: "in-review",
    team: "Growth",
    submitter: "Jordan T.",
    age: "5d",
    tags: ["analytics", "third-party", "tracking"],
    description:
      "Upgrading Amplitude SDK with session replay enabled. Confirming no PII leakage in event properties before shipping.",
    complianceScore: 41,
    piiDetected: true,
    frameworks: ["GDPR", "CCPA"],
    aiConfidence: 91,
  },
  {
    id: "REV-2390",
    title: "Password Reset — Token Expiry Extension",
    type: "Security",
    risk: "low",
    status: "approved",
    team: "Identity",
    submitter: "Sam W.",
    age: "7d",
    tags: ["auth", "email", "tokens"],
    description:
      "Extending reset token TTL from 30 minutes to 24 hours for improved UX. Security impact assessed as minimal.",
    complianceScore: 12,
    piiDetected: false,
    frameworks: ["SOC2"],
    aiConfidence: 99,
  },
  {
    id: "REV-2388",
    title: "Admin Dashboard — SUPERADMIN Role",
    type: "Security",
    risk: "medium",
    status: "pending",
    team: "Internal Tools",
    submitter: "Lee P.",
    age: "8d",
    tags: ["rbac", "admin", "permissions"],
    description:
      "New SUPERADMIN role with cross-tenant access. Formal privilege escalation review required before promotion.",
    complianceScore: 41,
    piiDetected: false,
    frameworks: ["SOC2", "ISO 27001"],
    aiConfidence: 94,
  },
];

// ── Checklist items (per review — currently shared for demo) ──────────────────

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: "c1", text: "Token entropy meets NIST SP 800-63B (≥ 112 bits)", completed: false, framework: "NIST" },
  { id: "c2", text: "Refresh token rotation on each use — new token issued, old invalidated", completed: false, framework: "OAuth2 RFC 6819" },
  { id: "c3", text: "Tokens hashed at rest — SHA-256 before Redis write", completed: false, framework: "SOC2 CC6.1" },
  { id: "c4", text: "Revocation endpoint (/auth/revoke) documented and integration-tested", completed: false, framework: "OAuth2 RFC 7009" },
  { id: "c5", text: "Threat model updated in review ticket before sign-off", completed: false, framework: "Internal" },
  { id: "c6", text: "Security team code review completed", completed: true, framework: "Internal" },
];

// ── Seed AI message for the chat tab ─────────────────────────────────────────

export const INITIAL_AI_MESSAGE = `I've analyzed **REV-2401** — here's the full security assessment:

**Critical findings (2)**
• Refresh tokens stored in Redis with no expiry TTL — a stolen token grants permanent access indefinitely
• No token rotation on use — replay attacks are viable if a token is intercepted in transit

**Moderate findings (3)**
• Tokens stored as plaintext; recommend SHA-256 hashing before Redis persistence
• No device binding — the same token is valid from any IP or user-agent
• No revocation endpoint — logout and account-compromise scenarios are currently unhandled

**Recommended controls before approval**
1. Set Redis TTL ≤ 30 days; enforce sliding window expiry on each successful use
2. Implement refresh token rotation — issue a new token and invalidate the old one on every call
3. Store hashed tokens; verify by hash comparison at validation time
4. Add a device fingerprint claim to the token payload
5. Build /auth/revoke and wire it to both logout and account-compromise flows`;

export function buildInitialMessages(reviewId: string, reviewTitle: string): ChatMessage[] {
  const text = reviewId === "REV-2401"
    ? INITIAL_AI_MESSAGE
    : `I've analyzed **${reviewId}** — "${reviewTitle}". Ask me about risk findings, compliance requirements, or recommended mitigations for this review.`;

  return [
    {
      id: "seed-0",
      role: "ai",
      text,
      timestamp: new Date(),
    },
  ];
}

// ── Audit log ─────────────────────────────────────────────────────────────────

export function getAuditForReview(review: Review): AuditEvent[] {
  return [
    {
      id: `${review.id}-a3`,
      actor: "AI Agent",
      action: `Security scan complete — findings generated across 3 severity levels`,
      timestamp: "2h ago",
      actorColor: "var(--ac)",
    },
    {
      id: `${review.id}-a2`,
      actor: review.submitter,
      action: `Submitted ${review.id} for ${review.type.toLowerCase()} review`,
      timestamp: `${review.age} ago`,
      actorColor: "var(--t2)",
    },
    {
      id: `${review.id}-a1`,
      actor: "System",
      action: "Review auto-routed to Security Lead via AI risk scoring",
      timestamp: `${review.age} ago`,
      actorColor: "var(--tm)",
    },
  ];
}

// ── Agents ────────────────────────────────────────────────────────────────────

export const MOCK_AGENTS: Agent[] = [
  { id: "a1", name: "SecurityScan-α",  task: "Analyzing REV-2401 OAuth2 refresh token flow",  status: "running", progress: 73, lastActive: "Just now" },
  { id: "a2", name: "PrivacyAudit-β",  task: "PII scan on REV-2398 bulk export endpoint",      status: "running", progress: 45, lastActive: "2 min ago" },
  { id: "a3", name: "ComplianceMap-γ", task: "Idle — awaiting next submission",                status: "idle",    progress: 0,  lastActive: "1h ago" },
  { id: "a4", name: "RiskScore-δ",     task: "Recalculating organization risk posture",         status: "running", progress: 91, lastActive: "Just now" },
];

// ── Workflows ─────────────────────────────────────────────────────────────────

export const MOCK_WORKFLOWS: Workflow[] = [
  { id: "w1", name: "Security Review — Fast Track", trigger: "Low risk submissions",     steps: 3, runs: 47, status: "active", lastRun: "1h ago"    },
  { id: "w2", name: "Privacy Full Review",          trigger: "Any PII data changes",      steps: 7, runs: 12, status: "active", lastRun: "4h ago"    },
  { id: "w3", name: "Compliance Pre-check",         trigger: "All new submissions",       steps: 5, runs: 89, status: "active", lastRun: "30 min ago" },
  { id: "w4", name: "Critical Escalation Path",     trigger: "Critical risk detected",    steps: 4, runs: 6,  status: "draft",  lastRun: "3d ago"    },
];

// ── Search suggestions ────────────────────────────────────────────────────────

export const SEARCH_SUGGESTIONS: string[] = [
  "Show all high-risk reviews opened this week",
  "What refresh token policies are currently in place?",
  "Which teams have the most flagged reviews in Q1?",
  "Summarize PII exposure across all privacy reviews",
  "List all SOC2 CC6 compliance gaps across active reviews",
  "Which third-party SDKs are approved for production use?",
];
