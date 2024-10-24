
import React from 'react'

import Footer from '@/components/Footer/Footer'
import  Hero  from '@/components/tokenization/Hero';
import Tokenized from '../../components/tokenization/Tokenize';


const page = () => {
  return (
    <div>
     
     <Hero/>
    <Tokenized/>
    <Footer/>
    </div>
  )
}
export default page;