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
			{/* Define gradient */}
			<defs>
				<linearGradient id="progressGradient" gradientTransform="rotate(90)">
					<stop offset="0%" stopColor="#01bfff" />
					<stop offset="50%" stopColor="#017ffe" />
					<stop offset="100%" stopColor="#003aff" />
				</linearGradient>
			</defs>

			{/* Background Circle */}
			<circle
				cx="60"
				cy="60"
				r={circleRadius}
				stroke="#e6e6e6"
				strokeWidth="10"
				fill="none"
				className="transition-colors duration-500"
			/>

			{/* Gradient Progress Circle */}
			<circle
				cx="60"
				cy="60"
				r={circleRadius}
				stroke="url(#progressGradient)" // Apply gradient
				strokeWidth="10"
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				className="transition-all duration-500"
			/>

			{/* Centered and rotated text with gradient */}
			<g transform="rotate(90, 60, 60)">
				<text
					x="50%"
					y="50%"
					textAnchor="middle"
					dy=".3em"
					fontSize="24"
					fontWeight="bold"
					fill="url(#progressGradient)" // Apply gradient to text
				>
					{percentage}%
				</text>
			</g>
		</svg>
	);
};

export default CircularProgress;
