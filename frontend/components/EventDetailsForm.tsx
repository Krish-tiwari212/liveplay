import { Checkbox } from "@/components/ui/checkbox";
import React,{  useEffect, useState } from "react";
import { Label } from "./ui/label";
import { eventNames } from "process";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LiaMicrophoneAltSlashSolid, LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { useEventContext } from "@/context/EventDataContext";
import { effect } from "zod";
import { Button } from "./ui/button";
import { format } from "date-fns"; 
import { FaBasketball } from "react-icons/fa6";


interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

interface DetailFields {
  Eventname?: FormField[];
  registration?: FormField[];
  EventDates?: FormField[];
  organizerContactInfo?: FormField[];
}

interface EventDetailsFormProps {
  fields?: DetailFields[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFormType: React.Dispatch<React.SetStateAction<any>>;
}



const SportsType = [
  {
    name: "Tennis",
    icon: <img src="/images/tennis.png" alt="Tennis" className="h-4 w-4" />,
  },
  {
    name: "Table Tennis",
    icon: (
      <img
        src="/images/table-tennis.png"
        alt="Table Tennis"
        className="h-4 w-4"
      />
    ),
  },
  {
    name: "Squash",
    icon: <img src="/images/squash.png" alt="Squash" className="h-4 w-4" />,
  },
  {
    name: "Badminton",
    icon: (
      <img src="/images/shuttlecock.png" alt="Badminton" className="h-4 w-4" />
    ),
  },
  {
    name: "Pickleball",
    icon: (
      <img src="/images/pickleball.png" alt="Pickleball" className="h-4 w-4" />
    ),
  },
  {
    name: "Padel",
    icon: <img src="/images/padel.png" alt="Padel" className="h-4 w-4" />,
  },
  {
    name: "Cricket",
    icon: <img src="/images/cricket.png" alt="Cricket" className="h-4 w-4" />,
  },
  {
    name: "Football",
    icon: <img src="/images/football.png" alt="Football" className="h-4 w-4" />,
  },
  {
    name: "Running",
    icon: <img src="/images/running.png" alt="Running" className="h-4 w-4" />,
  },
  {
    name: "Marathon",
    icon: <img src="/images/marathon.png" alt="Marathon" className="h-4 w-4" />,
  },
];

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

const fields = [
  {
    Eventname: [
      {
        id: "sport",
        label: "Event Sport",
        type: "select",
        name: "sport",
        placeholder: "Select Sport",
        required: true,
      },
      {
        id: "event_name",
        label: "Event Name",
        type: "text",
        name: "event_name",
        placeholder: "Enter Event Title",
        required: true,
      },
    ],
  },
  {
    registration: [
      {
        id: "last_registration_date",
        label: "Last Date to Register",
        type: "date",
        name: "last_registration_date",
        required: true,
      },
      {
        id: "last_withdrawal_date",
        label: "Last Date to Withdraw",
        type: "date",
        name: "last_withdrawal_date",
        required: true,
      },
    ],
  },
  {
    EventDates: [
      {
        id: "start_date",
        label: "Event Start Date",
        type: "date",
        name: "start_date",
        required: true,
      },
      {
        id: "end_date",
        label: "Event End Date",
        type: "date",
        name: "end_date",
        required: true,
      },
      {
        id: "start_time",
        label: "Start Time",
        type: "time",
        name: "start_time",
        required: true,
      },
    ],
  },
  {
    organizerContactInfo: [
      {
        id: "organizer_name",
        label: "Name",
        type: "text",
        name: "organizer_name",
        required: true,
        placeholder: "Enter Name",
      },
      {
        id: "organizer_contact_number",
        label: "Contact",
        type: "text",
        name: "organizer_contact_number",
        placeholder: "Enter Contact Number",
        required: true,
      },
      {
        id: "organizer_email",
        label: "Email",
        type: "email",
        name: "organizer_email",
        placeholder: "Enter Email",
        required: true,
      },
    ],
  },
];

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  formData,
  setFormData,
  setFormType,
}) => {
  const { EventData,EventEditData, setEventData,editPage,setEventEditData } = useEventContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (editPage === "manageEvent") {
      setEventEditData({ ...EventEditData, [name]: value });
    } else {
      setEventData({ ...EventData, [name]: value });
    }
  };

  useEffect(() => {
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return "";
      return format(new Date(dateString), "yyyy-MM-dd");
    };

    const prefillData = editPage === "manageEvent" ? EventEditData : EventData;

    setFormData({
      ...formData,
      sport: prefillData?.sport || "",
      event_name: prefillData?.event_name || "",
      last_registration_date: formatDate(prefillData?.last_registration_date),
      last_withdrawal_date: formatDate(prefillData?.last_withdrawal_date),
      start_date: formatDate(prefillData?.start_date),
      end_date: formatDate(prefillData?.end_date),
      start_time: prefillData?.start_time || "",
      organizer_name: prefillData?.organizer_name || "",
      organizer_contact_number: prefillData?.organizer_contact_number || "",
      organizer_email: prefillData?.organizer_email || "",
    });
  }, [EventData, EventEditData, editPage]);

  

   const handleNext = (e: any) => {
    e.preventDefault(); 
     setFormType("Location");
   };

  return (
    <form className="bg-white shadow-2xl p-5 rounded-lg">
      <div className="flex flex-wrap w-full">
        {fields[0].Eventname?.map((field, i) => (
          <React.Fragment key={i}>
            {field.type === "select" && (
              <div className="w-full mx-2">
                <Label className="font-bold text-lg" htmlFor="sport">
                  {field.label}
                </Label>
                <Select
                  defaultValue={formData.sport || ""}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      sport: value,
                    });
                    if (editPage === "manageEvent") {
                      setEventEditData({
                        ...EventEditData,
                        sport: value,
                      });
                    } else {
                      setEventData({ ...EventData, sport: value });
                    }
                  }}
                >
                  <SelectTrigger className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg">
                    <SelectValue
                      placeholder={formData.sport || field.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {SportsType.map((sport, i) => (
                      <SelectItem
                        key={sport.name}
                        value={sport.name}
                        className="flex items-center space-x-2"
                      >
                        <div className="flex items-center space-x-2">
                          {sport.icon}
                          <span>{sport.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {field.type !== "select" && (
              <div key={field.id} className={` w-full m-2 flex flex-col`}>
                <Label className="font-bold text-lg">
                  {field.label}
                  {requiredFields.includes(field.name) &&
                  !formData[field.name] ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <></>
                  )}
                </Label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={
                    formData[field.name as keyof EventDetailsFormProps] || ""
                  }
                  onChange={handleChange}
                  className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
                />
              </div>
            )}
          </React.Fragment>
        ))}
        <div className=" w-full mx-2 mt-2 flex flex-col mb-6">
          <Label className="font-bold text-lg" htmlFor="registrationdetails">
            Event Registration Details
          </Label>
          <div className="flex flex-col xl:flex-row w-full gap-3">
            {fields[1].registration?.map((field, i) => (
              <div className=" w-full flex flex-col" key={i}>
                <Label className="text-[0.8rem]">
                  {field.label}
                  {requiredFields.includes(field.name) &&
                  !formData[field.name] ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <></>
                  )}
                </Label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  value={
                    formData[field.name as keyof EventDetailsFormProps] || ""
                  }
                  onChange={handleChange}
                  className=" w-full h-12 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full mx-2 mt-2 flex flex-col mb-6">
          <Label className="font-bold text-lg" htmlFor="eventDates">
            Event Dates
          </Label>
          <div className="flex flex-col xl:flex-row w-full gap-3">
            {fields[2].EventDates?.map((field, i) => (
              <div className=" w-full flex flex-col" key={i}>
                <Label className="text-[0.8rem]">
                  {field.label}
                  {requiredFields.includes(field.name) &&
                  !formData[field.name] ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <></>
                  )}
                </Label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  value={
                    formData[field.name as keyof EventDetailsFormProps] || ""
                  }
                  onChange={handleChange}
                  className=" w-full h-12 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full mx-2 mt-2 flex flex-col">
          <Label className="font-bold text-lg" htmlFor="OrganiserContactInfo">
            Organiser Contact Info
          </Label>
          <div className="flex flex-col xl:flex-row w-full gap-3">
            {fields[3].organizerContactInfo?.map((field, i) => (
              <div className=" w-full flex flex-col" key={i}>
                <Label className="text-[0.8rem]">
                  {field.label}
                  {requiredFields.includes(field.name) &&
                  !formData[field.name] ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <></>
                  )}
                </Label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={
                    formData[field.name as keyof EventDetailsFormProps] || ""
                  }
                  onChange={handleChange}
                  className=" w-full h-12 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full mx-2 flex flex-col mb-6">
          <div className="mt-2 items-top flex justify-start  space-x-2">
            <Checkbox id="contactInfo" />
            <div className="flex flex-col leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use organizer's info from profile.
              </label>
              <p className="text-[0.8rem] text-muted-foreground">
                Details would be Automatically fetched from your user profile
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={(e) => handleNext(e)} className="w-full mt-4">
        Next
      </Button>
    </form>
  );
};

export default EventDetailsForm;
