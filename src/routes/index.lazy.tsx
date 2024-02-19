import { createLazyFileRoute } from "@tanstack/react-router";
import { trpc } from "../client/client";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	const weights = trpc.readWeights.useQuery();

	const data = {
		labels: weights.data?.map((e) => new Date(e.date).toDateString()),
		datasets: [
			{
				label: "Weight",
				data: weights.data?.map((e) => e.weight),
			},
		],
	};

	return (
		<>
			<div className="p-2 w-full flex flex-col justify-center items-center">
				<div className="h-[50svh] w-full max-w-screen-2xl flex items-center justify-center">
					<Line
						data={data}
						options={{
							maintainAspectRatio: false,
							plugins: {
								tooltip: { bodyFont: { size: 18 }, titleFont: { size: 18 } },
							},
						}}
					/>
				</div>
				{weights.data?.map((e) => (
					<div key={e.id}>
						<p>{e.date}</p>
						<p>{e.weight}</p>
						<p>{e.id}</p>
					</div>
				))}
			</div>
		</>
	);
}
