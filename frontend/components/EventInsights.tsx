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
    placeholder:
      "Briefly describe your event, including the theme, key activities, and what makes it exciting for attendees.",
  },
  {
    label: "Event USP",
    name: "event_usp",
    placeholder:
      "Please describe what makes your event truly unique.",
  },
  {
    label: "Rewards And Prizes",
    name: "rewards_for_participants",
    placeholder:
      "List the prizes for participants, eligibility criteria, and how winners will be chosen.",
  },
  {
    label: "Playing Rules",
    name: "playing_rules",
    placeholder:
      "Summarize the main rules for the event, including guidelines and scoring methods to ensure fair play.",
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
      }));
    } else if (editPage === "createEvent" && EventData) {
      setFormData((previousEventDate: any) => ({
        ...previousEventDate,
        event_description: EventData.event_description || "",
        rewards_for_participants: EventData.rewards_for_participants || "",
        event_usp: EventData.event_usp || "",
        playing_rules: EventData.playing_rules || "",
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
      <div className="flex justify-center items-center">
        <Button
          variant="tertiary"
          size="none"
          onClick={(e) => handleNext(e)}
          className="mt-4 text-lg px-20 py-1"
        >
          {editPage === "manageEvent" ? "Save and Next" : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default EventInsights
