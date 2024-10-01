import React from 'react'
import { ProfileCard } from './ProfileCard'
import { Slider } from './Slider'

export const Profile = () => {
  return (
    <div className='w-full pb-12'>
        <div className='w-full relative h-[14rem] bg-gradient-to-r'style={{
          background: 'linear-gradient(to right, #25a5f6, #5aa1f6, #aabff9)',
        }}>
<div className='transform  translate-y-[25%] '>
<ProfileCard/>

</div>
<Slider/>
        </div>
    </div>
  )
}
