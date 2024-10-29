import { Loader } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { useEventContext } from "@/context/EventDataContext";

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

interface EventMediaProps {
  fields?: FormField[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFormType: React.Dispatch<React.SetStateAction<any>>;
  handleNext: () => void;
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

const additionalFields = [
  {
    id: "mobileBanner",
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
    id: "desktopBanner",
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

const EventMediaContactForm: React.FC<EventMediaProps> = ({
  formData,
  setFormData,
  handleNext,
}) => {
  const { EventData, setEventData,setEventEditData,EventEditData,editPage } = useEventContext();

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result as string;
          setImagePreviews((prev) => {
            const newPreviews = [...prev];
            newPreviews[index] = base64Data;
            const fieldName = index === 0 ? "mobileBanner" : "desktopBanner";
            setFormData((prevData: any) => ({
              ...prevData,
              [fieldName]: file,
            }));
            if (editPage==="manageEvent"){
              setEventEditData((prevData: any) => ({
                ...prevData,
                [fieldName]: file,
              }));
            }else{setEventData((prevData: any) => ({
              ...prevData,
              [fieldName]: file,
            }));}
              
            return newPreviews;
          });
        };
        reader.readAsDataURL(file);
        setIsImageLoading(false);
      }
    };

    
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
      handleNext();
  };

  useEffect(() => {
    if (editPage === "manageEvent" && EventEditData) {
      setFormData((prevEventData: any) => ({
        ...prevEventData,
        mobileBanner: EventEditData.mobileBanner || {},
        desktopBanner: EventEditData.desktopBanner || {},
      }));
    } else if (editPage === "createEvent" && EventData) {
      setFormData((prevEventData: any) => ({
        ...prevEventData,
        mobileBanner: EventData.mobileBanner || {},
        desktopBanner: EventData.desktopBanner || {},
      }));
    }
  }, [EventData, EventEditData]);

  return (
    <form className="bg-white p-5 rounded-lg">
      <div className="flex flex-wrap ">
        {additionalFields.map((field, index) => (
          <div className="flex flex-col w-full mt-5" key={field.id}>
            <Label className="font-bold text-lg">
              {field.filecontnet?.label}
              {requiredFields.includes(field.name) && !formData[field.name] ? (
                <span className="text-red-500">*</span>
              ) : (
                <></>
              )}
            </Label>
            <div
              className="flex items-center justify-center mt-1 h-[142px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-gray-600  bg-white "
              onClick={() => imageRefs.current[index]?.click()}
            >
              <Input
                type="file"
                className="hidden"
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                onChange={handleFileChange(index)}
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
                <div className="text-16 flex items-center justify-center  font-medium text-gray-700 ">
                  Uploading
                  <Loader size={20} className="animate-spin ml-2" />
                </div>
              )}
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-12 font-bold text-gray-400 ">
                  Click to upload
                </h2>
                <p className="text-12 font-bold text-gray-500 ">
                  {field.filecontnet?.size}
                </p>
              </div>
            </div>
            {imagePreviews[index] && (
              <div className="mt-2 items-center mx-auto">
                <Image
                  src={imagePreviews[index]}
                  alt="Preview"
                  width={300}
                  height={300}
                />
              </div>
            )}
          </div>
        ))}
        <Button
          className="w-full p-2 mt-3 rounded-md"
          onClick={(event) => handleClick(event)}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default EventMediaContactForm;
