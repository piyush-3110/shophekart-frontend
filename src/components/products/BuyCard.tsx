"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lens } from "@/components/ui/lens";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation"; // Import useRouter
import Show from "../shared/Show";
interface BuyCardProp {
	productPrice: number;
	productName: string;
	productImage: string;
	id: string;
	currencyType: string;
	stock: number;
}

const BuyCard: FC<BuyCardProp> = ({
	productPrice,
	productName,
	productImage,
	id,
	currencyType,
	stock,
}) => {
	const router = useRouter(); // Initialize router
	const [hovering, setHovering] = useState(false);
	// Handle navigation to ItemDetail page
	const handleBuyNow = () => {
		const url = `/itemDetails/${id}`;
		setTimeout(() => {
			router.push(url);
		}, 100);
	};
	const OUT_OF_STOCK = stock <= 0;
	return (
		<div>
			<div className="w-full relative rounded-sm overflow-hidden max-w-md mx-auto bg-[#F4F6FA] p-4">
				<Badge className="bg-[#022BFF] hover:bg-[#022BFF]/90 font-normal py-2 px-4 absolute top-8 right-8 z-[3] rounded-full">
					Buy Now
				</Badge>
				<div className="relative w-full">
					<Show when={!OUT_OF_STOCK}>
						<Lens
							hovering={hovering}
							setHovering={setHovering}
							lensSize={100}
						>
							<Image
								src={productImage}
								alt="image"
								width={1080}
								height={1080}
								className="object-cover aspect-video"
							/>
						</Lens>
					</Show>
					<Show when={OUT_OF_STOCK}>
						<div className="relative w-full rounded-md overflow-hidden">
							<div className="absolute top-0 left-0 w-full h-full bg-destructive/20 z-[2] flex items-center justify-center">
								<span className="px-4 py-2 bg-destructive text-white rounded-md font-medium text-sm">
									Out of Stock
								</span>
							</div>
							<Image
								src={productImage}
								alt="image"
								width={1080}
								height={1080}
								className="object-cover aspect-video"
							/>
						</div>
					</Show>
					<motion.div
						animate={{
							filter: !OUT_OF_STOCK && hovering ? "blur(2px)" : "blur(0px)",
						}}
						className="py-4 px-6 rounded-sm relative mt-4 bg-white"
					>
						<h2 className="text-2xl text-left font-bold">{productName}</h2>
						<p className="text-left font-semibold mt-1">
							Price: {productPrice} <span>{currencyType}</span>
						</p>
						<Separator className="mt-2" />
						<button
							type="button"
							className="text-[#022AFF] mt-2"
							onClick={handleBuyNow} // Call handleBuyNow on click
						>
							Buy Now
						</button>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default BuyCard;
