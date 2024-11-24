"use client"

import { Checkbox } from '@/components/ui/checkbox';
import React, { useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Currency, Loader } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from '@/hooks/use-toast';
import { useEventContext } from '@/context/EventDataContext';


const banks = [
  { name: "ABN AMRO", image: "/Indian Banks SVG Logos/Bank Name=ABN AMRO.svg" },
  {
    name: "Au Small Finance Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Au Small Finance Bank.svg",
  },
  {
    name: "Abu Dhabi Commercial Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Abu Dhabi Commercial Bank.svg",
  },
  {
    name: "Airtel Payments Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Airtel Payments Bank.svg",
  },
  {
    name: "American Express",
    image: "/Indian Banks SVG Logos/Bank Name=American Express.svg",
  },
  {
    name: "Axis Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Axis Bank.svg",
  },
  {
    name: "BNP Paribas",
    image: "/Indian Banks SVG Logos/Bank Name=BNP Paribas.svg",
  },
  {
    name: "Bandhan Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Bandhan Bank.svg",
  },
  {
    name: "Bank Maybank Indonesia",
    image: "/Indian Banks SVG Logos/Bank Name=Bank Maybank Indonesia.svg",
  },
  {
    name: "Bank of America",
    image: "/Indian Banks SVG Logos/Bank Name=Bank of America.svg",
  },
  {
    name: "Bank of Bahrain and Kuwait",
    image: "/Indian Banks SVG Logos/Bank Name=Bank of Bahrain and Kuwait.svg",
  },
  {
    name: "Bank of Baroda",
    image: "/Indian Banks SVG Logos/Bank Name=Bank of Baroda.svg",
  },
  {
    name: "Bank of Ceylon",
    image: "/Indian Banks SVG Logos/Bank Name=Bank of Ceylon.svg",
  },
  {
    name: "Bank of China",
    image: "/Indian Banks SVG Logos/Bank Name=Bank of China.svg",
  },
  {
    name: "Bank of India",
    image: "/Indian Banks SVG Logos/Bank Name=Bank of India.svg",
  },
  {
    name: "Barclays Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Barclays Bank.svg",
  },
  { name: "CSB Bank", image: "/Indian Banks SVG Logos/Bank Name=CSB Bank.svg" },
  {
    name: "Canara Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Canara Bank.svg",
  },
  {
    name: "Central Bank of India",
    image: "/Indian Banks SVG Logos/Bank Name=Central Bank of India.svg",
  },
  {
    name: "Citi Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Citi Bank.svg",
  },
  {
    name: "City Union Bank",
    image: "/Indian Banks SVG Logos/Bank Name=City Union Bank.svg",
  },
  {
    name: "Credit Suisse",
    image: "/Indian Banks SVG Logos/Bank Name=Credit Suisse.svg",
  },
  {
    name: "Crédit Agricole Corporate and Investment Bank",
    image:
      "/Indian Banks SVG Logos/Bank Name=Crédit Agricole Corporate and Investment Bank.svg",
  },
  { name: "DBS Bank", image: "/Indian Banks SVG Logos/Bank Name=DBS Bank.svg" },
  { name: "DCB Bank", image: "/Indian Banks SVG Logos/Bank Name=DCB Bank.svg" },
  {
    name: "Deutsche Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Deutsche Bank.svg",
  },
  {
    name: "Dhanlaxmi Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Dhanlaxmi Bank.svg",
  },
  {
    name: "Doha Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Doha Bank.svg",
  },
  {
    name: "ESAF Small Finance Bank",
    image:
      "/Indian Banks SVG Logos/Bank Name=ESAF Small Finance Bank Ltd.svg",
  },
  {
    name: "Emirates NBD",
    image: "/Indian Banks SVG Logos/Bank Name=Emirates NBD.svg",
  },
  {
    name: "FINO Payments Bank",
    image: "/Indian Banks SVG Logos/Bank Name=FINO Payments Bank.svg",
  },
  {
    name: "Federal Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Federal Bank.svg",
  },
  {
    name: "First Abu Dhabi Bank",
    image: "/Indian Banks SVG Logos/Bank Name=First Abu Dhabi Bank.svg",
  },
  {
    name: "FirstRand Bank",
    image: "/Indian Banks SVG Logos/Bank Name=FirstRand Bank.svg",
  },
  {
    name: "HDFC Bank",
    image: "/Indian Banks SVG Logos/Bank Name=HDFC Bank.svg",
  },
  {
    name: "Handelsbanken",
    image: "/Indian Banks SVG Logos/Bank Name=Handelsbanken.svg",
  },
  {
    name: "ICICI Bank",
    image: "/Indian Banks SVG Logos/Bank Name=ICICI Bank.svg",
  },
  {
    name: "IDBI Bank",
    image: "/Indian Banks SVG Logos/Bank Name=IDBI Bank.svg",
  },
  {
    name: "India Post Payments Bank",
    image: "/Indian Banks SVG Logos/Bank Name=India Post Payments Bank.svg",
  },
  {
    name: "Indian Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Indian Bank.svg",
  },
  {
    name: "Indian Overseas Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Indian Overseas Bank.svg",
  },
  {
    name: "Industrial & Commercial Bank of China",
    image:
      "/Indian Banks SVG Logos/Bank Name=Industrial & Commercial Bank of China.svg",
  },
  {
    name: "Industrial Bank of Korea",
    image: "/Indian Banks SVG Logos/Bank Name=Industrial Bank of Korea.svg",
  },
  {
    name: "JPMorgan Chase",
    image: "/Indian Banks SVG Logos/Bank Name=JPMorgan Chase.svg",
  },
  {
    name: "Jammu & Kashmir Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Jammu & Kashmir Bank.svg",
  },
  {
    name: "Jio Payments Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Jio Payments Bank.svg",
  },
  {
    name: "KEB Hana Bank",
    image: "/Indian Banks SVG Logos/Bank Name=KEB Hana Bank.svg",
  },
  {
    name: "Kookmin Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Kookmin Bank.svg",
  },
  {
    name: "Kotak Mahindra Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Kotak Mahindra Bank.svg",
  },
  {
    name: "Krung Thai Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Krung Thai Bank.svg",
  },
  {
    name: "MUFG Bank",
    image: "/Indian Banks SVG Logos/Bank Name=MUFG Bank.svg",
  },
  {
    name: "Mizuho Corporate Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Mizuho Corporate Bank.svg",
  },
  {
    name: "Nainital bank",
    image: "/Indian Banks SVG Logos/Bank Name=Nainital bank.svg",
  },
  {
    name: "Paytm Payments Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Paytm Payments Bank.svg",
  },
  {
    name: "Punjab & Sind Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Punjab & Sind Bank.svg",
  },
  {
    name: "Punjab National Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Punjab National Bank.svg",
  },
  {
    name: "Qatar National Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Qatar National Bank.svg",
  },
  { name: "Rabobank", image: "/Indian Banks SVG Logos/Bank Name=Rabobank.svg" },
  { name: "RBL Bank", image: "/Indian Banks SVG Logos/Bank Name=RBL Bank.svg" },
  {
    name: "Saxo Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Saxo Bank.svg",
  },
  { name: "Sberbank", image: "/Indian Banks SVG Logos/Bank Name=Sberbank.svg" },
  {
    name: "Scotia Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Scotia Bank.svg",
  },
  {
    name: "Shinhan Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Shinhan Bank.svg",
  },
  {
    name: "Société Générale",
    image: "/Indian Banks SVG Logos/Bank Name=Société Générale.svg",
  },
  {
    name: "Sonali Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Sonali Bank.svg",
  },
  {
    name: "South Indian Bank",
    image: "/Indian Banks SVG Logos/Bank Name=South Indian Bank.svg",
  },
  {
    name: "Standard Chartered Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Standard Chartered Bank.svg",
  },
  {
    name: "State Bank of India",
    image: "/Indian Banks SVG Logos/Bank Name=State Bank of India.svg",
  },
  {
    name: "Sumitomo Mitsui Banking Corporation",
    image:
      "/Indian Banks SVG Logos/Bank Name=Sumitomo Mitsui Banking Corporation.svg",
  },
  {
    name: "Tamilnad Mercantile Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Tamilnad Mercantile Bank.svg",
  },
  { name: "UCO Bank", image: "/Indian Banks SVG Logos/Bank Name=UCO Bank.svg" },
  {
    name: "Ujjivan Small Finance Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Ujjivan Small Finance Bank.svg",
  },
  {
    name: "United Overseas Bank",
    image: "/Indian Banks SVG Logos/Bank Name=United Overseas Bank.svg",
  },
  { name: "Westpac", image: "/Indian Banks SVG Logos/Bank Name=Westpac.svg" },
  {
    name: "Woori Bank",
    image: "/Indian Banks SVG Logos/Bank Name=Woori Bank.svg",
  },
  { name: "YES Bank", image: "/Indian Banks SVG Logos/Bank Name=YES Bank.svg" },
];

