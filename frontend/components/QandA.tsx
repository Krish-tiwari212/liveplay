import React, { useEffect, useState } from 'react'
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useEventContext } from '@/context/EventDataContext';

interface QandAProps{
  handleNext:()=>void
  FeatureData:any
}

const QandA = ({ handleNext, FeatureData }: QandAProps) => {
  const { editPage, setEventData, setEventEditData, EventData, EventEditData } =
    useEventContext();
  const [showQnA, setShowQnA] = useState(false);
  const handlecountdown = () => {
    setShowQnA((prev) => !prev);
    if (editPage === "manageEvent") {
      setEventEditData((prevData: any) => ({
        ...prevData,
        showqna: !showQnA,
      }));
    } else {
      setEventData((prevData: any) => ({
        ...prevData,
        showqna: !showQnA,
      }));
    }
  };

  useEffect(() => {
    if (editPage === "manageEvent" && EventEditData) {
      setShowQnA(EventEditData.showqna || false);
    } else if (editPage === "createEvent" && EventData) {
      setShowQnA(EventData.showqna || false);
    }
  }, [EventEditData, EventData, editPage]);
  return (
    <div className="text-center font-sans p-8 bg-gradient-to-r bg-white shadow-lg rounded-lg relative">
      <div className="flex items-center space-x-2 relative">
        <Label htmlFor="airplane-mode" className="text-lg">
          Enable Q&A
        </Label>
        <Switch
          id="enable-countdown"
          onCheckedChange={handlecountdown}
          checked={showQnA}
        />
      </div>
      {showQnA && (
        <>
          <h1 className="text-5xl font-bold mt-4 mb-4 text-[#17202A]">
            Countdown Timer
          </h1>
          <h2 className="text-4xl mb-2 text-[#17202A] ">11 Days 15 Hours</h2>
          <p className="text-lg text-[#17202A] mb-4">Until the final date!</p>
        </>
      )}
    </div>
  );
};

export default QandA
