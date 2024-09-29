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
  // State to store the time left, initialized as undefined until client-side
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // Function to calculate the remaining time
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
      // If no time is left, return zeros
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  };

  useEffect(() => {
    // Only run the timer on the client-side
    setTimeLeft(calculateTimeLeft());

    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clear the timer on component unmount
  }, [targetDate]);

  if (!timeLeft) {
    // Render a placeholder or nothing while the client-side state is being set
    return null;
  }

  return (
    <div className="flex space-x-2 text-sm md:text-[16px] text-[#0298FF] font-[700]">
      <div>{timeLeft.days}D</div>
      <div>{timeLeft.hours}H</div>
      <div>{timeLeft.minutes}M</div>
      <div>{timeLeft.seconds}S</div>
    </div>
  );
};

export default Countdown;
