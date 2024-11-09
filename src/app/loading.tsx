import React from "react";
import "./loader.css";
import { cn } from "@/lib/utils";

const Loader: React.FC<IProps> = ({ variant = "gradient" }) => {
	const BOX_COLOR =
		variant === "primary"
			? "!bg-primary"
			: variant === "secondary"
			? "!bg-secondary"
			: "!bg-primary-gradient";

	return (
		<div className="container">
			<div className="cube">
				<div className={cn("cube__inner", BOX_COLOR)}></div>
			</div>
			<div className="cube">
				<div className={cn("cube__inner", BOX_COLOR)}></div>
			</div>
			<div className="cube">
				<div className={cn("cube__inner", BOX_COLOR)}></div>
			</div>
		</div>
	);
};

export default Loader;

interface IProps {
	variant?: "gradient" | "primary" | "secondary";
}
