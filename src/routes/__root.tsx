import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import React from "react";
import { Suspense } from "react";

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
      </>
    );
  },
});
