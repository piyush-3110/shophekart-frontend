import Image from 'next/image'
import React from 'react'

export const Roadmap = () => {
  return (
    <div className='bg-black lg:min-h-[100vh] flex flex-col items-center py-10 gap-12'>
       <h1 className='text-lg md:text-3xl text-white font-semibold'>RoadMap</h1>
        <Image src="/images/homepage/roadmap.png" height={1024} width={1024} className='w-full h-auto' alt='Roadmap'></Image>
    </div>
  )
}
