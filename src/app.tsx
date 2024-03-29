import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { httpBatchLink } from "@trpc/client";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { trpc } from "./client/client";

import "./index.css";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: "http://192.168.50.55:3333/",
			// You can pass any HTTP headers you wish here
			// async headers() {
			//   return {
			//     authorization: getAuthCookie(),
			//   };
			// },
		}),
	],
});

const router = createRouter({
	routeTree,
	context: {
		queryClient,
	},
	defaultPreload: "intent",
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (rootElement) {
	if (!rootElement.innerHTML) {
		const root = ReactDOM.createRoot(rootElement);
		root.render(
			<StrictMode>
				<trpc.Provider client={trpcClient} queryClient={queryClient}>
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
					</QueryClientProvider>
				</trpc.Provider>
			</StrictMode>,
		);
	}
}
