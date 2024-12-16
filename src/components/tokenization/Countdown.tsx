/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";

// Define the shape of the timeLeft object
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string; // Target date passed as a prop in the format 'YYYY-MM-DDTHH:mm:ssZ'
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 text-center">
      {/* Days */}
      <div className="flex flex-col items-center justify-center bg-[#0f1113] text-white rounded-md shadow-lg min-w-[60px] min-h-[74px] border-[1px] border-[rgba(255,255,255,0.09)] mx-1">
        <span className="text-2xl font-bold">{timeLeft.days}</span>
        <span className="text-xs font-normal  text-gray-300">Days</span>
      </div>

      {/* Separator */}
      <div className="text-3xl font-bold text-gray-300 flex items-center mx-1">
        :
      </div>

      {/* Hours */}
      <div className="flex flex-col items-center justify-center bg-[#0f1113] text-white rounded-md shadow-lg min-w-[60px] min-h-[74px] border-[1px] border-[rgba(255,255,255,0.09)] mx-1">
        <span className="text-2xl font-bold">{timeLeft.hours}</span>
        <span className="text-xs font-normal  text-gray-300">Hours</span>
      </div>

      {/* Separator */}
      <div className="text-3xl font-bold text-gray-300 flex items-center mx-1">
        :
      </div>

      {/* Minutes */}
      <div className="flex flex-col items-center justify-center bg-[#0f1113] text-white rounded-md shadow-lg min-w-[60px] min-h-[74px] border-[1px] border-[rgba(255,255,255,0.09)] mx-1">
        <span className="text-2xl font-bold">{timeLeft.minutes}</span>
        <span className="text-xs font-normal  text-gray-300">Minutes</span>
      </div>

      {/* Separator */}
      <div className="text-3xl font-bold text-gray-300 flex items-center mx-1">
        :
      </div>

      {/* Seconds */}
      <div className="flex flex-col items-center justify-center bg-[#0f1113] text-white rounded-md shadow-lg min-w-[60px] min-h-[74px] border-[1px] border-[rgba(255,255,255,0.09)] mx-1">
        <span className="text-2xl font-bold">{timeLeft.seconds}</span>
        <span className="text-xs font-normal  text-gray-300">Seconds</span>
      </div>
    </div>
  );
};

export default Countdown;
