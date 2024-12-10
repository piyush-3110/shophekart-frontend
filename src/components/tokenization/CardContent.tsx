import Image from "next/image";
import React from "react";

interface CardValues {
  totalRaise?: string;
  endsIn?: string;
  salesType?: string;
  hostedBy?: string;
  backedBy?: string[]; // Array of image paths for "Backed By"
  comments?: string; // String value for "Comments"
}

interface CardContentProps {
  cardValues?: CardValues;
  link?: string;
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

  const additionalData = [
    {
      icon: "/images/tokenization/icon5.svg",
      label: "Backed By",
      value:
        cardValues?.backedBy && cardValues?.backedBy.length > 0 ? (
          <div className="flex gap-2">
            {cardValues?.backedBy?.map((imgSrc, index) => (
              <Image
                key={index}
                src={`/images/tokenization/${imgSrc}`}
                alt={`Backer ${index + 1}`}
                width={30}
                height={30}
                className="h-6 w-6 rounded-full"
              />
            ))}
          </div>
        ) : (
          "N/A" // Show N/A if backedBy is empty or undefined
        ),
    },
    {
      icon: "/images/tokenization/icon6.svg",
      label: "Comments",
      value: cardValues?.comments || "N/A",
    },
  ];

  return (
    <div className="px-8 mx-auto mt-20">
      {cardData.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-3">
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
          <p className="text-[#c7c5c5] text-sm">{item.value}</p>
        </div>
      ))}

      <hr className="my-4 border-t border-gray-600" />

      {additionalData.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-3">
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
          <div className="text-sm text-[#c7c5c5]">{item.value}</div>
        </div>
      ))}

      <button
        className="gradient-background-card w-1/2 mx-auto block text-sm text-center py-3 px-5 rounded-md opacity-50 border border-gray-500 shadow-lg cursor-not-allowed mt-5"
        disabled
      >
        Participate Now
      </button>
    </div>
  );
};

export default CardContent;
