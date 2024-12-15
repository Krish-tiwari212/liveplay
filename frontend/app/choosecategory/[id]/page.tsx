"use client"

import Cart from '@/components/Cart';
import ChooseCategoryregister from '@/components/ChooseCategoryregister';
import HeroChangingTagLine from '@/components/HeroChangingTagLine';
import StickyCart from '@/components/StickyCart';
import { useUser } from '@/context/UserContext';
import { toast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react'

const page = ({ params }: any) => {
  const {id}=params
  const [EventDetails, setEventDetails] = useState({});
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) {
        toast({
          title: "Error",
          description: "No event ID provided",
          variant: "destructive",
        });
        return;
      }

      try {
        const response = await fetch(`/api/event/get_by_id/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const data = await response.json();

        if (!data || !data.id) {
          console.error("Invalid API response:", data);
          throw new Error("Invalid event data received");
        }
        setEventDetails(data);
      } catch (error: any) {
        console.error("Error fetching event details:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load event details",
          variant: "destructive",
        });
      } 
    };

    fetchEventDetails();
  }, [id]);
  return (
    <>
      <div className="mx-auto pt-6 md:pb-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <ChooseCategoryregister
            eventid={id}
            isCheckboxChecked={isCheckboxChecked}
            setIsCheckboxChecked={setIsCheckboxChecked}
          />
          <Cart
            gstrate={EventDetails.Gst_Rate}
            gstcompliance={EventDetails.Gst_Compliance}
            gstIncExc={EventDetails.Gst_Incexc}
            isCheckboxChecked={isCheckboxChecked}
          />
          <StickyCart />
        </div>
      </div>
    </>
  );  
};

export default page
