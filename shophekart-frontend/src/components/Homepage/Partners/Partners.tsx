import React from 'react'

import MarqueeComp from './MarqueeComp'

const Partners = () => {
  return (
    <div className='min-h-[100vh] py-12 flex gap-8 flex-col items-center bg-white'>
        <h1 className='text-black font-semibold md:text-3xl text-lg text-center'>Partners and Supporters</h1>
        <MarqueeComp/>
        <div className='flex flex-col mt-12  justify-center gap-8'>
            <div className='flex flex-col gap-4 w-[40vw]'>
        <h1 className='text-black font-semibold md:text-3xl text-lg '>Introducing the Crypto Shophe Debit Card</h1>
<p className='text-[#6B6F93] font-[400] text-[16px]'>Seamlessly Convert Your Crypto into Cash Anywhere.</p>
            </div>
<div className='flex gap-8'>
    <div className='text-[#6B6F93] font-[400] text-[16px]'>
<p>Multi-Currency support</p>
<p>CSHOP Token Integration</p>
<p>Look Exhange Rates</p>

    </div>
    <div className='text-[#6B6F93] font-[400] text-[16px]'>
<p>Virtual and Physical Card</p>
<p>Crypto Currency Security</p>
<p>And much more</p>

    </div>
</div>
        </div>
    </div>
  )
}

export default Partners