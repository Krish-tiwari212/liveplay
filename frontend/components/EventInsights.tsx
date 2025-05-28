import React, { useEffect, useState } from 'react'
import { Label } from './ui/label';
import { useEventContext } from '@/context/EventDataContext';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  maxlength?:number
}

interface EventInsights {
  fields?: FormField[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFormType: React.Dispatch<React.SetStateAction<any>>;
  ManageEventId:any
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
    name: "event_description",
    type: "textarea",
    maxlength: 250,
    placeholder:
      "Briefly describe your event, including the theme, key activities, and what makes it exciting for participants.",
  },
  {
    label: "Event USP",
    name: "event_usp",
    type: "textarea",
    maxlength: 100,
    placeholder:
      "Please describe what makes your event truly unique.",
  },
  {
    label: "Rewards And Prizes",
    name: "rewards_for_participants",
    type: "textarea",
    maxlength: 500,
    placeholder:
      "List the prizes for participants, eligibility criteria, and how winners will be chosen.",
  },
  {
    label: "Playing Rules",
    name: "playing_rules",
    type: "textarea",
    maxlength: 1000,
    placeholder:
      "Summarize the main rules for the event, including guidelines and scoring methods to ensure fair play.",
  },
  {
    label: "Cash Prize Pool",
    name: "cash_price_pool",
    type: "number",
    placeholder: "Enter Cash Prize Pool",
  },
];

const EventInsights: React.FC<EventInsights> = ({
  formData,
  setFormData,
  setFormType,
  ManageEventId,
}) => {
  const {
    EventData,
    setEventData,
    setEventEditData,
    EventEditData,
    editPage,
    fetchedEventdatafromManagemeEvent,
  } = useEventContext();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    if (editPage === "manageEvent") {
      setEventEditData((prevData: any) => ({ ...prevData, [name]: value }));
    } else {
      setEventData((prevData: any) => ({ ...prevData, [name]: value }));
    }
  };
  useEffect(() => {
    if (editPage === "manageEvent" && EventEditData) {
      setFormData((previousEventData: any) => ({
        ...previousEventData,
        event_description: EventEditData.event_description || "",
        rewards_for_participants: EventEditData.rewards_for_participants || "",
        event_usp: EventEditData.event_usp || "",
        playing_rules: EventEditData.playing_rules || "",
        cash_price_pool: EventEditData.cash_price_pool || "",
      }));
    } else if (editPage === "createEvent" && EventData) {
      setFormData((previousEventDate: any) => ({
        ...previousEventDate,
        event_description: EventData.event_description || "",
        rewards_for_participants: EventData.rewards_for_participants || "",
        event_usp: EventData.event_usp || "",
        playing_rules: EventData.playing_rules || "",
        cash_price_pool: EventData.cash_price_pool ||""
      }));
    }
  }, [EventData, EventEditData]);

  const handleNext = async (e: any) => {
    e.preventDefault();
    if (editPage === "manageEvent") {
      const differences = {};
      const formFields = [
        "event_description",
        "event_usp",
        "rewards_for_participants",
        "playing_rules",
      ];

      formFields.forEach((field) => {
        if (
          EventEditData?.[field] !== fetchedEventdatafromManagemeEvent?.[field]
        ) {
          differences[field] = EventEditData?.[field];
        }
      });
      console.log(differences);

      if (Object.keys(differences).length > 0) {
        try {
          const response = await fetch(`/api/event/update/${ManageEventId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(differences),
          });

          const result = await response.json();
          if (response.ok) {
            toast({
              title: "Event updated successfully",
              variant: "default",
            });
          } else {
            throw new Error(result.error || "Failed to update event");
          }
        } catch (error) {
          console.error("An error occurred:", error);
          toast({
            title: "Failed to update event. Please try again.",
            variant: "destructive",
          });
          return;
        }
      }
    }
    setFormType("Branding");
  };

  return (
    <form className="bg-white p-5 rounded-lg shadow-2xl">
      <div className="flex flex-wrap w-full">
        {Insightfields.map((field) => (
          <div key={field.name} className="w-full m-2 flex flex-col mb-4">
            <Label className="font-bold text-lg">
              {field.label}
              <span className="text-red-500">*</span>
            </Label>
            {field.type === "number" ? (
              <input
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required
                type={field.type}
                value={formData[field.name as keyof typeof formData] || ""}
                onChange={handleChange}
                className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
             />
            ) : (
              <textarea
                id={field.name}
                name={field.name}
                rows={4}
                placeholder={field.placeholder}
                required
                type={field.type}
                value={formData[field.name as keyof typeof formData] || ""}
                onChange={handleChange}
                className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
                maxLength={field.maxlength}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Button
          variant="tertiary"
          size="none"
          onClick={(e) => handleNext(e)}
          className="mt-4 text-lg px-10 sm:px-16 py-1"
        >
          {editPage === "manageEvent" ? "Save and Next" : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default EventInsights
