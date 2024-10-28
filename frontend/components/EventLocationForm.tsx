import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { useEventContext } from "@/context/EventDataContext";
import { Button } from "./ui/button";

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

interface EventLocationFormData {
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

const formFields: FormField[] = [
  {
    id: "venueName",
    label: "Venue Name",
    type: "text",
    name: "venueName",
    placeholder: "Enter Venue",
    required: true,
  },
  {
    id: "eventAddress",
    label: "Address",
    type: "text",
    name: "eventAddress",
    placeholder: "Enter address",
    required: true,
  },
  {
    id: "city",
    label: "City",
    type: "text",
    name: "city",
    placeholder: "Enter City",
    required: true,
  },
  {
    id: "eventPincode",
    label: "Pincode",
    type: "text",
    name: "eventPincode",
    placeholder: "Enter pincode",
    required: true,
  },
  {
    id: "venuelink",
    label: "Venue Link",
    type: "text",
    name: "venuelink",
    placeholder: "Enter Link",
    required: true,
  },
];

const EventLocationForm: React.FC<EventLocationFormData> = ({
  formData,
  setFormData,
  setFormType,
}) => {
  const { EventData, setEventData, isVenueNotDecided, setIsVenueNotDecided } =
    useEventContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    setEventData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (EventData) {
      setFormData((previousEventDate: any) => ({
        ...previousEventDate,
        venueName: EventData.venueName || "",
        eventAddress: EventData.eventAddress || "",
        city: EventData.city || "",
        eventPincode: EventData.eventPincode || "",
        venuelink: EventData.venuelink || "",
      }));
    }
  }, [EventData]);

  const handleNext = (e: any) => {
    e.preventDefault(); 
    setFormType("Insights");
  };
  return (
    <form className="bg-white p-5 rounded-lg shadow-2xl">
      <div className="flex flex-wrap w-full">
        {formFields.map((field) =>
          isVenueNotDecided && field.name !== "city" ? null : (
            <div key={field.id} className="w-full lg:w-[47%] m-2 flex flex-col">
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
                required={field.required}
                placeholder={field.placeholder}
                value={
                  formData[field.name as keyof EventLocationFormData] || ""
                }
                onChange={handleChange}
                className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
              />
            </div>
          )
        )}
        <div className="mt-2 mx-2 items-top flex justify-start space-x-2">
          <Checkbox
            id="venue"
            name="venue"
            checked={isVenueNotDecided}
            onCheckedChange={() => {
              setIsVenueNotDecided(!isVenueNotDecided);
              if (!isVenueNotDecided) { 
                setFormData((prevData: any) => ({
                  ...prevData,
                  venueName: "",
                  eventAddress: "",
                  venuelink: "",
                  eventPincode: "",
                }));
                setEventData((prevData: any) => ({
                  ...prevData,
                  venueName: "",
                  eventAddress: "",
                  venuelink: "",
                  eventPincode: "",
                }));
              }
            }}
          />
          <div className="flex flex-col leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Venue Not Decided Yet
            </label>
            <p className="text-[0.8rem] text-muted-foreground">
              once checked, you could proceed without entering a venue name and
              city
            </p>
          </div>
        </div>
      </div>
      <Button onClick={(e) => handleNext(e)} className="w-full mt-4">Next</Button>
    </form>
  );
};

export default EventLocationForm;
