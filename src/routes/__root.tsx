import { Outlet, createRootRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../components/Navbar";

const TanStackRouterDevtools =
	//BUG this might need to be process.env.NODE_ENV === "production"
	import.meta.env.PROD === true
		? () => null // Render nothing in production
		: React.lazy(() =>
				// Lazy load in development
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				})),
		  );
const ReactDevtools =
	//BUG this might need to be process.env.NODE_ENV === "production"
	import.meta.env.PROD === true
		? () => null // Render nothing in production
		: React.lazy(() =>
				// Lazy load in development
				import("@tanstack/react-query-devtools").then((res) => ({
					default: res.ReactQueryDevtools,
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				})),
		  );

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<HelmetProvider>
					<Helmet>
						<title>Home - Sh-Tracker</title>
					</Helmet>
					<Navbar />
					<hr />
					<Outlet />
					<Suspense>
						<TanStackRouterDevtools />
						<ReactDevtools />
					</Suspense>
				</HelmetProvider>
			</>
		);
	},
});
