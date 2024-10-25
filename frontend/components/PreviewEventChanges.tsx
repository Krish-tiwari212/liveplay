"use client"

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
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
import { eventNames } from "process";
import { effect } from "zod";
import CategoryPreview from "./CategoryPreview";


interface Category {
  id:number
  categoryName: string;
  totalQuantity: string;
  maxTicketQuantity: string;
  price: string;
  ticketDescription: string;
  discountCode: string;
  categoryType: string;
}


interface PreviewEventChangesProps {
  handleNext: () => void;
  EventData: any;
  setEventData:React.Dispatch<React.SetStateAction<any>>;
}

const PreviewEventChanges: React.FC<PreviewEventChangesProps> = ({
  handleNext,
  EventData,
  setEventData,
}) => {
  // Initialize selectedCategories with EventData.selectedCategories
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(EventData.selectedCategories || []); 

  useEffect(() => {
    const storedData = localStorage.getItem("EventData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setEventData(parsedData);
      setSelectedCategories(parsedData.selectedCategories || []); 
    }
    const storedCategories = localStorage.getItem("categories"); 
    if (storedCategories) {
      setinitialCategories(JSON.parse(storedCategories));
    }
  }, [setEventData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const inputValue =  e.target.value; 
    setEventData({ ...EventData, [name]: inputValue }); 
  };
  const [initialCategories, setinitialCategories] = useState<Category[]>([]); 

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
      id: "rewardsandprices",
      label: "Rewards And Prices",
      name: "rewardsAndParticipation",
      type: "textarea",
      required: true,
    },
    {
      id: "playingrules",
      label: "Playing Rules",
      name: "playingRules",
      required: true,
      type: "textarea",
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
      label: "Street",
      type: "text",
      name: "eventStreet",
      required: true,
    },
    {
      id: "eventAddress",
      label: "Address",
      type: "text",
      name: "eventAddress",
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
      id: "category",
      label: "Event category",
      type: "category",
      name: "category",
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
      radio: {
        fieldone: "Yes",
        fieldtwo: "no",
      },
    },
  ];
  const switchFields = [
    {
      id: "drafixtures",
      label: "Enable Fixtures",
      type: "radio",
      name: "enableFixtures",
      required: true,
    },
    {
      id: "timer",
      label: "Enable Countdown",
      type: "switch",
      name: "countdown",
      required: true,
    },
  ];
  const booleanFields = ["gstcompliance", "drafixtures", "tshirts", "timer"];
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(()=>{
    // console.log(EventData)
    console.log(selectedCategories);
  },[])
  return (
    <div className="space-y-6 bg-white m-3 p-5 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold">Preview & Edit Event Details</h2>

      <div className="flex flex-wrap w-full gap-4">
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            {field.type !== "file" &&
              field.type !== "textarea" &&
              field.type !== "category" && (
                <div className="flex flex-col w-full lg:w-[49%]">
                  <label className="text-sm font-medium capitalize">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={EventData[field.name] || ""}
                    onChange={handleInputChange}
                    className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
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
                  className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
                />
              </div>
            )}
            {field.type === "category" && (
              <section className="mt-4 bg-white shadow-md rounded-lg p-4 w-full">
                <h2 className="text-xl font-semibold mb-2">Category Preview</h2>
                {initialCategories.length !== 0 && (
                  initialCategories.map((category, index) => (
                    <div
                      key={index}
                      className={`relative border shadow-lg rounded-lg p-4 mb-4 cursor-pointer ${
                        selectedCategories.includes(category) // Use selectedCategories for highlighting
                          ? "bg-[#17202A] text-white"
                          : "bg-white"
                      }`}
                      onClick={() => {
                        setSelectedCategories((prevSelected) => {
                          if (prevSelected.includes(category)) {
                            return prevSelected.filter(
                              (categoryName) =>
                                categoryName !== category
                            );
                          } else {
                            return [...prevSelected, category];
                          }
                        });
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">
                            {category.categoryName}
                          </p>
                          <p>Price: {category.price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </section>
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
        {radioFields.map((field) => (
          <div className="w-full m-2 flex flex-col" key={field.id}>
            <label htmlFor={field.name}>{field.label}</label>
            <RadioGroup defaultValue="default">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Yes"
                  id="yes"
                  onClick={() =>
                    setEventData({ ...EventData, [field.name]: true })
                  }
                />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="default"
                  id="no"
                  onClick={() =>
                    setEventData({ ...EventData, [field.name]: false })
                  }
                />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
        {switchFields.map((field) => (
          <div className="flex items-center space-x-2 relative" key={field.id}>
            <Switch
              id={field.name}
              onCheckedChange={(checked) =>
                setEventData({ ...EventData, [field.name]: checked })
              }
            />
            <Label htmlFor={field.name}>{field.label}</Label>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          localStorage.setItem(
            "EventData",
            JSON.stringify({
              ...EventData,
            })
          ); 
          handleNext();
          console.log(EventData);
        }}
        className="mt-4 w-full"
      >
        Proceed
      </Button>
    </div>
  );
};

export default PreviewEventChanges;
