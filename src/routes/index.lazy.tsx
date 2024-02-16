import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { trpc } from "../client/client";
import { flushSync } from "react-dom";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	const weights = trpc.readWeights.useQuery();
	const navigate = useNavigate();

	return (
		<>
			<div className="p-2">
				<Link
					to="/about"
					onClick={(ev) => {
						ev.preventDefault();
						document.startViewTransition(() => {
							flushSync(() => {
								navigate({ to: "/about" });
							});
						});
					}}
				>
					about
				</Link>
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
