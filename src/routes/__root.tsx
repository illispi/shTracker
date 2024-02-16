import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import React from "react";
import { Suspense } from "react";
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

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<HelmetProvider>
					<Helmet>
						<title>Sh-Tracker</title>
					</Helmet>
					<Navbar />
					<hr />
					<Outlet />
					<Suspense>
						<TanStackRouterDevtools />
					</Suspense>
				</HelmetProvider>
			</>
		);
	},
});
