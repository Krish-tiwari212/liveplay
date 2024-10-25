"use client"

import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress";
import EventInformation from '@/components/EventInformation';
import { Button } from '@/components/ui/button';
import EnableFeatures from '@/components/EnableFeatures';
import CategoryPreview from '@/components/CategoryPreview';
import PreviewEventChanges from '@/components/PreviewEventChanges';


const page = () => {
  // const [currentPage, setCurrentPage] = useState(() => {
  //   const savedPage = localStorage.getItem('currentPage');
  //   return savedPage ? JSON.parse(savedPage) : 1;
  // });
  const [currentPage,setCurrentPage]=useState(1)
  const [EventData, setEventData] = useState({});
  const totalPages = 4;

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      // localStorage.setItem('currentPage', JSON.stringify(newPage)); 
    }
  };

  // Remove the handlePrev function as it's no longer needed
  // const handlePrev = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // useEffect(() => {
  //   localStorage.setItem('currentPage', JSON.stringify(currentPage));
  // }, [currentPage]);

  return (
    <div className="m-3 relative">
      <Progress
        value={(currentPage / totalPages) * 100}
        className="w-[50%] mx-auto h-2 mb-4"
      />
      <div className="text-center mb-2">
        Step {currentPage} of {totalPages}
      </div>

      {currentPage === 1 && (
        <EventInformation handleNext={handleNext} setEventData={setEventData} />
      )}
      {currentPage === 2 && (
        <CategoryPreview
          EventData={EventData}
          handleNext={handleNext}
          setEventData={setEventData}
        />
      )}
      {currentPage === 3 && (
        <EnableFeatures
          handleNext={handleNext}
          setEventData={setEventData}
          EventData={EventData}
        />
      )}
      {currentPage === 4 && (
        <PreviewEventChanges
          handleNext={handleNext}
          EventData={EventData}
          setEventData={setEventData}
        />
      )}
    </div>
  );
}

export default page
