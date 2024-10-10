import React, { useEffect, useState } from 'react';

interface CountDownTimerProps {
  endDate: Date; // Removed startDate
  enableCountdown: boolean;
}

const CountDownTimer: React.FC<CountDownTimerProps> = ({ endDate, enableCountdown }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isCountdownEnabled, setIsCountdownEnabled] = useState<boolean>(enableCountdown); // New state for toggling

  useEffect(() => {
    if (isCountdownEnabled) { // Updated to use new state
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = new Date(endDate).getTime() - now; // Countdown to endDate
        setTimeLeft(distance);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCountdownEnabled, endDate]); // Updated dependency

  const formatTimeLeft = (time: number) => {
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTimeLeft(timeLeft);

  return (
    <div className="bg-white p-5 rounded-lg shadow-2xl">
      <button 
        className="bg-gray-800 text-white p-2 rounded" 
        onClick={() => setIsCountdownEnabled(prev => !prev)} 
      >
        {isCountdownEnabled ? 'Disable Countdown' : 'Enable Countdown'}
      </button>
      {isCountdownEnabled && timeLeft > 0 ? ( // Updated to use new state
        <div>
          <h1 className="text-2xl font-bold">Countdown Timer</h1>
          <p className="text-lg">
            {days}d {hours}h {minutes}m {seconds}s
          </p>
        </div>
      ) : (
        <p className="text-lg">Countdown has ended or is disabled.</p>
      )}
      {/* Preview Box */}
      <div className="border border-black p-2 mt-2">
        <h2 className="text-xl font-semibold">Preview</h2>
        <p className="text-lg">
          {days}d {hours}h {minutes}m {seconds}s
        </p>
      </div>
    </div>
  );
}

export default CountDownTimer;
