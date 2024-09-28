import Image from "next/image";
import React from "react";
import WorksCard from "./WorksCard";

// Array to store the content for each section
const timelineData = [
  {
    heading: "Spend Instantly",
    content:
      "Once your card is topped up, you can start spending immediately with any supported retailer. Enjoy the flexibility of using your cryptocurrency in the real world.",
  },
  {
    heading: "Instant Access",
    content:
      "With your card topped up, enjoy instant access to your funds, making shopping quick and easy.",
  },
  {
    heading: "Secure Transactions",
    content:
      "Shop with confidence knowing your transactions are secured with the latest technology.",
  },
  {
    heading: "Real-World Spending",
    content:
      "Easily spend your crypto at any retailer that accepts our cards, bridging the gap between digital and physical.",
  },
  {
    heading: "Track Your Spending",
    content:
      "Monitor your expenses and manage your finances effectively with our user-friendly app.",
  },
  {
    heading: "Flexible Spending",
    content:
      "Spend your cryptocurrency as you wish without restrictions on where or how.",
  },
];

const Timeline = () => {
  return (
    <div className="">
      <div className="h-[350vh] bg-[#47597C] w-[1px] mx-auto relative">
        {timelineData.map((data, index) => (
          <div key={index}>
            {/* Timeline logos */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-28 h-28"
              style={{ top: `${index * 10}%` }}
            >
              <Image
                src="/images/CShopCard/timeline/logo1.png"
                alt={`logo${index + 1}`}
                height={204}
                width={204}
              />

              {/* Connecting line */}
              <div
                className={
                  index % 2 === 0
                    ? "absolute h-[1px] w-[145px] right-[75px] top-1/2 -translate-y-1/2"
                    : "absolute h-[1px] w-[65px] -right-[59px] top-1/2 -translate-y-1/2"
                }
                style={{
                  border: "1px solid transparent",
                  borderImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)",
                  borderImageSlice: 1,
                }}
              ></div>
            </div>

            {/* WorksCard section */}
            <div
              className={
                index % 2 === 0
                  ? `absolute top-[${index * 10}%] -left-[450px] z-0`
                  : `absolute top-[${index * 10}%] left-[100px] z-0`
              }
            >
              <WorksCard heading={data.heading} content={data.content} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
