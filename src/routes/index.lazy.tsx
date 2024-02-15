import { createLazyFileRoute } from "@tanstack/react-router";
import { trpc } from "../client/client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const test = trpc.getUser.useQuery("hello it's success");
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3333/",
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
          <div className="p-2">
            <h3>Welcome Home!</h3>
            <p>{test.data?.name}</p>
          </div>
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
}
