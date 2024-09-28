import Image from "next/image";
import React from "react";
import WorksCard from "./WorksCard";

// Array to store the content for each section
const timelineData = [
  {
    heading: "Activate Your Card",
    content:
      "Once you receive your Shophekart MasterCard (either physical or virtual), the first step is to activate it. For the physical card, follow the instructions provided during delivery, while the virtual card is activated immediately after issuance. To activate, log in to your Shophekart dashboard and navigate to the Card Management section. Here, you'll see an option to activate your card by confirming your details and setting up your card's PIN for secure transactions.",
  },
  {
    heading: "Top Up Your Card",
    content:
      "Before making purchases, top up your card with any of the supported cryptocurrencies, such as USDT, USDC, or CSHOP tokens. Simply transfer your crypto from your wallet to your card through the Shophekart platform.You can top up as frequently as needed, and all funds will be available for instant use.",
  },
  {
    heading: "Select Your Payment Currency",
    content:
      "The CSHOP MasterCard supports multiple currencies. Depending on your location or the merchant's preferred currency, the card will automatically convert your crypto into the local fiat currency. If you want to avoid exchange rate fluctuations, use the Lock Exchange Rate feature to secure a favorable rate before making purchases.",
  },
  {
    heading: "Online Transactions",
    content:
      "For online purchases, enter your card details (either virtual or physical) at checkout, just like a regular credit or debit card. For added security, you may be prompted to verify the transaction via 2-factor authentication through the Shophekart app.",
  },
  {
    heading: "In-Store Purchases",
    content:
      "The CSHOP MasterCard supports multiple currencies. Depending on your location or the merchant's preferred currency, the card will automatically convert your crypto into the local fiat currency. If you want to avoid exchange rate fluctuations, use the Lock Exchange Rate feature to secure a favorable rate before making purchases.",
  },
  {
    heading: "ATM Withdrawals",
    content:
      "Withdraw cash at any ATM that supports MasterCard transactions. With a generous monthly withdrawal limit of up to €60,000, you can access your funds without significant restrictions.",
  },
  {
    heading: "Monitor Your Card Activity",
    content:
      "Keep track of your spending, top-ups, and remaining balances through the Shophekart dashboard. You'll also be able to view your locked exchange rates, transaction history, and manage any business-related expenses (if using the CSHOP Business Card).",
  },
  {
    heading: "Real-Time Control for Business Users",
    content:
      "For business users, the CSHOP Business Card allows you to set real-time spending rules, track employee transactions, and manage operational expenses efficiently. You can assign cards to staff members, set limits, and control spending from a central dashboard.",
  },
  {
    heading: "Security and Protection",
    content:
      "Enjoy peace of mind with CCSS Level 3 security, ensuring your crypto funds and card data are safe. If your card is lost or stolen, immediately freeze or cancel it through your dashboard to prevent unauthorized use.",
  },

 
  {
    heading: "Access Customer Support",
    content:
      "If you run into any issues or need assistance, reach out to Shophekart's 24/7 customer support team, available through chat, email, or phone",
  },
  {
    heading: "Physical or Virtual? The Choice is Yours!",
    content:
      "Apply for a physical or virtual card and start spending immediately. The virtual card option allows you to begin online transactions instantly, while the physical card integrates your cryptocurrency spending into your daily life, tourism, and even business activities.",
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
                  index % 2 === 1
                    ? "absolute h-[1px] w-[145px] right-[75px] top-1/2 -translate-y-1/2"
                    : "absolute h-[1px] w-[85px] -right-[59px] top-1/2 -translate-y-1/2"
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
                index % 2 === 1
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
