"use client"

import React, { useEffect, useState } from 'react'
import { Progress } from './ui/progress'
import { RiContactsBookUploadFill } from "react-icons/ri";
import { MdCreateNewFolder, MdOutlineCategory, MdOutlineFeaturedPlayList, MdOutlineRocketLaunch } from 'react-icons/md';
import { IoCreate } from 'react-icons/io5';
import { useEventContext } from '@/context/EventDataContext';
import { toast } from '@/hooks/use-toast';

interface Checkpoint {
  icon: JSX.Element;
  label: string;
  placement: number;
}

interface ProgressBarProps {
  forpage?:string;
  checkpoints: Checkpoint[];
  currentpage: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
  totalPages: number;
}

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
];


const ProgressBar: React.FC<ProgressBarProps> = ({
  checkpoints,
  currentpage,
  setCurrentPage,
  totalPages,
  forpage,
}) => {
  const { EventData, setEventData, isVenueNotDecided, setIsVenueNotDecided,unlockEventCircle,editPage } =
    useEventContext();

  const fieldsToCheck = isVenueNotDecided
    ? requiredFields.filter(
        (field) =>
          !["venueName", "eventAddress", "eventPincode", "venuelink"].includes(
            field
          )
      )
    : requiredFields;

  const handlecircel = (checkpoint: Checkpoint) => {
    if (forpage === "createEvent" && checkpoint.placement === 5 && currentpage < 5) {
      console.log(fieldsToCheck);
      const missingFields = fieldsToCheck.filter(
        (field) => EventData[field] === undefined || EventData[field] === ""
      );

      if (missingFields.length > 0) {
        toast({
          title: "Please fill out the necessary details",
          description: `${missingFields.length<5?`Missing fields: ${missingFields.join(
            ", "
          )}`:"Please fill necessary details"}`, 
        });
      } else {
        setCurrentPage(checkpoint.placement);
        console.log(EventData);
      }
    } else {
      setCurrentPage(checkpoint.placement);
    } 

  };
  useEffect(()=>{
  },[])
  return (
    <div
      className={`relative ${checkpoints.length >= 7 && "w-full"} ${
        checkpoints.length === 5 && "w-full lg:w-[80%]"
      } ${checkpoints.length === 3 && "w-[95%] lg:w-[50%]"} mx-auto mt-6 ${
        forpage !== "manageEvent"
          ? "mb-20 sm:mb-12"
          : "h-1 sm:h-12 lg:h-20 mb-5 "
      } `}
    >
      {forpage !== "manageEvent" && (
        <Progress
          value={(currentpage / (totalPages - 1)) * 100}
          className="h-2"
        />
      )}
      <div
        className={`flex justify-between   ${
          forpage !== "manageEvent" ? "absolute -top-3" : "relative"
        } ${
          checkpoints.length >= 7
            ? "w-full left-[0%] md:w-[95%] md:left-[2.5%] xl:w-[80%] xl:left-[10%]"
            : checkpoints.length === 5
            ? " w-[90%] left-[2.5%]"
            : " w-[80%] left-[10%]"
        } items-center `}
      >
        {checkpoints.map((checkpoint, index) => (
          <div
            key={index}
            className={`flex flex-col relative items-center justify-center cursor-pointer`}
          >
            <div
              onClick={()=>handlecircel(checkpoint)}
              className={`w-7 h-7 sm:w-8 sm:h-8  rounded-full bg-gray-800 text-white flex items-center justify-center`}
            >
              {checkpoint.icon}
            </div>
            <h1
              className={`font-semibold  sm:text-sm xl:text-md text-center text-gray-800 mt-2  ${
                checkpoints.length >= 7 ? "text-[0.5rem]" : " text-[0.8rem]"
              }`}
            >
              {checkpoint.label}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar
