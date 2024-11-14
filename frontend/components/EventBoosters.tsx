"use client"

import React, { useEffect, useState } from 'react'
import { IoCheckmarkDone } from 'react-icons/io5';
import { Button } from './ui/button';
import { MdOutlineCurrencyRupee, MdTimer } from 'react-icons/md';
import { toast } from "@/hooks/use-toast";
import { useEventContext } from '@/context/EventDataContext';
import { TbCoinRupeeFilled } from 'react-icons/tb';
import { FaRegEye } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import Image from 'next/image';

const features = {
  standard: [{ name: "Unlimited Entries" }, { name: "Event  Management" }],
  pro: [
    { name: "Unlimited Entries" },
    { name: "Event  Management" },
    { name: "Featured Listing" },
    { name: "Verified Badge" },
    { name: "Event Date Edit" },
    { name: "Quick Payout" },
  ],
  elite: [
    { name: "Unlimited Entries" },
    { name: "Event  Management" },
    { name: "Premium Listing" },
    { name: "Verified Badge" },
    { name: "Event Date Edits" },
    { name: "Quick Payout" },
    { name: "Lower Fees" },
    { name: "Live Match Tracker" },
    { name: "Setup and support" },
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
  const { EventData, setEventData,EventEditData,setEventEditData, isVenueNotDecided, setIsVenueNotDecided,editPage } =
    useEventContext();
  const [selectedPlan, setSelectedPlan] = useState<string | null>("pro");

  const handlePlanClick = (plan: string) => {
    setSelectedPlan(selectedPlan === plan ? null : plan);
    setEventData({ ...EventData, selected_plan: plan || "standard" });
    setEventEditData({ ...EventEditData, selected_plan: plan || "standard" });
  };

  const handleProceed = () => {
    const fieldsToCheck = isVenueNotDecided
      ? requiredFields.filter(
          (field) =>
            !["venue_name", "street_address", "pincode", "venue_link"].includes(
              field
            )
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
    <div className={`w-full`}>
      <h1
        className={`text-2xl sm:text-4xl text-center font-semibold ${
          editPage !== "manageEvent" ? "pt-8" : ""
        }`}
      >
        🚀 Supercharge your Event Now!
      </h1>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-8 mt-4 text-2xl text-gray-800 sm:w-[80%] mx-auto font-semibold">
        <div className="flex items-center gap-2">
          <FaPeopleGroup />
          <span style={{ textShadow: "0 3px 0 #cddc29" }}>
            More Registrations
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegEye />
          <span style={{ textShadow: "0 3px 0 #cddc29" }}>More Views</span>
        </div>
        <div className="flex items-center gap-2">
          <TbCoinRupeeFilled />
          <span style={{ textShadow: "0 3px 0 #cddc29" }}>Higher Earnings</span>
        </div>
        <div className="flex items-center gap-2">
          <span role="img" aria-label="timer">
            <MdTimer />
          </span>
          <span style={{ textShadow: "0 3px 0 #cddc29" }}>Faster Payouts</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center h-full gap-4 mt-10">
        <div className=" w-[90%] sm:w-72 flex flex-col gap-1">
          <div
            className={`p-4 rounded-lg cursor-pointer transition-transform duration-400 bg-gray-800 text-white font-open-sauce ${
              selectedPlan === "standard"
                ? "border-8 border-[#cddc29]"
                : "border-none"
            } flex flex-col h-full`}
            onClick={() => handlePlanClick("standard")}
          >
            <h2 className="text-2xl font-semibold">Standard</h2>
            <p className="text-2xl mb-4 font-semibold">Free</p>
            <div className="">
              <h1 className="font-semibold ">Current Plan</h1>
              <h1 className="text-[#6F808F] text-sm">Incudes</h1>
            </div>
            <div className="items-center">
              <ul>
                {features.standard.map((feature, index) => (
                  <li key={index} className="my-1">
                    <h1 className="text-[#CDDC29]">{feature.name}</h1>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {editPage !== "manageEvent" && (
            <Button onClick={handleProceed} className="hidden sm:block">
              Skip For Now
            </Button>
          )}
        </div>
        <div
          className={`relative p-4 rounded-lg cursor-pointer w-[90%] sm:w-72 transition-transform duration-400 bg-gray-800 text-white font-open-sauce ${
            selectedPlan === "pro" ? "border-8 border-[#cddc29]" : "border-none"
          } flex flex-col`}
          onClick={() => handlePlanClick("pro")}
        >
          <div className="absolute right-0 top-0 px-2 rounded-bl-lg rounded-tr-lg h-auto w-auto bg-[#7F1CFF]">
            Most Popular
          </div>
          <div className="absolute right-10 top-10">
            <Image
              src="/icons/Asset 2.png"
              alt="/icons/Asset 2.png"
              width={70}
              height={70}
            />
          </div>
          <h2 className="text-2xl font-semibold">Pro</h2>
          <div className="flex gap-1 mb-2 items-center justify-start">
            <p className="text-2xl flex items-center ">₹3,999</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <h1 className="font-semibold text-sm">Per Event</h1>
            <Button
              size="sm"
              variant="tertiary"
              className="bg-[#7F1CFF] text-white "
            >
              Get Boosted Up
            </Button>
            <h1 className="text-[#6F808F] text-sm">Incudes</h1>
          </div>
          <div className="items-center ">
            <ul>
              {features.pro.map((feature, index) => (
                <li key={index} className="my-1">
                  <h1 className="text-[#CDDC29]">{feature.name}</h1>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-[90%] sm:w-72 flex flex-col gap-1">
          <div
            className={`p-4 rounded-lg cursor-pointer transition-transform duration-400 bg-gray-800 text-white font-open-sauce ${
              selectedPlan === "elite"
                ? "border-8 border-[#cddc29]"
                : "border-none"
            } flex flex-col`}
            onClick={() => handlePlanClick("elite")}
          >
            <h2 className="text-2xl font-semibold">Elite</h2>
            <div className="flex gap-1 mb-2 items-center justify-start">
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
                {features.elite.map((feature, index) => (
                  <li key={index} className="my-1">
                    <h1 className="text-[#CDDC29]">{feature.name}</h1>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {editPage !== "manageEvent" && (
            <Button onClick={handleProceed} className="block sm:hidden">
              Skip For Now
            </Button>
          )}
        </div>
      </div>

      {/* <div className="flex justify-center items-center">
        <Button
          variant="tertiary"
          size="none"
          className="mt-10 text-lg px-16 py-1"
          onClick={handleProceed}
        >
          Proceed
        </Button>
      </div> */}
    </div>
  );
};

export default EventBoosters
