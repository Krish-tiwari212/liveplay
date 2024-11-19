import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { Switch } from "@/components/ui/switch";
import { Label } from "./ui/label";
import { useEventContext } from "@/context/EventDataContext";
import Image from "next/image";

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
        <Label htmlFor="airplane-mode" className="text-sm md:text-lg">
          Enable Countdown
        </Label>
        <Switch
          id="enable-countdown"
          onCheckedChange={handlecountdown}
          checked={showCountdown}
        />
      </div>
      {showCountdown && (
        <div className="flex justify-center items-center pt-4">
          <Image
            src="/images/Countdown.svg"
            alt="public/images/Countdown.svg"
            width={800}
            height={800}
            className="border shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          />
        </div>
      )}
    </div>
  );
};

export default MyTimer;
