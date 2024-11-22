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
        "Allow an unlimited number of participants to register for your event, ensuring maximum reach and engagement.",
    },
    {
      name: "Event Management",
      description:
        "Comprehensive tools to manage all aspects of your event, from scheduling to participant communication.",
    },
  ],
  pro: [
    {
      name: "Unlimited Entries",
      description:
        "Allow an unlimited number of participants to register for your event, ensuring maximum reach and engagement.",
    },
    {
      name: "Event Management",
      description:
        "Comprehensive tools to manage all aspects of your event, from scheduling to participant communication.",
    },
    {
      name: "Featured Listing",
      description:
        "Enhance the visibility of your event by featuring it prominently on the platform, attracting more attendees.",
    },
    {
      name: "Verified Badge",
      description:
        "Gain trust and credibility with a verified badge, assuring participants of the event's legitimacy and quality.",
    },
    {
      name: "Event Date Edit",
      description:
        "Flexibly modify the dates of your event as needed, accommodating any schedule changes without hassle.",
    },
    {
      name: "Quick Payout",
      description:
        "Receive your earnings faster with our expedited payout system, ensuring timely access to your funds.",
    },
  ],
  elite: [
    {
      name: "Unlimited Entries",
      description:
        "Allow an unlimited number of participants to register for your event, ensuring maximum reach and engagement.",
    },
    {
      name: "Event Management",
      description:
        "Comprehensive tools to manage all aspects of your event, from scheduling to participant communication.",
    },
    {
      name: "Premium Listing",
      description:
        "Achieve top-tier visibility with premium listings, placing your event at the forefront of the platform.",
    },
    {
      name: "Verified Badge",
      description:
        "Gain trust and credibility with a verified badge, assuring participants of the event's legitimacy and quality.",
    },
    {
      name: "Event Date Edits",
      description:
        "Flexibly modify the dates of your event as needed, accommodating any schedule changes without hassle.",
    },
    {
      name: "Quick Payout",
      description:
        "Receive your earnings faster with our expedited payout system, ensuring timely access to your funds.",
    },
    {
      name: "Lower Fees",
      description:
        "Benefit from reduced transaction fees, maximizing your profits and minimizing costs associated with event management.",
    },
    {
      name: "Live Match Tracker",
      description:
        "Provide real-time updates and tracking for matches or activities within your event, enhancing participant engagement.",
    },
    {
      name: "Setup and Support",
      description:
        "Receive dedicated assistance with setting up your event and ongoing support to ensure everything runs smoothly.",
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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(EventData.selected_plan || "pro");

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
      setSelectedPlan("standard");
      handleNext();
    }
  };

  useEffect(()=>{
    console.log(EventData)
  },[])

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
      <div className="flex flex-col sm:flex-row justify-center h-full gap-4 mt-10">
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
                      <HoverCardContent>{feature.description}</HoverCardContent>
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
                      <HoverCardContent>{feature.description}</HoverCardContent>
                    </HoverCard>
                  </li>
                ) : (
                  <li key={index} className="my-1">
                    <HoverCard>
                      <HoverCardTrigger>
                        <h1 className="text-[#CDDC29]">{feature.name}</h1>
                      </HoverCardTrigger>
                      <HoverCardContent>{feature.description}</HoverCardContent>
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
                        <HoverCardTrigger>
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
                        <HoverCardContent>
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
                        <HoverCardContent>
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
