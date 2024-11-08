"use client"

import React, { useEffect, useState } from 'react'
import { IoCheckmarkDone } from 'react-icons/io5';
import { Button } from './ui/button';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import { toast } from "@/hooks/use-toast";
import { useEventContext } from '@/context/EventDataContext';

const features = {
  standard: [
    { name: "Unlimited Entries" },
    { name: "Event Creation & Management" },
    { name: "Front Page Listing" },
  ],
  pro: [
    { name: "Featured Listing for 10 days" },
    { name: "Verified Badge" },
    { name: "Live Match" },
    { name: "1 Date Edit" },
    { name: "7.5% Cancel Fee" },
    { name: "3-5 Days Payout" },
  ],
  elite: [
    { name: "Topmost Listing for 10 Days" },
    { name: "Elite Verified Badge" },
    { name: "Live Match Progress Tracker" },
    { name: "2 Date Edits Allowed" },
    { name: "5% Cancel Fee" },
    { name: "Payout Within 24 Hours" },
  ],
};

const requiredFields = [
  "event_name",
  "organizer_contact_number",
  "organizer_name",
  "organizer_email",
  "start_date",
  "end_date",
  "last_registration_date",
  "last_withdrawal_date",
  "start_time",
  "city",
  "event_description",
  "event_usp",
  "rewards_for_participants",
  "playing_rules",
  "sport",
  "selected_plan",
  "mobileBanner",
  "desktopBanner",
  "categories",
  "category_name",
  "price",
  "ticket_description",
];

interface EventBoostersProps {
  handleNext: () => void;
}

const EventBoosters = ({
  handleNext,
}: EventBoostersProps) => {
  const { EventData, setEventData,EventEditData,setEventEditData, isVenueNotDecided, setIsVenueNotDecided } =
    useEventContext();
  const [selectedPlan, setSelectedPlan] = useState<string | null>("elite");

  const handlePlanClick = (plan: string) => {
    setSelectedPlan(selectedPlan === plan ? null : plan);
    setEventData({ ...EventData, selected_plan: plan || "elite" });
    setEventEditData({ ...EventEditData, selected_plan: plan || "elite" });
  };

  const handleProceed = () => {
    const fieldsToCheck = isVenueNotDecided
      ? requiredFields.filter(
          (field) =>
            ![
              "venueName",
              "eventAddress",
              "eventPincode",
              "venuelink",
            ].includes(field)
        )
      : requiredFields;

    const allFieldsPresent = fieldsToCheck.every(
      (field) => EventData[field] !== undefined && EventData[field] !== ""
    );

    if (!allFieldsPresent) {
      toast({
        title: "Please fill out the necessary details",
      });
    } else {
      handleNext();
    }
  };

  
   useEffect(() => {
     console.log(EventData);
   }, []);
  return (
    <div className="m-3 w-full">
      <h1 className="text-5xl text-center font-semibold  mt-10">
        Event Boosters
      </h1>
      <div className="flex justify-center h-full gap-1 mt-10">
        <div
          className={`p-4 border border-gray-600 rounded-lg cursor-pointer w-72 transition-transform duration-400 bg-gray-800 text-white ${
            selectedPlan === "standard"
              ? "scale-110  shadow-lg shadow-gray-500"
              : ""
          } flex flex-col `}
          onClick={() => handlePlanClick("standard")}
        >
          <h2 className="text-gray-400 ">Start</h2>
          <p className="text-4xl mb-6">Free</p>
          <div className="w-full mx-auto h-[0.1em] bg-gray-600"></div>
          <div className="ml-3 items-center my-4">
            <ul>
              {features.standard.map((feature, index) => (
                <li key={index} className="my-1">
                  <div className="flex gap-2">
                    <IoCheckmarkDone className="text-[#CDDC29]" />
                    <h1>{feature.name}</h1>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`p-4 border border-gray-600 rounded-lg cursor-pointer w-72 transition-transform duration-400 bg-gray-800 text-white ${
            selectedPlan === "elite"
              ? "  scale-110 shadow-lg shadow-gray-500 "
              : ""
          } flex flex-col `}
          onClick={() => handlePlanClick("elite")}
        >
          <h2 className="text-gray-400 mt-3">Elite</h2>
          <div className="flex gap-1 mb-6 items-center">
            <p className="text-4xl flex items-center">
              <MdOutlineCurrencyRupee />
              4999
            </p>
            <p className="text-gray-400">/Mo</p>
          </div>
          <div className="w-full mx-auto h-[0.1em] bg-gray-600"></div>
          <div className="ml-3 items-center my-4">
            <ul>
              {features.elite.map((feature, index) => (
                <li key={index} className="my-1">
                  <div className="flex gap-2">
                    <IoCheckmarkDone className="text-[#CDDC29]" />
                    <h1>{feature.name}</h1>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`p-4 border border-gray-600 rounded-lg cursor-pointer w-72 transition-transform duration-400 bg-gray-800 text-white ${
            selectedPlan === "pro"
              ? "  scale-110  shadow-lg shadow-gray-500"
              : ""
          } flex flex-col`}
          onClick={() => handlePlanClick("pro")}
        >
          <h2 className="text-gray-400 ">Pro</h2>
          <div className="flex gap-1 mb-5 items-center">
            <p className="text-4xl flex items-center ">
              <MdOutlineCurrencyRupee />
              2999
            </p>
            <p className="text-gray-400">/Mo</p>
          </div>
          <div className="w-full mx-auto h-[0.1em] bg-gray-600"></div>
          <div className="ml-3 items-center my-4">
            <ul>
              {features.pro.map((feature, index) => (
                <li key={index} className="my-1">
                  <div className="flex gap-2">
                    <IoCheckmarkDone className="text-[#CDDC29]" />
                    <h1>{feature.name}</h1>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button
          variant="tertiary"
          size="none"
          className="mt-10 text-lg px-16 py-1"
          onClick={handleProceed}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default EventBoosters
