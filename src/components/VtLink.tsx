import { Link, useNavigate, type LinkOptions } from "@tanstack/react-router";
import { flushSync } from "react-dom";

interface CombinedProps extends LinkOptions {
	children: React.ReactNode;
}

const VtLink = (props: CombinedProps) => {
	const navigate = useNavigate();
	return (
		<Link
			{...props}
			to={props.to}
			onClick={(ev) => {
				ev.preventDefault();
				// @ts-ignore
				if (!document.startViewTransition) {
					return;
				}
				// @ts-ignore
				document.startViewTransition(() => {
					flushSync(() => {
						navigate({ to: props.to });
					});
				});
			}}
		>
			{props.children}
		</Link>
	);
};
export default VtLink;
