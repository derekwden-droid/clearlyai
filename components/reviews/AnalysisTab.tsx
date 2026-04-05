"use client";

import { Check } from "lucide-react";
import AiText from "@/components/ui/AiText";
import { riskToPercent, riskToColor } from "@/lib/utils";
import { CHECKLIST_ITEMS, INITIAL_AI_MESSAGE } from "@/lib/mock-data";
import type { Review } from "@/lib/types";

interface AnalysisTabProps {
  review: Review;
}

export default function AnalysisTab({ review }: AnalysisTabProps) {
  const riskScore = riskToPercent(review.risk);
  const riskColor = riskToColor(review.risk);

  const stats = [
    { label: "Compliance Risk", value: `${riskScore}%`,                          color: riskColor },
    { label: "PII Detected",    value: review.piiDetected ? "Yes" : "None",       color: review.piiDetected ? "var(--warn)" : "var(--ok)" },
    { label: "Frameworks",      value: review.frameworks.join(" · "),             color: "var(--t2)" },
    { label: "AI Confidence",   value: `${review.aiConfidence}%`,                 color: "var(--acb)" },
  ];

  return (
    <div className="fade-in">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <p className="stat-label">{s.label}</p>
            <p className="stat-value" style={{ color: s.color }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* AI Findings */}
      <p className="section-label">AI Findings</p>
      <div
        className="rounded-lg p-4 mb-5"
        style={{ background: "var(--s1)", border: "1px solid var(--b)" }}
      >
        <AiText text={INITIAL_AI_MESSAGE} />
      </div>

      {/* Compliance Checklist */}
      <p className="section-label">Compliance Checklist</p>
      <div
        className="rounded-lg"
        style={{
          background: "var(--s1)",
          border: "1px solid var(--b)",
          padding: "4px 16px",
        }}
      >
        {CHECKLIST_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2.5 py-2.5 text-[13px] leading-snug"
            style={{
              borderBottom: "1px solid var(--b)",
              color: "var(--t2)",
            }}
          >
            {/* Checkbox icon */}
            <span
              className="flex-shrink-0 mt-px"
              style={{ color: item.completed ? "var(--ok)" : "transparent" }}
            >
              {item.completed ? (
                <Check size={14} />
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <rect
                    x="1" y="1" width="12" height="12" rx="3"
                    stroke="var(--bl)" strokeWidth="1.5" fill="none"
                  />
                </svg>
              )}
            </span>

            <span
              style={{
                color: item.completed ? "var(--tm)" : "var(--t2)",
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
            </span>

            {item.framework && (
              <span className="chip ml-auto flex-shrink-0">{item.framework}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
