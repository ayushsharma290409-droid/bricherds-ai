import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogOut, MessageSquare, Shield, User, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import { useConversations } from "../hooks/useConversations";

export default function ProfilePage() {
  const { isAuthenticated, login, logout, principalId } = useAuth();
  const { data: conversations = [] } = useConversations();

  if (!isAuthenticated) {
    return (
      <div
        data-ocid="profile.unauthenticated.empty_state"
        className="flex flex-col items-center justify-center min-h-screen bg-background px-6 text-center"
      >
        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <User className="size-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Sign in to view your profile
        </h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Your conversations, history, and preferences are saved to your
          Internet Identity.
        </p>
        <Button
          data-ocid="profile.signin.primary_button"
          onClick={login}
          className="gap-2 gradient-primary text-white border-0 shadow-elevated"
        >
          <Zap className="size-4" />
          Sign In with Internet Identity
        </Button>
      </div>
    );
  }

  const shortId = principalId
    ? `${principalId.slice(0, 12)}...${principalId.slice(-8)}`
    : "—";

  return (
    <div className="min-h-full bg-background">
      <section className="bg-card border-b border-border px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-5"
          >
            <Avatar className="size-16 ring-4 ring-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {principalId ? principalId[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                My Profile
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-mono">
                {shortId}
              </p>
              <Badge
                className="mt-1.5 bg-primary/10 text-primary border-primary/20"
                variant="outline"
              >
                Free Account
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-8 bg-background">
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-5">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="size-4 text-primary" />
                Your Activity
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {conversations.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Conversations
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">
                    {conversations.reduce(
                      (acc, c) => acc + Number(c.messageCount),
                      0,
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Messages
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-chart-4">∞</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Free uses left
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Identity Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-5">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="size-4 text-chart-4" />
                Internet Identity
              </h2>
              <div className="bg-muted/50 rounded-lg p-3 font-mono text-xs text-foreground break-all">
                {principalId}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your data is stored securely on the Internet Computer
                blockchain. Only you control it.
              </p>
            </Card>
          </motion.div>

          <Separator />

          {/* Sign Out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              data-ocid="profile.signout.button"
              variant="outline"
              onClick={logout}
              className="gap-2 text-destructive hover:bg-destructive/5 hover:border-destructive/40 transition-smooth"
            >
              <LogOut className="size-4" />
              Sign Out
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
