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
import { useEventContext } from "@/context/EventDataContext";

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
}


const EnableFeatures = ({ handleNext }: EnableFeaturesProps) => {
  const { EventData, setEventData } = useEventContext();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1000000);
  const [FeatureData, setFeatureData] = useState({
    countdown: false,
    drawFixtures: false,
  });
  return (
    <div className="mt-20 mx-6 flex flex-col bg-slate-200 overflow-hidden gap-5">
      <h1 className="text-3xl font-bold">Enable Features</h1>
      <MyTimer expiryTimestamp={time} setFeatureData={setFeatureData} />
      <TshirtForParticipant setFeatureData={setFeatureData} />
      <Drawfixtures setFeatureData={setFeatureData} />
      <GSTCompliance handleNext={handleNext} FeatureData={FeatureData} />
      <Button
        className="flex justify-center items-center gap-3 my-4 w-full"
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default EnableFeatures;
