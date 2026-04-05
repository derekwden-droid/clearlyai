import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RiskLevel, ReviewStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function riskBadgeClass(risk: RiskLevel): string {
  return `badge badge-${risk}`;
}

export function statusBadgeClass(status: ReviewStatus): string {
  return `badge badge-${status}`;
}

export function riskToPercent(risk: RiskLevel): number {
  const map: Record<RiskLevel, number> = {
    critical: 94,
    high: 72,
    medium: 41,
    low: 12,
  };
  return map[risk];
}

export function riskToColor(risk: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    critical: "var(--err)",
    high: "var(--err)",
    medium: "var(--warn)",
    low: "var(--ok)",
  };
  return map[risk];
}

/** Simple unique ID generator */
export function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

/** Format a label for display */
export function formatStatus(status: string): string {
  return status.replace(/-/g, " ");
}
