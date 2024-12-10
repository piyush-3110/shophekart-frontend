import Image from "next/image";
import React from "react";
import CardContent from "./CardContent";

interface CardsProps {
  cardValues: {
    totalRaise?: string;
    endsIn?: string;
    salesType?: string;
    hostedBy?: string;
    backedBy?: string[];
    comments?: string;
  };
}

const Cards: React.FC<CardsProps> = ({ cardValues }) => {
  return (
    <div className="text-white h-[40rem] pb-5 lg:w-[29vw] md:w-[44vw] w-[85vw] rounded-lg card-border-gradient bg-[#0f1012]">
      <div className="mx-2 relative mt-2 rounded-lg flex justify-center h-[45%]">
        <Image
          src="/images/tokenization/comingsoon.svg"
          alt="Coming soon"
          width={500}
          height={500}
          className="bg-no-repeat object-cover h-full w-full"
        />
        <div className="absolute left-5 -bottom-7 h-14 w-auto">
          <Image
            src="/images/tokenization/tba.svg"
            alt="Coming soon"
            width={100}
            height={100}
            className="bg-no-repeat object-cover h-full w-full"
          />
        </div>
        <h1 className="font-bold absolute left-6 -bottom-16 text-lg">TBA</h1>
      </div>
      <CardContent cardValues={cardValues} />
    </div>
  );
};

export default Cards;
