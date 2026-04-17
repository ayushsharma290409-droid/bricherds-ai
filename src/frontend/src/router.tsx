import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const ChatConversationPage = lazy(() => import("./pages/ChatConversationPage"));
const ImagePage = lazy(() => import("./pages/ImagePage"));
const DocsPage = lazy(() => import("./pages/DocsPage"));
const CodePage = lazy(() => import("./pages/CodePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function PageLoader() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <Skeleton className="h-10 w-64 rounded-xl" />
      <Skeleton className="h-4 w-48 rounded" />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {["s1", "s2", "s3", "s4", "s5", "s6"].map((key) => (
          <Skeleton key={key} className="h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: ChatPage,
});

const chatConversationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat/$conversationId",
  component: ChatConversationPage,
});

const imageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/image",
  component: ImagePage,
});

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/docs",
  component: DocsPage,
});

const codeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/code",
  component: CodePage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  chatRoute,
  chatConversationRoute,
  imageRoute,
  docsRoute,
  codeRoute,
  profileRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
