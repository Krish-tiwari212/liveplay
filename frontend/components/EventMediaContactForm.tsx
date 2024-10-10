import { Loader } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";

const EventMediaContactForm: React.FC = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef=useRef<HTMLInputElement>(null)
  return (
    <form className="bg-white p-5 rounded-lg">
      <div className="flex flex-wrap ">
        <div className="flex flex-col w-full mt-5">
          <Label className="font-bold text-lg">Add Desktop Banner</Label>
          <div
            className="flex items-center justify-center mt-1 h-[142px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-gray-600  bg-white "
            onClick={() => imageRef?.current?.click()}
          >
            <Input type="file" className="hidden" ref={imageRef} />
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
                Uplaoding
                <Loader size={20} className="animate-spin ml-2" />
              </div>
            )}
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-12 font-bold text-gray-400 ">
                Click to uplaod
              </h2>
              <p className="text-12 font-bold text-gray-500 ">
                SVG,JPG,PNG or GIF max(1080x1080px)
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full mt-5">
          <Label className="font-bold text-lg">Add Desktop Banner</Label>
          <div
            className="flex items-center justify-center mt-1 h-[142px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-gray-600  bg-white "
            onClick={() => imageRef?.current?.click()}
          >
            <Input type="file" className="hidden" ref={imageRef} />
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
                Uplaoding
                <Loader size={20} className="animate-spin ml-2" />
              </div>
            )}
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-12 font-bold text-gray-400 ">
                Click to uplaod
              </h2>
              <p className="text-12 font-bold text-gray-500 ">
                SVG,JPG,PNG or GIF max(1080x1080px)
              </p>
            </div>
          </div>
        </div>
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
