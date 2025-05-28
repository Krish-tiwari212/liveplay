"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreviewEventChangesProps {
  handleNext: () => void;
  EventData: any;
  setEventData: React.Dispatch<React.SetStateAction<any>>;
}

const PreviewEventChanges: React.FC<PreviewEventChangesProps> = ({
  handleNext,
  EventData,
  setEventData,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(false); // Loading state for image previews
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]); // Reference for image upload inputs

  // Fields that need boolean values for switch toggling
  const booleanFields = ["gstcompliance", "drafixtures", "tshirts", "timer"];

  // Load EventData from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("EventData");
    if (storedData) {
      setEventData(JSON.parse(storedData));
    }
  }, [setEventData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData({ ...EventData, [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEventData({ ...EventData, [name]: checked });
  };

  const handleRadioChange = (name: string, value: string) => {
    setEventData({ ...EventData, [name]: value });
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append("event_name", EventData.eventName);
    formData.append("organizer_contact_number", EventData.organiserNumber);
    formData.append("organizer_email", EventData.organiseremailaddress);
    formData.append("start_date", EventData.eventstartDate);
    formData.append("end_date", EventData.eventenddate);
    formData.append("last_registration_date", EventData.lastRegistrationDate);
    formData.append("last_withdrawal_date", EventData.lastWithdrawalDate);
    formData.append("start_time", EventData.startTime);
    formData.append("venue_name", EventData.venueName);
    formData.append("street_address", EventData.eventStreet);
    formData.append("additional_details", EventData.eventAddress);
    formData.append("city", EventData.eventCity);
    formData.append("pincode", EventData.eventPincode);
    formData.append(
      "venue_not_decided",
      EventData.venue_not_decided !== undefined
        ? EventData.venue_not_decided
        : false
    );
    formData.append("event_description", EventData.eventDescription);
    formData.append("event_usp", EventData.eventUSP);
    formData.append(
      "rewards_for_participants",
      EventData.rewardsAndParticipation
    );
    formData.append("playing_rules", EventData.playingRules);
    formData.append(
      "countdown",
      EventData.countdown !== undefined ? EventData.countdown : false
    );
    formData.append(
      "enable_fixtures",
      EventData.enableFixtures !== undefined ? EventData.enableFixtures : false
    );
    formData.append(
      "eventData",
      JSON.stringify({
        categories: EventData.categories.map((category:any) => ({
          category_name: category.categoryName,
          total_quantity: category.totalQuantity,
          max_ticket_quantity: category.maxTicketQuantity,
          price: category.price,
          ticket_description: category.ticketDescription,
          discount_code: category.discountCode,
          category_type: category.categoryType,
          number_of_discounts: category.numberOfDiscounts,
          percentage_input: category.percentageInput,
          from_date: category.fromDate,
          till_date: category.tillDate,
        })),
      })
    );

    if (EventData.mobileBanner) {
      formData.append("mobileBanner", EventData.mobileBanner);
    }
    if (EventData.desktopBanner) {
      formData.append("desktopBanner", EventData.desktopBanner);
    }

    try {
      const response = await fetch("/api/event/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create event.");
      }
      handleNext();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const fields = [
    {
      id: "eventName",
      label: "Event Name",
      type: "text",
      name: "eventName",
      required: true,
    },
    {
      id: "LastRegistrationDate",
      label: "Last Registration Date",
      type: "date",
      name: "lastRegistrationDate",
      required: true,
    },
    {
      id: "LastWithdrawalDate",
      label: "Last Withdrawal Date",
      type: "date",
      name: "lastWithdrawalDate",
      required: true,
    },
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
    {
      id: "organizerName",
      label: "Organizer Name",
      type: "text",
      name: "organiserName",
      required: true,
    },
    {
      id: "organizerNumber",
      label: "Organizer Number",
      type: "text",
      name: "organiserNumber",
      required: true,
    },
    {
      id: "organizeremail",
      label: "Organizer Email",
      type: "text",
      name: "organiseremailaddress",
      required: true,
    },
    {
      id: "venueName",
      label: "Venue Name",
      type: "text",
      name: "venueName",
      required: true,
    },
    {
      id: "eventStreet",
      label: "Street Address",
      type: "text",
      name: "eventStreet",
      required: true,
    },
    {
      id: "eventAddress",
      label: "Additional Details",
      type: "text",
      name: "eventAddress",
    },
    {
      id: "city",
      label: "City",
      type: "text",
      name: "city",
      required: true,
    },
    {
      id: "eventPincode",
      label: "Pincode",
      type: "text",
      name: "eventPincode",
      required: true,
    },
    {
      id: "EventDescription",
      label: "Event Description",
      name: "eventDescription",
      type: "textarea",
      required: true,
    },
    {
      id: "eventusp",
      label: "Event USP",
      name: "eventUSP",
      type: "textarea",
      required: true,
    },
    {
      id: "playingRules",
      label: "Playing Rules",
      name: "playingRules",
      type: "textarea",
      required: true,
    },
    {
      id: "MobileBanner",
      label: "Add Mobile Banner",
      type: "file",
      name: "mobileBanner",
      required: true,
      filecontnet: {
        size: "SVG,JPG,PNG or GIF max(480x480px)",
        label: "Add Mobile Banner",
      },
    },
    {
      id: "DesktopBanner",
      label: "Add Desktop Banner",
      type: "file",
      name: "desktopBanner",
      required: true,
      filecontnet: {
        size: "SVG,JPG,PNG or GIF max(1080x1080px)",
        label: "Add Desktop Banner",
      },
    },
  ];

  const radioFields = [
    {
      id: "gstcompliance",
      label: "Gst Compliance",
      type: "radio",
      name: "GstCompliance",
      required: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
  ];

  const switchFields = [
    { id: "enableFixtures", label: "Enable Fixtures", name: "enableFixtures" },
    { id: "countdown", label: "Enable Countdown", name: "countdown" },
  ];

  return (
    <div className="space-y-6 bg-white m-3 p-5 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold">Preview & Edit Event Details</h2>
      <div className="flex flex-wrap w-full gap-4">
        {fields.map((field,index) => (
          <React.Fragment key={field.id}>
            {field.type !== "file" && field.type !== "textarea" && (
              <div className="flex flex-col w-full lg:w-[49%]">
                <label className="text-sm font-medium capitalize">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={EventData[field.name] || ""}
                  onChange={handleInputChange}
                  className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
                />
              </div>
            )}
            {field.type === "textarea" && (
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium capitalize">
                  {field.label}
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  required
                  value={EventData[field.name as keyof typeof EventData] || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
                />
              </div>
            )}
            {field.type === "file" && (
              <div className="flex w-full">
                <div className="flex flex-col w-full mt-5 flex-[4]">
                  <Label className="font-bold text-lg">
                    {field.filecontnet?.label}
                  </Label>
                  <div
                    className="flex items-center justify-center mt-1 h-[142px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-gray-600 bg-white"
                    onClick={() => imageRefs.current[index]?.click()}
                  >
                    <Input
                      type="file"
                      className="hidden"
                      ref={(el) => {
                        imageRefs.current[index] = el;
                      }}
                      onChange={(e) => {
                        if (e.target.files) {
                          setEventData({
                            ...EventData,
                            [field.name]: e.target.files[0],
                          });
                        }
                      }}
                    />
                    {!isImageLoading ? (
                      <Image
                        src="/icons/upload-image.svg"
                        alt="upload"
                        width={40}
                        height={40}
                        className="invert"
                      />
                    ) : (
                      <div className="text-16 flex items-center justify-center font-medium text-gray-700">
                        Uploading
                        <Loader size={20} className="animate-spin ml-2" />
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-1">
                      <h2 className="text-12 font-bold text-gray-400">
                        Click to upload
                      </h2>
                      <p className="text-12 font-bold text-gray-500">
                        {field.filecontnet?.size}
                      </p>
                    </div>
                  </div>
                </div>
                {EventData[field.name] instanceof File && (
                  <div className="ml-2 items-center flex justify-center flex-[1]">
                    <Image
                      src={URL.createObjectURL(EventData[field.name])}
                      alt="Uploaded Preview"
                      width={200}
                      height={200}
                      className="rounded-md shadow-lg"
                    />
                  </div>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
        {/* Radio Buttons for Options like GST Compliance */}
        {radioFields.map((radioField) => (
          <div key={radioField.id} className="flex flex-col w-full lg:w-[49%]">
            <label className="text-sm font-medium capitalize">
              {radioField.label}
            </label>
            <RadioGroup
              onValueChange={(value) =>
                handleRadioChange(radioField.name, value)
              }
              value={EventData[radioField.name] || ""}
            >
              {radioField.options.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={`${radioField.id}-${option.value}`}
                  />
                  <label
                    htmlFor={`${radioField.id}-${option.value}`}
                    className="text-sm font-medium text-gray-800"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        {/* Switch fields for Boolean Options like Enable Fixtures and Countdown */}
        {switchFields.map((switchField) => (
          <div
            key={switchField.id}
            className="flex items-center justify-between w-full lg:w-[49%]"
          >
            <Label
              htmlFor={switchField.id}
              className="text-sm font-medium capitalize"
            >
              {switchField.label}
            </Label>
            <Switch
              id={switchField.id}
              checked={!!EventData[switchField.name]}
              onCheckedChange={(checked) =>
                handleSwitchChange(switchField.name, checked)
              }
            />
          </div>
        ))}
      </div>

      {/* Proceed Button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleFormSubmit} className="w-full md:w-auto">
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default PreviewEventChanges;
