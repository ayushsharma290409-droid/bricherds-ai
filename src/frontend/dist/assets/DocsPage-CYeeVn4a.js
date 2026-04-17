import { c as createLucideIcon, r as reactExports, u as useAuth, h as ue, j as jsxRuntimeExports, m as motion, F as FileText, Q as AnimatePresence, b as Button, S as Skeleton, T as Trash2 } from "./index-Dcr_jcQM.js";
import { B as Badge } from "./badge-D5uulW1x.js";
import { C as Card } from "./card-Dof3mbnS.js";
import { I as Input } from "./input-CrV5KHbK.js";
import { T as Textarea } from "./textarea-BcDF1U6w.js";
import { X } from "./x-DmeE1Swz.js";
import { S as Sparkles } from "./sparkles-Dng1ye8p.js";
import { C as CircleAlert } from "./circle-alert-DOENLYgm.js";
import { H as History } from "./history-BrfW0uqy.js";
import { C as ChevronDown } from "./chevron-down-DnxN-lix.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
];
const ClipboardCopy = createLucideIcon("clipboard-copy", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
];
const FileImage = createLucideIcon("file-image", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
];
const ListChecks = createLucideIcon("list-checks", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M8 12a2 2 0 0 0 2-2V8H8", key: "1jfesj" }],
  ["path", { d: "M14 12a2 2 0 0 0 2-2V8h-2", key: "1dq9mh" }]
];
const MessageSquareQuote = createLucideIcon("message-square-quote", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const PROGRESS_MESSAGES = {
  summarize: [
    "Reading document...",
    "Extracting content...",
    "Generating summary..."
  ],
  describe: [
    "Loading image...",
    "Analyzing visual content...",
    "Describing..."
  ],
  extract: [
    "Parsing document...",
    "Identifying key points...",
    "Extracting insights..."
  ],
  qa: ["Processing document...", "Finding relevant context...", "Answering..."]
};
function formatFileSize$1(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function fileToText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
function isImageFile(file) {
  return ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
    file.type
  );
}
function buildPrompt(mode, fileName, question) {
  switch (mode) {
    case "summarize":
      return `Please provide a clear and concise summary of the following document "${fileName}". Capture the main ideas, key arguments, and important conclusions. Format your response with bullet points for key takeaways and a brief paragraph summary at the end.

Document content:
`;
    case "describe":
      return `Please provide a detailed description of this image "${fileName}". Describe what you see including subjects, colors, composition, mood, and any text visible. Be specific and thorough.

`;
    case "extract":
      return `Extract and organize the key points from the following document "${fileName}". Present them as a numbered list grouped by topic. Include important names, dates, figures, action items, and conclusions.

Document content:
`;
    case "qa":
      return `Based on the following document "${fileName}", please answer this question: "${question ?? "What is this document about?"}"

Provide a clear, direct answer with supporting evidence from the document.

Document content:
`;
    default:
      return `Analyze the document "${fileName}".

Content:
`;
  }
}
const OPENAI_API_KEY = "";
function useDocumentAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
  const [progressMessage, setProgressMessage] = reactExports.useState("");
  const [analysisResult, setAnalysisResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const runProgressMessages = reactExports.useCallback(
    async (mode) => {
      const messages = PROGRESS_MESSAGES[mode];
      let idx = 0;
      setProgressMessage(messages[0] ?? "Analyzing...");
      const interval = setInterval(() => {
        idx = (idx + 1) % messages.length;
        setProgressMessage(messages[idx] ?? "Analyzing...");
      }, 1800);
      return () => clearInterval(interval);
    },
    []
  );
  const analyze = reactExports.useCallback(
    async (file, mode, question) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      setIsAnalyzing(true);
      setAnalysisResult(null);
      setError(null);
      const stopProgress = await runProgressMessages(mode);
      try {
        let result = "";
        if (isImageFile(file)) {
          const base64 = await fileToBase64(file);
          const mimeType = file.type;
          const systemPrompt = mode === "describe" ? "You are an expert image analyst. Provide detailed, insightful descriptions." : "You are a helpful AI assistant that analyzes images and answers questions about them.";
          const userContent = mode === "qa" && question ? [
            {
              type: "text",
              text: `Question about this image: ${question}`
            },
            {
              type: "image_url",
              image_url: { url: `data:${mimeType};base64,${base64}` }
            }
          ] : [
            {
              type: "text",
              text: `Please ${mode === "summarize" ? "summarize" : mode === "extract" ? "extract key points from" : "describe"} this image in detail.`
            },
            {
              type: "image_url",
              image_url: { url: `data:${mimeType};base64,${base64}` }
            }
          ];
          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`
              },
              body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                  { role: "system", content: systemPrompt },
                  { role: "user", content: userContent }
                ],
                max_tokens: 1024
              })
            }
          );
          if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(
              ((_a = err == null ? void 0 : err.error) == null ? void 0 : _a.message) ?? `API error: ${response.status}`
            );
          }
          const data = await response.json();
          result = ((_d = (_c = (_b = data == null ? void 0 : data.choices) == null ? void 0 : _b[0]) == null ? void 0 : _c.message) == null ? void 0 : _d.content) ?? "No analysis result returned.";
        } else {
          let textContent = "";
          if (file.type === "application/pdf") {
            textContent = `[PDF file "${file.name}" — ${formatFileSize$1(file.size)}. Text extraction is limited in browser. Please analyze based on filename and provide a general response.]`;
            try {
              textContent = await fileToText(file);
            } catch {
            }
          } else {
            textContent = await fileToText(file);
          }
          const prompt = buildPrompt(mode, file.name, question) + textContent;
          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`
              },
              body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                  {
                    role: "system",
                    content: "You are an expert document analyst. Provide clear, structured, and insightful analysis."
                  },
                  { role: "user", content: prompt }
                ],
                max_tokens: 1500
              })
            }
          );
          if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(
              ((_e = err == null ? void 0 : err.error) == null ? void 0 : _e.message) ?? `API error: ${response.status}`
            );
          }
          const data = await response.json();
          result = ((_h = (_g = (_f = data == null ? void 0 : data.choices) == null ? void 0 : _f[0]) == null ? void 0 : _g.message) == null ? void 0 : _h.content) ?? "No analysis result returned.";
        }
        setAnalysisResult(result);
        const entry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          mode,
          question,
          result,
          analyzedAt: /* @__PURE__ */ new Date()
        };
        setHistory((prev) => [entry, ...prev.slice(0, 19)]);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Analysis failed. Please try again.";
        setError(message);
      } finally {
        stopProgress();
        setIsAnalyzing(false);
        setProgressMessage("");
      }
    },
    [runProgressMessages]
  );
  const clearResult = reactExports.useCallback(() => {
    setAnalysisResult(null);
    setError(null);
  }, []);
  const clearHistory = reactExports.useCallback(() => {
    setHistory([]);
  }, []);
  return {
    isAnalyzing,
    progressMessage,
    analysisResult,
    history,
    error,
    analyze,
    clearResult,
    clearHistory
  };
}
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "text/plain",
  "text/markdown"
];
const ACCEPTED_EXTENSIONS = ".pdf,.png,.jpg,.jpeg,.webp,.txt,.md";
const MAX_SIZE_MB = 20;
const ANALYSIS_MODES = [
  {
    id: "summarize",
    label: "Summarize",
    icon: FileText,
    description: "Get a clear, concise overview",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    id: "describe",
    label: "Describe",
    icon: FileImage,
    description: "Detailed visual description",
    color: "text-chart-4",
    bg: "bg-chart-4/10"
  },
  {
    id: "extract",
    label: "Key Points",
    icon: ListChecks,
    description: "Extract important insights",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    id: "qa",
    label: "Q&A",
    icon: MessageSquareQuote,
    description: "Ask a specific question",
    color: "text-chart-5",
    bg: "bg-chart-5/10"
  }
];
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function getFileIcon(mimeType) {
  if (mimeType.startsWith("image/")) return FileImage;
  return FileText;
}
function getModeLabel(mode) {
  var _a;
  return ((_a = ANALYSIS_MODES.find((m) => m.id === mode)) == null ? void 0 : _a.label) ?? mode;
}
function formatRelativeTime(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
function HistoryItem({
  entry,
  index,
  onRestore
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const FileIcon = getFileIcon(entry.fileType);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      "data-ocid": `docs.history.item.${index + 1}`,
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.05 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 hover:shadow-card transition-smooth", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "w-full text-left",
            onClick: () => setExpanded((v) => !v),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 size-9 rounded-lg bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileIcon, { className: "size-4 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: entry.fileName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs px-1.5 py-0", children: getModeLabel(entry.mode) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatRelativeTime(entry.analyzedAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatFileSize(entry.fileSize) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: `shrink-0 size-4 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-180" : ""}`
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border", children: [
              entry.question && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2 italic", children: [
                "Q: ",
                entry.question
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap line-clamp-4", children: entry.result }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "mt-2 h-7 text-xs text-primary",
                  onClick: () => onRestore(entry),
                  children: "View full result"
                }
              )
            ] })
          }
        ) })
      ] })
    }
  );
}
function DocsPage() {
  var _a;
  const { isAuthenticated, login } = useAuth();
  const {
    isAnalyzing,
    progressMessage,
    analysisResult,
    history,
    error,
    analyze,
    clearResult,
    clearHistory
  } = useDocumentAnalysis();
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [dragOver, setDragOver] = reactExports.useState(false);
  const [selectedMode, setSelectedMode] = reactExports.useState("summarize");
  const [question, setQuestion] = reactExports.useState("");
  const [restoredResult, setRestoredResult] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const displayResult = restoredResult ?? analysisResult;
  const validateAndSet = reactExports.useCallback(
    (file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        ue.error(
          "Unsupported file type. Please upload PDF, image, or text."
        );
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        ue.error(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
        return;
      }
      setSelectedFile(file);
      setRestoredResult(null);
      clearResult();
    },
    [clearResult]
  );
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSet(file);
    },
    [validateAndSet]
  );
  const handleFileChange = reactExports.useCallback(
    (e) => {
      var _a2;
      const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
      if (file) validateAndSet(file);
    },
    [validateAndSet]
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
      selectedMode === "qa" ? question : void 0
    );
  };
  const handleCopyResult = () => {
    if (!displayResult) return;
    navigator.clipboard.writeText(displayResult).then(() => {
      ue.success("Result copied to clipboard!");
    });
  };
  const handleRestoreHistory = (entry) => {
    setRestoredResult(entry.result);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const FileIcon = selectedFile ? getFileIcon(selectedFile.type) : Upload;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center size-12 rounded-2xl bg-chart-4/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-6 text-chart-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Docs & File Analysis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upload any file — AI reads, summarizes, and extracts insights" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "docs.upload.dropzone",
              onDragOver: (e) => {
                e.preventDefault();
                setDragOver(true);
              },
              onDragLeave: () => setDragOver(false),
              onDrop: handleDrop,
              className: [
                "relative w-full border-2 border-dashed rounded-xl p-8 cursor-pointer text-center transition-smooth",
                dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-muted/30",
                selectedFile ? "border-chart-4/60 bg-chart-4/5" : ""
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: ACCEPTED_EXTENSIONS,
                    className: "hidden",
                    onChange: handleFileChange,
                    "data-ocid": "docs.upload.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: selectedFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.95 },
                    className: "flex items-center gap-4",
                    onClick: (e) => e.stopPropagation(),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-xl bg-chart-4/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileIcon, { className: "size-6 text-chart-4" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: selectedFile.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                          formatFileSize(selectedFile.size),
                          " ·",
                          " ",
                          (_a = selectedFile.type.split("/")[1]) == null ? void 0 : _a.toUpperCase()
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": "docs.upload.clear_button",
                          onClick: (e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            clearResult();
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          },
                          className: "shrink-0 size-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-smooth",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
                        }
                      )
                    ]
                  },
                  "file-selected"
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-10 mx-auto text-muted-foreground/40 mb-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: isAuthenticated ? "Drop a file here, or:" : "Sign in to upload and analyze files" }),
                      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            var _a2;
                            return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                          },
                          className: "mb-3 text-sm font-medium text-primary hover:underline",
                          children: "Click to browse"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
                        "PDF, PNG, JPG, WEBP, TXT, MD — up to ",
                        MAX_SIZE_MB,
                        "MB"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-1.5", children: ["PDF", "PNG", "JPG", "WEBP", "TXT", "MD"].map((ext) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-xs",
                          children: ext
                        },
                        ext
                      )) })
                    ]
                  },
                  "file-empty"
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", "data-ocid": "docs.mode.list", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3", children: "Analysis type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: ANALYSIS_MODES.map((m) => {
              const Icon = m.icon;
              const isActive = selectedMode === m.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `docs.mode.${m.id}`,
                  onClick: () => setSelectedMode(m.id),
                  className: [
                    "flex items-center gap-2.5 p-3 rounded-xl border text-left transition-smooth",
                    isActive ? "border-primary bg-primary/8 shadow-card" : "border-border hover:border-primary/40 hover:bg-muted/40"
                  ].join(" "),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `shrink-0 size-8 rounded-lg flex items-center justify-center ${isActive ? m.bg : "bg-muted"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Icon,
                          {
                            className: `size-4 ${isActive ? m.color : "text-muted-foreground"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`,
                        children: m.label
                      }
                    ) })
                  ]
                },
                m.id
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedMode === "qa" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "docs.qa.question_input",
                  placeholder: "What question do you want answered about this document?",
                  value: question,
                  onChange: (e) => setQuestion(e.target.value),
                  className: "bg-background"
                }
              ) })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "docs.analyze.primary_button",
                onClick: handleAnalyze,
                disabled: isAnalyzing || !selectedFile && isAuthenticated || selectedMode === "qa" && !question.trim() && isAuthenticated,
                className: "gap-2 gradient-primary text-white border-0 px-6",
                children: isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      animate: { rotate: 360 },
                      transition: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        ease: "linear"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" })
                    }
                  ),
                  "Analyzing…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
                  isAuthenticated ? "Analyze" : "Sign in to Analyze"
                ] })
              }
            ),
            displayResult && !isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                "data-ocid": "docs.result.copy_button",
                onClick: handleCopyResult,
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "size-3.5" }),
                  "Copy"
                ]
              }
            )
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-8 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          "data-ocid": "docs.analyze.loading_state",
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { scale: [1, 1.1, 1] },
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5 text-primary" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: progressMessage })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
            ] })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: error && !isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          "data-ocid": "docs.analyze.error_state",
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5 border-destructive/30 bg-destructive/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-5 text-destructive shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-1", children: "Analysis failed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: error })
            ] })
          ] }) })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: displayResult && !isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          "data-ocid": "docs.analyze.success_state",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 border-chart-4/20 bg-chart-4/3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-chart-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Analysis Result" }),
                selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-xs truncate max-w-[160px]",
                    children: selectedFile.name
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "docs.result.close_button",
                  onClick: () => {
                    clearResult();
                    setRestoredResult(null);
                  },
                  className: "size-6 rounded hover:bg-muted flex items-center justify-center text-muted-foreground transition-smooth",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                readOnly: true,
                value: displayResult,
                className: "resize-none min-h-[200px] bg-background text-sm font-mono border-border",
                "data-ocid": "docs.result.textarea"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                "data-ocid": "docs.result.copy_button_bottom",
                onClick: handleCopyResult,
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "size-3.5" }),
                  "Copy to Clipboard"
                ]
              }
            ) })
          ] })
        }
      ) }),
      !isAnalyzing && !displayResult && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "docs.analyze.empty_state",
          className: "text-center py-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-14 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-7 text-muted-foreground/40" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No analysis yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Upload a file and choose an analysis type to get started" })
          ]
        }
      )
    ] }) }),
    history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-8 bg-muted/30 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Recent Analyses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: history.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "docs.history.clear_button",
            onClick: clearHistory,
            className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" }),
              "Clear all"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "docs.history.list", children: history.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        HistoryItem,
        {
          entry,
          index: idx,
          onRestore: handleRestoreHistory
        },
        entry.id
      )) })
    ] }) })
  ] });
}
export {
  DocsPage as default
};
