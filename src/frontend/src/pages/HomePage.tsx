import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Bot,
  Clock,
  Code2,
  Cpu,
  FileText,
  Globe,
  Lock,
  MessageSquare,
  ScanText,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "../components/Logo";
import { useAuth } from "../hooks/useAuth";
import { useConversations } from "../hooks/useConversations";
import type { Conversation } from "../types";

// --- Feature cards ---
const features = [
  {
    id: "chat",
    icon: MessageSquare,
    altIcon: Bot,
    title: "Chat AI",
    description:
      "Natural conversations with GPT-4o, Claude, Grok & DeepSeek. Ask anything, brainstorm ideas, get answers — one interface, every model.",
    href: "/chat",
    color: "text-primary",
    bg: "bg-primary/10",
    borderHover: "hover:border-primary/40",
    badge: "Most popular",
    cta: "Start chatting",
  },
  {
    id: "image",
    icon: Sparkles,
    altIcon: Globe,
    title: "Image Generation",
    description:
      "Turn your words into stunning visuals. Generate, edit, and transform images with AI — from photorealism to abstract art.",
    href: "/image",
    color: "text-accent",
    bg: "bg-accent/10",
    borderHover: "hover:border-accent/40",
    badge: "Creative",
    cta: "Generate image",
  },
  {
    id: "docs",
    icon: FileText,
    altIcon: ScanText,
    title: "Document Analysis",
    description:
      "Upload PDFs, documents, or images and get instant summaries, key insights, Q&A, and translations — all AI-powered.",
    href: "/docs",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    borderHover: "hover:border-chart-4/40",
    badge: "Productivity",
    cta: "Analyze document",
  },
  {
    id: "code",
    icon: Code2,
    altIcon: Terminal,
    title: "Code Generation",
    description:
      "Write, debug, refactor, and explain code in any language. Build full apps and websites with your AI coding partner.",
    href: "/code",
    color: "text-chart-5",
    bg: "bg-chart-5/10",
    borderHover: "hover:border-chart-5/40",
    badge: "Developer",
    cta: "Write code",
  },
] as const;

// --- Stats ---
const stats = [
  { label: "AI models", value: "4", icon: Cpu },
  { label: "Free access", value: "100%", icon: Zap },
  { label: "Persistent history", value: "Always", icon: Clock },
  { label: "Features", value: "7+", icon: Sparkles },
];

// --- Model badges ---
const modelBadges = [
  { label: "GPT-4o", icon: Globe },
  { label: "Claude 3.5", icon: Bot },
  { label: "DeepSeek V3", icon: Cpu },
  { label: "Grok", icon: Sparkles },
];

// --- Recent conversation row ---
function ConversationItem({
  conversation,
  index,
}: {
  conversation: Conversation;
  index: number;
}) {
  return (
    <Link
      to="/chat/$conversationId"
      params={{ conversationId: conversation.id.toString() }}
      data-ocid={`recent.item.${index + 1}`}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-smooth group border border-transparent hover:border-border"
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <MessageSquare className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {conversation.title}
        </p>
        <p className="text-xs text-muted-foreground truncate capitalize">
          {conversation.model}
        </p>
      </div>
    </Link>
  );
}

function ConversationSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

// --- Login prompt ---
function LoginPromptCard() {
  const { login, isLoading } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.45 }}
    >
      <Card
        data-ocid="login.card"
        className="border-primary/20 bg-primary/5 shadow-card"
      >
        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground mb-1">
              Save your chats &amp; history
            </h3>
            <p className="text-sm text-muted-foreground">
              Sign in to keep your conversations, images, and documents across
              sessions — completely free.
            </p>
          </div>
          <Button
            data-ocid="login.primary_button"
            onClick={login}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isLoading ? "Signing in…" : "Sign in / Sign up — it's free"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// --- Page ---
