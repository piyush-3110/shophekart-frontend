
import React from 'react'

import Footer from '@/components/Footer/Footer'
import { Hero } from '@/components/tokenization/Hero';
import { Tokenize } from '@/components/tokenization/Tokenize';


const page = () => {
  return (
    <div>
     
     <Hero/>
     <Tokenize/>
    <Footer/>
    </div>
  )
}
export default page;