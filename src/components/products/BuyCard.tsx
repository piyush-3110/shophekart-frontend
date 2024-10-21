"use client"
import { FC, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lens } from "@/components/ui/lens";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation'; // Import useRouter
interface BuyCardProp {
  productPrice: number;
  productName: string;
  productImage: string;
  id:string;
  currencyType:string;
}

const BuyCard: FC<BuyCardProp> = ({
  productPrice,
  productName,
  productImage,
  id,
  currencyType
}) => {
  const router = useRouter(); // Initialize router
const[hovering,setHovering]= useState(false)
  // Handle navigation to ItemDetail page
  const handleBuyNow = () => {
    // Pass data via query parameters or URL
    const url = `/itemDetails/${id}`;
    console.log('Navigating to: ', url);
    setTimeout(() => {
      router.push(url);
    }, 100);
  };

  return (
    <div>
      <div className="w-full relative rounded-sm overflow-hidden max-w-md mx-auto bg-[#F4F6FA] p-4">
        <Badge className="bg-[#022BFF] hover:bg-[#022BFF]/90 font-normal py-2 px-4 absolute top-4 right-4 z-10 rounded-full">
          Buy Now
        </Badge>
        <div className="relative">
          <Lens hovering={hovering} setHovering={setHovering} lensSize={100}>
            <Image
              src={productImage}
              alt="image"
              width={250}
              height={250}
              className="aspect-square object-contain w-1/2 mx-auto rounded-2xl"
            />
          </Lens>
          <motion.div
            animate={{
              filter: hovering ? 'blur(2px)' : 'blur(0px)',
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
