import { createLazyFileRoute } from "@tanstack/react-router";
import { trpc } from "../client/client";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	const weights = trpc.readWeights.useQuery();

	return (
		<>
			<div className="p-2">
				{weights.data?.map((e) => (
					<div key={e.id}>
						<p>{e.date}</p>
						<p>{e.weight}</p>
					</div>
				))}
			</div>
		</>
	);
}
