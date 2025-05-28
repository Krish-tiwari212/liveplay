
import { Loader } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { useEventContext } from "@/context/EventDataContext";
import SponsorSection from "./SponseSection";

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
  ManageEventId:any
}

const additionalFields = [
  {
    id: "mobileBanner",
    label: "Add Banner",
    type: "file",
    name: "mobileBanner",
    required: true,
    filecontnet: {
      size: "JPG or PNG max(16:9)",
      label: "Add Mobile Banner",
    },
  },
];

const EventMediaContactForm: React.FC<EventMediaProps> = ({
  formData,
  setFormData,
  handleNext,
  ManageEventId,
}) => {
  const { EventData, setEventData, setEventEditData, EventEditData, editPage,fetchedEventdatafromManagemeEvent } =
    useEventContext();
    

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<{
    mobileBanner?: string;
  }>({});

  const imageRefs = useRef<{ mobileBanner?: HTMLInputElement | null }>({
    mobileBanner: null,
  });

  const handleFileChange =
    (type: keyof typeof imagePreviews) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        setIsImageLoading(true);

        reader.onloadend = () => {
          const base64Data = reader.result as string;

          const img = new window.Image(); 
          img.onload = () => {
            const aspectRatio = img.naturalWidth / img.naturalHeight;

            if (Math.abs(aspectRatio - 16 / 9) > 0.01) {
              toast({
                title: "Invalid aspect ratio",
                description: "Please upload an image with a 16:9 aspect ratio.",
                variant: "destructive",
              });
              setIsImageLoading(false);
              return;
            }

            setImagePreviews((prev) => ({ ...prev, [type]: base64Data }));
            if (editPage === "createEvent") {
              setEventData((prev) => ({ ...prev, [type]: base64Data }));
            } else if (editPage === "manageEvent") {
              setEventEditData((prev) => ({ ...prev, [type]: base64Data }));
            }
            setIsImageLoading(false);
          };

          img.onerror = () => {
            toast({
              title: "Invalid image file",
              description:
                "Could not load the selected file. Please try again.",
              variant: "destructive",
            });
            setIsImageLoading(false);
          };

          img.src = base64Data; 
        };

        reader.onerror = () => {
          toast({
            title: "File reading error",
            description: "Could not read the selected file. Please try again.",
            variant: "destructive",
          });
          setIsImageLoading(false);
        };

        reader.readAsDataURL(file);
      }
    };

    const uploadImage = async (base64Image: string, folder: string, namePrefix: string) => {
      const base64Pattern = /^data:image\/(jpeg|png);base64,/;
      const match = base64Image.match(base64Pattern);
    
      if (!match) {
        throw new Error('Invalid image format. Please upload a JPEG or PNG image.');
      }
    
      const mimeType = match[1] === 'jpeg' ? 'image/jpeg' : 'image/png';
      const extension = match[1] === 'jpeg' ? 'jpg' : 'png';
      const base64Data = base64Image.replace(base64Pattern, '');
      const binaryData = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
    
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
    
      const blob = new Blob([uint8Array], { type: mimeType });
      const imageName = `${namePrefix}-${Date.now()}.${extension}`;
    
      const { data, error } = await supabase.storage
        .from(folder)
        .upload(`${folder}/${imageName}`, blob);
    
      if (error) {
        throw new Error('Image upload failed');
      }
    
      return supabase.storage.from(folder).getPublicUrl(data.path).data.publicUrl;
    };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (editPage === "manageEvent") {
      const differences: any = {};
      const formFields = [
        "mobileBanner",
        "desktopBanner",
      ];

      for (const field of formFields) {
        if (EventEditData?.[field] !== fetchedEventdatafromManagemeEvent?.[field]) {
          if (field === "mobileBanner" || field === "desktopBanner") {
            try {
              const imageUrl = await uploadImage(EventEditData?.[field], 'event-banners', field);
              differences[field] = imageUrl;
            } catch (error) {
              console.error("An error occurred while uploading the image:", error);
              toast({
                title: "Failed to upload image. Please try again.",
                variant: "destructive",
              });
              return;
            }
          } else {
            differences[field] = EventEditData?.[field];
          }
        }
      }

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
    handleNext();
  };

  useEffect(() => {
    if (editPage === "manageEvent") {
      setImagePreviews({
        mobileBanner: EventEditData.desktop_cover_image_url,
      });
    } else if (editPage === "createEvent") {
      setImagePreviews({
        mobileBanner: EventData.mobileBanner,
      });
    }
  }, [editPage, EventEditData, EventData]);
  
  return (
    <form className="bg-white p-5 rounded-lg">
      <div className="flex flex-wrap ">
        {additionalFields.map((field, index) => (
          <div className="flex flex-col w-full mt-5" key={field.id}>
            <Label className="font-bold text-lg">
              {field.filecontnet?.label}
              <span className="text-red-500">*</span>
            </Label>
            <div
              className="flex items-center justify-center mt-1 h-[142px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-gray-600  bg-white "
              onClick={() => imageRefs.current[field.name]?.click()}
            >
              <Input
                type="file"
                className="hidden"
                ref={(el) => (imageRefs.current[field.name] = el)}
                onChange={handleFileChange(
                  field.name as keyof typeof imagePreviews
                )}
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
                <p className="text-12 text-center font-bold text-gray-500 ">
                  {field.filecontnet?.size}
                </p>
              </div>
            </div>
            {imagePreviews[field.name as keyof typeof imagePreviews] && (
              <div className="flex justify-center items-center py-2">
                <Image
                  src={imagePreviews[field.name as keyof typeof imagePreviews]!}
                  alt={`${field.name} preview`}
                  width={400}
                  height={400}
                  className="rounded-md border-2"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <SponsorSection ManageEventId={ManageEventId}/>
      <div className="flex justify-center items-center">
        <Button
          variant="tertiary"
          size="none"
          className="mt-4 text-lg px-10 sm:px-16 py-1"
          onClick={(event) => handleClick(event)}
        >
          {editPage === "manageEvent" ? "Save and Next" : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default EventMediaContactForm;
