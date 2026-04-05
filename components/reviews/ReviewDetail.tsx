"use client";

import { useState } from "react";
import { User, Check, X } from "lucide-react";
import { cn, riskBadgeClass, statusBadgeClass } from "@/lib/utils";
import AnalysisTab from "./AnalysisTab";
import AIChat from "./AIChat";
import HistoryTab from "./HistoryTab";
import type { Review } from "@/lib/types";

type TabId = "analysis" | "chat" | "history";

interface ReviewDetailProps {
  review: Review;
}

export default function ReviewDetail({ review }: ReviewDetailProps) {
  const [tab, setTab] = useState<TabId>("analysis");

  return (
    <div className="flex-1 min-w-0 overflow-hidden flex flex-col">

      {/* ── Header ── */}
      <div
        className="flex-shrink-0 px-5 py-3.5"
        style={{ borderBottom: "1px solid var(--b)" }}
      >
        {/* Badges + actions */}
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <span className="font-mono text-[11px]" style={{ color: "var(--tm)" }}>
            {review.id}
          </span>
          <span className={riskBadgeClass(review.risk)}>{review.risk} risk</span>
          <span className={statusBadgeClass(review.status)}>
            {review.status.replace("-", " ")}
          </span>

          <div className="ml-auto flex items-center gap-2">
            <button className="btn-ghost" style={{ fontSize: 11, padding: "5px 11px" }}>
              <User size={12} /> Assign
            </button>
            <button
              className="btn-ghost"
              style={{ fontSize: 11, padding: "5px 11px", color: "#34D399", borderColor: "rgba(52,211,153,.4)" }}
            >
              <Check size={12} /> Approve
            </button>
            <button
              className="btn-ghost"
              style={{ fontSize: 11, padding: "5px 11px", color: "#F87171", borderColor: "rgba(248,113,113,.4)" }}
            >
              <X size={12} /> Flag
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-bold tracking-tight mb-1.5" style={{ fontSize: 15 }}>
          {review.title}
        </h2>

        {/* Description */}
        <p className="text-xs leading-relaxed" style={{ color: "var(--t2)" }}>
          {review.description}
        </p>

        {/* Tags + submitter */}
        <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
          {review.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
          <span
            className="ml-auto font-mono flex items-center gap-1"
            style={{ fontSize: 11, color: "var(--tm)" }}
          >
            <User size={11} />
            {review.submitter} · {review.team}
          </span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        className="flex flex-shrink-0 px-5"
        style={{ borderBottom: "1px solid var(--b)" }}
      >
        {(["analysis", "chat", "history"] as TabId[]).map((t) => (
          <button
            key={t}
            className={cn("tab-item", tab === t && "active")}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab body ── */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5">
        {tab === "analysis" && <AnalysisTab review={review} />}
        {tab === "chat"     && <AIChat review={review} />}
        {tab === "history"  && <HistoryTab review={review} />}
      </div>
    </div>
  );
}
