"use client";

import { Clock } from "lucide-react";
import { cn, riskBadgeClass, statusBadgeClass } from "@/lib/utils";
import type { Review, ViewId } from "@/lib/types";

interface ReviewListProps {
  reviews: Review[];
  selected: Review | null;
  view: ViewId;
  onSelect: (r: Review) => void;
}

export default function ReviewList({
  reviews,
  selected,
  view,
  onSelect,
}: ReviewListProps) {
  return (
    <div
      className="flex-shrink-0 flex flex-col overflow-hidden"
      style={{ width: 348, borderRight: "1px solid var(--b)" }}
    >
      <div className="flex-1 overflow-y-auto p-3.5">
        {/* Dashboard stat strip */}
        {view === "dashboard" && (
          <div className="flex gap-2 mb-4">
            {[
              { label: "Pending",  value: "3",  color: "var(--tm)" },
              { label: "Flagged",  value: "2",  color: "#F87171"   },
              { label: "Approved", value: "14", color: "#34D399"   },
            ].map((s) => (
              <div
                key={s.label}
                className="stat-card flex-1"
              >
                <p className="font-mono font-extrabold text-xl" style={{ color: s.color }}>
                  {s.value}
                </p>
                <p className="stat-label mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        <p className="section-label">Open Reviews</p>

        <div className="flex flex-col gap-2">
          {reviews.map((r) => (
            <div
              key={r.id}
              className={cn("card cursor-pointer", selected?.id === r.id && "selected")}
              onClick={() => onSelect(r)}
            >
              {/* ID + risk */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[11px]" style={{ color: "var(--tm)" }}>
                  {r.id}
                </span>
                <span className={riskBadgeClass(r.risk)}>{r.risk}</span>
              </div>

              {/* Title */}
              <p className="text-[13px] font-semibold leading-snug mb-2">
                {r.title}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={statusBadgeClass(r.status)}>
                  {r.status.replace("-", " ")}
                </span>
                <span className="chip">{r.type}</span>
                <span
                  className="ml-auto font-mono flex items-center gap-1"
                  style={{ fontSize: 10, color: "var(--tm)" }}
                >
                  <Clock size={11} />
                  {r.age}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
