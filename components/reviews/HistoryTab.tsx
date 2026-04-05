"use client";

import { getAuditForReview } from "@/lib/mock-data";
import type { Review } from "@/lib/types";

interface HistoryTabProps {
  review: Review;
}

export default function HistoryTab({ review }: HistoryTabProps) {
  const events = getAuditForReview(review);

  return (
    <div className="fade-in">
      <p className="section-label">Audit Trail</p>

      {events.map((e, i) => (
        <div
          key={e.id}
          className="flex gap-3 py-3.5 items-start"
          style={{
            borderBottom: i < events.length - 1 ? "1px solid var(--b)" : "none",
          }}
        >
          {/* Avatar */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5"
            style={{ background: "var(--s3)", color: e.actorColor ?? "var(--t2)" }}
          >
            {e.actor[0]}
          </div>

          <div>
            <p className="text-[13px] leading-snug">
              <strong style={{ color: e.actorColor ?? "var(--t2)" }}>
                {e.actor}
              </strong>{" "}
              {e.action}
            </p>
            <p
              className="font-mono mt-0.5"
              style={{ fontSize: 10, color: "var(--tm)" }}
            >
              {e.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
