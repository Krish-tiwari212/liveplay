import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { Switch } from "@/components/ui/switch";
import { Label } from "./ui/label";
import { useEventContext } from "@/context/EventDataContext";

interface MyTimerProps {
  setFeatureData: React.Dispatch<React.SetStateAction<any>>;
  expiryTimestamp: any;
}

const MyTimer = ({ expiryTimestamp, setFeatureData }: MyTimerProps) => {
  const { EventData, setEventData,EventEditData,setEventEditData,editPage } = useEventContext();
  const [showModal, setShowModal] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  const handlecountdown = () => {
    setShowCountdown((prev) => !prev);
    if(editPage==="manageEvent"){
       setEventEditData((prevData: any) => ({
         ...prevData,
         countdown: !showCountdown,
       }));
    }else{
       setEventData((prevData: any) => ({
         ...prevData,
         countdown: !showCountdown,
       }));
    }
   
  };

  useEffect(() => {
    if (editPage === "manageEvent" && EventEditData) {
      setShowCountdown(EventEditData.countdown || false);
    } else if (editPage === "createEvent" && EventData) {
      setShowCountdown(EventData.countdown || false);
    }
  }, [EventEditData, EventData, editPage]);

  return (
    <div className="text-center font-sans p-8 bg-gradient-to-r bg-white shadow-lg rounded-lg relative">
      <div className="flex items-center space-x-2 relative">
        <Label htmlFor="airplane-mode">Enable Countdown</Label>
        <Switch
          id="enable-countdown"
          onCheckedChange={handlecountdown}
          checked={showCountdown}
        />
      </div>
      {showCountdown && (
        <>
          <h1 className="text-5xl font-bold mt-4 mb-4 text-[#17202A]">
            Countdown Timer
          </h1>
          {showModal ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Time's Up!</h2>
              <p className="mb-4">
                The countdown has finished. Thank you for your patience!
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-4xl mb-2 text-[#17202A] ">
                11 Days 15 Hours
              </h2>
              <p className="text-lg text-[#17202A] mb-4">
                Until the final date!
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyTimer;
