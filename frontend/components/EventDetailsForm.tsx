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
  "Soccer",
  "Basketball",
  "Tennis",
  "Baseball",
  "Golf",
  "Cricket",
  "Rugby",
  "Volleyball",
  "Hockey",
  "Boxing",
  "Marathon",
  "Table Tennis",
  "Badminton",
  "Cycling",
  "Swimming",
  "Gymnastics",
  "Skating",
  "Skiing",
  "Snowboarding",
  "Surfing",
  "Athletics",
  "Wrestling",
  "Weightlifting",
  "Fencing",
  "Handball",
  "Rowing",
  "Sailing",
  "Archery",
  "Equestrian",
  "Karate",
  "Judo",
  "Taekwondo",
  "Motorsport",
  "Billiards",
  "Bowling",
  "Lacrosse",
  "Polo",
  "Racquetball",
  "Softball",
  "Triathlon",
  "Water Polo",
  "Darts",
  "Kickboxing",
  "Snooker",
  "Canoeing",
  "Kayaking",
  "Mountain Biking",
  "Rock Climbing",
  "Paragliding",
  "Fishing",
  "Horse Racing",
  "American Football",
  "Field Hockey",
  "Ice Hockey",
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
        id: "selectsport",
        label: "Event Sport",
        type: "select",
        name: "selectsport",
        placeholder: "Select Sport",
        required: true,
      },
      {
        id: "eventName",
        label: "Event Name",
        type: "text",
        name: "eventName",
        placeholder: "Enter Event Title",
        required: true,
      },
    ],
  },
  {
    registration: [
      {
        id: "LastRegistrationDate",
        label: "Last Date to Register",
        type: "date",
        name: "LastRegistrationDate",
        required: true,
      },
      {
        id: "LastWithdrawalDate",
        label: "Last Date to Withdraw",
        type: "date",
        name: "LastWithdrawalDate",
        required: true,
      },
    ],
  },
  {
    EventDates: [
      {
        id: "eventstartDate",
        label: "Event Start Date",
        type: "date",
        name: "eventstartDate",
        required: true,
      },
      {
        id: "eventenddate",
        label: "Event End Date",
        type: "date",
        name: "eventenddate",
        required: true,
      },
      {
        id: "startTime",
        label: "Start Time",
        type: "time",
        name: "startTime",
        required: true,
      },
    ],
  },
  {
    organizerContactInfo: [
      {
        id: "organiserName",
        label: "Name",
        type: "text",
        name: "organiserName",
        required: true,
        placeholder: "Enter Name",
      },
      {
        id: "organiserNumber",
        label: "Contact",
        type: "text",
        name: "organiserNumber",
        placeholder: "Enter Contact Number",
        required: true,
      },
      {
        id: "organiseremailaddress",
        label: "Email",
        type: "email",
        name: "organiseremailaddress",
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
    if (editPage==="manageEvent"){
       setEventEditData({ ...EventEditData, [name]: value });
    } else{
       setEventData({ ...EventData, [name]: value });
    }
  };
  useEffect(() => {
    if (editPage === "manageEvent" && EventEditData) {
      setFormData({
        selectsport: EventEditData.selectsport || "",
        eventName: EventEditData.eventName || "",
        LastRegistrationDate: EventEditData.LastRegistrationDate || "",
        LastWithdrawalDate: EventEditData.LastWithdrawalDate || "",
        eventstartDate: EventEditData.eventstartDate || "",
        eventenddate: EventEditData.eventenddate || "",
        startTime: EventEditData.startTime || "",
        organiserName: EventEditData.organiserName || "",
        organiserNumber: EventEditData.organiserNumber || "",
        organiseremailaddress: EventEditData.organiseremailaddress || "",
      });
    } else if (EventData) {
      setFormData({
        selectsport: EventData.selectsport || "", 
        eventName: EventData.eventName || "",
        LastRegistrationDate: EventData.LastRegistrationDate || "",
        LastWithdrawalDate: EventData.LastWithdrawalDate || "",
        eventstartDate: EventData.eventstartDate || "",
        eventenddate: EventData.eventenddate || "",
        startTime: EventData.startTime || "",
        organiserName: EventData.organiserName || "",
        organiserNumber: EventData.organiserNumber || "",
        organiseremailaddress: EventData.organiseremailaddress || "",
      });
    }
  }, [EventData, EventEditData]);
  

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
                <Label className="font-bold text-lg" htmlFor="EventSport">
                  {field.label}
                </Label>
                <Select defaultValue={formData.selectsport || ""} 
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      selectsport: value,
                    });
                    if (editPage === "manageEvent") {
                      setEventEditData({
                        ...EventEditData,
                        selectsport: value,
                      });
                    } else {
                      setEventData({ ...EventData, selectsport: value });
                    }
                  }}
                >
                  <SelectTrigger className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {SportsType.map((sport, i) => (
                      <SelectItem value={sport} key={i}>
                        {sport}
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