export default function HomePage() {
  const { isAuthenticated, login } = useAuth();
  const { data: conversations, isLoading: convsLoading } = useConversations();
  const recentConvs = conversations?.slice(0, 5) ?? [];

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Hero */}
      <section
        data-ocid="hero.section"
        className="relative bg-card border-b border-border px-6 py-14 overflow-hidden"
      >
        <div className="absolute inset-0 gradient-primary opacity-[0.04] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-5">
            <Logo size="lg" />
          </div>
          <Badge
            className="mb-4 bg-primary/10 text-primary border-primary/20 font-medium"
            variant="outline"
          >
            ✨ All AI power you need, in one place
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            All the AI power you need,{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              in one place.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Chat with the world's best AI models, generate stunning images,
            analyze documents, and build code — all for free on one beautiful
            platform.
          </p>

          {/* Model badges */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <span className="text-xs text-muted-foreground mr-1">
              Powered by:
            </span>
            {modelBadges.map((m) => {
              const Icon = m.icon;
              return (
                <Badge
                  key={m.label}
                  variant="secondary"
                  className="gap-1.5 text-xs"
                >
                  <Icon className="size-3" />
                  {m.label}
                </Badge>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {!isAuthenticated ? (
              <>
                <Button
                  data-ocid="hero.signup.primary_button"
                  onClick={login}
                  size="lg"
                  className="gap-2 gradient-primary text-white border-0 shadow-elevated hover:opacity-90 transition-smooth"
                >
                  <Zap className="size-4" />
                  Get Started Free
                </Button>
                <Button
                  data-ocid="hero.chat.secondary_button"
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  asChild
                >
                  <Link to="/chat">
                    <MessageSquare className="size-4" />
                    Try Chat Now
                  </Link>
                </Button>
              </>
            ) : (
              <Button
                data-ocid="hero.chat.primary_button"
                size="lg"
                className="gap-2 gradient-primary text-white border-0 shadow-elevated hover:opacity-90 transition-smooth"
                asChild
              >
                <Link to="/chat">
                  <MessageSquare className="size-4" />
                  Start Chatting
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section
        data-ocid="stats.section"
        className="bg-muted/40 border-b border-border px-6 py-3.5"
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              className="flex items-center gap-1.5"
            >
              <stat.icon className="w-3.5 h-3.5 text-primary" />
              <span className="font-display font-bold text-foreground text-sm">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-sm">
                {stat.label}
              </span>
              {i < stats.length - 1 && (
                <span className="text-border ml-3 hidden sm:inline select-none">
                  ·
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section
        data-ocid="features.section"
        className="px-6 py-10 bg-background"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-muted-foreground">
              Four powerful AI tools. Zero subscriptions. All free.
            </p>
          </motion.div>

          <div
            data-ocid="features.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  data-ocid={`features.item.${i + 1}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.44 }}
                >
                  <Link to={feature.href}>
                    <div
                      className={`group h-full rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated ${feature.borderHover} transition-smooth hover:-translate-y-0.5 cursor-pointer`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center ${feature.bg} flex-shrink-0`}
                        >
                          <Icon className={`w-5 h-5 ${feature.color}`} />
                        </div>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {feature.badge}
                        </Badge>
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <span
                        className={`text-xs font-semibold ${feature.color} group-hover:underline transition-smooth`}
                      >
                        {feature.cta} →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent conversations / Login prompt */}
      <section
        data-ocid="recent.section"
        className="px-6 pb-10 bg-muted/30 border-t border-border"
      >
        <div className="max-w-5xl mx-auto pt-8">
          {isAuthenticated ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Recent conversations
                </h2>
                <Button
                  data-ocid="recent.view_all_button"
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <Link to="/chat">View all</Link>
                </Button>
              </div>
              {convsLoading ? (
                <Card className="border-border shadow-card">
                  <CardContent className="p-3 space-y-1">
                    {[1, 2, 3].map((n) => (
                      <ConversationSkeleton key={n} />
                    ))}
                  </CardContent>
                </Card>
              ) : recentConvs.length === 0 ? (
                <Card
                  data-ocid="recent.empty_state"
                  className="border-dashed border-border shadow-none"
                >
                  <CardContent className="p-8 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-foreground">
                      No conversations yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Start your first chat to see it here.
                    </p>
                    <Button data-ocid="recent.start_button" size="sm" asChild>
                      <Link to="/chat">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        New chat
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border shadow-card">
                  <CardContent
                    data-ocid="recent.list"
                    className="p-3 space-y-0.5"
                  >
                    {recentConvs.map((conv, i) => (
                      <ConversationItem
                        key={conv.id.toString()}
                        conversation={conv}
                        index={i}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <LoginPromptCard />
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-12 bg-background border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Ready to supercharge your workflow?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of creators, developers, and professionals using
              Bricherds.ai — completely free, forever.
            </p>
            {!isAuthenticated && (
              <Button
                data-ocid="cta.signup.primary_button"
                onClick={login}
                size="lg"
                className="gap-2 gradient-primary text-white border-0 shadow-elevated hover:opacity-90 transition-smooth"
              >
                <Zap className="size-4" />
                Create Free Account
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bricherds.ai. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : "",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
