"use client";

import { Plus } from "lucide-react";
import { MOCK_WORKFLOWS } from "@/lib/mock-data";

export default function WorkflowsView() {
  return (
    <div className="flex-1 overflow-y-auto p-7 fade-in">
      <p className="section-label">Automated Review Workflows</p>

      <div
        className="grid gap-3.5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(268px, 1fr))" }}
      >
        {MOCK_WORKFLOWS.map((w) => (
          <div key={w.id} className="card card-static">
            {/* Status indicator */}
            <div className="flex items-center gap-2 mb-2.5">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: w.status === "active" ? "var(--ok)" : "var(--tm)" }}
              />
              <span
                className="font-mono uppercase tracking-wide"
                style={{
                  fontSize: 10,
                  color: w.status === "active" ? "var(--ok)" : "var(--tm)",
                }}
              >
                {w.status}
              </span>
              {w.lastRun && (
                <span
                  className="font-mono ml-auto"
                  style={{ fontSize: 10, color: "var(--tm)" }}
                >
                  last run {w.lastRun}
                </span>
              )}
            </div>

            {/* Name */}
            <p className="text-[13px] font-bold leading-snug mb-1.5">{w.name}</p>

            {/* Trigger */}
            <p className="text-xs mb-4" style={{ color: "var(--tm)" }}>
              Trigger: {w.trigger}
            </p>

            {/* Stats */}
            <div className="flex gap-5">
              {[
                { label: "STEPS", value: w.steps },
                { label: "RUNS",  value: w.runs  },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span
                    className="font-mono font-bold"
                    style={{ fontSize: 18, color: "var(--t1)" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: 9, color: "var(--tm)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* New workflow card */}
        <div
          className="flex flex-col items-center justify-center min-h-[140px] rounded-lg cursor-pointer transition-all duration-200"
          style={{
            border: "1px dashed var(--bl)",
            color: "var(--tm)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--ac)";
            (e.currentTarget as HTMLDivElement).style.color = "var(--acb)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--bl)";
            (e.currentTarget as HTMLDivElement).style.color = "var(--tm)";
          }}
        >
          <Plus size={20} />
          <p className="text-[13px] font-semibold mt-2">New Workflow</p>
        </div>
      </div>
    </div>
  );
}
