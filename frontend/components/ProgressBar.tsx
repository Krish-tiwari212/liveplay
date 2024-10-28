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
  forpage:string;
  checkpoints: Checkpoint[];
  currentpage: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
  totalPages: number;
}

const requiredFields = [
  "LastRegistrationDate",
  "LastWithdrawalDate",
  "city",
  "desktopBanner",
  "eventAddress",
  "eventDescription",
  "eventName",
  "eventPincode",
  "eventUSP",
  "eventenddate",
  "eventstartDate",
  "mobileBanner",
  "organiserName",
  "organiserNumber",
  "organiseremailaddress",
  "playingRules",
  "rewardsAndParticipation",
  "selectsport",
  "venueName",
  "venuelink",
  "selectedPlan",
  "categories",
];


const ProgressBar: React.FC<ProgressBarProps> = ({
  checkpoints,
  currentpage,
  setCurrentPage,
  totalPages,
  forpage,
}) => {
  const { EventData, setEventData, isVenueNotDecided, setIsVenueNotDecided } =
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
    // if (forpage === "createEvent" && checkpoint.placement === 5 && currentpage < 5) {
    //   console.log(fieldsToCheck);
    //   const missingFields = fieldsToCheck.filter(
    //     (field) => EventData[field] === undefined || EventData[field] === ""
    //   );

    //   if (missingFields.length > 0) {
    //     toast({
    //       title: "Please fill out the necessary details",
    //       description: `${missingFields.length<5?`Missing fields: ${missingFields.join(
    //         ", "
    //       )}`:"Please fill necessary details"}`, 
    //     });
    //   } else {
    //     setCurrentPage(checkpoint.placement);
    //     console.log(EventData);
    //   }
    // } else {
      setCurrentPage(checkpoint.placement);
    // } 
  };


  return (
    <div
      className={`relative ${
        checkpoints.length === 5 ? "w-[95%] lg:w-[80%]" : "w-[95%] xl:w-[50%]"
      } mx-auto mt-6 mb-12`}
    >
      <Progress
        value={(currentpage / (totalPages - 1)) * 100}
        className="h-2"
      />
      <div
        className={`flex justify-between -top-3 w-[80%] left-[10%] items-center absolute`}
      >
        {checkpoints.map((checkpoint, index) => (
          <div
            key={index}
            className="flex flex-col relative items-center justify-center cursor-pointer"
          >
            <div
              onClick={() => handlecircel(checkpoint)}
              className={`w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center`}
            >
              {checkpoint.icon}
            </div>
            <h1 className="font-semibold text-gray-800 mt-2 hidden lg:block">
              {checkpoint.label}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar
