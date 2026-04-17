import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useState } from "react";
import { createActor } from "../backend";
import type { AiModel } from "../backend";
import { MessageRole } from "../backend";
import { useCreateConversation, useSendMessage } from "./useConversations";

export type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "rust"
  | "go"
  | "motoko"
  | "html"
  | "sql"
  | "bash"
  | "other";

export interface CodeSnippet {
  id: string;
  language: SupportedLanguage;
  prompt: string;
  code: string;
  explanation: string;
  model: AiModel;
  createdAt: Date;
}

export interface CodeGenerationState {
  snippets: CodeSnippet[];
  currentSnippet: CodeSnippet | null;
  isGenerating: boolean;
  error: string | null;
}

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  rust: "Rust",
  go: "Go",
  motoko: "Motoko",
  html: "HTML/CSS",
  sql: "SQL",
  bash: "Bash",
  other: "Other",
};

function buildPrompt(description: string, language: SupportedLanguage): string {
  const lang = LANGUAGE_LABELS[language];
  return [
    `Generate clean, production-ready ${lang} code for the following task:`,
    "",
    description,
    "",
    "Requirements:",
    `- Use ${lang} best practices and idioms`,
    "- Include comments where helpful",
    "- Make the code readable and maintainable",
    `- Wrap the code in a single fenced code block (\`\`\`${language})`,
    "- After the code block, provide a brief explanation of how it works",
  ].join("\n");
}

export function useCodeGeneration() {
  const createConversation = useCreateConversation();
  const sendMessage = useSendMessage();
  const { actor } = useActor(createActor);
  const [state, setState] = useState<CodeGenerationState>({
    snippets: [],
    currentSnippet: null,
    isGenerating: false,
    error: null,
  });

  const generateCode = useCallback(
    async (
      description: string,
      language: SupportedLanguage,
      model: AiModel,
    ) => {
      if (!description.trim()) return null;

      setState((s) => ({ ...s, isGenerating: true, error: null }));

      try {
        const conv = await createConversation.mutateAsync({
          title: `Code: ${description.slice(0, 40)}`,
          model,
        });

        await sendMessage.mutateAsync({
          conversationId: conv.id,
          content: buildPrompt(description, language),
          attachments: [],
        });

        // Poll for the assistant response (up to 30s, 2s interval)
        let rawContent = "";
        if (actor) {
          for (let attempt = 0; attempt < 15; attempt++) {
            await new Promise((r) => setTimeout(r, 2000));
            const detail = await actor.getConversation(conv.id);
            if (detail) {
              const assistantMsg = [...detail.messages]
                .reverse()
                .find((m) => m.role === MessageRole.assistant);
              if (assistantMsg?.content) {
                rawContent = assistantMsg.content;
                break;
              }
            }
          }
        }

        // Extract fenced code block and explanation from the response
        let code = rawContent;
        let explanation = "";
        if (rawContent) {
          const fenceMatch = rawContent.match(/```[\w-]*\n([\s\S]*?)```/);
          if (fenceMatch) {
            code = fenceMatch[1]?.trimEnd() ?? rawContent;
            const afterFence = rawContent
              .slice(rawContent.lastIndexOf("```") + 3)
              .trim();
            explanation =
              afterFence || "See the code above for implementation details.";
          } else {
            explanation = "See the code above for implementation details.";
          }
        } else {
          code =
            "// No response received \u2014 open the conversation to view the output.";
          explanation =
            "The AI response could not be retrieved. Open the conversation in Chat to view the full output.";
        }

        const snippet: CodeSnippet = {
          id: String(Date.now()),
          language,
          prompt: description,
          code,
          explanation,
          model,
          createdAt: new Date(),
        };

        setState((s) => ({
          ...s,
          isGenerating: false,
          currentSnippet: snippet,
          snippets: [snippet, ...s.snippets].slice(0, 20),
        }));

        return conv.id;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Generation failed";
        setState((s) => ({ ...s, isGenerating: false, error: message }));
        throw err;
      }
    },
    [createConversation, sendMessage, actor],
  );

  const setCurrentSnippet = useCallback((snippet: CodeSnippet) => {
    setState((s) => ({ ...s, currentSnippet: snippet }));
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return {
    ...state,
    generateCode,
    setCurrentSnippet,
    clearError,
  };
}
