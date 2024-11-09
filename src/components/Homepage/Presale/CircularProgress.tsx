import React from "react";

interface CircularProgressProps {
	percentage: number;
	size?: number; // Optional size prop for custom sizing
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, size = 160 }) => {
	const circleRadius = (size - 20) / 2; // Adjust radius based on size with padding for stroke width
	const circumference = 2 * Math.PI * circleRadius;
	const offset = circumference - (percentage / 100) * circumference;

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			className="transform rotate-[270deg]" // Rotate SVG to start from top
		>
			{/* Define gradient for the progress stroke and text */}
			<defs>
				<linearGradient id="progressGradient" gradientTransform="rotate(90)">
					<stop offset="0%" stopColor="#01bfff" />
					<stop offset="50%" stopColor="#017ffe" />
					<stop offset="100%" stopColor="#003aff" />
				</linearGradient>
			</defs>

			{/* Background Circle */}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={circleRadius}
				stroke="#e6e6e6"
				strokeWidth="10"
				fill="none"
				className="transition-colors duration-500"
			/>

			{/* Gradient Progress Circle */}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={circleRadius}
				stroke="url(#progressGradient)"
				strokeWidth="10"
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				className="transition-all duration-500"
			/>

			{/* Upright Text with Gradient */}
			<g transform={`rotate(90, ${size / 2}, ${size / 2})`}>
				<text
					x="50%"
					y="50%"
					textAnchor="middle"
					dy=".3em"
					fontSize={size / 5} // Adjust font size based on size
					fontWeight="bold"
					fill="url(#progressGradient)"
				>
					{percentage}%
				</text>
			</g>
		</svg>
	);
};

export default CircularProgress;
