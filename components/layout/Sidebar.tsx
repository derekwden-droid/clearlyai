"use client";

import {
  LayoutDashboard,
  Shield,
  Workflow,
  Search,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ViewId } from "@/lib/types";

interface SidebarProps {
  active: ViewId;
  onNavigate: (view: ViewId) => void;
}

const NAV = [
  { id: "dashboard" as ViewId, label: "Dashboard", Icon: LayoutDashboard },
  { id: "reviews"   as ViewId, label: "Reviews",   Icon: Shield,    badge: "5" },
  { id: "workflows" as ViewId, label: "Workflows",  Icon: Workflow },
  { id: "search"    as ViewId, label: "AI Search",  Icon: Search },
];

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside
      className="flex flex-col flex-shrink-0 py-3.5 px-2.5"
      style={{
        width: 216,
        background: "var(--s1)",
        borderRight: "1px solid var(--b)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-2.5 pb-5">
        <div
          className="w-[30px] h-[30px] rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--ac)" }}
        >
          <Shield size={14} color="white" />
        </div>
        <div className="flex items-baseline">
          <span className="font-display font-extrabold text-[15px] tracking-tight">
            Clearly
          </span>
          <span
            className="font-mono text-[11px] ml-0.5"
            style={{ color: "var(--tm)" }}
          >
            AI
          </span>
        </div>
      </div>

      {/* Workspace nav */}
      <p className="section-label pl-2.5">Workspace</p>
      <nav className="flex flex-col gap-0.5">
        {NAV.map(({ id, label, Icon, badge }) => (
          <button
            key={id}
            className={cn("nav-item", active === id && "active")}
            onClick={() => onNavigate(id)}
          >
            <Icon size={15} />
            <span className="flex-1 text-left">{label}</span>
            {badge && (
              <span
                className="font-mono text-[10px] px-1.5 py-px rounded-full"
                style={{ background: "var(--acd)", color: "var(--acb)" }}
              >
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="divider my-3" />

      {/* Agents */}
      <p className="section-label pl-2.5">Agents</p>
      <button
        className={cn("nav-item", active === "agents" && "active")}
        onClick={() => onNavigate("agents")}
      >
        <Bot size={15} />
        <span className="flex-1 text-left">Agents</span>
        <span className="pulse-dot" />
      </button>

      <div className="flex-1" />

      {/* Current user */}
      <div
        className="flex items-center gap-2 pt-3 px-2.5"
        style={{ borderTop: "1px solid var(--b)" }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
        >
          D
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold truncate">Debo Denmark</p>
          <p
            className="font-mono truncate"
            style={{ fontSize: 10, color: "var(--tm)" }}
          >
            Security Lead
          </p>
        </div>
      </div>
    </aside>
  );
}
