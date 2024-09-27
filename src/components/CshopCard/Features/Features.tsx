import React from 'react'
import { FeatureCard } from './FeatureCard'

export const Features = () => {
  return (
    <div>
          <h1 className='text-black font-semibold md:text-3xl text-lg text-center'>
        Key Features
      </h1>
      <div className='grid grid-cols-4 gap-6 items-center'>
        <FeatureCard/>
        <FeatureCard/>
        <FeatureCard/>
        <FeatureCard/>
        <FeatureCard/>
        <FeatureCard/>
        <FeatureCard/>
        <FeatureCard/>
      </div>
    </div>
  )
}
