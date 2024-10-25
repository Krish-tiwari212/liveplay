"use client";

import React, { useState } from "react";
import OverviewSidebar from "@/components/OverviewSidebar";
import EventDetailsForm from "@/components/EventDetailsForm";
import EventMediaContactForm from "@/components/EventMediaContactForm";
import EventLocationForm from "@/components/EventLocationForm";
import { useAppContext } from "@/lib/context/AppContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";
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
  setEventData: React.Dispatch<React.SetStateAction<any>>;
}

const EventInformation: React.FC<EventInformation> = ({
  handleNext,
  setEventData,
}) => {
  const [formType, setFormType] = useState<string>("default");
  const { theme } = useAppContext();
  const [formData, setFormData] = useState<any>({});
  const [venuedecidet,setVenueDecided]=useState(false)

  const renderForm = () => {
    switch (formType) {
      case "Esentioal":
        return (
          <EventDetailsForm
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
            setEventData={setEventData}
          />
        );
      case "Location":
        return (
          <EventLocationForm
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
            setEventData={setEventData}
          />
        );
      case "Insights":
        return (
          <EventInsights
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
            setEventData={setEventData}
          />
        );
      case "Branding":
        return (
          <EventMediaContactForm
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
            handleNext={handleNext}
            setEventData={setEventData}
          />
        );
      default:
        return (
          <EventDetailsForm
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
            setEventData={setEventData}
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
