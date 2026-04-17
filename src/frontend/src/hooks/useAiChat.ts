import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { ConversationId } from "../types";
import { useSendMessage } from "./useConversations";

interface UseAiChatOptions {
  conversationId: ConversationId;
}

interface UseAiChatReturn {
  sendMessage: (content: string) => Promise<void>;
  isSending: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Wraps useSendMessage with polling-based refresh so the AI response
 * appears as soon as the backend HTTP outcall resolves.
 *
 * The backend's sendMessage method:
 *  1. Stores the user message
 *  2. Calls the AI provider via HTTP outcall (blocking)
 *  3. Appends the assistant message
 *  4. Returns the new message id
 *
 * Once the mutation resolves we re-fetch the conversation — the assistant
 * reply is already stored, so a single invalidation is enough.
 */
export function useAiChat({
  conversationId,
}: UseAiChatOptions): UseAiChatReturn {
  const queryClient = useQueryClient();
  const sendMutation = useSendMessage();
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;
      setError(null);
      try {
        await sendMutation.mutateAsync({
          conversationId,
          content: trimmed,
          attachments: [],
        });
        // Refresh the conversation to show the assistant reply
        await queryClient.invalidateQueries({
          queryKey: ["conversation", conversationId.toString()],
        });
        // Also refresh the list so the sidebar counters update
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Failed to send message";
        setError(msg);
        toast.error(msg);
      }
    },
    [sendMutation, conversationId, queryClient],
  );

  return {
    sendMessage,
    isSending: sendMutation.isPending,
    error,
    clearError: () => setError(null),
  };
}
