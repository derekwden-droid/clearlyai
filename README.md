# Clearly AI — Security & Privacy Review Workspace

A high-fidelity MVP prototype of an AI-powered security and privacy review platform, built as a Founding UI/UX Design Engineer portfolio piece.

> **Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Lucide React · Anthropic API (streaming)

---

## Live Demo

Navigate all five product surfaces:

| Surface | Description |
|---|---|
| **Dashboard** | Review queue with live stats and risk-sorted list |
| **Reviews** | Full workspace: AI analysis, compliance checklist, streaming chat, audit trail |
| **Workflows** | Automated review pipeline management |
| **AI Search** | Natural-language query interface across all review history |
| **Agents** | Live AI agent monitoring with animated progress |

---

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/YOUR_USERNAME/clearly-ai-workspace.git
cd clearly-ai-workspace
npm install

# 2. (Optional) Add your Anthropic API key for live AI chat
cp .env.example .env.local
# Edit .env.local and set ANTHROPIC_API_KEY=your_key_here

# 3. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Without an API key:** The AI chat tab falls back to a realistic mock streaming response so the full UX is explorable without any setup.

---

## Project Structure

```
clearly-ai-workspace/
│
├── app/
│   ├── globals.css              # Full design system (tokens, components, animations)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main workspace shell — routing between views
│   └── api/
│       └── chat/
│           └── route.ts         # Anthropic streaming API route (Edge runtime)
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # Left navigation with section grouping
│   │   └── TopBar.tsx           # Header with contextual actions
│   │
│   ├── reviews/
│   │   ├── ReviewList.tsx       # Left panel — review queue, stat strip
│   │   ├── ReviewDetail.tsx     # Right panel — header, tab switcher
│   │   ├── AnalysisTab.tsx      # AI findings, stat grid, compliance checklist
│   │   ├── AIChat.tsx           # Streaming AI chat (live API + mock fallback)
│   │   └── HistoryTab.tsx       # Audit trail
│   │
│   ├── workflows/
│   │   └── WorkflowsView.tsx    # Automated workflow cards
│   │
│   ├── search/
│   │   └── SearchView.tsx       # Natural-language search interface
│   │
│   ├── agents/
│   │   └── AgentsView.tsx       # Live agent monitoring grid
│   │
│   └── ui/
│       ├── AiText.tsx           # Lightweight markdown renderer for AI output
│       └── Badge.tsx            # Risk and status badge components
│
├── lib/
│   ├── types.ts                 # All TypeScript interfaces and union types
│   ├── utils.ts                 # cn(), badge class helpers, uid()
│   └── mock-data.ts             # Seed data — reviews, agents, workflows, audit log
│
├── .env.example                 # Required env vars
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

---

## Design System

### Typography
- **Syne** — display font for headings, UI labels, buttons. Authoritative without being corporate.
- **DM Mono** — all data, IDs, badges, timestamps, code. Signals precision and technical depth.

### Color Tokens
```css
--bg:  #070A0F   /* deep navy canvas */
--s1:  #0D1117   /* primary surface */
--s2:  #161B25   /* elevated surface */
--s3:  #1C2333   /* active/hover surface */
--ac:  #3B82F6   /* electric blue accent */
--ok:  #10B981   /* success / approved */
--warn:#F59E0B   /* warning / PII detected */
--err: #EF4444   /* error / critical risk */
```

### Risk Severity
| Level | Color | Use |
|---|---|---|
| Critical | `#FCA5A5` red | Active data breach risk |
| High | `#F87171` red | Significant control gaps |
| Medium | `#FCD34D` amber | Requires remediation |
| Low | `#34D399` green | Minor, no immediate action |

---

## Extending

### Connect live AI analysis
The API route at `app/api/chat/route.ts` is wired and ready. Add `ANTHROPIC_API_KEY` to `.env.local` and the chat tab streams real responses from Claude.

### Add a database
Replace `lib/mock-data.ts` with Supabase queries. Suggested schema:

```sql
-- reviews
id, title, type, risk_level, status, team, submitter, description, created_at, updated_at

-- findings
id, review_id, severity, description, framework, created_at

-- checklist_items
id, review_id, text, completed, framework

-- audit_events
id, review_id, actor, action, created_at
```

### Add real-time updates
```ts
// Subscribe to review status changes
supabase
  .channel('reviews')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'reviews' }, handler)
  .subscribe()
```

---

## Built by

**Debo Denmark** · Founder, AEGIS Security Inc. · Tampa, FL

Portfolio piece targeting the Founding UI/UX Design Engineer role at [Clearly AI (YC S24)](https://www.ycombinator.com/companies/clearly-ai).
