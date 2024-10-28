"use client";

import React, { useEffect, useState } from "react";
import OverviewSidebar from "@/components/OverviewSidebar";
import EventDetailsForm from "@/components/EventDetailsForm";
import EventMediaContactForm from "@/components/EventMediaContactForm";
import EventLocationForm from "@/components/EventLocationForm";
import EventInsights from "@/components/EventInsights";
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

const EventInformation: React.FC<EventInformation> = ({
  handleNext,
}) => {
  const [formType, setFormType] = useState<string>("default");
  const [formData, setFormData] = useState<any>({});
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
    <div className="flex flex-col md:flex-row w-full bg-slate-200 overflow-hidden ">
      <OverviewSidebar
        setFormType={setFormType}
        content={OverviewSidebarContent}
      />
      <div className="flex-[4] m-3 mb-20">{renderForm()}</div>
    </div>
  );
};

export default EventInformation;
