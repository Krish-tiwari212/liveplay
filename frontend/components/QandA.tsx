import React, { useEffect, useState } from 'react'
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useEventContext } from '@/context/EventDataContext';
import Image from 'next/image';

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
        <Label htmlFor="airplane-mode" className="text-sm md:text-lg">
          Enable Q&A
        </Label>
        <Switch
          id="enable-countdown"
          onCheckedChange={handlecountdown}
          checked={showQnA}
        />
      </div>
      {showQnA && (
        
        <div className="flex justify-center items-center pt-4">
          <Image 
            src="/images/QNA.svg" 
            alt='public/images/QNA.svg' 
            width={800} 
            height={800} 
            className='border shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'
          />
        </div>
      )} 
    </div>
  );
};

export default QandA
