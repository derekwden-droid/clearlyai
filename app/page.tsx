"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ReviewList from "@/components/reviews/ReviewList";
import ReviewDetail from "@/components/reviews/ReviewDetail";
import WorkflowsView from "@/components/workflows/WorkflowsView";
import SearchView from "@/components/search/SearchView";
import AgentsView from "@/components/agents/AgentsView";
import { MOCK_REVIEWS } from "@/lib/mock-data";
import type { Review, ViewId } from "@/lib/types";

export default function Home() {
  const [view, setView] = useState<ViewId>("dashboard");
  const [selected, setSelected] = useState<Review>(MOCK_REVIEWS[0]);

  const isListView = view === "dashboard" || view === "reviews";

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--t1)" }}
    >
      <Sidebar active={view} onNavigate={setView} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar view={view} />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {isListView && (
            <>
              <ReviewList
                reviews={MOCK_REVIEWS}
                selected={selected}
                view={view}
                onSelect={setSelected}
              />
              <ReviewDetail review={selected} />
            </>
          )}

          {view === "workflows" && <WorkflowsView />}
          {view === "search"    && <SearchView />}
          {view === "agents"    && <AgentsView />}
        </div>
      </div>
    </div>
  );
}
