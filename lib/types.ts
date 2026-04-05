// ── Enums / Unions ────────────────────────────────────────────────────────────

export type RiskLevel    = "critical" | "high" | "medium" | "low";
export type ReviewStatus = "pending" | "in-review" | "approved" | "flagged";
export type ReviewType   = "Security" | "Privacy";
export type AgentStatus  = "running" | "idle" | "error";
export type WorkflowStatus = "active" | "draft" | "paused";
export type MessageRole  = "user" | "ai";
export type ViewId       = "dashboard" | "reviews" | "workflows" | "search" | "agents";

// ── Review ────────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  title: string;
  type: ReviewType;
  risk: RiskLevel;
  status: ReviewStatus;
  team: string;
  submitter: string;
  age: string;
  tags: string[];
  description: string;
  complianceScore: number;
  piiDetected: boolean;
  frameworks: string[];
  aiConfidence: number;
}

// ── Checklist ─────────────────────────────────────────────────────────────────

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  framework?: string;
}

// ── Chat ──────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}

// ── Agent ─────────────────────────────────────────────────────────────────────

export interface Agent {
  id: string;
  name: string;
  task: string;
  status: AgentStatus;
  progress: number;
  lastActive: string;
}

// ── Workflow ──────────────────────────────────────────────────────────────────

export interface Workflow {
  id: string;
  name: string;
  trigger: string;
  steps: number;
  runs: number;
  status: WorkflowStatus;
  lastRun?: string;
}

// ── Audit ─────────────────────────────────────────────────────────────────────

export interface AuditEvent {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
  actorColor?: string;
}
