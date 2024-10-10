"use client"

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
    title: "Esential",
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

const CreateEvent: React.FC = () => {
  const [formType, setFormType] = useState<string>("default"); 
  const { theme } = useAppContext();
  const renderForm = () => {
    switch (formType) {
      case "Esentioal":
        return <EventDetailsForm />; 
      case "Location":
        return <EventLocationForm />;
      case "Insights":
        return <EventInsights/>;
      case "Branding":
        return <EventMediaContactForm />
      default:
        return <EventDetailsForm />;
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

export default CreateEvent;
