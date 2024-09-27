import Image from 'next/image';
import React from 'react';

export const FeatureCard = () => {
  return (
    <div className="flex flex-col gap-4 w-full px-4 py-4 border-b border-r border-gray-600 last:border-b-0 last-of-type:border-r-0">
      <Image
        src="/images/CShopCard/Features/logo1.png"
        alt="logo1"
        width={100}
        height={100}
        className="h-10 w-10"
      />
      <h1 className="text-[18px] font-[700] text-white">
        Seamless Cryptocurrency Spending
      </h1>
      <p className="text-[#6B6F93] font-[400] text-[16px]">
        The CSHOP MasterCard allows users to spend cryptocurrency directly
        without needing to convert it to fiat. This eliminates excess conversion
        fees and simplifies the process of using crypto for everyday
        transactions.
      </p>
    </div>
  );
};
