"use client";

import { usePathname } from "next/navigation";
import FloatingNavbar from "./FloatingNavbar";
// import Navbar from "../products/shared/navbar";
import Searchbar from "../products/shared/Searchbar";
import Link from "next/link";

const RenderedNavbar = () => {
	const pathname = usePathname();

	// if (pathname == "/products/buy-now") {
	//   return <Navbar className="mb-10" />;
	// }
	// return <FloatingNavbar />;
	if (pathname == "/products/buy-now") {
		return (
			<>
				<FloatingNavbar />
				<div className="flex w-full items-center justify-between px-4 lg:px-32 mt-4 mb-8">
					<div className="w-[45vw] lg:w-[600px]">
						<Searchbar />
					</div>
					<Link
						href="/add-product"
						className=""
					>
						<button className="text-white gradient-button w-auto lg:w-auto">
							Add Product
						</button>
					</Link>
				</div>
			</>
		);
	}
	return <FloatingNavbar />;
};

export default RenderedNavbar;
