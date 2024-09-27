import Image from "next/image";
import React from "react";
import WorksCard from "./WorksCard";

const Timeline = () => {
  return (
    <>
      <div className="">
        <div className="h-[350vh] bg-[#47597C] w-[1px] mx-auto relative">
          {/* First set */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
          <div
  className="absolute h-[1px] w-[145px] right-[75px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>

          </div>
          <div className="absolute top-0 -left-[450px] z-0">
            <WorksCard
              heading="Spend Instantly"
              content="Once your card is topped up, you can start spending immediately with any supported retailer. Enjoy the flexibility of using your cryptocurrency in the real world."
            />
          </div>

          {/* Second set */}
          <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
                   <div
  className="absolute h-[1px] w-[65px]  -right-[59px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[10%] left-[100px] z-0">
            <WorksCard
              heading="Instant Access"
              content="With your card topped up, enjoy instant access to your funds, making shopping quick and easy."
            />
          </div>

          {/* Third set */}
          <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
            <div
  className="absolute h-[1px] w-[145px] right-[75px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[20%] -left-[450px] z-0">
            <WorksCard
              heading="Secure Transactions"
              content="Shop with confidence knowing your transactions are secured with the latest technology."
            />
          </div>

          {/* Fourth set */}
          <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
            <div
  className="absolute h-[1px] w-[65px]  -right-[59px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[30%] left-[100px] z-0">
            <WorksCard
              heading="Real-World Spending"
              content="Easily spend your crypto at any retailer that accepts our cards, bridging the gap between digital and physical."
            />
          </div>

          {/* Fifth set */}
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
            <div
  className="absolute h-[1px] w-[145px] right-[75px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[40%] -left-[450px] z-0">
            <WorksCard
              heading="Track Your Spending"
              content="Monitor your expenses and manage your finances effectively with our user-friendly app."
            />
          </div>

          {/* Sixth set */}
          <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
            <div
  className="absolute h-[1px] w-[65px]  -right-[59px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[50%] left-[100px] z-0">
            <WorksCard
              heading="Flexible Spending"
              content="Spend your cryptocurrency as you wish without restrictions on where or how."
            />
          </div>

          {/* Seventh set */}
          <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
            <div
  className="absolute h-[1px] w-[145px] right-[75px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[60%] -left-[450px] z-0">
            <WorksCard
              heading="Instant Notifications"
              content="Receive instant notifications for all your transactions, keeping you informed."
            />
          </div>

          {/* Eighth set */}
          <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
            <div
  className="absolute h-[1px] w-[65px]  -right-[59px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[70%] left-[100px] z-0">
            <WorksCard
              heading="Seamless Integration"
              content="Our cards integrate seamlessly with your existing accounts for smooth transactions."
            />
          </div>

          {/* Ninth set */}
          <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
            <div
  className="absolute h-[1px] w-[145px] right-[75px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[80%] -left-[450px] z-0">
            <WorksCard
              heading="Budgeting Made Easy"
              content="Our tools help you to budget effectively and reach your financial goals."
            />
          </div>

          {/* Tenth set */}
          <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
            <div
  className="absolute h-[1px] w-[65px]  -right-[59px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[90%] left-[100px] z-0">
            <WorksCard
              heading="Exclusive Rewards"
              content="Earn rewards and benefits as you spend, giving you more for your money."
            />
          </div>

          {/* Eleventh set */}
          <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 w-28 h-28 ">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
            <div
  className="absolute h-[1px] w-[145px] right-[75px] top-1/2 -translate-y-1/2"
  style={{
    border: '1px solid transparent', // Set transparent to enable gradient
    borderImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 53.5%, rgba(255, 255, 255, 0.005) 100%)',
    borderImageSlice: 1, // Ensures the gradient is applied
  }}
></div>
          </div>
          <div className="absolute top-[100%] -left-[450px] z-0">
            <WorksCard
              heading="Customer Support"
              content="Access 24/7 customer support for any questions or issues you may have."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
