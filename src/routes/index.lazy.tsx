import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { trpc } from "../client/client";
import { flushSync } from "react-dom";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	const weights = trpc.readWeights.useQuery();
	

	return (
		<>
			<div className="p-2">
				
				{weights.data?.map((e, i) => (
					<div key={`weight_date_${i}`}>
						<p>{e.date}</p>
						<p>{e.weight}</p>
					</div>
				))}
			</div>
		</>
	);
}
