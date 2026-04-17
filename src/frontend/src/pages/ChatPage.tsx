import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bot, MessageSquare, Plus, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { AiModel } from "../backend";
import { ModelSelector } from "../components/ModelSelector";
import { getModelOption } from "../components/ModelSelector";
import { useAuth } from "../hooks/useAuth";
import {
  useConversations,
  useCreateConversation,
} from "../hooks/useConversations";

const starterPrompts = [
  { text: "Explain quantum computing in simple terms", icon: "🧠" },
  { text: "Help me write a professional email", icon: "✉️" },
  { text: "Best practices for React in 2025?", icon: "⚛️" },
  { text: "Create a workout plan for beginners", icon: "💪" },
  { text: "Summarize the history of AI", icon: "🤖" },
  { text: "Brainstorm business ideas for 2025", icon: "💡" },
];

function timeAgo(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  const diff = Date.now() - ms;
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

export default function ChatPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: conversations = [] } = useConversations();
  const createConversation = useCreateConversation();
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState<AiModel>(AiModel.gpt4o);

  const handleNewChat = async (prompt?: string) => {
    if (!isAuthenticated) {
      login();
      return;
    }
    try {
      const conv = await createConversation.mutateAsync({
        title: prompt ? prompt.slice(0, 50) : "New conversation",
        model: selectedModel,
      });
      navigate({
        to: "/chat/$conversationId",
        params: { conversationId: conv.id.toString() },
      });
    } catch {
      toast.error("Failed to create conversation");
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Hero section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center mb-8"
        >
          <div className="inline-flex items-center justify-center size-16 rounded-2xl gradient-primary mb-4 shadow-elevated">
            <Bot className="size-8 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2 leading-tight">
            What can I help with?
          </h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Choose your AI model and start a conversation. Your chats are saved
            automatically.
          </p>
        </motion.div>

        {/* Model + New Chat row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <ModelSelector
            value={selectedModel}
            onChange={setSelectedModel}
            disabled={createConversation.isPending}
          />
          <Button
            data-ocid="chat.new_chat.primary_button"
            onClick={() => handleNewChat()}
            size="default"
            className="gap-2 gradient-primary text-white border-0 shadow-elevated hover:opacity-90 transition-smooth"
            disabled={createConversation.isPending}
          >
            <Plus className="size-4" />
            {createConversation.isPending ? "Creating…" : "New Chat"}
          </Button>
        </motion.div>

        {/* Starter prompts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="w-full mb-10"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
            <Sparkles className="size-3 inline mr-1.5 text-accent" />
            Try a starter
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            data-ocid="chat.starters.list"
          >
            {starterPrompts.map((s, idx) => (
              <button
                type="button"
                key={s.text}
                data-ocid={`chat.starters.item.${idx + 1}`}
                onClick={() => handleNewChat(s.text)}
                disabled={createConversation.isPending}
                className="text-left text-sm px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/30 text-foreground transition-smooth disabled:opacity-50 group"
              >
                <span className="mr-2">{s.icon}</span>
                <span className="group-hover:text-primary transition-colors">
                  {s.text}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent conversations */}
        {isAuthenticated && conversations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Recent conversations
              </p>
              <span className="text-xs text-muted-foreground">
                {conversations.length} total
              </span>
            </div>
            <div
              className="flex flex-col gap-1.5"
              data-ocid="chat.recents.list"
            >
              {conversations.slice(0, 6).map((conv, idx) => {
                const meta = getModelOption(conv.model);
                return (
                  <Link
                    key={conv.id.toString()}
                    to="/chat/$conversationId"
                    params={{ conversationId: conv.id.toString() }}
                    data-ocid={`chat.recents.item.${idx + 1}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/20 transition-smooth group"
                  >
                    <div
                      className={cn(
                        "size-8 rounded-lg flex items-center justify-center shrink-0",
                        "bg-muted/70",
                      )}
                    >
                      <MessageSquare className={cn("size-4", meta.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {conv.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {conv.messageCount.toString()} messages ·{" "}
                        {timeAgo(conv.updatedAt)}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] h-5 px-1.5 border shrink-0",
                        meta.badge,
                      )}
                    >
                      {meta.label}
                    </Badge>
                    <Zap className="size-3.5 text-muted-foreground/40 group-hover:text-accent transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Not logged in state */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full mt-6"
          >
            <div
              data-ocid="chat.auth.empty_state"
              className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-5 text-center"
            >
              <p className="text-sm text-foreground font-medium mb-1">
                Sign in to save your conversations
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                All your chats are persisted securely on-chain.
              </p>
              <Button
                data-ocid="chat.auth.login_button"
                onClick={login}
                size="sm"
                className="gradient-primary text-white border-0"
              >
                Sign In Free
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
