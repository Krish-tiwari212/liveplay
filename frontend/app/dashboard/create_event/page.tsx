"use client"

import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress";
import EventInformation from '@/components/EventInformation';
import { Button } from '@/components/ui/button';
import EnableFeatures from '@/components/EnableFeatures';
import CategoryPreview from '@/components/CategoryPreview';
import PreviewEventChanges from '@/components/PreviewEventChanges';
import ProgressBar from '@/components/ProgressBar';
import { RiContactsBookUploadFill } from 'react-icons/ri';
import { MdOutlineCategory, MdOutlineFeaturedPlayList, MdOutlineRocketLaunch } from 'react-icons/md';
import { IoCreate } from 'react-icons/io5';
import EventBoosters from '@/components/EventBoosters';
import GoLive from '@/components/GoLive';
import { useEventContext } from '@/context/EventDataContext';

const ProgressBarCheckpoints = [
  {
    icon: <IoCreate />,
    label: "Event Setup",
    placement: 1,
  },
  {
    icon: <MdOutlineCategory />,
    label: "Category Setup",
    placement: 2,
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    label: "Enable Features",
    placement: 3,
  },
  {
    icon: <MdOutlineRocketLaunch />,
    label: "Event Boosters",
    placement: 4,
  },
  {
    icon: <RiContactsBookUploadFill />,
    label: "Go Live",
    placement: 5,
  },
];

const page = () => {
  const { EventData, setEventData,DashboardName,setDashboardName,setEditPage } = useEventContext();
  const [currentPage,setCurrentPage]=useState(1)
  const totalPages = 6;

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage); 
    }
  };
   const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
   };
   
   useEffect(()=>{
    setDashboardName("Create Event")
    setEditPage("createEvent")
   },[])

  return (
    <div className="m-3 relative">
      <ProgressBar
        forpage="createEvent"
        currentpage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        checkpoints={ProgressBarCheckpoints}
      />
      {currentPage === 1 && (
        <EventInformation handleNext={handleNext} page="createEvent" />
      )}
      {currentPage === 2 && (
        <CategoryPreview handleNext={handleNext} page="createEvent" />
      )}
      {currentPage === 3 && (
        <EnableFeatures handleNext={handleNext} page="createEvent" />
      )}
      {currentPage === 4 && <EventBoosters handleNext={handleNext} />}
      {currentPage === 5 && <GoLive />}
    </div>
  );
}

export default page
