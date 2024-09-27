import Image from 'next/image';
import React from 'react'
// interface FeatureCardProps{
// logo:string;
// heading:string;
// passage:string;
// }

export const FeatureCard = () => {
  return (
    <div className='flex flex-col gap-3 w-fit px-4 py-4'>
        <Image src="/images/CShopCard/Features/logo1.png" alt='logo1' width={100} height={100} className='h-4 w-auto'/>
        <h1 className='text-[18px] font-[700] text-black'>Seamless Cryptocurrency Spending </h1>
        <p className='text-[#6B6F93] font-[400] text-[16px]'>The CSHOP MasterCard allows users to spend cryptocurrency directly without needing to convert it to fiat. This eliminates excess conversion fees and simplifies the process of using crypto for everyday transactions.</p>
    </div>
  )
}
