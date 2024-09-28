"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lens } from "@/components/ui/lens";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface AuctionCardProp {
  productPrice: number;
  productName: string;
  auctionDeadline: Date;
  productImage: string;
}
const AuctionCard: FC<AuctionCardProp> = ({
  productPrice,
  productImage,
  productName,
  auctionDeadline,
}) => {
  const [hovering, setHovering] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const deadline = auctionDeadline;
      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0) {
        // Deadline has passed, you can handle this case as you like
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [auctionDeadline]);
  return (
    <div>
      <div className="w-full relative rounded-sm overflow-hidden max-w-md mx-auto bg-[#F4F6FA] p-4">
        <Badge className="bg-[#022BFF] hover:bg-[#022BFF]/90 font-normal py-2 px-4 absolute top-4 right-4 z-10 rounded-full">
          Auction
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
              filter: hovering ? "blur(2px)" : "blur(0px)",
            }}
            className="py-4 px-6 rounded-sm relative  mt-4 bg-white"
          >
            <h2 className="text-2xl text-left font-bold">
              Current Bid: {productPrice}
            </h2>
            <p className="text-left font-semibold mt-1">{productName}</p>
            <p className="text-left mt-2 text-[#6B6F93]">
              Auction ends in:{" "}
              <span className="text-[#0298FF]">
                {timeLeft.days}D:{timeLeft.hours.toString().padStart(2, "0")}H:
                {timeLeft.minutes.toString().padStart(2, "0")}M:
                {timeLeft.seconds.toString().padStart(2, "0")}S
              </span>
            </p>
            <Separator className="mt-2" />
            <button type="button" className="text-[#022AFF] mt-2">
              Place your bid
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
