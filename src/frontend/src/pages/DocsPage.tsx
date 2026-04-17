import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ClipboardCopy,
  FileImage,
  FileText,
  History,
  ListChecks,
  MessageSquareQuote,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import {
  type AnalysisHistoryEntry,
  type AnalysisMode,
  useDocumentAnalysis,
} from "../hooks/useDocumentAnalysis";

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "text/plain",
  "text/markdown",
];
const ACCEPTED_EXTENSIONS = ".pdf,.png,.jpg,.jpeg,.webp,.txt,.md";
const MAX_SIZE_MB = 20;

const ANALYSIS_MODES: {
  id: AnalysisMode;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
  bg: string;
}[] = [
  {
    id: "summarize",
    label: "Summarize",
    icon: FileText,
    description: "Get a clear, concise overview",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "describe",
    label: "Describe",
    icon: FileImage,
    description: "Detailed visual description",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
  {
    id: "extract",
    label: "Key Points",
    icon: ListChecks,
    description: "Extract important insights",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    id: "qa",
    label: "Q&A",
    icon: MessageSquareQuote,
    description: "Ask a specific question",
    color: "text-chart-5",
    bg: "bg-chart-5/10",
  },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return FileImage;
  return FileText;
}

function getModeLabel(mode: AnalysisMode): string {
  return ANALYSIS_MODES.find((m) => m.id === mode)?.label ?? mode;
}

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HistoryItem({
  entry,
  index,
  onRestore,
}: {
  entry: AnalysisHistoryEntry;
  index: number;
  onRestore: (entry: AnalysisHistoryEntry) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const FileIcon = getFileIcon(entry.fileType);

  return (
    <motion.div
      data-ocid={`docs.history.item.${index + 1}`}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-4 hover:shadow-card transition-smooth">
        <button
          type="button"
          className="w-full text-left"
          onClick={() => setExpanded((v) => !v)}
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 size-9 rounded-lg bg-muted flex items-center justify-center">
              <FileIcon className="size-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {entry.fileName}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                  {getModeLabel(entry.mode)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(entry.analyzedAt)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(entry.fileSize)}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`shrink-0 size-4 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-border">
                {entry.question && (
                  <p className="text-xs text-muted-foreground mb-2 italic">
                    Q: {entry.question}
                  </p>
                )}
                <p className="text-sm text-foreground whitespace-pre-wrap line-clamp-4">
                  {entry.result}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-7 text-xs text-primary"
                  onClick={() => onRestore(entry)}
                >
                  View full result
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const { isAuthenticated, login } = useAuth();
  const {
    isAnalyzing,
    progressMessage,
    analysisResult,
    history,
    error,
    analyze,
    clearResult,
    clearHistory,
  } = useDocumentAnalysis();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedMode, setSelectedMode] = useState<AnalysisMode>("summarize");
  const [question, setQuestion] = useState("");
  const [restoredResult, setRestoredResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayResult = restoredResult ?? analysisResult;

  const validateAndSet = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error(
          "Unsupported file type. Please upload PDF, image, or text.",
        );
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
        return;
      }
      setSelectedFile(file);
      setRestoredResult(null);
      clearResult();
    },
    [clearResult],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSet(file);
    },
    [validateAndSet],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndSet(file);
    },
    [validateAndSet],
  );

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!selectedFile) return;
    setRestoredResult(null);
    await analyze(
      selectedFile,
      selectedMode,
      selectedMode === "qa" ? question : undefined,
    );
  };

  const handleCopyResult = () => {
    if (!displayResult) return;
    navigator.clipboard.writeText(displayResult).then(() => {
      toast.success("Result copied to clipboard!");
    });
  };

  const handleRestoreHistory = (entry: AnalysisHistoryEntry) => {
    setRestoredResult(entry.result);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const FileIcon = selectedFile ? getFileIcon(selectedFile.type) : Upload;

  return (
    <div className="min-h-full bg-background">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-chart-4/10">
                <FileText className="size-6 text-chart-4" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Docs & File Analysis
                </h1>
                <p className="text-sm text-muted-foreground">
                  Upload any file — AI reads, summarizes, and extracts insights
                </p>
              </div>
            </div>

            {/* Drop Zone */}
            <div
              data-ocid="docs.upload.dropzone"
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={[
                "relative w-full border-2 border-dashed rounded-xl p-8 cursor-pointer text-center transition-smooth",
                dragOver
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : "border-border hover:border-primary/50 hover:bg-muted/30",
                selectedFile ? "border-chart-4/60 bg-chart-4/5" : "",
              ].join(" ")}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                className="hidden"
                onChange={handleFileChange}
                data-ocid="docs.upload.input"
              />

              <AnimatePresence mode="wait">
                {selectedFile ? (
                  <motion.div
                    key="file-selected"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="size-12 rounded-xl bg-chart-4/10 flex items-center justify-center shrink-0">
                      <FileIcon className="size-6 text-chart-4" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(selectedFile.size)} ·{" "}
                        {selectedFile.type.split("/")[1]?.toUpperCase()}
                      </p>
                    </div>
                    <button
                      type="button"
                      data-ocid="docs.upload.clear_button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        clearResult();
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className="shrink-0 size-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-smooth"
                    >
                      <X className="size-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Upload className="size-10 mx-auto text-muted-foreground/40 mb-3" />
                    <p className="font-medium text-foreground mb-1">
                      {isAuthenticated
                        ? "Drop a file here, or:"
                        : "Sign in to upload and analyze files"}
                    </p>
                    {isAuthenticated && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mb-3 text-sm font-medium text-primary hover:underline"
                      >
                        Click to browse
                      </button>
                    )}
                    <p className="text-sm text-muted-foreground mb-4">
                      PDF, PNG, JPG, WEBP, TXT, MD — up to {MAX_SIZE_MB}MB
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {["PDF", "PNG", "JPG", "WEBP", "TXT", "MD"].map((ext) => (
                        <Badge
                          key={ext}
                          variant="secondary"
                          className="text-xs"
                        >
                          {ext}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Analysis Mode Selector */}
            <div className="mt-5" data-ocid="docs.mode.list">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Analysis type
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ANALYSIS_MODES.map((m) => {
                  const Icon = m.icon;
                  const isActive = selectedMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      data-ocid={`docs.mode.${m.id}`}
                      onClick={() => setSelectedMode(m.id)}
                      className={[
                        "flex items-center gap-2.5 p-3 rounded-xl border text-left transition-smooth",
                        isActive
                          ? "border-primary bg-primary/8 shadow-card"
                          : "border-border hover:border-primary/40 hover:bg-muted/40",
                      ].join(" ")}
                    >
                      <div
                        className={`shrink-0 size-8 rounded-lg flex items-center justify-center ${isActive ? m.bg : "bg-muted"}`}
                      >
                        <Icon
                          className={`size-4 ${isActive ? m.color : "text-muted-foreground"}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {m.label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q&A custom question */}
            <AnimatePresence>
              {selectedMode === "qa" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4">
                    <Input
                      data-ocid="docs.qa.question_input"
                      placeholder="What question do you want answered about this document?"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analyze Button */}
            <div className="mt-5 flex items-center gap-3">
              <Button
                data-ocid="docs.analyze.primary_button"
                onClick={handleAnalyze}
                disabled={
                  isAnalyzing ||
                  (!selectedFile && isAuthenticated) ||
                  (selectedMode === "qa" && !question.trim() && isAuthenticated)
                }
                className="gap-2 gradient-primary text-white border-0 px-6"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="size-4" />
                    </motion.div>
                    Analyzing…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    {isAuthenticated ? "Analyze" : "Sign in to Analyze"}
                  </>
                )}
              </Button>

              {displayResult && !isAnalyzing && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  data-ocid="docs.result.copy_button"
                  onClick={handleCopyResult}
                  className="gap-2"
                >
                  <ClipboardCopy className="size-3.5" />
                  Copy
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Result Panel ─────────────────────────────────────── */}
      <section className="px-6 py-8 bg-background">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Loading skeleton */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                data-ocid="docs.analyze.loading_state"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1.5,
                      }}
                    >
                      <Sparkles className="size-5 text-primary" />
                    </motion.div>
                    <span className="text-sm font-medium text-foreground">
                      {progressMessage}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error state */}
          <AnimatePresence>
            {error && !isAnalyzing && (
              <motion.div
                data-ocid="docs.analyze.error_state"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Card className="p-5 border-destructive/30 bg-destructive/5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-destructive mb-1">
                        Analysis failed
                      </p>
                      <p className="text-sm text-muted-foreground">{error}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {displayResult && !isAnalyzing && (
              <motion.div
                data-ocid="docs.analyze.success_state"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Card className="p-6 border-chart-4/20 bg-chart-4/3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-chart-4" />
                      <span className="text-sm font-semibold text-foreground">
                        Analysis Result
                      </span>
                      {selectedFile && (
                        <Badge
                          variant="secondary"
                          className="text-xs truncate max-w-[160px]"
                        >
                          {selectedFile.name}
                        </Badge>
                      )}
                    </div>
                    <button
                      type="button"
                      data-ocid="docs.result.close_button"
                      onClick={() => {
                        clearResult();
                        setRestoredResult(null);
                      }}
                      className="size-6 rounded hover:bg-muted flex items-center justify-center text-muted-foreground transition-smooth"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                  <Textarea
                    readOnly
                    value={displayResult}
                    className="resize-none min-h-[200px] bg-background text-sm font-mono border-border"
                    data-ocid="docs.result.textarea"
                  />
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      data-ocid="docs.result.copy_button_bottom"
                      onClick={handleCopyResult}
                      className="gap-2"
                    >
                      <ClipboardCopy className="size-3.5" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state — first load */}
          {!isAnalyzing && !displayResult && !error && (
            <div
              data-ocid="docs.analyze.empty_state"
              className="text-center py-10"
            >
              <div className="size-14 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                <FileText className="size-7 text-muted-foreground/40" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                No analysis yet
              </p>
              <p className="text-xs text-muted-foreground">
                Upload a file and choose an analysis type to get started
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Analysis History ─────────────────────────────────── */}
      {history.length > 0 && (
        <section className="px-6 py-8 bg-muted/30 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <History className="size-4 text-muted-foreground" />
                <h2 className="font-semibold text-foreground">
                  Recent Analyses
                </h2>
                <Badge variant="secondary" className="text-xs">
                  {history.length}
                </Badge>
              </div>
              <button
                type="button"
                data-ocid="docs.history.clear_button"
                onClick={clearHistory}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-smooth"
              >
                <Trash2 className="size-3.5" />
                Clear all
              </button>
            </div>

            <div className="space-y-3" data-ocid="docs.history.list">
              {history.map((entry, idx) => (
                <HistoryItem
                  key={entry.id}
                  entry={entry}
                  index={idx}
                  onRestore={handleRestoreHistory}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
