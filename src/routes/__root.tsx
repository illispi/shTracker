import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";
import { trpc } from "../client/client";
import { httpBatchLink } from "@trpc/client";

export const Route = createRootRoute({
  component: () => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: "http://localhost:3333/api",
            // You can pass any HTTP headers you wish here
            // async headers() {
            //   return {
            //     authorization: getAuthCookie(),
            //   };
            // },
          }),
        ],
      })
    );

    return (
      <>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <div className="p-2 flex gap-2">
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>{" "}
              <Link to="/about" className="[&.active]:font-bold">
                About
              </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
          </QueryClientProvider>
        </trpc.Provider>
      </>
    );
  },
});
