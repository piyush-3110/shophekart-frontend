import React from "react";

interface CircularProgressProps {
	percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
	const circleRadius = 50;
	const circumference = 2 * Math.PI * circleRadius;
	const offset = circumference - (percentage / 100) * circumference;

	return (
		<svg width="120" height="120" className="transform rotate-[270deg]">
			<circle
				cx="60"
				cy="60"
				r={circleRadius}
				stroke="#e6e6e6"
				strokeWidth="10"
				fill="none"
				className="transition-colors duration-500"
			/>
			<circle
				cx="60"
				cy="60"
				r={circleRadius}
				stroke="#4A90E2"
				strokeWidth="10"
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				className="transition-all duration-500"
			/>

			{/* Centered and rotated text */}
			<g transform="rotate(90, 60, 60)">
				<text
					x="50%"
					y="50%"
					textAnchor="middle"
					dy=".3em"
					className="text-xl font-bold fill-current text-blue-500"
				>
					{percentage}%
				</text>
			</g>
		</svg>
	);
};

export default CircularProgress;
