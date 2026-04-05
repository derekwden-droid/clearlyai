"use client";

import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { SEARCH_SUGGESTIONS } from "@/lib/mock-data";

export default function SearchView() {
  const [query, setQuery] = useState(
    "Which reviews require GDPR compliance sign-off this quarter?"
  );

  return (
    <div className="flex-1 overflow-y-auto fade-in" style={{ padding: "36px 36px", maxWidth: 720 }}>
      {/* Hero */}
      <div className="mb-8">
        <h1
          className="font-display font-extrabold tracking-tight mb-2"
          style={{ fontSize: 24 }}
        >
          Ask anything about your security posture
        </h1>
        <p className="text-xs" style={{ color: "var(--tm)" }}>
          Search across reviews, policies, frameworks, findings, and audit history
        </p>
      </div>

      {/* Search bar */}
      <div className="flex gap-2 mb-7">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--tm)" }}
          />
          <input
            className="field pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && undefined}
            placeholder="Ask a question..."
          />
        </div>
        <button className="btn-primary" style={{ padding: "8px 16px" }}>
          <Search size={14} />
          Search
        </button>
      </div>

      {/* Suggestions */}
      <p className="section-label">Suggested queries</p>
      <div className="flex flex-col gap-2">
        {SEARCH_SUGGESTIONS.map((q) => (
          <button
            key={q}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left text-[13px] transition-all duration-150 group"
            style={{
              border: "1px solid var(--b)",
              color: "var(--t2)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--bl)";
              el.style.color = "var(--t1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--b)";
              el.style.color = "var(--t2)";
            }}
            onClick={() => setQuery(q)}
          >
            <Search size={13} className="flex-shrink-0" />
            <span className="flex-1">{q}</span>
            <ArrowRight size={13} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* Placeholder result area */}
      <div
        className="mt-8 rounded-lg p-5 text-center"
        style={{
          background: "var(--s1)",
          border: "1px solid var(--b)",
          color: "var(--tm)",
        }}
      >
        <Search size={20} className="mx-auto mb-2 opacity-40" />
        <p className="text-sm">Press Enter or click Search to query your review history</p>
      </div>
    </div>
  );
}
