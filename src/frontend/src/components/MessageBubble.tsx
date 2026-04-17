import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { AiModel } from "../backend";
import { MessageRole } from "../backend";
import { getModelOption } from "./ModelSelector";

interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  model?: AiModel;
  index?: number;
}

/** Very lightweight markdown → JSX renderer (no deps needed). */
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={i}
          className="bg-muted/60 border border-border rounded-xl p-3 my-2 overflow-x-auto"
        >
          {lang && (
            <span className="block text-[10px] text-muted-foreground mb-1.5 uppercase tracking-wider font-mono">
              {lang}
            </span>
          )}
          <code className="font-mono text-xs leading-relaxed text-foreground">
            {codeLines.join("\n")}
          </code>
        </pre>,
      );
      i++;
      continue;
    }

    // Heading
    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h1 = line.match(/^# (.+)/);
    if (h1) {
      elements.push(
        <h1 key={i} className="text-base font-bold mt-3 mb-1.5">
          {h1[1]}
        </h1>,
      );
      i++;
      continue;
    }
    if (h2) {
      elements.push(
        <h2 key={i} className="text-sm font-bold mt-3 mb-1">
          {h2[1]}
        </h2>,
      );
      i++;
      continue;
    }
    if (h3) {
      elements.push(
        <h3 key={i} className="text-sm font-semibold mt-2 mb-1">
          {h3[1]}
        </h3>,
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.match(/^[-*_]{3,}$/)) {
      elements.push(<hr key={i} className="my-2 border-border" />);
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[*-] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[*-] /)) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside mb-2 space-y-0.5 pl-1">
          {items.map((item) => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: item text is unique enough
            <li
              key={`li-${item.slice(0, 20)}`}
              className="text-sm leading-relaxed"
            >
              {inlineMarkdown(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal list-inside mb-2 space-y-0.5 pl-1">
          {items.map((item) => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: item text is unique enough
            <li
              key={`oli-${item.slice(0, 20)}`}
              className="text-sm leading-relaxed"
            >
              {inlineMarkdown(item)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-2 border-primary/40 pl-3 italic text-muted-foreground my-1.5 text-sm"
        >
          {inlineMarkdown(line.slice(2))}
        </blockquote>,
      );
      i++;
      continue;
    }

    // Empty line → spacer
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-sm leading-relaxed mb-0.5">
        {inlineMarkdown(line)}
      </p>,
    );
    i++;
  }

  return elements;
}

/** Handle inline bold, italic, code, links. */
function inlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Tokenise with regex
  const re =
    /(\*\*(.+?)\*\*|__(.+?)__|`([^`]+)`|\*(.+?)\*|_(.+?)_|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;

  match = re.exec(text);
  while (match !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }

    if (match[2] || match[3]) {
      parts.push(
        <strong key={match.index} className="font-semibold">
          {match[2] ?? match[3]}
        </strong>,
      );
    } else if (match[4]) {
      parts.push(
        <code
          key={match.index}
          className="bg-muted/70 rounded px-1.5 py-0.5 font-mono text-[0.82em]"
        >
          {match[4]}
        </code>,
      );
    } else if (match[5] || match[6]) {
      parts.push(
        <em key={match.index} className="italic">
          {match[5] ?? match[6]}
        </em>,
      );
    } else if (match[7] && match[8]) {
      parts.push(
        <a
          key={match.index}
          href={match[8]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          {match[7]}
        </a>,
      );
    }

    last = match.index + match[0].length;
    match = re.exec(text);
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length === 1 && typeof parts[0] === "string" ? (
    parts[0]
  ) : (
    <>{parts}</>
  );
}

export function MessageBubble({
  role,
  content,
  model,
  index,
}: MessageBubbleProps) {
  const isUser = role === MessageRole.user;
  const [copied, setCopied] = useState(false);
  const modelMeta = model ? getModelOption(model) : null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-ocid={index !== undefined ? `chat.message.${index}` : undefined}
      className={cn(
        "group flex gap-3 mb-5",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "size-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5",
          isUser
            ? "gradient-primary text-white shadow-sm"
            : "bg-muted border border-border text-muted-foreground",
        )}
        aria-hidden="true"
      >
        {isUser ? "Y" : "AI"}
      </div>

      {/* Bubble + actions */}
      <div
        className={cn(
          "flex flex-col max-w-[78%]",
          isUser ? "items-end" : "items-start",
        )}
      >
        {/* Model label for assistant */}
        {!isUser && modelMeta && (
          <Badge
            variant="outline"
            className={cn(
              "mb-1.5 text-[10px] h-4 px-1.5 border font-medium",
              modelMeta.badge,
            )}
          >
            {modelMeta.label}
          </Badge>
        )}

        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm shadow-sm"
              : "bg-card border border-border text-foreground rounded-tl-sm shadow-card",
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words text-sm">{content}</p>
          ) : (
            <div>{renderMarkdown(content)}</div>
          )}
        </div>

        {/* Copy button */}
        <Button
          data-ocid={
            index !== undefined
              ? `chat.message.copy_button.${index}`
              : "chat.message.copy_button"
          }
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className={cn(
            "mt-1 size-6 opacity-0 group-hover:opacity-100 transition-smooth",
            isUser ? "mr-1" : "ml-1",
          )}
          aria-label="Copy message"
        >
          {copied ? (
            <Check className="size-3 text-primary" />
          ) : (
            <Copy className="size-3 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
