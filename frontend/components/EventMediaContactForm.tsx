import { Loader } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";

const additionalFields = [
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

const EventMediaContactForm: React.FC = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); 
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]); 

  const handleFileChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result as string;
          return newPreviews;
        });
      };
      reader.readAsDataURL(file);
      setIsImageLoading(false); 
    }
  };

  return (
    <form className="bg-white p-5 rounded-lg">
      <div className="flex flex-wrap ">
        {additionalFields.map((field, index) => (
          <div className="flex flex-col w-full mt-5" key={field.id}>
            <Label className="font-bold text-lg">
              {field.filecontnet?.label}
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
                <Image src={imagePreviews[index]} alt="Preview" width={300} height={300} />
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-gray-700 mt-4  text-white p-2  rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EventMediaContactForm;
