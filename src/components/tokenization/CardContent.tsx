import Image from "next/image";
import React from "react";

interface CardValues {
  totalRaise?: string;
  endsIn?: string;
  salesType?: string;
  hostedBy?: string;
}

interface CardContentProps {
  cardValues?: CardValues;
}

const CardContent: React.FC<CardContentProps> = ({ cardValues }) => {
  const cardData = [
    {
      icon: "/images/tokenization/icon1.svg",
      label: "Total Raise",
      value: cardValues?.totalRaise || "TBA",
    },
    {
      icon: "/images/tokenization/icon2.svg",
      label: "Ends In",
      value: cardValues?.endsIn || "TBA",
    },
    {
      icon: "/images/tokenization/icon3.svg",
      label: "Sales Type",
      value: cardValues?.salesType || "TBA",
    },
    {
      icon: "/images/tokenization/icon4.svg",
      label: "Hosted By",
      value: cardValues?.hostedBy || "TBA",
    },
  ];

  return (
    <div className="px-8 mt-20">
      {cardData.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <Image
              src={item.icon}
              alt={`${item.label} icon`}
              width={50}
              height={50}
              className="h-5 w-auto"
            />
            <p className="text-sm text-[#6e6f71]">{item.label}</p>
          </div>
          <p className="text-[#c7c5c5]">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default CardContent;
