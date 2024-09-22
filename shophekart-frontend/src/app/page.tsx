import React from 'react'

import FloatingNavbar from '@/components/Homepage/Hero/Navbar/FloatingNavbar'
import { Hero } from '@/components/Homepage/Hero/Main/Hero'
const page = () => {
  return (
    <div className='bg-[#f1f4ff]  h-[200vh] '>
      <FloatingNavbar/>
      <Hero/>
    </div>
  )
}

export default page