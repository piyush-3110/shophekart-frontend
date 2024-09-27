import React from 'react'

import  WorksCard  from './WorksCard'

export const Works = () => {
   
  return (
    <div className='min-h-[100vh] bg-black'>
           <h1 className="text-white font-semibold py-8 md:text-3xl text-lg text-center">
       How It Works
      </h1>
     <WorksCard/>
    </div>
  )
}
