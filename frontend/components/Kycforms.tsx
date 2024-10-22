import { Checkbox } from '@/components/ui/checkbox';
import React, { useRef, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  checkbox?: CheckboxField;
  filecontnet?: filecontent;
}

interface CheckboxField {
  id: string;
  label: string;
}


interface filecontent {
  size: string;
  label: string;
}

interface KycFormsProps {
  fields: FormField[];
  buttonLabel?: string; 
  buttonString?: string; 
  onButtonClick?: () => void; 
}

const Kycforms: React.FC<KycFormsProps> = ({ fields, buttonLabel, buttonString, onButtonClick }) => {
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(false);

  return (
    <form className="bg-white shadow-2xl p-5 rounded-lg">
      <div className="flex flex-wrap w-full">
        {fields.map((field, index) => (
          <div key={field.id} className="w-full m-2 flex flex-col">
            {field.type !== "file" && (
              <>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="h-10 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
                />
              </>
            )}
            {field.type === "file" && (
              <div className="flex flex-col w-full mt-5">
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
                      Uplaoding
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
              </div>
            )}
            {field.checkbox && (
              <div className="mt-2 mx-2 items-top flex justify-start space-x-2">
                <Checkbox id={field.checkbox.id} />
                <div className="flex flex-col leading-none">
                  <label
                    htmlFor={field.checkbox.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.checkbox.label}
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {buttonLabel && <Button onClick={onButtonClick}>{buttonLabel}</Button>}
    </form>
  );
};

export default Kycforms;
