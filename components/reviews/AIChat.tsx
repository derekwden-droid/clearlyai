"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import AiText from "@/components/ui/AiText";
import { uid } from "@/lib/utils";
import { buildInitialMessages } from "@/lib/mock-data";
import type { ChatMessage, Review } from "@/lib/types";

// Fallback mock response when API key is not configured
function mockResponse(reviewId: string): string {
  return `For **${reviewId}**, here's what maps to your question:\n\n**Compliance framework:** SOC 2 Type II (CC6.1 — Logical Access Controls) and NIST SP 800-63B Section 5.1.2 (token entropy requirements).\n\n**Concrete next steps before approval**\n• Verify token entropy ≥ 112 bits — check the generation code directly\n• Add velocity-based anomaly detection for refresh calls (> 3/min = alert)\n• Document updated threat model in the review ticket — required before security sign-off\n• Consider step-up authentication for sensitive operations regardless of token state`;
}

interface AIChatProps {
  review: Review;
}

export default function AIChat({ review }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    buildInitialMessages(review.id, review.title)
  );
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Reset on review change
  useEffect(() => {
    setMessages(buildInitialMessages(review.id, review.title));
    setInput("");
    setStreaming(false);
    setStreamText("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review.id]);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamText]);

  async function handleSend() {
    if (!input.trim() || streaming) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((p) => [...p, userMsg]);
    const question = input;
    setInput("");
    setStreaming(true);
    setStreamText("");

    // Build conversation history for API
    const history = [
      ...messages,
      userMsg,
    ].map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId: review.id,
          reviewTitle: review.title,
          messages: history,
        }),
      });

      if (!res.ok) throw new Error("API unavailable");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

          for (const line of lines) {
            const data = line.replace("data: ", "");
            if (data === "[DONE]") continue;

            try {
              const json = JSON.parse(data);
              const delta =
                json.delta?.text ??
                json.delta?.content?.[0]?.text ??
                "";
              if (delta) {
                full += delta;
                setStreamText(full);
              }
            } catch {
              // skip malformed SSE chunks
            }
          }
        }
      }

      setMessages((p) => [
        ...p,
        { id: uid(), role: "ai", text: full || mockResponse(review.id), timestamp: new Date() },
      ]);
    } catch {
      // Fallback: simulate streaming with mock response
      const response = mockResponse(review.id);
      let i = 0;
      const iv = setInterval(() => {
        if (i < response.length) {
          setStreamText((p) => p + response[i]);
          i++;
        } else {
          clearInterval(iv);
          setMessages((p) => [
            ...p,
            { id: uid(), role: "ai", text: response, timestamp: new Date() },
          ]);
          setStreamText("");
          setStreaming(false);
        }
      }, 14);
      return;
    }

    setStreamText("");
    setStreaming(false);
  }

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-3">
        {/* Context pill */}
        <div
          className="flex items-center gap-2 rounded-lg text-xs mb-3.5 px-3.5 py-2.5"
          style={{
            background: "var(--acd)",
            border: "1px solid rgba(59,130,246,.2)",
            color: "var(--acb)",
          }}
        >
          <Sparkles size={13} className="flex-shrink-0" />
          <span>
            Analyzed <strong>{review.id}</strong>. Ask follow-up questions about
            findings, mitigations, or compliance requirements.
          </span>
        </div>

        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === "user" ? "chat-user" : "chat-ai"}
          >
            {m.role === "ai" ? <AiText text={m.text} /> : m.text}
          </div>
        ))}

        {streaming && streamText && (
          <div className="chat-ai cursor-blink">
            <AiText text={streamText} />
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input row */}
      <div className="flex gap-2 flex-shrink-0">
        <input
          className="field"
          placeholder="Ask about compliance frameworks, mitigations, threat models..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="btn-primary"
          style={{ padding: "8px 12px" }}
          onClick={handleSend}
          disabled={streaming}
        >
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}
