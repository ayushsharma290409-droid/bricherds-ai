import { c as createLucideIcon, u as useAuth, a as useConversations, j as jsxRuntimeExports, m as motion, L as Logo, B as Bot, b as Button, d as Link, M as MessageSquare, F as FileText, C as CodeXml, S as Skeleton } from "./index-Dcr_jcQM.js";
import { B as Badge } from "./badge-D5uulW1x.js";
import { C as Card, a as CardContent } from "./card-Dof3mbnS.js";
import { S as Sparkles } from "./sparkles-Dng1ye8p.js";
import { Z as Zap } from "./zap-CGZceSS8.js";
import { T as Terminal } from "./terminal-Du1Bm2c6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 8h8", key: "1jbsf9" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }],
  ["path", { d: "M7 16h6", key: "1vyc9m" }]
];
const ScanText = createLucideIcon("scan-text", __iconNode);
const features = [
  {
    id: "chat",
    icon: MessageSquare,
    altIcon: Bot,
    title: "Chat AI",
    description: "Natural conversations with GPT-4o, Claude, Grok & DeepSeek. Ask anything, brainstorm ideas, get answers — one interface, every model.",
    href: "/chat",
    color: "text-primary",
    bg: "bg-primary/10",
    borderHover: "hover:border-primary/40",
    badge: "Most popular",
    cta: "Start chatting"
  },
  {
    id: "image",
    icon: Sparkles,
    altIcon: Globe,
    title: "Image Generation",
    description: "Turn your words into stunning visuals. Generate, edit, and transform images with AI — from photorealism to abstract art.",
    href: "/image",
    color: "text-accent",
    bg: "bg-accent/10",
    borderHover: "hover:border-accent/40",
    badge: "Creative",
    cta: "Generate image"
  },
  {
    id: "docs",
    icon: FileText,
    altIcon: ScanText,
    title: "Document Analysis",
    description: "Upload PDFs, documents, or images and get instant summaries, key insights, Q&A, and translations — all AI-powered.",
    href: "/docs",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    borderHover: "hover:border-chart-4/40",
    badge: "Productivity",
    cta: "Analyze document"
  },
  {
    id: "code",
    icon: CodeXml,
    altIcon: Terminal,
    title: "Code Generation",
    description: "Write, debug, refactor, and explain code in any language. Build full apps and websites with your AI coding partner.",
    href: "/code",
    color: "text-chart-5",
    bg: "bg-chart-5/10",
    borderHover: "hover:border-chart-5/40",
    badge: "Developer",
    cta: "Write code"
  }
];
const stats = [
  { label: "AI models", value: "4", icon: Cpu },
  { label: "Free access", value: "100%", icon: Zap },
  { label: "Persistent history", value: "Always", icon: Clock },
  { label: "Features", value: "7+", icon: Sparkles }
];
const modelBadges = [
  { label: "GPT-4o", icon: Globe },
  { label: "Claude 3.5", icon: Bot },
  { label: "DeepSeek V3", icon: Cpu },
  { label: "Grok", icon: Sparkles }
];
function ConversationItem({
  conversation,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/chat/$conversationId",
      params: { conversationId: conversation.id.toString() },
      "data-ocid": `recent.item.${index + 1}`,
      className: "flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-smooth group border border-transparent hover:border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors", children: conversation.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate capitalize", children: conversation.model })
        ] })
      ]
    }
  );
}
function ConversationSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-lg flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-3/4 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2 rounded" })
    ] })
  ] });
}
function LoginPromptCard() {
  const { login, isLoading } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.45, duration: 0.45 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": "login.card",
          className: "border-primary/20 bg-primary/5 shadow-card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col items-center text-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: "Save your chats & history" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in to keep your conversations, images, and documents across sessions — completely free." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "login.primary_button",
                onClick: login,
                disabled: isLoading,
                className: "w-full",
                size: "lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 mr-2" }),
                  isLoading ? "Signing in…" : "Sign in / Sign up — it's free"
                ]
              }
            )
          ] })
        }
      )
    }
  );
}
function HomePage() {
  const { isAuthenticated, login } = useAuth();
  const { data: conversations, isLoading: convsLoading } = useConversations();
  const recentConvs = (conversations == null ? void 0 : conversations.slice(0, 5)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "hero.section",
        className: "relative bg-card border-b border-border px-6 py-14 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-primary opacity-[0.04] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "relative max-w-3xl mx-auto text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "lg" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "mb-4 bg-primary/10 text-primary border-primary/20 font-medium",
                    variant: "outline",
                    children: "✨ All AI power you need, in one place"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight", children: [
                  "All the AI power you need,",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-primary bg-clip-text text-transparent", children: "in one place." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed", children: "Chat with the world's best AI models, generate stunning images, analyze documents, and build code — all for free on one beautiful platform." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-8 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mr-1", children: "Powered by:" }),
                  modelBadges.map((m) => {
                    const Icon = m.icon;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "secondary",
                        className: "gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-3" }),
                          m.label
                        ]
                      },
                      m.label
                    );
                  })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-3 flex-wrap", children: !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "hero.signup.primary_button",
                      onClick: login,
                      size: "lg",
                      className: "gap-2 gradient-primary text-white border-0 shadow-elevated hover:opacity-90 transition-smooth",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4" }),
                        "Get Started Free"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      "data-ocid": "hero.chat.secondary_button",
                      size: "lg",
                      variant: "outline",
                      className: "gap-2",
                      asChild: true,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/chat", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-4" }),
                        "Try Chat Now"
                      ] })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "hero.chat.primary_button",
                    size: "lg",
                    className: "gap-2 gradient-primary text-white border-0 shadow-elevated hover:opacity-90 transition-smooth",
                    asChild: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/chat", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-4" }),
                      "Start Chatting"
                    ] })
                  }
                ) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "stats.section",
        className: "bg-muted/40 border-b border-border px-6 py-3.5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-7 gap-y-2", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -8 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.1 + i * 0.07, duration: 0.4 },
            className: "flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "w-3.5 h-3.5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: stat.label }),
              i < stats.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border ml-3 hidden sm:inline select-none", children: "·" })
            ]
          },
          stat.label
        )) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "features.section",
        className: "px-6 py-10 bg-background",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4 },
              className: "text-center mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Everything you need, nothing you don't" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Four powerful AI tools. Zero subscriptions. All free." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "features.list",
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
              children: features.map((feature, i) => {
                const Icon = feature.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    "data-ocid": `features.item.${i + 1}`,
                    initial: { opacity: 0, y: 22 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { delay: i * 0.09, duration: 0.44 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: feature.href, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `group h-full rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated ${feature.borderHover} transition-smooth hover:-translate-y-0.5 cursor-pointer`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: `w-11 h-11 rounded-xl flex items-center justify-center ${feature.bg} flex-shrink-0`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${feature.color}` })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs shrink-0", children: feature.badge })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: feature.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: feature.description }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: `text-xs font-semibold ${feature.color} group-hover:underline transition-smooth`,
                              children: [
                                feature.cta,
                                " →"
                              ]
                            }
                          )
                        ]
                      }
                    ) })
                  },
                  feature.id
                );
              })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "recent.section",
        className: "px-6 pb-10 bg-muted/30 border-t border-border",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto pt-8", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Recent conversations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "recent.view_all_button",
                variant: "ghost",
                size: "sm",
                asChild: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/chat", children: "View all" })
              }
            )
          ] }),
          convsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-3 space-y-1", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(ConversationSkeleton, {}, n)) }) }) : recentConvs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              "data-ocid": "recent.empty_state",
              className: "border-dashed border-border shadow-none",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 flex flex-col items-center text-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No conversations yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Start your first chat to see it here." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "recent.start_button", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/chat", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 mr-2" }),
                  "New chat"
                ] }) })
              ] })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardContent,
            {
              "data-ocid": "recent.list",
              className: "p-3 space-y-0.5",
              children: recentConvs.map((conv, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ConversationItem,
                {
                  conversation: conv,
                  index: i
                },
                conv.id.toString()
              ))
            }
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPromptCard, {}) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-12 bg-background border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Ready to supercharge your workflow?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Join thousands of creators, developers, and professionals using Bricherds.ai — completely free, forever." }),
          !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "cta.signup.primary_button",
              onClick: login,
              size: "lg",
              className: "gap-2 gradient-primary text-white border-0 shadow-elevated hover:opacity-90 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4" }),
                "Create Free Account"
              ]
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-card border-t border-border px-6 py-6 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Bricherds.ai. Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : ""
          )}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline",
          children: "caffeine.ai"
        }
      )
    ] })
  ] });
}
export {
  HomePage as default
};
