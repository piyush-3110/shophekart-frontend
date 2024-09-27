import React from 'react'


import Timeline from './Timeline'

export const Works = () => {
   
  return (
    <div className='min-h-[100vh] bg-black pb-40'>
           <h1 className="text-white font-semibold py-8 md:text-3xl text-lg text-center">
       How It Works
      </h1>
      {/* <WorksCard
        heading="Spend Instantly"
        content="Once your card is topped up, you can start spending immediately with any supported retailer. Enjoy the flexibility of using your cryptocurrency in the real world."
      /> */}
      <Timeline/>
    </div>
  )
}
