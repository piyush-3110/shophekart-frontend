import React, { useState, useEffect } from 'react';
import { CountdownDiv } from './CountdownDiv';
import { BuyToken } from './BuyToken';

import PresaleProgress from './PresaleProgress';
import Generate from './Generate';

export const Presale = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  
  const targetDate = new Date('2024-12-31T23:59:59').getTime(); 

  useEffect(() => {
   
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Run the calculation once and set an interval for every second
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      <div className="h-fit lg:h-[16rem] lg:w-auto w-[95vw] bg-white border py-6  rounded-md shadow-lg px-20 flex lg:items-center lg:flex-row flex-col lg:justify-end gap-20">
        <div className=''>
        
         
          <h1 className="text-lg text-black font-semibold pb-6 ">Presale Ends in:</h1>

       
          {/* Countdown display */}
          <div className="flex gap-4">
            <CountdownDiv value={timeLeft.days} label="Days" />
            <CountdownDiv value={timeLeft.hours} label="Hours" />
            <CountdownDiv value={timeLeft.minutes} label="Minutes" />
            <CountdownDiv value={timeLeft.seconds} label="Seconds" />
          </div>
          <div className="mt-2">
<PresaleProgress totalTokens={100} currentTokens={0}/>

</div>
        </div>
        <div className='h-[12rem] hidden lg:block border border-[#f1eeee] '></div>
        <div>
          <div className='flex gap-2 items-center'>
          <h1 className="text-lg text-black font-semibold ">Buy tokens now: </h1>
<Generate/>
          </div>
        <h1 className='gradient-text py-3 !text-sm'>Balance: <span className="">0 CSHOP</span></h1>
        <h1 className='gradient-text py-2 !text-sm'>Referral: <span className=""></span>
        </h1>
<BuyToken/>
          {/* Placeholder for the buy token form */}
        </div>
      </div>
    </>
  );
};
