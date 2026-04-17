import { c as createLucideIcon, i as MessageRole, r as reactExports, j as jsxRuntimeExports, g as cn, b as Button, k as useQueryClient, l as useSendMessage, h as ue, n as useParams, f as useNavigate, o as useConversation, p as useDeleteConversation, q as useUpdateConversation, S as Skeleton, B as Bot, T as Trash2, s as ScrollArea } from "./index-Dcr_jcQM.js";
import { I as Input } from "./input-CrV5KHbK.js";
import { T as Textarea } from "./textarea-BcDF1U6w.js";
import { B as Badge } from "./badge-D5uulW1x.js";
import { g as getModelOption, M as ModelSelector } from "./ModelSelector-LULfVfxE.js";
import { C as Check } from "./Combination-t0jS6oQ9.js";
import { C as Copy, L as LoaderCircle } from "./loader-circle-Dw2zio18.js";
import { X } from "./x-DmeE1Swz.js";
import "./chevron-down-DnxN-lix.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M13.234 20.252 21 12.3", key: "1cbrk9" }],
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486",
      key: "1pkts6"
    }
  ]
];
const Paperclip = createLucideIcon("paperclip", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function renderMarkdown(text) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "pre",
          {
            className: "bg-muted/60 border border-border rounded-xl p-3 my-2 overflow-x-auto",
            children: [
              lang && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-muted-foreground mb-1.5 uppercase tracking-wider font-mono", children: lang }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-xs leading-relaxed text-foreground", children: codeLines.join("\n") })
            ]
          },
          i
        )
      );
      i++;
      continue;
    }
    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h1 = line.match(/^# (.+)/);
    if (h1) {
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold mt-3 mb-1.5", children: h1[1] }, i)
      );
      i++;
      continue;
    }
    if (h2) {
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold mt-3 mb-1", children: h2[1] }, i)
      );
      i++;
      continue;
    }
    if (h3) {
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold mt-2 mb-1", children: h3[1] }, i)
      );
      i++;
      continue;
    }
    if (line.match(/^[-*_]{3,}$/)) {
      elements.push(/* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "my-2 border-border" }, i));
      i++;
      continue;
    }
    if (line.match(/^[*-] /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[*-] /)) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside mb-2 space-y-0.5 pl-1", children: items.map((item) => (
          // biome-ignore lint/correctness/useJsxKeyInIterable: item text is unique enough
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "li",
            {
              className: "text-sm leading-relaxed",
              children: inlineMarkdown(item)
            },
            `li-${item.slice(0, 20)}`
          )
        )) }, i)
      );
      continue;
    }
    if (line.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "list-decimal list-inside mb-2 space-y-0.5 pl-1", children: items.map((item) => (
          // biome-ignore lint/correctness/useJsxKeyInIterable: item text is unique enough
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "li",
            {
              className: "text-sm leading-relaxed",
              children: inlineMarkdown(item)
            },
            `oli-${item.slice(0, 20)}`
          )
        )) }, i)
      );
      continue;
    }
    if (line.startsWith("> ")) {
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "blockquote",
          {
            className: "border-l-2 border-primary/40 pl-3 italic text-muted-foreground my-1.5 text-sm",
            children: inlineMarkdown(line.slice(2))
          },
          i
        )
      );
      i++;
      continue;
    }
    if (line.trim() === "") {
      elements.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" }, i));
      i++;
      continue;
    }
    elements.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-0.5", children: inlineMarkdown(line) }, i)
    );
    i++;
  }
  return elements;
}
function inlineMarkdown(text) {
  const parts = [];
  const re = /(\*\*(.+?)\*\*|__(.+?)__|`([^`]+)`|\*(.+?)\*|_(.+?)_|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match;
  match = re.exec(text);
  while (match !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[2] || match[3]) {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: match[2] ?? match[3] }, match.index)
      );
    } else if (match[4]) {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "code",
          {
            className: "bg-muted/70 rounded px-1.5 py-0.5 font-mono text-[0.82em]",
            children: match[4]
          },
          match.index
        )
      );
    } else if (match[5] || match[6]) {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic", children: match[5] ?? match[6] }, match.index)
      );
    } else if (match[7] && match[8]) {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: match[8],
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary underline underline-offset-2 hover:opacity-80",
            children: match[7]
          },
          match.index
        )
      );
    }
    last = match.index + match[0].length;
    match = re.exec(text);
  }
  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: parts });
}
function MessageBubble({
  role,
  content,
  model,
  index
}) {
  const isUser = role === MessageRole.user;
  const [copied, setCopied] = reactExports.useState(false);
  const modelMeta = model ? getModelOption(model) : null;
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": index !== void 0 ? `chat.message.${index}` : void 0,
      className: cn(
        "group flex gap-3 mb-5",
        isUser ? "flex-row-reverse" : "flex-row"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "size-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5",
              isUser ? "gradient-primary text-white shadow-sm" : "bg-muted border border-border text-muted-foreground"
            ),
            "aria-hidden": "true",
            children: isUser ? "Y" : "AI"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex flex-col max-w-[78%]",
              isUser ? "items-end" : "items-start"
            ),
            children: [
              !isUser && modelMeta && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "mb-1.5 text-[10px] h-4 px-1.5 border font-medium",
                    modelMeta.badge
                  ),
                  children: modelMeta.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    isUser ? "bg-primary text-primary-foreground rounded-tr-sm shadow-sm" : "bg-card border border-border text-foreground rounded-tl-sm shadow-card"
                  ),
                  children: isUser ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words text-sm", children: content }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: renderMarkdown(content) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": index !== void 0 ? `chat.message.copy_button.${index}` : "chat.message.copy_button",
                  variant: "ghost",
                  size: "icon",
                  onClick: handleCopy,
                  className: cn(
                    "mt-1 size-6 opacity-0 group-hover:opacity-100 transition-smooth",
                    isUser ? "mr-1" : "ml-1"
                  ),
                  "aria-label": "Copy message",
                  children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3 text-muted-foreground" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function useAiChat({
  conversationId
}) {
  const queryClient = useQueryClient();
  const sendMutation = useSendMessage();
  const [error, setError] = reactExports.useState(null);
  const sendMessage = reactExports.useCallback(
    async (content) => {
      const trimmed = content.trim();
      if (!trimmed) return;
      setError(null);
      try {
        await sendMutation.mutateAsync({
          conversationId,
          content: trimmed,
          attachments: []
        });
        await queryClient.invalidateQueries({
          queryKey: ["conversation", conversationId.toString()]
        });
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to send message";
        setError(msg);
        ue.error(msg);
      }
    },
    [sendMutation, conversationId, queryClient]
  );
  return {
    sendMessage,
    isSending: sendMutation.isPending,
    error,
    clearError: () => setError(null)
  };
}
function ThinkingIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-3 mb-5",
      "data-ocid": "chat.conversation.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "size-2 rounded-full bg-primary/50 animate-bounce",
              style: { animationDelay: `${i * 150}ms` }
            },
            i
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-2", children: "Thinking…" })
        ] }) })
      ]
    }
  );
}
function ChatConversationPage() {
  const { conversationId } = useParams({ from: "/chat/$conversationId" });
  const navigate = useNavigate();
  const convId = BigInt(conversationId);
  const { data: detail, isLoading } = useConversation(convId);
  const deleteConversation = useDeleteConversation();
  const updateConversation = useUpdateConversation();
  const { sendMessage, isSending } = useAiChat({ conversationId: convId });
  const [draft, setDraft] = reactExports.useState("");
  const [isRenaming, setIsRenaming] = reactExports.useState(false);
  const [renameValue, setRenameValue] = reactExports.useState("");
  const bottomRef = reactExports.useRef(null);
  const textareaRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  reactExports.useEffect(() => {
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
  const handleKeyDown = (e) => {
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
    setRenameValue((detail == null ? void 0 : detail.title) ?? "");
    setIsRenaming(true);
  };
  const commitRename = async () => {
    const t = renameValue.trim();
    if (!t || t === (detail == null ? void 0 : detail.title)) {
      setIsRenaming(false);
      return;
    }
    try {
      await updateConversation.mutateAsync({
        conversationId: convId,
        title: t
      });
      ue.success("Renamed!");
    } catch {
      ue.error("Failed to rename");
    } finally {
      setIsRenaming(false);
    }
  };
  const handleRenameKey = (e) => {
    if (e.key === "Enter") commitRename();
    if (e.key === "Escape") setIsRenaming(false);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-6 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mt-4", children: ["m1", "m2", "m3", "m4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-2xl" }, k)) })
    ] });
  }
  if (!detail) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-full py-20 text-center",
        "data-ocid": "chat.conversation.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-12 mx-auto mb-4 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4 font-medium", children: "Conversation not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              "data-ocid": "chat.conversation.back.button",
              onClick: () => navigate({ to: "/chat" }),
              children: "Back to Chat"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-card border-b border-border px-4 py-2.5 flex items-center gap-2 shrink-0 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "chat.conversation.back.button",
          variant: "ghost",
          size: "icon",
          className: "shrink-0",
          onClick: () => navigate({ to: "/chat" }),
          "aria-label": "Back to conversations",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: isRenaming ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "chat.conversation.rename.input",
            value: renameValue,
            onChange: (e) => setRenameValue(e.target.value),
            onKeyDown: handleRenameKey,
            autoFocus: true,
            className: "h-7 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "chat.conversation.rename.save_button",
            size: "icon",
            variant: "ghost",
            className: "size-7 shrink-0",
            onClick: commitRename,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "chat.conversation.rename.cancel_button",
            size: "icon",
            variant: "ghost",
            className: "size-7 shrink-0",
            onClick: () => setIsRenaming(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" })
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold text-foreground text-sm truncate", children: detail.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "chat.conversation.rename.edit_button",
            onClick: startRename,
            className: "opacity-0 group-hover:opacity-100 transition-smooth p-0.5 rounded hover:bg-muted",
            "aria-label": "Rename conversation",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3 text-muted-foreground" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ModelSelector,
        {
          value: detail.model,
          onChange: (model) => updateConversation.mutateAsync({ conversationId: convId, model }),
          compact: true,
          disabled: isSending
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "chat.conversation.delete_button",
          variant: "ghost",
          size: "icon",
          onClick: handleDelete,
          className: "shrink-0 text-muted-foreground hover:text-destructive transition-smooth",
          "aria-label": "Delete conversation",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-6", children: [
      detail.messages.length === 0 && !isSending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "chat.conversation.empty_state",
          className: "text-center py-20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center size-16 rounded-2xl gradient-primary mb-4 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-8 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-2", children: "Start the conversation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto", children: "Type a message below and your AI assistant will reply in seconds." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        detail.messages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          MessageBubble,
          {
            role: msg.role,
            content: msg.content,
            model: msg.model,
            index: idx + 1
          },
          msg.id.toString()
        )),
        isSending && /* @__PURE__ */ jsxRuntimeExports.jsx(ThinkingIndicator, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("shrink-0 bg-card border-t border-border px-4 py-3"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 bg-background border border-border rounded-2xl px-3 py-2 shadow-card focus-within:border-primary/50 transition-smooth", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "chat.conversation.attach.button",
            className: "shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth mb-0.5",
            "aria-label": "Attach file",
            onClick: () => ue.info("File attachments coming soon!"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            ref: textareaRef,
            "data-ocid": "chat.conversation.message.textarea",
            value: draft,
            onChange: (e) => setDraft(e.target.value),
            onKeyDown: handleKeyDown,
            placeholder: "Message Bricherds… (Enter to send, Shift+Enter for newline)",
            className: "resize-none min-h-[38px] max-h-32 text-sm border-0 bg-transparent shadow-none focus-visible:ring-0 p-0 py-1",
            rows: 1,
            disabled: isSending
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "chat.conversation.send.primary_button",
            onClick: handleSend,
            size: "icon",
            disabled: !draft.trim() || isSending,
            className: cn(
              "shrink-0 mb-0.5 size-8 rounded-xl transition-smooth",
              draft.trim() ? "gradient-primary text-white border-0 shadow-sm hover:opacity-90" : "bg-muted text-muted-foreground"
            ),
            "aria-label": "Send message",
            children: isSending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] text-muted-foreground/60 mt-1.5", children: "Bricherds may make mistakes. Verify important information." })
    ] }) })
  ] });
}
export {
  ChatConversationPage as default
};
