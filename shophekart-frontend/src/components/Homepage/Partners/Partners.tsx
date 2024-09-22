import React from 'react'

import MarqueeComp from './MarqueeComp'

const Partners = () => {
  return (
    <div className='min-h-[100vh] py-12 flex gap-8 flex-col bg-white'>
        <h1 className='text-black font-semibold md:text-3xl text-lg text-center'>Partners and Supporters</h1>
        <MarqueeComp/>
    </div>
  )
}

export default Partners