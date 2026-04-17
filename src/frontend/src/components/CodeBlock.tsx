import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { SupportedLanguage } from "../hooks/useCodeGeneration";
import { LANGUAGE_LABELS } from "../hooks/useCodeGeneration";

interface Token {
  type:
    | "keyword"
    | "string"
    | "comment"
    | "number"
    | "function"
    | "operator"
    | "plain";
  value: string;
}

// Lightweight regex tokenizer — good enough for syntax hints without a full parser
function tokenize(code: string, language: SupportedLanguage): Token[] {
  const tokens: Token[] = [];

  const JS_KEYWORDS =
    /\b(const|let|var|function|return|if|else|for|while|do|break|continue|class|new|this|typeof|instanceof|import|export|default|from|async|await|try|catch|finally|throw|void|null|undefined|true|false|in|of|switch|case|type|interface|enum|extends|implements|public|private|protected|readonly|static|abstract|declare|namespace|module|as|is)\b/;
  const PY_KEYWORDS =
    /\b(def|class|import|from|return|if|elif|else|for|while|break|continue|pass|in|not|and|or|is|None|True|False|with|as|try|except|finally|raise|lambda|yield|global|nonlocal|assert|del|print)\b/;
  const RUST_KEYWORDS =
    /\b(fn|let|mut|const|struct|enum|impl|trait|for|while|if|else|match|use|mod|pub|crate|super|self|return|break|continue|loop|where|type|as|in|ref|move|async|await|unsafe|extern|dyn|Box|Option|Some|None|Ok|Err|Vec|String|bool|i32|i64|u32|u64|usize|f32|f64|str)\b/;
  const GO_KEYWORDS =
    /\b(func|var|const|type|struct|interface|return|if|else|for|range|switch|case|default|break|continue|go|defer|select|chan|map|package|import|true|false|nil|make|new|len|cap|append|copy|delete|close|panic|recover|error|string|int|float64|bool)\b/;
  const SQL_KEYWORDS =
    /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|INDEX|VIEW|AND|OR|NOT|IN|LIKE|BETWEEN|IS|NULL|DISTINCT|COUNT|SUM|AVG|MAX|MIN|UNION|ALL|EXISTS)\b/i;
  const MOTOKO_KEYWORDS =
    /\b(actor|func|let|var|type|class|import|module|object|shared|public|private|stable|flexible|system|async|await|assert|throw|try|catch|return|ignore|if|else|switch|case|for|in|while|loop|label|break|continue|debug|not|and|or|null|true|false|Text|Nat|Int|Bool|Float|Char|Blob|Principal|Error)\b/;

  const keywordMap: Record<SupportedLanguage, RegExp> = {
    javascript: JS_KEYWORDS,
    typescript: JS_KEYWORDS,
    python: PY_KEYWORDS,
    rust: RUST_KEYWORDS,
    go: GO_KEYWORDS,
    sql: SQL_KEYWORDS,
    motoko: MOTOKO_KEYWORDS,
    html: /\b(html|head|body|div|span|p|a|ul|ol|li|h1|h2|h3|input|button|form|table|tr|td|th)\b/,
    bash: /\b(if|then|else|fi|for|while|do|done|case|esac|function|return|echo|export|local|readonly|shift|unset|source)\b/,
    other: JS_KEYWORDS,
  };

  const parts = code.split(/(\n)/);
  for (const part of parts) {
    if (part === "\n") {
      tokens.push({ type: "plain", value: "\n" });
      continue;
    }

    // Single-line comments
    const commentPrefix =
      {
        javascript: "//",
        typescript: "//",
        rust: "//",
        go: "//",
        motoko: "//",
        other: "//",
        python: "#",
        bash: "#",
        html: "<!--",
        sql: "--",
      }[language] ?? "//";

    const commentIdx = part.indexOf(commentPrefix);
    const workStr = commentIdx >= 0 ? part.slice(0, commentIdx) : part;
    const commentStr = commentIdx >= 0 ? part.slice(commentIdx) : "";

    // Tokenize the non-comment part
    const tokenRegex =
      /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+\.?\d*\b|\b[a-zA-Z_]\w*\b|[=><!+\-*/&|^~%@]+|[^\s\w"'`]/g;
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    // biome-ignore lint/suspicious/noAssignInExpressions: standard loop idiom
    while ((m = tokenRegex.exec(workStr)) !== null) {
      if (m.index > lastIndex) {
        tokens.push({
          type: "plain",
          value: workStr.slice(lastIndex, m.index),
        });
      }
      const val = m[0];
      if (val.startsWith('"') || val.startsWith("'") || val.startsWith("`")) {
        tokens.push({ type: "string", value: val });
      } else if (/^\d/.test(val)) {
        tokens.push({ type: "number", value: val });
      } else if (keywordMap[language].test(val)) {
        tokens.push({ type: "keyword", value: val });
      } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(val)) {
        tokens.push({ type: "function", value: val });
      } else if (
        /^[a-z_][a-zA-Z0-9_]*\b/.test(val) &&
        workStr[m.index + val.length] === "("
      ) {
        tokens.push({ type: "function", value: val });
      } else if (/^[=><!+\-*/&|^~%@]+$/.test(val)) {
        tokens.push({ type: "operator", value: val });
      } else {
        tokens.push({ type: "plain", value: val });
      }
      lastIndex = m.index + val.length;
    }
    if (lastIndex < workStr.length) {
      tokens.push({ type: "plain", value: workStr.slice(lastIndex) });
    }

    if (commentStr) {
      tokens.push({ type: "comment", value: commentStr });
    }
  }

  return tokens;
}

