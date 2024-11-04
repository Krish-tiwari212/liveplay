import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { useEventContext } from "@/context/EventDataContext";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

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

const formFields: FormField[] = [
  {
    id: "venue_name",
    label: "Venue Name",
    type: "text",
    name: "venue_name",
    placeholder: "Enter Venue",
    required: true,
  },
  {
    id: "street_address",
    label: "Address",
    type: "text",
    name: "street_address",
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
    id: "pincode",
    label: "Pincode",
    type: "text",
    name: "pincode",
    placeholder: "Enter pincode",
    required: true,
  },
  {
    id: "venue_link",
    label: "Venue Link",
    type: "text",
    name: "venue_link",
    placeholder: "Enter Link",
    required: true,
  },
];

const EventLocationForm: React.FC<EventLocationFormData> = ({
  formData,
  setFormData,
  setFormType,
  ManageEventId
}) => {
  const {
    EventData,
    setEventData,
    isVenueNotDecided,
    setIsVenueNotDecided,
    EventEditData,
    setEventEditData,
    editPage,fetchedEventdatafromManagemeEvent
  } = useEventContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        venue_name: EventEditData.venue_name || "",
        street_address: EventEditData.street_address || "",
        city: EventEditData.city || "",
        pincode: EventEditData.pincode || "",
        venue_link: EventEditData.venue_link || "",
      }));
    } else if (editPage === "createEvent" && EventData) {
      setFormData((previousEventDate: any) => ({
        ...previousEventDate,
        venue_name: EventData.venue_name || "",
        street_address: EventData.street_address || "",
        city: EventData.city || "",
        pincode: EventData.pincode || "",
        venue_link: EventData.venue_link || "",
      }));
    }
  }, [EventData, EventEditData]);

  const handleNext = async (e: any) => {
    e.preventDefault();
    if (editPage === "manageEvent") {
      const differences = {};
      const formFields = [
        "venue_name",
        "street_address",
        "city",
        "pincode",
        "venue_link",
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
                  <span className="text-red-500">*</span>
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
                if (editPage === "manageEvent") {
                  setEventEditData((prevData: any) => ({
                    ...prevData,
                    venueName: "",
                    eventAddress: "",
                    venuelink: "",
                    eventPincode: "",
                  }));
                } else {
                  setEventData((prevData: any) => ({
                    ...prevData,
                    venueName: "",
                    eventAddress: "",
                    venuelink: "",
                    eventPincode: "",
                  }));
                }
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
      <Button onClick={(e) => handleNext(e)} className="w-full mt-4">
        {editPage === "manageEvent" ? "Save and Next" : "Next"}
      </Button>
    </form>
  );
};

export default EventLocationForm;
