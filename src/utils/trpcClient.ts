import { QueryClient } from "@tanstack/solid-query";
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/router';
import { createTRPCSolidStart } from "../deps/trpcFork";


const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  return `${
    process.env.NODE_ENV === "production"
      ? process.env.SITE
      : "http://localhost:4321"
  }`;
};

export const trpc = createTRPCSolidStart<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
    };
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
