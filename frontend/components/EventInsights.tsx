import React, { useEffect, useState } from 'react'
import { Label } from './ui/label';
import { useEventContext } from '@/context/EventDataContext';
import { Button } from './ui/button';

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

interface EventInsights {
  fields?: FormField[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFormType: React.Dispatch<React.SetStateAction<any>>;
}

const requiredFields = [
  "eventAddress",
  "desktopBanner",
  "eventDescription",
  "eventName",
  "eventPincode",
  "eventStreet",
  "eventUSP",
  "eventenddate",
  "eventstartDate",
  "lastRegistrationDate",
  "lastWithdrawalDate",
  "mobileBanner",
  "organiserName",
  "organiserNumber",
  "organiseremailaddress",
  "playingRules",
  "rewardsAndParticipation",
  "startTime",
];

const Insightfields = [
  {
    label: "Event Description",
    name: "eventDescription",
    placeholder: "Add description",
  },
  { label: "Event USP", name: "eventUSP", placeholder: "Add USP" },
  {
    label: "Rewards And Prizes",
    name: "rewardsAndParticipation",
    placeholder: "Add Rewards",
  },
  {
    label: "Playing Rules",
    name: "playingRules",
    placeholder: "Add Rules",
  },
];

const EventInsights: React.FC<EventInsights> = ({
  formData,
  setFormData,
  setFormType,
}) => {
  
  const { EventData, setEventData } = useEventContext();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
      setFormData((prevData: any) => ({ ...prevData, [name]: value })); 
      setEventData((prevData: any) => ({ ...prevData, [name]: value })); 
  };
  useEffect(() => {
    if (EventData) {
      setFormData((previousEventDate:any)=>({
        ...previousEventDate,
        eventDescription: EventData.eventDescription || "",
        rewardsAndParticipation: EventData.rewardsAndParticipation || "",
        eventUSP: EventData.eventUSP || "",
        playingRules: EventData.playingRules || "",
      }));
    }
  }, [EventData]);

  const handleNext=(e:any)=>{
    e.preventDefault(); 
    setFormType("Branding");
  }

  return (
    <form className="bg-white p-5 rounded-lg shadow-2xl">
      <div className="flex flex-wrap w-full">
        {Insightfields.map((field) => (
          <div key={field.name} className="w-full m-2 flex flex-col mb-4">
            <Label className="font-bold text-lg">
              {field.label}
              {requiredFields.includes(field.name) && !formData[field.name] ? (
                <span className="text-red-500">*</span>
              ) : (
                <></>
              )}
            </Label>
            <textarea
              id={field.name}
              name={field.name}
              rows={4}
              placeholder={field.placeholder}
              required
              value={formData[field.name as keyof typeof formData] || ""}
              onChange={handleChange}
              className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
            />
          </div>
        ))}
      </div>
      <Button onClick={(e) => handleNext(e)} className="w-full mt-4">
        Next
      </Button>
    </form>
  );
};

export default EventInsights
