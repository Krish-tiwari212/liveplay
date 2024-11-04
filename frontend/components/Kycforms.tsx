"use client"

import { Checkbox } from '@/components/ui/checkbox';
import React, { useRef, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ... existing code ...
const banks = [
  { name: "Allahabad Bank", image: "/images/allahabad.png" },
  { name: "Andhra Bank", image: "/images/andra.png" },
  { name: "Axis Bank", image: "/images/axis.png" },
  { name: "Bank of Bahrain and Kuwait", image: "/path/to/bbk.png" },
  { name: "Bandhan Bank", image: "/images/bandhanbank.png" },
  { name: "Bank of Baroda - Retail Banking", image: "/images/bob.png" },
  { name: "Canara Bank", image: "/images/canara.png" },
  { name: "Central Bank", image: "/images/centralbank.png" },
  { name: "Canara Bank", image: "/path/to/canara-bank.png" },
  { name: "City Union Bank", image: "/images/citibank.png" },
  { name: "Corporation Bank", image: "/images/corporation.png" },
  { name: "Deutsche Bank", image: "/images/dbs.png" },
  { name: "Development Credit Bank", image: "/path/to/dcb.png" },
  { name: "Dhanlaxmi Bank", image: "/path/to/dhanlaxmi-bank.png" },
  { name: "Federal Bank", image: "/path/to/federal-bank.png" },
  { name: "ICICI Bank", image: "/path/to/icici-bank.png" },
  { name: "IDBI Bank", image: "/path/to/idbi-bank.png" },
  { name: "Indian Bank", image: "/path/to/indian-bank.png" },
  { name: "Indian Overseas Bank", image: "/path/to/iob.png" },
  { name: "IndusInd Bank", image: "/path/to/indusind-bank.png" },
  { name: "ING Vysya Bank", image: "/path/to/ing-vysya.png" },
  { name: "Jammu and Kashmir Bank", image: "/path/to/jk-bank.png" },
  { name: "Karnataka Bank Ltd", image: "/path/to/karnataka-bank.png" },
  { name: "Karur Vysya Bank", image: "/path/to/karur-vysya.png" },
  { name: "Kotak Bank", image: "/path/to/kotak-bank.png" },
  { name: "Laxmi Vilas Bank", image: "/path/to/laxmi-vilas.png" },
  { name: "Oriental Bank of Commerce", image: "/path/to/oriental-bank.png" },
  {
    name: "Punjab National Bank - Corporate Banking",
    image: "/path/to/pnb-corporate.png",
  },
  {
    name: "Punjab National Bank - Retail Banking",
    image: "/path/to/pnb-retail.png",
  },
  { name: "Punjab & Sind Bank", image: "/path/to/punjab-sind.png" },
  {
    name: "Shamrao Vitthal Co-operative Bank",
    image: "/path/to/sv-coop-bank.png",
  },
  { name: "South Indian Bank", image: "/path/to/south-indian-bank.png" },
  { name: "State Bank of Bikaner & Jaipur", image: "/path/to/sbbj.png" },
  { name: "State Bank of Hyderabad", image: "/path/to/sbh.png" },
  { name: "State Bank of India", image: "/path/to/sbi.png" },
  { name: "State Bank of Mysore", image: "/path/to/sbm.png" },
  { name: "State Bank of Patiala", image: "/path/to/sbp.png" },
  { name: "State Bank of Travancore", image: "/path/to/sbt.png" },
  { name: "Syndicate Bank", image: "/path/to/syndicate-bank.png" },
  { name: "Tamilnad Mercantile Bank Ltd.", image: "/path/to/tmb.png" },
  { name: "UCO Bank", image: "/path/to/uco-bank.png" },
  { name: "Union Bank of India", image: "/path/to/union-bank.png" },
  { name: "United Bank of India", image: "/path/to/united-bank.png" },
  { name: "Vijaya Bank", image: "/path/to/vijaya-bank.png" },
  { name: "Yes Bank Ltd", image: "/path/to/yes-bank.png" },
];
// ... existing code ...


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
  handlePrev?: () => void;
  prevDisabled?:boolean
  nextDisabled?:boolean
}

const Kycforms: React.FC<KycFormsProps> = ({
  fields,
  buttonLabel,
  buttonString,
  onButtonClick=()=>{},
  handlePrev=()=>{},
  prevDisabled,
  nextDisabled
}) => {
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(false);

  return (
    <form className="bg-white shadow-2xl p-5 rounded-lg w-full relative mt-10">
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePrev();
        }}
        disabled={prevDisabled}
      >
        <Image
          src="/icons/BackIcon.svg"
          alt="backIcon"
          width={20}
          height={20}
        />
      </button>
      <div className="flex flex-wrap w-[90%] mx-auto">
        {fields.map((field, index) => (
          <div key={field.id} className="w-full m-2 flex flex-col">
            {field.type !== "file" && field.type !== "select" && (
              <>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="h-10 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
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
            {field.type === "select" && (
              <div className="w-full flex flex-col">
                <label htmlFor={field.id}>{field.label}</label>
                <Select>
                  <SelectTrigger className="h-10 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank, i) => (
                      <SelectItem
                        key={bank.name}
                        value={bank.name}
                        className="flex items-center space-x-2"
                      >
                        <div className="flex items-center space-x-2">
                          {bank.icon}
                          <span>{bank.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
      {buttonLabel && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            onButtonClick();
          }}
          disabled={nextDisabled}
          className="mt-3 w-full"
        >
          {buttonLabel}
        </Button>
      )}
    </form>
  );
};

export default Kycforms;
