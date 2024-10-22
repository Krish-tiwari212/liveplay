"use client"

import React, { useState } from 'react'
import OverviewSidebar from "@/components/OverviewSidebar"; 
import CountDownTimer from '@/components/CountDownTimer';
import GSTCompliance from '@/components/GSTCompliance';
import TaxInvoice from '@/components/TaxInvoice';
import TshirtForParticipant from '@/components/TshirtForParticipant';
import MyTimer from '@/components/CountDownTimer';
import Drawfixtures from '@/components/Drawfixtures';

const OvervieSidebarContentFeatures = [
  {
    title: "Countdown Timer",
  },
  {
    title: "T-Shirt for Participants",
  },
  {
    title: "DrawFixtures",
  },
  {
    title: "GST Compliance",
  },
];

const page = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60); 
  const [formType, setFormType] = useState<string>("default"); 
    const renderForm = () => {
        switch (formType) {
          case "Countdown Timer":
            return (
              <div>
                <MyTimer expiryTimestamp={time} />
              </div>
            );
          case "T-Shirt for Participants":
            return <TshirtForParticipant />;
          case "DrawFixtures":
            return <Drawfixtures/>;
          case "GST Compliance":
            return <GSTCompliance/>;
          default:
            return (
              <div>
                <MyTimer expiryTimestamp={time} />
              </div>
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
