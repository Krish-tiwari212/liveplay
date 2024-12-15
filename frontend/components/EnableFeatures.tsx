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
import QandA from "./QandA";

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
  eventId: string;
}


const EnableFeatures = ({ handleNext, eventId }: EnableFeaturesProps) => {
  const { EventData, setEventData,editPage } = useEventContext();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1000000);
  const [FeatureData, setFeatureData] = useState({
    countdown: false,
    drawFixtures: false,
  });
  return (
    <div className="m-2 sm:m-6">
      <h1 className="text-3xl font-bold mb-4 sm:mb-8">Event Setup</h1>
      <div className="flex flex-col bg-slate-200 overflow-hidden gap-5">
        <MyTimer expiryTimestamp={time} setFeatureData={setFeatureData} />
        <TshirtForParticipant setFeatureData={setFeatureData} />
        <Drawfixtures setFeatureData={setFeatureData} />
        <QandA handleNext={handleNext} FeatureData={FeatureData} />
        <GSTCompliance handleNext={handleNext} FeatureData={FeatureData} />

        <div className="flex justify-center items-center">
          <Button
            variant="tertiary"
            size="none"
            className="mb-4 text-lg px-16 py-1"
            onClick={handleNext}
          >
            {editPage === "manageEvent" ? "Save and Next" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnableFeatures;
