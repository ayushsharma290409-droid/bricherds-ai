import { u as useAuth, a as useConversations, e as useCreateConversation, f as useNavigate, r as reactExports, A as AiModel, j as jsxRuntimeExports, m as motion, B as Bot, b as Button, P as Plus, d as Link, M as MessageSquare, g as cn, h as ue } from "./index-Dcr_jcQM.js";
import { B as Badge } from "./badge-D5uulW1x.js";
import { M as ModelSelector, g as getModelOption } from "./ModelSelector-LULfVfxE.js";
import { S as Sparkles } from "./sparkles-Dng1ye8p.js";
import { Z as Zap } from "./zap-CGZceSS8.js";
import "./Combination-t0jS6oQ9.js";
import "./chevron-down-DnxN-lix.js";
const starterPrompts = [
  { text: "Explain quantum computing in simple terms", icon: "🧠" },
  { text: "Help me write a professional email", icon: "✉️" },
  { text: "Best practices for React in 2025?", icon: "⚛️" },
  { text: "Create a workout plan for beginners", icon: "💪" },
  { text: "Summarize the history of AI", icon: "🤖" },
  { text: "Brainstorm business ideas for 2025", icon: "💡" }
];
function timeAgo(ts) {
  const ms = Number(ts) / 1e6;
  const diff = Date.now() - ms;
  if (diff < 6e4) return "Just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function ChatPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: conversations = [] } = useConversations();
  const createConversation = useCreateConversation();
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = reactExports.useState(AiModel.gpt4o);
  const handleNewChat = async (prompt) => {
    if (!isAuthenticated) {
      login();
      return;
    }
    try {
      const conv = await createConversation.mutateAsync({
        title: prompt ? prompt.slice(0, 50) : "New conversation",
        model: selectedModel
      });
      navigate({
        to: "/chat/$conversationId",
        params: { conversationId: conv.id.toString() }
      });
    } catch {
      ue.error("Failed to create conversation");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col min-h-full bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-3xl mx-auto w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        className: "w-full text-center mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center size-16 rounded-2xl gradient-primary mb-4 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-8 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground mb-2 leading-tight", children: "What can I help with?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-md mx-auto", children: "Choose your AI model and start a conversation. Your chats are saved automatically." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        className: "flex items-center gap-3 mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModelSelector,
            {
              value: selectedModel,
              onChange: setSelectedModel,
              disabled: createConversation.isPending
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "chat.new_chat.primary_button",
              onClick: () => handleNewChat(),
              size: "default",
              className: "gap-2 gradient-primary text-white border-0 shadow-elevated hover:opacity-90 transition-smooth",
              disabled: createConversation.isPending,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
                createConversation.isPending ? "Creating…" : "New Chat"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.18 },
        className: "w-full mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3 inline mr-1.5 text-accent" }),
            "Try a starter"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
              "data-ocid": "chat.starters.list",
              children: starterPrompts.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `chat.starters.item.${idx + 1}`,
                  onClick: () => handleNewChat(s.text),
                  disabled: createConversation.isPending,
                  className: "text-left text-sm px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/30 text-foreground transition-smooth disabled:opacity-50 group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2", children: s.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:text-primary transition-colors", children: s.text })
                  ]
                },
                s.text
              ))
            }
          )
        ]
      }
    ),
    isAuthenticated && conversations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.28 },
        className: "w-full",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Recent conversations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              conversations.length,
              " total"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-col gap-1.5",
              "data-ocid": "chat.recents.list",
              children: conversations.slice(0, 6).map((conv, idx) => {
                const meta = getModelOption(conv.model);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/chat/$conversationId",
                    params: { conversationId: conv.id.toString() },
                    "data-ocid": `chat.recents.item.${idx + 1}`,
                    className: "flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/20 transition-smooth group",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: cn(
                            "size-8 rounded-lg flex items-center justify-center shrink-0",
                            "bg-muted/70"
                          ),
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: cn("size-4", meta.color) })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors", children: conv.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                          conv.messageCount.toString(),
                          " messages ·",
                          " ",
                          timeAgo(conv.updatedAt)
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: cn(
                            "text-[10px] h-5 px-1.5 border shrink-0",
                            meta.badge
                          ),
                          children: meta.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3.5 text-muted-foreground/40 group-hover:text-accent transition-colors shrink-0" })
                    ]
                  },
                  conv.id.toString()
                );
              })
            }
          )
        ]
      }
    ),
    !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.3 },
        className: "w-full mt-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "chat.auth.empty_state",
            className: "rounded-xl border border-primary/20 bg-primary/5 px-6 py-5 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium mb-1", children: "Sign in to save your conversations" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "All your chats are persisted securely on-chain." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "chat.auth.login_button",
                  onClick: login,
                  size: "sm",
                  className: "gradient-primary text-white border-0",
                  children: "Sign In Free"
                }
              )
            ]
          }
        )
      }
    )
  ] }) });
}
export {
  ChatPage as default
};
