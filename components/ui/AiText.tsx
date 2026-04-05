/**
 * AiText
 * Lightweight markdown renderer for AI chat messages.
 * Handles: bold headers (**text**), bullet points (•), numbered lists, plain text.
 */
interface AiTextProps {
  text: string;
  className?: string;
}

export default function AiText({ text, className }: AiTextProps) {
  return (
    <div className={className} style={{ fontFamily: "var(--font-syne)" }}>
      {text.split("\n").map((line, i) => {
        if (!line) return <br key={i} />;

        // Bold section header: **text**
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p
              key={i}
              style={{ fontWeight: 700, color: "#E2E8F0", margin: "10px 0 3px" }}
            >
              {line.replace(/\*\*/g, "")}
            </p>
          );
        }

        // Bullet point
        if (line.startsWith("•")) {
          return (
            <p key={i} style={{ margin: "2px 0", paddingLeft: 2 }}>
              {line}
            </p>
          );
        }

        // Numbered list item
        if (/^\d+\./.test(line)) {
          return (
            <p key={i} style={{ margin: "2px 0", paddingLeft: 2 }}>
              {line}
            </p>
          );
        }

        return (
          <p key={i} style={{ margin: "3px 0" }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}
