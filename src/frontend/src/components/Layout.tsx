import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <main
          data-ocid="main.content"
          className="flex-1 flex flex-col overflow-hidden min-w-0"
          aria-label="Main content"
        >
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </TooltipProvider>
  );
}
