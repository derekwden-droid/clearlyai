"use client";

import { Plus, Sparkles } from "lucide-react";
import type { ViewId } from "@/lib/types";

const TITLES: Record<ViewId, string> = {
  dashboard: "Review Queue",
  reviews:   "Active Reviews",
  workflows: "Workflows",
  search:    "AI Search",
  agents:    "AI Agents",
};

const SUBTITLES: Partial<Record<ViewId, string>> = {
  dashboard: "5 open · 2 flagged",
  reviews:   "5 open · 2 flagged",
};

interface TopBarProps {
  view: ViewId;
}

export default function TopBar({ view }: TopBarProps) {
  return (
    <header
      className="flex items-center flex-shrink-0 gap-3 px-5"
      style={{
        height: 52,
        background: "var(--s1)",
        borderBottom: "1px solid var(--b)",
      }}
    >
      <div className="flex-1">
        <span className="text-sm font-bold">{TITLES[view]}</span>
        {SUBTITLES[view] && (
          <span
            className="font-mono text-[11px] ml-2.5"
            style={{ color: "var(--tm)" }}
          >
            {SUBTITLES[view]}
          </span>
        )}
      </div>

      <button className="btn-ghost" style={{ fontSize: 12, padding: "6px 12px" }}>
        <Plus size={13} />
        New Review
      </button>
      <button className="btn-primary" style={{ fontSize: 12, padding: "6px 12px" }}>
        <Sparkles size={13} />
        Run AI Scan
      </button>
    </header>
  );
}
