"use client";

import React, { useEffect, useState } from "react";
import OverviewSidebar from "@/components/OverviewSidebar";
import CountDownTimer from "@/components/CountDownTimer";
import GSTCompliance from "@/components/GSTCompliance";
import TaxInvoice from "@/components/TaxInvoice";
import TshirtForParticipant from "@/components/TshirtForParticipant";
import MyTimer from "@/components/CountDownTimer";
import Drawfixtures from "@/components/Drawfixtures";
import { Button } from "./ui/button";

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

interface EnableFeaturesProps {
  handleNext: () => void;
  EventData: any;
  setEventData: React.Dispatch<React.SetStateAction<any>>;
}


const EnableFeatures = ({
  handleNext,
  EventData,
  setEventData,
}: EnableFeaturesProps) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1000000);
  const [FeatureData, setFeatureData] = useState({
    countdown: false,
    drawFixtures: false,
  });
  const [formType, setFormType] = useState<string>("default");
  const renderForm = () => {
    switch (formType) {
      case "Countdown Timer":
        return (
          <div>
            <MyTimer expiryTimestamp={time} setFeatureData={setFeatureData} />
          </div>
        );
      case "T-Shirt for Participants":
        return <TshirtForParticipant setFeatureData={setFeatureData} />;
      case "DrawFixtures":
        return <Drawfixtures setFeatureData={setFeatureData} />;
      case "GST Compliance":
        return (
          <GSTCompliance
            handleNext={handleNext}
            EventData={EventData}
            setEventData={setEventData}
            FeatureData={FeatureData}
          />
        );
      default:
        return (
          <div>
            <MyTimer expiryTimestamp={time} setFeatureData={setFeatureData} />
          </div>
        );
    }
  };
  useEffect(()=>{
    console.log(EventData);
  },[])
  return (
    <div className="flex flex-cols md:flex-row w-full bg-slate-200 overflow-hidden relative">
      <OverviewSidebar
        setFormType={setFormType}
        content={OvervieSidebarContentFeatures}
      />
      <div className="flex-[4] m-3">{renderForm()}</div>
    </div>
  );
};

export default EnableFeatures;
