import { Hero } from '@/components/dao/Hero'
import { Slider } from '@/components/dao/Slider'
import Footer from '@/components/Footer/Footer'

import React from 'react'

const page = () => {
  return (
    <div className='w-full overflow-x-hidden'>
      <Hero/>
      <Slider/>
      <Footer/>
    </div>
  )
}
export default page;