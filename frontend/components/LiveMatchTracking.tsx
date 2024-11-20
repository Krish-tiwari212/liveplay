"use client"

import React, { useState } from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { useEventContext } from '@/context/EventDataContext';

interface LiveMatchTrackingProps{
    handleNext:()=>void
}

const elite= [
    { name: "Unlimited Entries" },
    { name: "Event  Management" },
    { name: "Premium Listing" },
    { name: "Verified Badge" },
    { name: "Event Date Edits" },
    { name: "Quick Payout" },
    { name: "Lower Fees" },
    { name: "Live Match Tracker" },
    { name: "Setup and support" },
  ]


const LiveMatchTracking = ({ handleNext }: LiveMatchTrackingProps) => {
  
  const {
    EventData,
    setEventData,
    EventEditData,
    setEventEditData,
    isVenueNotDecided,
    setIsVenueNotDecided,
    editPage,
  } = useEventContext();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    EventData.selected_plan || "pro"
  );
   const handlePlanClick = (plan: string) => {
    setSelectedPlan(selectedPlan === plan ? null : plan)}
  return (
    <div className="m-3 bg-white">
      <div className="w-[90%] sm:w-72 flex flex-col gap-1 mx-auto sm:mx-0">
        <div
          className={`p-4 rounded-lg cursor-pointer transition-transform duration-400 bg-gray-800 text-white font-open-sauce ${
            selectedPlan === "elite"
              ? "border-8 border-[#cddc29]"
              : "border-none"
          } flex flex-col`}
          onClick={() => handlePlanClick("elite")}
        >
          <h2 className="text-2xl font-semibold">Elite</h2>
          <div className="flex gap-1 items-center justify-start">
            <p className="text-2xl flex items-center ">₹4,999</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <h1 className="font-semibold text-sm">Per Event</h1>
            <Button size="sm" variant="tertiary">
              Get The Best
            </Button>
            <h1 className="text-[#6F808F] text-sm">Incudes</h1>
          </div>

          <div className="items-center">
            <ul>
              {elite.map((feature, index) =>
                feature.name === "Verified Badge" ? (
                  <li key={index} className="my-1 flex items-center gap-2 ">
                    <h1 className="text-[#CDDC29]">{feature.name} </h1>
                    <div>
                      <Image
                        src="/icons/EliteBadgeDark.svg"
                        alt="/icons/EliteBadgeDark.svg"
                        width={70}
                        height={70}
                      />
                    </div>
                  </li>
                ) : (
                  <li key={index} className="my-1">
                    <h1 className="text-[#CDDC29]">{feature.name}</h1>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        {editPage !== "manageEvent" && (
          <Button onClick={()=>{setSelectedPlan("standard");
      handleNext()}} className="block sm:hidden">
            Skip For Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default LiveMatchTracking
