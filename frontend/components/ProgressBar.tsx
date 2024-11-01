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
  const { EventData, setEventData,EventEditData, isVenueNotDecided, setIsVenueNotDecided } =
    useEventContext();

  const fieldsToCheck = isVenueNotDecided
    ? requiredFields.filter(
        (field) =>
          !["venueName", "eventAddress", "eventPincode", "venuelink"].includes(
            field
          )
      )
    : requiredFields;

  const updatedProgress =
    forpage === "manageEvent" && !EventEditData.enable_fixtures
      ? checkpoints
          .filter((field) => !["Draw Creation"].includes(field.label))
          .map((checkpoint) => ({
            ...checkpoint,
            placement:
              checkpoint.label === "Event Boosters" ? 6 : checkpoint.placement,
          }))
      : checkpoints;

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


  return (
    <div
      className={`relative ${checkpoints.length === 7 && "w-[85%]"} ${
        checkpoints.length === 5 && "w-[95%] lg:w-[80%]"
      } ${checkpoints.length === 3 && "w-[95%] xl:w-[50%]"} mx-auto mt-6 ${
        forpage !== "manageEvent" ? "mb-12" : "mb-5"
      } `}
    >
      {forpage !== "manageEvent" && (
        <Progress
          value={(currentpage / (totalPages - 1)) * 100}
          className="h-2"
        />
      )}
      <div
        className={`flex justify-between  ${
          forpage !== "manageEvent" ? "absolute -top-3" : "relative"
        } ${
          checkpoints.length === 7 && "w-[90%] left-[5%]"
        } w-[80%] left-[10%] items-center `}
      >
        {updatedProgress.map((checkpoint, index) => (
          <div
            key={index}
            className={`flex flex-col relative items-center justify-center cursor-pointer`}
          >
            <div
              onClick={() => handlecircel(checkpoint)}
              className={` ${
                forpage !== "manageEvent" ? "w-8 h-8" : "w-11 h-11"
              } rounded-full bg-gray-800 text-white flex items-center justify-center  ${
                currentpage === checkpoint.placement
                  ? "shadow-lg shadow-gray-800"
                  : ""
              }`}
            >
              <span>{checkpoint.icon}</span>
            </div>
            <h1
              className={`font-semibold text-gray-800 mt-2 hidden ${
                checkpoints.length === 7 ? "xl:block" : " lg:block"
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
