import { Hero } from '@/components/dao/Hero'
import Footer from '@/components/Footer/Footer'

import React from 'react'

const page = () => {
  return (
    <div className='w-full overflow-x-hidden'>
      <Hero/>
      <Footer/>
    </div>
  )
}
export default page;