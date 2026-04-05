import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * POST /api/chat
 *
 * Proxies messages to the Anthropic API with streaming support.
 * Requires ANTHROPIC_API_KEY in environment variables.
 *
 * Body: { reviewId: string; reviewTitle: string; messages: { role: string; content: string }[] }
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured. See .env.example." },
      { status: 500 }
    );
  }

  const { reviewId, reviewTitle, messages } = await req.json();

  const systemPrompt = `You are an expert AI security and privacy review assistant inside Clearly AI — a platform used by enterprise security teams at companies like Rivian, Affirm, and HID Global.

You are currently analyzing review **${reviewId}**: "${reviewTitle}".

Your role:
- Identify security and privacy risks with precision
- Reference specific compliance frameworks (SOC 2, GDPR, CCPA, NIST SP 800-63B, ISO 27001, HIPAA where relevant)
- Give actionable, specific remediation steps — not vague guidance
- Be direct and concise; these users are senior security engineers, not executives
- Use **bold** for section headers, bullet points (•) for findings, numbered lists for ordered steps

Tone: authoritative, precise, no hedging. These are experts.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      stream: true,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error }, { status: response.status });
  }

  // Stream the response directly back to the client
  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
