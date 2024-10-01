import React from 'react';
import Image from 'next/image';
import MarqueeComp from './MarqueeComp';
// import { PurchaseHistory } from './PurchaseHistory';

const Partners = () => {
  return (
    <div className='relative overflow-x-hidden min-h-[80vh] overflow-hidden pb-8 pt-12 flex gap-12 flex-col items-center bg-white'>
      <h1 className='text-black font-semibold md:text-3xl text-lg text-center'>
        Partners and Supporters
      </h1>
      <div>
        <MarqueeComp />
      </div>
      <div className='flex mt-4 justify-center gap-16'>
        <div className='flex flex-col items-center md:items-start md:pl-12 gap-6 mt-6 w-[90vw] md:w-[90vw] lg:w-[40vw]'>
          <h1 className='text-black font-semibold md:text-3xl text-lg'>
            Introducing the Crypto Shophe Debit Card
          </h1>
          <p className='text-[#6B6F93] font-[400] text-[16px]'>
            Seamlessly Convert Your Crypto into Cash Anywhere.
          </p>

          <div className='flex gap-8'>
            <div className='flex flex-col text-[#6B6F93] font-[400] text-[16px]'>
              <div className='flex lg:items-center'>
                <Image
                  src='/images/homepage/Partners/ellipse.png'
                  alt='Logo'
                  width={16}
                  height={16}
                  className='h-3 w-3 mr-2'
                />
                <p>Multi-Currency support</p>
              </div>
              <div className='flex lg:items-center'>
                <Image
                  src='/images/homepage/Partners/ellipse.png'
                  alt='Logo'
                  width={16}
                  height={16}
                  className='h-3 w-3 mr-2'
                />
                <p>CSHOP Token Integration</p>
              </div>
              <div className='flex items-center'>
                <Image
                  src='/images/homepage/Partners/ellipse.png'
                  alt='Logo'
                  width={16}
                  height={16}
                  className='h-3 w-3 mr-2'
                />
                <p>Look Exchange Rates</p>
              </div>
            </div>
            <div className='flex flex-col text-[#6B6F93] font-[400] text-[16px]'>
              <div className='flex items-center'>
                <Image
                  src='/images/homepage/Partners/ellipse.png'
                  alt='Logo'
                  width={16}
                  height={16}
                  className='h-3 w-3 mr-2'
                />
                <p>Virtual and Physical Card</p>
              </div>
              <div className='flex items-center'>
                <Image
                  src='/images/homepage/Partners/ellipse.png'
                  alt='Logo'
                  width={16}
                  height={16}
                  className='h-3 w-3 mr-2'
                />
                <p>Crypto Currency Security</p>
              </div>
              <div className='flex items-center'>
                <Image
                  src='/images/homepage/Partners/ellipse.png'
                  alt='Logo'
                  width={16}
                  height={16}
                  className='h-3 w-3 mr-2'
                />
                <p>And much more</p>
              </div>
            </div>
          </div>
          <button className='gradient-button w-[10rem]'>Learn More</button>
        </div>

        <div className='lg:block hidden z-[1] relative mt-8'>
          <Image
            alt='MasterCard'
            src='/images/homepage/Partners/mastercard2.png'
            height={524}
            width={524}
            className='h-[50vh] w-auto rotate-left'
          />
          <Image
            alt='MasterCard'
            src='/images/homepage/Partners/mastercard1.png'
            height={524}
            width={524}
            className='h-[40vh] w-auto absolute z-[1] top-0 -right-10 rotate-right'
          />
        </div>
      </div>
    {/* <PurchaseHistory/> */}
      <div className="blob" />

    </div>
  );
};

export default Partners;
