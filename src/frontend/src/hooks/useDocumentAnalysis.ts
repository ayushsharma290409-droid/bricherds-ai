import { useCallback, useState } from "react";

export type AnalysisMode = "summarize" | "describe" | "extract" | "qa";

export interface AnalysisHistoryEntry {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  mode: AnalysisMode;
  question?: string;
  result: string;
  analyzedAt: Date;
}

interface UseDocumentAnalysisReturn {
  isAnalyzing: boolean;
  progressMessage: string;
  analysisResult: string | null;
  history: AnalysisHistoryEntry[];
  error: string | null;
  analyze: (file: File, mode: AnalysisMode, question?: string) => Promise<void>;
  clearResult: () => void;
  clearHistory: () => void;
}

const PROGRESS_MESSAGES: Record<AnalysisMode, string[]> = {
  summarize: [
    "Reading document...",
    "Extracting content...",
    "Generating summary...",
  ],
  describe: [
    "Loading image...",
    "Analyzing visual content...",
    "Describing...",
  ],
  extract: [
    "Parsing document...",
    "Identifying key points...",
    "Extracting insights...",
  ],
  qa: ["Processing document...", "Finding relevant context...", "Answering..."],
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip data URL prefix to get raw base64
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function fileToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function isImageFile(file: File): boolean {
  return ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
    file.type,
  );
}

function buildPrompt(
  mode: AnalysisMode,
  fileName: string,
  question?: string,
): string {
  switch (mode) {
    case "summarize":
      return `Please provide a clear and concise summary of the following document "${fileName}". Capture the main ideas, key arguments, and important conclusions. Format your response with bullet points for key takeaways and a brief paragraph summary at the end.\n\nDocument content:\n`;
    case "describe":
      return `Please provide a detailed description of this image "${fileName}". Describe what you see including subjects, colors, composition, mood, and any text visible. Be specific and thorough.\n\n`;
    case "extract":
      return `Extract and organize the key points from the following document "${fileName}". Present them as a numbered list grouped by topic. Include important names, dates, figures, action items, and conclusions.\n\nDocument content:\n`;
    case "qa":
      return `Based on the following document "${fileName}", please answer this question: "${question ?? "What is this document about?"}"\n\nProvide a clear, direct answer with supporting evidence from the document.\n\nDocument content:\n`;
    default:
      return `Analyze the document "${fileName}".\n\nContent:\n`;
  }
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY ?? "";

export function useDocumentAnalysis(): UseDocumentAnalysisReturn {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisHistoryEntry[]>([]);

  const runProgressMessages = useCallback(
    async (mode: AnalysisMode): Promise<() => void> => {
      const messages = PROGRESS_MESSAGES[mode];
      let idx = 0;
      setProgressMessage(messages[0] ?? "Analyzing...");
      const interval = setInterval(() => {
        idx = (idx + 1) % messages.length;
        setProgressMessage(messages[idx] ?? "Analyzing...");
      }, 1800);
      return () => clearInterval(interval);
    },
    [],
  );

  const analyze = useCallback(
    async (file: File, mode: AnalysisMode, question?: string) => {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      setError(null);

      const stopProgress = await runProgressMessages(mode);

      try {
        let result = "";

        if (isImageFile(file)) {
          // Vision API path for images
          const base64 = await fileToBase64(file);
          const mimeType = file.type;

          const systemPrompt =
            mode === "describe"
              ? "You are an expert image analyst. Provide detailed, insightful descriptions."
              : "You are a helpful AI assistant that analyzes images and answers questions about them.";

          const userContent =
            mode === "qa" && question
              ? [
                  {
                    type: "text" as const,
                    text: `Question about this image: ${question}`,
                  },
                  {
                    type: "image_url" as const,
                    image_url: { url: `data:${mimeType};base64,${base64}` },
                  },
                ]
              : [
                  {
                    type: "text" as const,
                    text: `Please ${mode === "summarize" ? "summarize" : mode === "extract" ? "extract key points from" : "describe"} this image in detail.`,
                  },
                  {
                    type: "image_url" as const,
                    image_url: { url: `data:${mimeType};base64,${base64}` },
                  },
                ];

          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
              },
              body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                  { role: "system", content: systemPrompt },
                  { role: "user", content: userContent },
                ],
                max_tokens: 1024,
              }),
            },
          );

          if (!response.ok) {
            const err = (await response.json().catch(() => ({}))) as {
              error?: { message?: string };
            };
            throw new Error(
              err?.error?.message ?? `API error: ${response.status}`,
            );
          }

          const data = (await response.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          result =
            data?.choices?.[0]?.message?.content ??
            "No analysis result returned.";
        } else {
          // Text/document path
          let textContent = "";
          if (file.type === "application/pdf") {
            // For PDF, we send as base64 with a prompt to extract content
            textContent = `[PDF file "${file.name}" — ${formatFileSize(file.size)}. Text extraction is limited in browser. Please analyze based on filename and provide a general response.]`;
            // Attempt text extraction fallback
            try {
              textContent = await fileToText(file);
            } catch {
              // Keep the fallback message
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
                Authorization: `Bearer ${OPENAI_API_KEY}`,
              },
              body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                  {
                    role: "system",
                    content:
                      "You are an expert document analyst. Provide clear, structured, and insightful analysis.",
                  },
                  { role: "user", content: prompt },
                ],
                max_tokens: 1500,
              }),
            },
          );

          if (!response.ok) {
            const err = (await response.json().catch(() => ({}))) as {
              error?: { message?: string };
            };
            throw new Error(
              err?.error?.message ?? `API error: ${response.status}`,
            );
          }

          const data = (await response.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          result =
            data?.choices?.[0]?.message?.content ??
            "No analysis result returned.";
        }

        setAnalysisResult(result);

        // Save to history
        const entry: AnalysisHistoryEntry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          mode,
          question,
          result,
          analyzedAt: new Date(),
        };
        setHistory((prev) => [entry, ...prev.slice(0, 19)]);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Analysis failed. Please try again.";
        setError(message);
      } finally {
        stopProgress();
        setIsAnalyzing(false);
        setProgressMessage("");
      }
    },
    [runProgressMessages],
  );

  const clearResult = useCallback(() => {
    setAnalysisResult(null);
    setError(null);
  }, []);

  const clearHistory = useCallback(() => {
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
    clearHistory,
  };
}
