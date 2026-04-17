import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  Home,
  ImageIcon,
  LogIn,
  LogOut,
  MessageSquare,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  useConversations,
  useDeleteConversation,
} from "../hooks/useConversations";
import { useUIStore } from "../store/uiStore";
import { Logo } from "./Logo";

const navItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
    icon: Home,
    description: "Dashboard & features",
  },
  {
    id: "chat",
    label: "Chat",
    path: "/chat",
    icon: MessageSquare,
    description: "AI conversations",
  },
  {
    id: "image",
    label: "Image Gen",
    path: "/image",
    icon: ImageIcon,
    description: "Generate & edit images",
  },
  {
    id: "docs",
    label: "Docs & Files",
    path: "/docs",
    icon: FileText,
    description: "Summarize & analyze docs",
  },
  {
    id: "code",
    label: "Code Studio",
    path: "/code",
    icon: Code2,
    description: "Generate apps & code",
  },
];

function NavLink({
  item,
  collapsed,
  isActive,
}: {
  item: (typeof navItems)[0];
  collapsed: boolean;
  isActive: boolean;
}) {
  const Icon = item.icon;

  const inner = (
    <Link
      to={item.path}
      data-ocid={`nav.${item.id}.link`}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-2",
      )}
    >
      <Icon className="shrink-0 size-4" />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="overflow-hidden whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{inner}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {item.label}
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  return inner;
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const { isAuthenticated, login, logout, principalId } = useAuth();
  const { data: conversations = [] } = useConversations();
  const deleteConversation = useDeleteConversation();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: bigint, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletingId(id.toString());
    await deleteConversation.mutateAsync(id);
    setDeletingId(null);
  };

  const shortPrincipal = principalId
    ? `${principalId.slice(0, 5)}...${principalId.slice(-4)}`
    : null;

  return (
    <motion.aside
      data-ocid="sidebar"
      animate={{ width: sidebarOpen ? 260 : 64 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex h-full flex-col border-r border-sidebar-border bg-sidebar overflow-hidden shrink-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-sidebar-border">
        <Logo collapsed={!sidebarOpen} size="sm" />
        <button
          data-ocid="sidebar.toggle"
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="ml-auto flex-shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-2 pt-3">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            item={item}
            collapsed={!sidebarOpen}
            isActive={
              item.path === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.path)
            }
          />
        ))}
      </nav>

      <Separator className="my-3 mx-2" />

      {/* New Chat Button */}
      {sidebarOpen ? (
        <div className="px-2 mb-2">
          <Link to="/chat" data-ocid="sidebar.new_chat.button">
            <Button
              size="sm"
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <Plus className="size-4" />
              New Chat
            </Button>
          </Link>
        </div>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex justify-center px-2 mb-2">
              <Link to="/chat" data-ocid="sidebar.new_chat.button">
                <Button size="icon" variant="outline" className="size-9">
                  <Plus className="size-4" />
                </Button>
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">New Chat</TooltipContent>
        </Tooltip>
      )}

      {/* Conversation History */}
      {sidebarOpen && isAuthenticated && conversations.length > 0 && (
        <ScrollArea className="flex-1 min-h-0 px-2">
          <p className="px-1 mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Chats
          </p>
          <div className="flex flex-col gap-0.5" data-ocid="conversations.list">
            {conversations.slice(0, 20).map((conv, idx) => (
              <div
                key={conv.id.toString()}
                data-ocid={`conversations.item.${idx + 1}`}
                className="group relative flex items-center"
              >
                <Link
                  to="/chat/$conversationId"
                  params={{ conversationId: conv.id.toString() }}
                  className={cn(
                    "flex-1 flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-sidebar-foreground hover:bg-sidebar-accent transition-smooth min-w-0",
                    currentPath === `/chat/${conv.id}` && "bg-sidebar-accent",
                  )}
                >
                  <Bot className="shrink-0 size-3.5 text-muted-foreground" />
                  <span className="truncate">{conv.title}</span>
                </Link>
                <button
                  type="button"
                  data-ocid={`conversations.delete_button.${idx + 1}`}
                  onClick={(e) => handleDelete(conv.id, e)}
                  disabled={deletingId === conv.id.toString()}
                  className="absolute right-1 opacity-0 group-hover:opacity-100 p-1 rounded text-muted-foreground hover:text-destructive transition-smooth"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {!sidebarOpen && <div className="flex-1" />}

      {/* User Menu */}
      <div className="mt-auto border-t border-sidebar-border px-2 py-3">
        {isAuthenticated ? (
          <div
            className={cn(
              "flex items-center gap-2",
              !sidebarOpen && "justify-center",
            )}
          >
            <Link to="/profile" data-ocid="sidebar.profile.link">
              <Avatar className="size-8 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/50 transition-smooth">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {shortPrincipal ? shortPrincipal[0].toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {shortPrincipal}
                </p>
                <button
                  type="button"
                  data-ocid="sidebar.logout.button"
                  onClick={logout}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-smooth"
                >
                  <LogOut className="size-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-ocid="sidebar.login.button"
                onClick={login}
                variant="ghost"
                className={cn(
                  "w-full text-sm font-medium text-primary hover:bg-primary/10 transition-smooth",
                  sidebarOpen
                    ? "justify-start gap-2 px-3"
                    : "justify-center px-2",
                )}
              >
                <LogIn className="size-4 shrink-0" />
                {sidebarOpen && "Sign In"}
              </Button>
            </TooltipTrigger>
            {!sidebarOpen && (
              <TooltipContent side="right">Sign In</TooltipContent>
            )}
          </Tooltip>
        )}
      </div>
    </motion.aside>
  );
}
