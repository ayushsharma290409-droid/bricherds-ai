import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpen,
  Code2,
  ExternalLink,
  History,
  Loader2,
  RefreshCw,
  Sparkles,
  Terminal,
  Wand2,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { AiModel } from "../backend";
import { CodeBlock } from "../components/CodeBlock";
import { useAuth } from "../hooks/useAuth";
import {
  type CodeSnippet,
  LANGUAGE_LABELS,
  type SupportedLanguage,
  useCodeGeneration,
} from "../hooks/useCodeGeneration";

const LANGUAGE_OPTIONS: SupportedLanguage[] = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "go",
  "motoko",
  "html",
  "sql",
  "bash",
  "other",
];

const MODEL_OPTIONS = [
  {
    value: AiModel.gpt4o,
    label: "GPT-4o",
    badge: "Recommended",
    color: "bg-teal-50 text-teal-700",
  },
  {
    value: AiModel.claude,
    label: "Claude 3.5",
    badge: "Creative",
    color: "bg-primary/10 text-primary",
  },
  {
    value: AiModel.deepseekV3,
    label: "DeepSeek V3",
    badge: "Open Source",
    color: "bg-accent/10 text-accent",
  },
  {
    value: AiModel.grok,
    label: "Grok",
    badge: "xAI",
    color: "bg-violet-50 text-violet-700",
  },
];

const EXAMPLE_PROMPTS: {
  language: SupportedLanguage;
  prompt: string;
  icon: string;
}[] = [
  {
    language: "typescript",
    prompt: "Build a rate limiter class with sliding window algorithm",
    icon: "⚡",
  },
  {
    language: "python",
    prompt:
      "Write a web scraper that extracts article titles and links from Hacker News",
    icon: "🐍",
  },
  {
    language: "javascript",
    prompt: "Create a debounce function with TypeScript generics",
    icon: "🔧",
  },
  {
    language: "rust",
    prompt: "Implement a thread-safe LRU cache using Arc and Mutex",
    icon: "🦀",
  },
  {
    language: "sql",
    prompt:
      "Write a query to find the top 10 customers by revenue with month-over-month growth",
    icon: "🗄️",
  },
  {
    language: "bash",
    prompt:
      "Script to backup a PostgreSQL database and upload to S3 with timestamp",
    icon: "💾",
  },
];

