import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    // Start captures the nonce before invoking the render handler.
    ssr: import.meta.env.SSR && import.meta.env.PROD
      ? { nonce: crypto.randomUUID().replaceAll("-", "") }
      : {},
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
