import React, { useState, useEffect } from 'react';
import { CountdownDiv } from './CountdownDiv';
import { BuyToken } from './BuyToken';

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
      <div className="h-[16rem] bg-white border py-6  rounded-md shadow-lg px-20 flex items-center justify-end gap-20">
        <div>
          <h1 className="text-lg text-black font-semibold pb-6 ">Presale Ends in:</h1>
          {/* Countdown display */}
          <div className="flex gap-4">
            <CountdownDiv value={timeLeft.days} label="Days" />
            <CountdownDiv value={timeLeft.hours} label="Hours" />
            <CountdownDiv value={timeLeft.minutes} label="Minutes" />
            <CountdownDiv value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
        <div className='h-[12rem] border border-[#f1eeee] '></div>
        <div>
        <h1 className="text-lg text-black font-semibold pb-6">Buy tokens now:</h1>
<BuyToken/>
          {/* Placeholder for the buy token form */}
        </div>
      </div>
    </>
  );
};
