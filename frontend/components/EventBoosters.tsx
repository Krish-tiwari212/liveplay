"use client"

import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { IoCheckmarkDone } from 'react-icons/io5';
import { Button } from './ui/button';
import { MdOutlineCurrencyRupee, MdTimer } from 'react-icons/md';
import { toast } from "@/hooks/use-toast";
import { useEventContext } from '@/context/EventDataContext';
import { TbCoinRupeeFilled } from 'react-icons/tb';
import { FaRegEye } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import Image from 'next/image';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";


const features = {
  standard: [
    {
      name: "Unlimited Entries",
      description:
        "Host your sports event and accept unlimited registrations 😄",
    },
    {
      name: "Event Management",
      description:
        "Manage your events effortlessly and get insights to increase event sales 💹",
    },
  ],
  pro: [
    {
      name: "Unlimited Entries",
      description:
        "Host your sports event and accept unlimited registrations 😄",
    },
    {
      name: "Event Management",
      description:
        "Manage your events effortlessly and get insights to increase event sales 💹",
    },
    {
      name: "Featured Listing",
      description:
        "Gain max visibility when your event will be featured on the front page slideshow for 3 days 🚀",
    },
    {
      name: "Verified Badge",
      description:
        "Get a Verified Badge displayed next to your name to increase trust 🏆",
    },
    {
      name: "Event Date Edit",
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
  ],
  elite: [
    {
      name: "Unlimited Entries",
      description:
        "Host your sports event and accept unlimited registrations 😄",
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
  "mobileBanner",
  "categories",
];

interface EventBoostersProps {
  handleNext: () => void;
}

const EventBoosters = ({
  handleNext,
}: EventBoostersProps) => {
  const { EventData, setEventData,EventEditData,setEventEditData, isVenueNotDecided, setIsVenueNotDecided,editPage } =
    useEventContext();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(EventData.selected_plan || "pro");
  const [categoryName,setCategoriename]=useState([])

  const handlePlanClick = (plan: string) => {
    setSelectedPlan(selectedPlan === plan ? null : plan);
    setEventData({ ...EventData, selected_plan: plan || "standard" });
    setEventEditData({ ...EventEditData, selected_plan: plan || "standard" });
  };

  const handleProceed = () => {
    console.log("Event Data:", EventData);
    const fieldsToCheck = isVenueNotDecided
      ? requiredFields.filter(
          (field) =>
            !["venue_name", "street_address", "pincode", "venue_link"].includes(
              field
            )
        )
      : requiredFields;
    const missingFields = fieldsToCheck.filter(
      (field) => EventData[field] === undefined || EventData[field] === ""
    );
    if (missingFields.length > 0) {
      toast({
        title: "Please fill out the necessary details",
        description: `The following fields are missing: ${missingFields.join(
          ", "
        )}`,
      });
      return;
    }
     const categoryNames = EventData.categories.map((category: any) =>
       category.category_name.trim().toLowerCase()
     );

     const categoryCount = categoryNames.reduce((acc: any, name: string) => {
       acc[name] = (acc[name] || 0) + 1;
       return acc;
     }, {});
     const duplicateCategories = Object.keys(categoryCount).filter(
       (name) => categoryCount[name] > 1
     );
     if (duplicateCategories.length > 0) {
       toast({
         title: "Duplicate Categories Detected",
         description: `The following categories are duplicated: ${duplicateCategories
           .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
           .join(", ")}`,
         variant: "destructive",
       });
       return;
     }
    
    const fieldsToUpdate = {
      selected_plan: "standard",
      Gst_Compliance: false,
      showqna: false,
      enable_fixtures: false,
      want_Tshirts: false,
      countdown: false,
    };

    const updatedFields = Object.keys(fieldsToUpdate).reduce((acc, key) => {
      if (!(key in EventData)) {
        acc[key] = fieldsToUpdate[key];
      }
      return acc;
    }, {});

    setEventData({
      ...EventData,
      ...updatedFields,
    });

    handleNext();
  };

  return (
    <div className={`w-full`}>
      <h1 className={`text-xl lg::text-4xl text-center font-semibold `}>
        🚀 Supercharge your Event Now!
      </h1>
      <div className="flex flex-col md:flex-row sm:justify-between gap-4 sm:gap-8 mt-6 text-lg md:text-2xl text-gray-800 w-[90%] md:w-[80%] mx-auto font-semibold">
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
      <div className="flex flex-col sm:flex-row justify-center h-full gap-4 my-10">
        <div className=" w-[90%] sm:w-72 flex flex-col gap-1 mx-auto sm:mx-0">
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
                    <HoverCard>
                      <HoverCardTrigger>
                        <h1 className="text-[#CDDC29]">{feature.name}</h1>
                      </HoverCardTrigger>
                      <HoverCardContent className="text-[14px] leading-none p-2 bg-[#CDDC29] text-[#1f2937] shadow shadow-[#CDDC29] border-none">
                        <ReactMarkdown>{feature.description}</ReactMarkdown>
                      </HoverCardContent>
                    </HoverCard>
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
          className={`relative p-4 rounded-lg cursor-pointer mx-auto sm:mx-0 w-[90%] sm:w-72 transition-transform duration-400 bg-gray-800 text-white font-open-sauce ${
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
          <div className="flex gap-1 items-center justify-start">
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
              {features.pro.map((feature, index) =>
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
        </div>
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
                {features.elite.map((feature, index) =>
                  feature.name === "Verified Badge" ? (
                    <li key={index} className="my-1 flex items-center gap-2 ">
                      <HoverCard>
                        <HoverCardTrigger className="my-1 flex items-center gap-2 ">
                          <h1 className="text-[#CDDC29]">{feature.name} </h1>
                          <div>
                            <Image
                              src="/icons/EliteBadgeDark.svg"
                              alt="/icons/EliteBadgeDark.svg"
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
          </div>
          {editPage !== "manageEvent" && (
            <Button onClick={handleProceed} className="block sm:hidden">
              Skip For Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventBoosters
