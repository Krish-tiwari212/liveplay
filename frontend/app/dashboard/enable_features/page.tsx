"use client"

import React, { useState } from 'react'
import OverviewSidebar from "@/components/OverviewSidebar"; 
import CountDownTimer from '@/components/CountDownTimer';
import GSTCompliance from '@/components/GSTCompliance';
import TaxInvoice from '@/components/TaxInvoice';
import TshirtForParticipant from '@/components/TshirtForParticipant';

const OvervieSidebarContentFeatures = [
  {
    title: "Countdown Timer",
  },
  {
    title: "T-Shirt for Participants",
  },
  {
    title: "Q&A Section",
  },
  {
    title: "GST Compliance",
  },
];

const page = () => {
    
  const [formType, setFormType] = useState<string>("default"); 
    const renderForm = () => {
        switch (formType) {
          case "Countdown Timer":
            return (
              <CountDownTimer
                finalDate={new Date("2024-10-01T11:00:00")}
                initialActive={true}
              />
            );
          case "T-Shirt for Participants":
            return <TshirtForParticipant />;
          case "Q&A Section":
            return <></>;
          case "GST Compliance":
            return <GSTCompliance/>;
          default:
            return (
              <CountDownTimer
                finalDate={new Date("2024-10-01T11:00:00")}
                initialActive={true}
              />
            );
        }
    }
  return (
    <div className="flex flex-col md:flex-row w-full bg-slate-200 overflow-hidden ">
      <OverviewSidebar setFormType={setFormType} content={OvervieSidebarContentFeatures}/>
      <div className="flex-[4] m-3">{renderForm()}</div>
    </div>
  )
}

export default page
