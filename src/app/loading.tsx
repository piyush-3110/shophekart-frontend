import Loader from "@/components/shared/Loader";
import React from "react";

const loading = () => {
	return (
		<div className="w-full flex items-center justify-center">
			<Loader />
		</div>
	);
};

export default loading;
