import { createLazyFileRoute } from "@tanstack/react-router";
import { trpc } from "../client/client";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const test = trpc.getUser.useQuery("hello it's success");

  if (test.data) {
    return (
      <>
        <div className="p-2">
          <h3>Welcome Home!</h3>
          <p>{test.data?.name}</p>
        </div>
      </>
    );
  }
}
