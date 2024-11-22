"use client"

import React, { useState } from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { useEventContext } from '@/context/EventDataContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

interface LiveMatchTrackingProps{
    handleNext:()=>void
}

const elite = [
  {
    name: "Unlimited Entries",
    description: "Host your sports event and accept unlimited registrations 😄",
  },
  {
    name: "Event Management",
    description:
      "Manage your events effortlessly and get insights to increase event sales 💹",
  },
  {
    name: "Premium Listing",
    description:
      "Gain max visibility when your event will be featured on the front page slideshow for 7 days 🚀",
  },
  {
    name: "Verified Badge",
    description:
      "Get a Verified Badge displayed next to your name to increase trust 🏆",
  },
  {
    name: "Event Date Edits",
    description:
      "Edit event dates flexibly and accommodate last minute changes 🗓️",
  },
  {
    name: "Quick Payout",
    description: (
      <>
        Receive event earnings instantly within <strong>24 hours</strong> of
        event completion ⚡
      </>
    ),
  },
  {
    name: "Lower Fees",
    description: "Enjoy a lower cancellation fee 🤑",
  },
  {
    name: "Live Match Tracker",
    description:
      "Update live scores for matches and enhance player engagement 📺",
  },
  {
    name: "Setup and Support",
    description:
      "Receive priority support and assistance to boost your event 📞",
  },
];


const LiveMatchTracking = ({ handleNext }: LiveMatchTrackingProps) => {
  
  const {
    EventData,
  } = useEventContext();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    EventData.selected_plan || "pro"
  );
  const [isbuttonClicked, setIsbuttonClicked]=useState(false)
   const handlePlanClick = (plan: string) => {
    setSelectedPlan(selectedPlan === plan ? null : plan)}
  return (
    <div className="m-3 flex flex-col gap-4 justify-center items-center ">
      {isbuttonClicked ? (
        <>
          <h1 className="text-3xl font-semibold text-center mb-2">
            Become an Elite Organizer with liveplay.in 🚀
          </h1>
          <p className="text-lg text-center w-[60%] mb-2">
            Get access to live score updation for all your event matches and
            keep your participants updated in real time !
          </p>
          <div
            className={`p-4 w-[60%] h-full rounded-lg cursor-pointer transition-transform duration-400 bg-gray-800 text-white font-open-sauce ${
              selectedPlan === "elite"
                ? "border-8 border-[#cddc29]"
                : "border-none"
            } flex justify-center  `}
            onClick={() => handlePlanClick("elite")}
          >
            <div className="flex flex-col flex-[2] items-center relative">
              <h2 className="text-4xl font-semibold">Elite</h2>
              <div className="flex gap-1 items-center justify-start">
                <p className="text-3xl flex items-center ">₹4,999</p>
              </div>
              <div className="w-full flex flex-col gap-1 items-center">
                <h1 className="font-semibold text-sm">Per Event</h1>
                <h1 className="text-[#6F808F] text-sm">Incudes</h1>
              </div>
              <div className="relative flex items-center justify-center mt-10">
                <Image
                  src="/icons/Asset 2.png"
                  alt="/icons/Asset 2.png"
                  width={150}
                  height={150}
                />
              </div>
            </div>

            <div className="items-center flex-[2] px-4 flex">
              <ul className="w-full flex flex-col ">
                {elite.map((feature, index) =>
                  feature.name === "Verified Badge" ? (
                    <li key={index} className="my-1 flex items-center gap-2 ">
                      <HoverCard>
                        <HoverCardTrigger className="my-1 flex items-center gap-2 ">
                          <h1 className="text-[#CDDC29]">{feature.name}</h1>
                          <div>
                            <Image
                              src="/icons/ProBadgeLight.svg"
                              alt="/icons/ProBadgeLight.svg"
                              width={70}
                              height={70}
                            />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-[14px] leading-none p-2 bg-[#CDDC29] text-[#1f2937] shadow-md shadow-[#CDDC29] border-none">
                          {feature.description}
                        </HoverCardContent>
                      </HoverCard>
                    </li>
                  ) : (
                    <li key={index} className="my-1">
                      <HoverCard>
                        <HoverCardTrigger>
                          <h1 className="text-[#CDDC29]">{feature.name}</h1>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-[14px] leading-none p-2 bg-[#CDDC29] text-[#1f2937] shadow-md shadow-[#CDDC29] border-none">
                          {feature.description}
                        </HoverCardContent>
                      </HoverCard>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="flex-[1] flex w-full justify-center relative items-center right-10">
              <Button size="sm" variant="tertiary" className=" w-full py-2">
                Get The Best 🚀
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center justify-center mt-32">
            Oh no !! You cannot access this exclusive feature of Live Scoring 🥲
          </h1>
          <Button onClick={() => setIsbuttonClicked(true)}>Know Why 😓</Button>
        </>
      )}
    </div>
  );
};

export default LiveMatchTracking
