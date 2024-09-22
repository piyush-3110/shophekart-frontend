import React from 'react';
import Image from 'next/image';
import MarqueeComp from './MarqueeComp';

const Partners = () => {
  return (
    <div className='h-[110vh] overflow-hidden  pb-8 pt-16 flex gap-8 flex-col items-center bg-white'>
      <h1 className='text-black font-semibold md:text-3xl text-lg text-center'>Partners and Supporters</h1>
      <div>
      <MarqueeComp />

      </div>
      <div className='flex  mt-8 justify-center gap-4'>
        <div className='flex flex-col gap-6 mt-6 w-[40vw]'>
          <h1 className='text-black font-semibold md:text-3xl text-lg'>Introducing the Crypto Shophe Debit Card</h1>
          <p className='text-[#6B6F93] font-[400] text-[16px]'>Seamlessly Convert Your Crypto into Cash Anywhere.</p>
        
        <div className='flex gap-8'>
          <div className='flex flex-col text-[#6B6F93] font-[400] text-[16px]'>
            <div className='flex items-center'>
              <Image src="/images/homepage/partners/ellipse.png" alt="Logo" width={16} height={16} className="h-3 w-3 mr-2" />
              <p>Multi-Currency support</p>
            </div>
            <div className='flex items-center'>
              <Image src="/images/homepage/partners/ellipse.png" alt="Logo" width={16} height={16} className="h-3 w-3 mr-2" />
              <p>CSHOP Token Integration</p>
            </div>
            <div className='flex items-center'>
              <Image src="/images/homepage/partners/ellipse.png" alt="Logo" width={16} height={16} className="h-3 w-3 mr-2" />
              <p>Look Exchange Rates</p>
            </div>
          </div>
          <div className='flex flex-col text-[#6B6F93] font-[400] text-[16px]'>
            <div className='flex items-center'>
              <Image src="/images/homepage/partners/ellipse.png" alt="Logo" width={16} height={16} className="h-3 w-3 mr-2" />
              <p>Virtual and Physical Card</p>
            </div>
            <div className='flex items-center'>
              <Image src="/images/homepage/partners/ellipse.png" alt="Logo" width={16} height={16} className="h-3 w-3 mr-2" />
              <p>Crypto Currency Security</p>
            </div>
            <div className='flex items-center'>
              <Image src="/images/homepage/partners/ellipse.png" alt="Logo" width={16} height={16} className="h-3 w-3 mr-2" />
              <p>And much more</p>
            </div>
          </div>
        </div>
        </div>
   
       <Image alt='MasterCard' src="/images/homepage/partners/mastercard.png" height={524} width={524} className='h-auto w-[50vw] translate-x-[10%] -translate-y-[20%]'></Image>
    
      </div>
    </div>
  );
};

export default Partners;
