import React, { createContext, useContext, useState, useEffect } from "react";

interface Timer {
  eventId: string;
  expiryTimestamp: Date | null;
}

const TimerContext = createContext<any>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [timers, setTimers] = useState<Timer[]>([]);

  const setTimer = (eventId: string, duration: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);
    setTimers((prev) => [...prev, { eventId, expiryTimestamp: time }]);
  };

  const getTimer = (eventId: string) => {
    return (
      timers.find((timer) => timer.eventId === eventId)?.expiryTimestamp || null
    );
  };

  return (
    <TimerContext.Provider value={{ setTimer, getTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
