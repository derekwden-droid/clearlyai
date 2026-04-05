"use client";

import { Bot, Plus } from "lucide-react";
import { MOCK_AGENTS } from "@/lib/mock-data";

export default function AgentsView() {
  return (
    <div className="flex-1 overflow-y-auto p-7 fade-in">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <p className="section-label mb-0">Active AI Agents</p>
        <div className="flex items-center gap-2">
          <span className="pulse-dot" />
          <span className="font-mono text-[10px]" style={{ color: "var(--ok)" }}>
            3 running
          </span>
        </div>
      </div>

      <div
        className="grid gap-3.5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(256px, 1fr))" }}
      >
        {MOCK_AGENTS.map((a) => (
          <div key={a.id} className="card card-static">
            {/* Name + status */}
            <div className="flex items-center gap-2 mb-2">
              <Bot size={15} style={{ color: "var(--t2)", flexShrink: 0 }} />
              <span
                className="font-mono font-bold flex-1 truncate"
                style={{ fontSize: 13 }}
              >
                {a.name}
              </span>
              {a.status === "running" ? (
                <span className="pulse-dot" />
              ) : (
                <div
                  className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                  style={{ background: "var(--bl)" }}
                />
              )}
            </div>

            {/* Task */}
            <p
              className="text-xs leading-relaxed mb-3.5"
              style={{ color: "var(--tm)" }}
            >
              {a.task}
            </p>

            {/* Progress bar (running only) */}
            {a.status === "running" && (
              <>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="font-mono uppercase tracking-widest"
                    style={{ fontSize: 9, color: "var(--tm)" }}
                  >
                    Progress
                  </span>
                  <span
                    className="font-mono font-medium"
                    style={{ fontSize: 10, color: "var(--acb)" }}
                  >
                    {a.progress}%
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${a.progress}%` }}
                  />
                </div>
              </>
            )}

            {/* Last active */}
            <p
              className="font-mono mt-2.5"
              style={{ fontSize: 10, color: "var(--tm)" }}
            >
              {a.lastActive}
            </p>
          </div>
        ))}

        {/* Spawn new agent card */}
        <div
          className="flex flex-col items-center justify-center min-h-[140px] rounded-lg cursor-pointer transition-all duration-200"
          style={{ border: "1px dashed var(--bl)", color: "var(--tm)" }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "var(--ac)";
            el.style.color = "var(--acb)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "var(--bl)";
            el.style.color = "var(--tm)";
          }}
        >
          <Plus size={20} />
          <p className="text-[13px] font-semibold mt-2">Spawn Agent</p>
        </div>
      </div>
    </div>
  );
}
