import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bot,
  Check,
  Loader2,
  Paperclip,
  Pencil,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MessageBubble } from "../components/MessageBubble";
import { ModelSelector } from "../components/ModelSelector";
import { useAiChat } from "../hooks/useAiChat";
import {
  useConversation,
  useDeleteConversation,
  useUpdateConversation,
} from "../hooks/useConversations";

function ThinkingIndicator() {
  return (
    <div
      className="flex gap-3 mb-5"
      data-ocid="chat.conversation.loading_state"
    >
      <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-card">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-2 rounded-full bg-primary/50 animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-2">Thinking…</span>
        </div>
      </div>
    </div>
  );
}

export default function ChatConversationPage() {
  const { conversationId } = useParams({ from: "/chat/$conversationId" });
  const navigate = useNavigate();
  const convId = BigInt(conversationId);

  const { data: detail, isLoading } = useConversation(convId);
  const deleteConversation = useDeleteConversation();
  const updateConversation = useUpdateConversation();
  const { sendMessage, isSending } = useAiChat({ conversationId: convId });

  const [draft, setDraft] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom on new messages
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  });

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || isSending) return;
    setDraft("");
    await sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this conversation? This cannot be undone."))
      return;
    await deleteConversation.mutateAsync(convId);
    navigate({ to: "/chat" });
  };

  const startRename = () => {
    setRenameValue(detail?.title ?? "");
    setIsRenaming(true);
  };

  const commitRename = async () => {
    const t = renameValue.trim();
    if (!t || t === detail?.title) {
      setIsRenaming(false);
      return;
    }
    try {
      await updateConversation.mutateAsync({
        conversationId: convId,
        title: t,
      });
      toast.success("Renamed!");
    } catch {
      toast.error("Failed to rename");
    } finally {
      setIsRenaming(false);
    }
  };

  const handleRenameKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commitRename();
    if (e.key === "Escape") setIsRenaming(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-6 max-w-3xl mx-auto">
        <Skeleton className="h-8 w-56 rounded-lg" />
        <Skeleton className="h-5 w-32 rounded" />
        <div className="space-y-4 mt-4">
          {["m1", "m2", "m3", "m4"].map((k) => (
            <Skeleton key={k} className="h-16 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full py-20 text-center"
        data-ocid="chat.conversation.error_state"
      >
        <Bot className="size-12 mx-auto mb-4 text-muted-foreground/40" />
        <p className="text-muted-foreground mb-4 font-medium">
          Conversation not found.
        </p>
        <Button
          variant="outline"
          data-ocid="chat.conversation.back.button"
          onClick={() => navigate({ to: "/chat" })}
        >
          Back to Chat
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-2.5 flex items-center gap-2 shrink-0 shadow-card">
        <Button
          data-ocid="chat.conversation.back.button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => navigate({ to: "/chat" })}
          aria-label="Back to conversations"
        >
          <ArrowLeft className="size-4" />
        </Button>

        {/* Title / rename */}
        <div className="flex-1 min-w-0">
          {isRenaming ? (
            <div className="flex items-center gap-1.5">
              <Input
                data-ocid="chat.conversation.rename.input"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={handleRenameKey}
                autoFocus
                className="h-7 text-sm"
              />
              <Button
                data-ocid="chat.conversation.rename.save_button"
                size="icon"
                variant="ghost"
                className="size-7 shrink-0"
                onClick={commitRename}
              >
                <Check className="size-3.5 text-primary" />
              </Button>
              <Button
                data-ocid="chat.conversation.rename.cancel_button"
                size="icon"
                variant="ghost"
                className="size-7 shrink-0"
                onClick={() => setIsRenaming(false)}
              >
                <X className="size-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 group">
              <h1 className="font-semibold text-foreground text-sm truncate">
                {detail.title}
              </h1>
              <button
                type="button"
                data-ocid="chat.conversation.rename.edit_button"
                onClick={startRename}
                className="opacity-0 group-hover:opacity-100 transition-smooth p-0.5 rounded hover:bg-muted"
                aria-label="Rename conversation"
              >
                <Pencil className="size-3 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>

        {/* Model selector */}
        <ModelSelector
          value={detail.model}
          onChange={(model) =>
            updateConversation.mutateAsync({ conversationId: convId, model })
          }
          compact
          disabled={isSending}
        />

        {/* Delete */}
        <Button
          data-ocid="chat.conversation.delete_button"
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="shrink-0 text-muted-foreground hover:text-destructive transition-smooth"
          aria-label="Delete conversation"
        >
          <Trash2 className="size-4" />
        </Button>
      </header>

      {/* Messages scroll area */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {detail.messages.length === 0 && !isSending ? (
            <div
              data-ocid="chat.conversation.empty_state"
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center size-16 rounded-2xl gradient-primary mb-4 shadow-elevated">
                <Bot className="size-8 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Start the conversation
              </h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Type a message below and your AI assistant will reply in
                seconds.
              </p>
            </div>
          ) : (
            <>
              {detail.messages.map((msg, idx) => (
                <MessageBubble
                  key={msg.id.toString()}
                  role={msg.role}
                  content={msg.content}
                  model={msg.model}
                  index={idx + 1}
                />
              ))}
              {isSending && <ThinkingIndicator />}
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div className={cn("shrink-0 bg-card border-t border-border px-4 py-3")}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 bg-background border border-border rounded-2xl px-3 py-2 shadow-card focus-within:border-primary/50 transition-smooth">
            {/* Attachment placeholder */}
            <button
              type="button"
              data-ocid="chat.conversation.attach.button"
              className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth mb-0.5"
              aria-label="Attach file"
              onClick={() => toast.info("File attachments coming soon!")}
            >
              <Paperclip className="size-4" />
            </button>

            <Textarea
              ref={textareaRef}
              data-ocid="chat.conversation.message.textarea"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Bricherds… (Enter to send, Shift+Enter for newline)"
              className="resize-none min-h-[38px] max-h-32 text-sm border-0 bg-transparent shadow-none focus-visible:ring-0 p-0 py-1"
              rows={1}
              disabled={isSending}
            />

            <Button
              data-ocid="chat.conversation.send.primary_button"
              onClick={handleSend}
              size="icon"
              disabled={!draft.trim() || isSending}
              className={cn(
                "shrink-0 mb-0.5 size-8 rounded-xl transition-smooth",
                draft.trim()
                  ? "gradient-primary text-white border-0 shadow-sm hover:opacity-90"
                  : "bg-muted text-muted-foreground",
              )}
              aria-label="Send message"
            >
              {isSending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground/60 mt-1.5">
            Bricherds may make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
