import Image from 'next/image'
import React from 'react'

export const Roadmap = () => {
  return (
    <div className='bg-black min-h-[100vh] flex flex-col items-center py-10 gap-8'>
       <h1 className='text-lg text-white'>Roadmap</h1>
        <Image src="/images/homepage/roadmap.png" height={1024} width={1024} className='h-auto w-[95vw] md:h-[50vh] md:w-auto lg:h-[85vh] lg:w-auto ' alt='Roadmap'></Image>
    </div>
  )
}
