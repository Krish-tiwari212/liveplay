import React, { useState } from "react";
import { useTimer } from "react-timer-hook";

const MyTimer = ({ expiryTimestamp }:any) => {
  const [showModal, setShowModal] = useState(false);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => setShowModal(true),
  });

  return (
    <div className="text-center font-sans p-8 bg-gradient-to-r bg-white shadow-lg rounded-lg">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">Countdown Timer</h1>
      {showModal ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Time's Up!</h2>
          <p className="mb-4">
            The countdown has finished. Thank you for your patience!
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-4xl mb-2 text-gray-800 ">
            {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
          </h2>
          <p className="text-lg text-gray-800 mb-4">Until the final date!</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={pause}
              className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg transition duration-300"
            >
              Pause
            </button>
            <button
              onClick={resume}
              className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg transition duration-300"
            >
              Resume
            </button>
            <button
              onClick={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 5);
                restart(time);
              }}
              className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg transition duration-300"
            >
              Restart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyTimer;
