"use client";

import React, { useEffect, useState } from "react";
import OverviewSidebar from "@/components/OverviewSidebar";
import EventDetailsForm from "@/components/EventDetailsForm";
import EventMediaContactForm from "@/components/EventMediaContactForm";
import EventLocationForm from "@/components/EventLocationForm";
import EventInsights from "@/components/EventInsights";
import { useEventContext } from "@/context/EventDataContext";
const OverviewSidebarContent = [
  {
    title: "Essential",
  },
  {
    title: "Location",
  },
  {
    title: "Insights",
  },
  {
    title: "Branding",
  },
];

interface EventInformation {
  handleNext: () => void;
}

const EventInformation: React.FC<EventInformation> = ({ handleNext }) => {
  const {EventEditData,EventData}=useEventContext()
  const [formType, setFormType] = useState<string>("default");
  const [formData, setFormData] = useState<any>({});
  useEffect(()=>{
    console.log(EventEditData)
  },[])
  const renderForm = () => {
    switch (formType) {
      case "Essential":
        return (
          <EventDetailsForm
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
          />
        );
      case "Location":
        return (
          <EventLocationForm
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
          />
        );
      case "Insights":
        return (
          <EventInsights
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
          />
        );
      case "Branding":
        return (
          <EventMediaContactForm
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
            handleNext={handleNext}
          />
        );
      default:
        return (
          <EventDetailsForm
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
          />
        );
    }
  };

  return (
    <div className="m-6">
      <h1 className="text-3xl font-bold mb-8">Event Setup</h1>
      <div className="flex flex-col md:flex-row w-full bg-slate-200 overflow-hidden ">
        <OverviewSidebar
          setFormType={setFormType}
          content={OverviewSidebarContent}
        />
        <div className="flex-[4] my-3 md:my-0 md:mx-3 pb-10">{renderForm()}</div>
      </div>
    </div>
  );
};

export default EventInformation;
