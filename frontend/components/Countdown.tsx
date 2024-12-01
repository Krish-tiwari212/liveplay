"use client"

import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  targetTime: string;
}

const CountdownTimer = ({ targetDate, targetTime }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        // Parse the target date and time
        const [targetHours, targetMinutes] = targetTime.split(':').map(Number);
        
        // Create target date object
        const targetDateTime = new Date(targetDate);
        targetDateTime.setHours(targetHours, targetMinutes, 0); // Set hours and minutes
        
        const now = new Date();

        // Log for debugging
        console.log('Target DateTime:', targetDateTime);
        console.log('Current DateTime:', now);

        const difference = targetDateTime.getTime() - now.getTime();
        console.log('Time Difference (ms):', difference);

        // If target date is in the past, show zeros
        if (difference <= 0) {
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          });
          return;
        }

        // Calculate time units only if target date is in the future
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });

      } catch (error) {
        console.error('Error calculating time:', error);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  return (
    <div className="flex justify-center items-center gap-4 bg-[#E6EAC5] px-4 rounded py-2 w-full md:w-auto">
      <h1 className="font-semibold text-center">Countdown</h1>
      <div className="flex gap-2 sm:gap-4">
        <div className="flex flex-col items-center justify-center leading-tight">
          <h1 className="font-semibold">{String(timeLeft.days).padStart(2, '0')}</h1>
          <p className="text-[10px]">Days</p>
        </div>
        <div className="flex flex-col items-center justify-center leading-tight">
          <h1 className="font-semibold">{String(timeLeft.hours).padStart(2, '0')}</h1>
          <p className="text-[10px]">Hours</p>
        </div>
        <div className="flex flex-col items-center justify-center leading-tight">
          <h1 className="font-semibold">{String(timeLeft.minutes).padStart(2, '0')}</h1>
          <p className="text-[10px]">Minutes</p>
        </div>
        <div className="flex flex-col items-center justify-center leading-tight">
          <h1 className="font-semibold">{String(timeLeft.seconds).padStart(2, '0')}</h1>
          <p className="text-[10px]">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;