interface UnlockCircle {
  fieldid: number;
  fieldstatus: boolean;
}

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  checkbox?: CheckboxField;
  filecontnet?: filecontent;
  fieldid:number;
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
  const {setUnlockEventCircle}=useEventContext()
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [userType, setUserType] = useState<"business" | "individual">(
    "business"
  );

  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return fields.every((field) => {
      if (field.required) {
        return formData[field.name] && formData[field.name].trim() !== "";
      }
      return true;
    });
  };
  const handlenext=(e:any)=>{
    e.preventDefault();
    if (!isFormValid()){
      toast({
        title:"Please Enter The required fields",
        variant:"default"
      })
    }else{
      onButtonClick();
    } 
  }
  useEffect(()=>{
    setUnlockEventCircle({
      fieldid:fields[0].fieldid,
    })
  },[])
  return (
    <form className="bg-white shadow-2xl p-5 rounded-lg w-full relative mt-20">
      {!prevDisabled && (
        <button
          onClick={(e) => {
            e.preventDefault();
            handlePrev();
          }}
        >
          <Image
            src="/icons/BackIcon.svg"
            alt="backIcon"
            width={20}
            height={20}
          />
        </button>
      )}
      <div className="flex flex-wrap w-[90%] mx-auto">
        {prevDisabled && (
          <RadioGroup
            defaultValue="business"
            className="flex flex-col sm:flex-row gap-2"
            onValueChange={(value) =>
              setUserType(value as "business" | "individual")
            }
          >
            <Label>Are you a business or an individual</Label>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business">Business</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual">Individual</Label>
            </div>
          </RadioGroup>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className="w-full m-2 flex flex-col">
            {field.type !== "file" && field.type !== "select" && (
              <>
                <label htmlFor={field.id}>
                  {userType === "business" && field.label === "Full Name"
                    ? "Business Name"
                    : field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
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
                    <p className="text-12 font-bold text-gray-500 text-center">
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
                          <img
                            src={bank.image}
                            alt={bank.image}
                            className="h-4 w-4"
                          />
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
          onClick={(e)=>handlenext(e)}
          className="mt-3 w-full"
        >
          {buttonLabel}
        </Button>
      )}
    </form>
  );
};

export default Kycforms;