const TOKEN_COLORS: Record<Token["type"], string> = {
  keyword: "text-[#7dd3fc]",
  string: "text-[#86efac]",
  comment: "text-[#64748b] italic",
  number: "text-[#fdba74]",
  function: "text-[#c4b5fd]",
  operator: "text-[#f9a8d4]",
  plain: "text-[#e2e8f0]",
};

interface CodeBlockProps {
  code: string;
  language: SupportedLanguage;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const tokens = useMemo(() => tokenize(code, language), [code, language]);
  const lines = code.split("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const getReplitUrl = () => {
    const langMap: Partial<Record<SupportedLanguage, string>> = {
      javascript: "javascript",
      typescript: "typescript",
      python: "python3",
    };
    const replLang = langMap[language];
    if (!replLang) return null;
    const encoded = encodeURIComponent(code);
    return `https://replit.com/new/${replLang}?code=${encoded}`;
  };

  const replitUrl = getReplitUrl();

  // Reconstruct lines from tokens for line-number rendering
  const lineTokens = useMemo(() => {
    const result: Token[][] = [[]];
    for (const token of tokens) {
      if (token.value === "\n") {
        result.push([]);
      } else {
        result[result.length - 1].push(token);
      }
    }
    return result;
  }, [tokens]);

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-[#1e2d3d] shadow-elevated",
        className,
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f172a] border-b border-[#1e2d3d]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#ef4444]/70" />
            <span className="size-3 rounded-full bg-[#f59e0b]/70" />
            <span className="size-3 rounded-full bg-[#22c55e]/70" />
          </div>
          <Badge
            data-ocid="code.block.language_badge"
            className="ml-2 text-xs bg-[#1e2d3d] text-[#7dd3fc] border-[#334155] hover:bg-[#1e2d3d]"
          >
            {LANGUAGE_LABELS[language]}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          {replitUrl && (
            <Button
              data-ocid="code.block.replit_button"
              variant="ghost"
              size="sm"
              asChild
              className="h-7 px-2.5 text-xs text-[#94a3b8] hover:text-white hover:bg-[#1e2d3d]"
            >
              <a href={replitUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-3 mr-1" />
                Repl.it
              </a>
            </Button>
          )}
          <Button
            data-ocid="code.block.copy_button"
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2.5 text-xs text-[#94a3b8] hover:text-white hover:bg-[#1e2d3d]"
          >
            {copied ? (
              <Check className="size-3 mr-1 text-[#22c55e]" />
            ) : (
              <Copy className="size-3 mr-1" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto bg-[#0d1117]">
        <table className="min-w-full border-collapse font-mono text-sm leading-6">
          <tbody>
            {lineTokens.map((lineT, lineIdx) => (
              <tr
                key={`line-${lineIdx + 1}`}
                className="hover:bg-[#1e2d3d]/40 transition-colors duration-100"
              >
                {showLineNumbers && (
                  <td className="select-none text-right pr-4 pl-4 text-[#374151] text-xs w-10 shrink-0 border-r border-[#1e2d3d]">
                    {lineIdx + 1}
                  </td>
                )}
                <td className="pl-4 pr-6 py-0 whitespace-pre">
                  {lineT.length === 0 ? (
                    <span className="text-[#e2e8f0]">&nbsp;</span>
                  ) : (
                    lineT.map((tok, ti) => (
                      <span
                        key={`${lineIdx}-tok-${ti}-${tok.type}`}
                        className={TOKEN_COLORS[tok.type]}
                      >
                        {tok.value}
                      </span>
                    ))
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer: line count */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#0f172a] border-t border-[#1e2d3d]">
        <span className="text-xs text-[#475569]">
          {lines.length} {lines.length === 1 ? "line" : "lines"}
        </span>
      </div>
    </div>
  );
}