function HistoryItem({
  snippet,
  isActive,
  onClick,
}: {
  snippet: CodeSnippet;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2.5 rounded-lg border transition-smooth text-sm",
        isActive
          ? "bg-primary/8 border-primary/30 text-foreground"
          : "bg-card border-border text-muted-foreground hover:bg-muted/40 hover:text-foreground",
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4">
          {LANGUAGE_LABELS[snippet.language]}
        </Badge>
        <span className="text-xs text-muted-foreground ml-auto">
          {snippet.createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <p className="truncate text-xs">{snippet.prompt}</p>
    </button>
  );
}

export default function CodePage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const {
    snippets,
    currentSnippet,
    isGenerating,
    error,
    generateCode,
    setCurrentSnippet,
    clearError,
  } = useCodeGeneration();

  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState<SupportedLanguage>("typescript");
  const [model, setModel] = useState<AiModel>(AiModel.gpt4o);
  const [lastConvId, setLastConvId] = useState<bigint | null>(null);

  const handleGenerate = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!description.trim()) {
      toast.warning("Describe what code you need first");
      return;
    }
    try {
      const convId = await generateCode(description, language, model);
      if (convId) setLastConvId(convId);
      toast.success("Code generated! View in conversation for full output.");
    } catch {
      toast.error("Generation failed — please try again");
    }
  };

  const handleRegenerate = async () => {
    if (!currentSnippet || !isAuthenticated) return;
    try {
      const convId = await generateCode(currentSnippet.prompt, language, model);
      if (convId) setLastConvId(convId);
    } catch {
      toast.error("Regeneration failed");
    }
  };

  const handleExampleClick = (ex: (typeof EXAMPLE_PROMPTS)[number]) => {
    setDescription(ex.prompt);
    setLanguage(ex.language);
  };

  return (
    <div className="min-h-full bg-background">
      {/* Page header */}
      <section className="bg-card border-b border-border px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-primary/10 shrink-0">
              <Code2 className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Code Studio
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Describe what you need — AI writes production-ready code in
                seconds
              </p>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-2">
              <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                <Sparkles className="size-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-5">
        {/* Left column: input + history */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
          {/* Generation form */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card className="p-4 shadow-card border-border">
              <div className="space-y-3">
                {/* Language selector */}
                <div>
                  <Label
                    id="code-lang-label"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5"
                  >
                    Language
                  </Label>
                  <Select
                    value={language}
                    onValueChange={(v) => setLanguage(v as SupportedLanguage)}
                  >
                    <SelectTrigger
                      data-ocid="code.language.select"
                      aria-labelledby="code-lang-label"
                      className="h-9 text-sm"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGE_OPTIONS.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {LANGUAGE_LABELS[lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Model selector */}
                <div>
                  <Label
                    id="code-model-label"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5"
                  >
                    AI Model
                  </Label>
                  <Select
                    value={model}
                    onValueChange={(v) => setModel(v as AiModel)}
                  >
                    <SelectTrigger
                      data-ocid="code.model.select"
                      aria-labelledby="code-model-label"
                      className="h-9 text-sm"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MODEL_OPTIONS.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          <div className="flex items-center gap-2">
                            <span>{m.label}</span>
                            <Badge
                              className={cn(
                                "text-[10px] px-1 py-0 h-4",
                                m.color,
                              )}
                            >
                              {m.badge}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description textarea */}
                <div>
                  <Label
                    htmlFor="code-description"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5"
                  >
                    Task Description
                  </Label>
                  <Textarea
                    id="code-description"
                    data-ocid="code.description.textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what code you need…"
                    className="resize-none text-sm min-h-[100px]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.metaKey) handleGenerate();
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    ⌘ + Enter to generate
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div
                    data-ocid="code.generation.error_state"
                    className="flex items-start gap-2 rounded-lg bg-destructive/8 border border-destructive/20 px-3 py-2.5 text-sm text-destructive"
                  >
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span className="flex-1">{error}</span>
                    <button
                      type="button"
                      onClick={clearError}
                      className="text-destructive/60 hover:text-destructive"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Generate button */}
                <Button
                  data-ocid="code.generate.primary_button"
                  onClick={handleGenerate}
                  disabled={isGenerating || !description.trim()}
                  className="w-full gap-2 gradient-primary text-white border-0 shadow-elevated hover:opacity-90 transition-smooth"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Wand2 className="size-4" />
                      Generate Code
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Session history */}
          {snippets.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 shadow-card border-border">
                <div className="flex items-center gap-2 mb-3">
                  <History className="size-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Session History
                  </span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {snippets.length}
                  </Badge>
                </div>
                <div
                  className="flex flex-col gap-1.5"
                  data-ocid="code.history.list"
                >
                  {snippets.map((snippet, idx) => (
                    <div
                      key={snippet.id}
                      data-ocid={`code.history.item.${idx + 1}`}
                    >
                      <HistoryItem
                        snippet={snippet}
                        isActive={currentSnippet?.id === snippet.id}
                        onClick={() => setCurrentSnippet(snippet)}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right column: output */}
        <div className="flex-1 min-w-0">
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="code.output.loading_state"
              className="space-y-3"
            >
              <Skeleton className="h-8 w-40 rounded" />
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </motion.div>
          )}

          {!isGenerating && currentSnippet && (
            <motion.div
              key={currentSnippet.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
              data-ocid="code.output.panel"
            >
              {/* Toolbar */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {LANGUAGE_LABELS[currentSnippet.language]}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {MODEL_OPTIONS.find((m) => m.value === currentSnippet.model)
                    ?.label ?? currentSnippet.model}
                </Badge>
                <div className="flex gap-2 ml-auto">
                  {lastConvId && (
                    <Button
                      data-ocid="code.output.open_chat_button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-xs h-8"
                      onClick={() =>
                        navigate({
                          to: "/chat/$conversationId",
                          params: { conversationId: lastConvId.toString() },
                        })
                      }
                    >
                      <ExternalLink className="size-3" />
                      Open in Chat
                    </Button>
                  )}
                  <Button
                    data-ocid="code.output.regenerate_button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs h-8"
                    onClick={handleRegenerate}
                    disabled={isGenerating}
                  >
                    <RefreshCw className="size-3" />
                    Regenerate
                  </Button>
                </div>
              </div>

              {/* Code block */}
              <CodeBlock
                code={currentSnippet.code}
                language={currentSnippet.language}
                showLineNumbers
              />

              {/* Explanation */}
              <Card
                className="p-4 border-border shadow-card bg-muted/30"
                data-ocid="code.output.explanation_panel"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="size-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    How it works
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentSnippet.explanation}
                </p>
              </Card>
            </motion.div>
          )}

          {!isGenerating && !currentSnippet && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Empty state */}
              <div
                data-ocid="code.output.empty_state"
                className="mb-6 rounded-xl border-2 border-dashed border-border bg-muted/20 flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Terminal className="size-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">
                  Ready to generate code
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Choose a language, pick a model, describe what you need, and
                  hit Generate.
                </p>
              </div>

              {/* Example prompts */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="size-4 text-accent" />
                  <span className="text-sm font-semibold text-foreground">
                    Try an example
                  </span>
                </div>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                  data-ocid="code.examples.list"
                >
                  {EXAMPLE_PROMPTS.map((ex, idx) => (
                    <motion.button
                      key={ex.prompt}
                      type="button"
                      data-ocid={`code.examples.item.${idx + 1}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleExampleClick(ex)}
                      className="text-left rounded-xl border border-border bg-card p-3.5 hover:border-primary/30 hover:bg-primary/5 transition-smooth group"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl shrink-0">{ex.icon}</span>
                        <div className="min-w-0">
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 h-4 mb-1.5"
                          >
                            {LANGUAGE_LABELS[ex.language]}
                          </Badge>
                          <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors line-clamp-2">
                            {ex.prompt}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
