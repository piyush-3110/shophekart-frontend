/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import Show from "../shared/Show";
import { SoldIcon } from "@/icons";

interface ItemCardProps {
	images: string[]; // Array of image URLs passed as a prop
	outOfStock?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ images, outOfStock }) => {
	// Use the first image in the array as the default selected image
	const [selectedImage, setSelectedImage] = useState(images[0]);

	return (
		<div className="bg-[#F4F6FA] shadow-sm p-4 rounded-lg h-[28rem] w-[90vw] md:w-[20rem] lg:w-[22rem]">
			{/* Main Image */}
			<div className="relative flex items-center justify-center h-[80%]">
				<Show when={!!outOfStock}>
					<div className="absolute top-0 left-0 w-full h-full  z-[2] flex items-center justify-center backdrop-blur-sm ">
						<div className="size-20">
							<SoldIcon />
						</div>
					</div>
				</Show>
				<Image
					width={480}
					height={480}
					className="aspect-square max-h-full max-w-full object-cover rounded-md"
					src={selectedImage}
					alt="Main Item"
				/>
			</div>

			{/* Thumbnails */}
			<div className="flex justify-center mt-4">
				<div className="grid grid-cols-5 gap-1 w-fit">
					{images.map((thumbnail, index) => {
						return (
							<Image
								width={480}
								height={480}
								key={index}
								className={cn(
									`aspect-square w-full  bg-white object-contain rounded-md cursor-pointer`,
									selectedImage === thumbnail && "border-2",
									outOfStock ? "border-destructive" : "border-blue-300"
								)}
								src={thumbnail}
								alt={`Thumbnail ${index + 1}`}
								onClick={() => setSelectedImage(thumbnail)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
