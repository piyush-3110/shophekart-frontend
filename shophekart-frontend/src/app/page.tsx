import React from 'react'

import FloatingNavbar from '@/components/Homepage/Hero/Navbar/FloatingNavbar'
import { Hero } from '@/components/Homepage/Hero/Main/Hero'
import { Tokenomics } from '@/components/Homepage/Tokenomics/Tokenomics'
const page = () => {
  return (
    <div className='bg-[#f1f4ff]  '>
      <FloatingNavbar/>
      <Hero/>
      <Tokenomics/>
    </div>
  )
}

export default page