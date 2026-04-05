import { cn } from "@/lib/utils";
import type { RiskLevel, ReviewStatus } from "@/lib/types";

// ── Risk badge ────────────────────────────────────────────────────────────────

interface RiskBadgeProps {
  risk: RiskLevel;
  showLabel?: string; // override label, e.g. "high risk"
  className?: string;
}

export function RiskBadge({ risk, showLabel, className }: RiskBadgeProps) {
  return (
    <span className={cn(`badge badge-${risk}`, className)}>
      {showLabel ?? risk}
    </span>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  status: ReviewStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const label = status.replace(/-/g, " ");
  return (
    <span className={cn(`badge badge-${status}`, className)}>{label}</span>
  );
}
