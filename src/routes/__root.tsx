import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import React from "react";
import { Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

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
        }))
      );

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <meta name="description" content="React description" />
            <meta name="viewport" content="width=device-width" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            {/* <meta name="generator" content={Astro.generator} /> */}
            <title>Sh-Tracker</title>
          </Helmet>
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
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </HelmetProvider>
      </>
    );
  },
});
