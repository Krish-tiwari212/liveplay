"use client"
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Kycforms from '@/components/Kycforms';
import { verify } from 'crypto';
import { toast } from '@/hooks/use-toast';

const fields = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    name: "fullName",
    placeholder: "Enter Full Name",
    required: true,
  },
  {
    id: "contactNumber",
    label: "Contact Number",
    type: "text",
    name: "contactNumber",
    placeholder: "Enter Contact Number",
    required: true,
  },
  {
    id: "fullAddress",
    label: "Full Address",
    type: "text",
    name: "fullAddress",
    placeholder: "Enter Full Address",
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
    placeholder: "Enter Pincode",
    required: true,
  },
  {
    id: "pan",
    label: "PAN (Citizen Identity No)",
    type: "text",
    name: "pan",
    placeholder: "Enter PAN",
    required: true,
  },
];

const thirdfields = [
  {
    id: "accountName",
    label: "Name as per Account",
    type: "text",
    name: "accountName",
    placeholder: "Enter Name as per Account",
    required: true,
  },
  {
    id: "accountNumber",
    label: "Account Number",
    type: "text",
    name: "accountNumber",
    placeholder: "Enter Account Number",
    required: true,
  },
  {
    id: "reAccountNumber",
    label: "Re-enter Account Number",
    type: "text",
    name: "reAccountNumber",
    placeholder: "Re-enter Account Number",
    required: true,
  },
  {
    id: "ifscCode",
    label: "IFSC Code",
    type: "text",
    name: "ifscCode",
    placeholder: "Enter IFSC Code",
    required: true,
  },
  {
    id: "bankName",
    label: "Bank Name",
    type: "text",
    name: "bankName",
    placeholder: "Enter Bank Name",
    required: true,
  },
];

const additionalFields = [
  {
    id: "aadharFront",
    label: "Upload Aadhar (Front)",
    type: "file",
    name: "aadharFront",
    required: true,
    filecontnet: {
      size: "SVG,JPG,PNG or GIF max(480x480px)",
      label: "Upload Aadhar (Front)",
    },
  },
  {
    id: "aadharBack",
    label: "Upload Aadhar (Back)",
    type: "file",
    name: "aadharBack",
    required: true,
    filecontnet: {
      size: "SVG,JPG,PNG or GIF max(480x480px)",
      label: "Upload Aadhar (Back)",
    },
  },
];

const Page = ({ params: kycID }: { params: { kycID: string } }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="m-3 relative">
      <Progress
        value={(currentPage / totalPages) * 100}
        className="w-[50%] mx-auto h-2 mb-4"
      />
      {currentPage === 1 && (
        <FirstPage 
          handleNext={handleNext} 
          handlePrev={handlePrev} 
          prevDisabled={true} 
        />
      )}
      {currentPage === 2 && (
        <SecondPage 
          handleNext={handleNext} 
          handlePrev={handlePrev} 
        />
      )}
      {currentPage === 3 && (
        <ThirdPage 
          handleNext={handleNext} 
          handlePrev={handlePrev} 
        />
      )}
    </div>
  );
};

interface Pages {
  handleNext: () => void;
  handlePrev: () => void;
  prevDisabled?:boolean
  nextDisabled?:boolean
}

const FirstPage = ({
  handleNext,
  handlePrev,
  prevDisabled,
  nextDisabled,
}: Pages) => (
  <form className="mx-auto w-[60%]">
    <Kycforms
      fields={fields}
      buttonLabel="Next"
      onButtonClick={() => handleNext()}
      handlePrev={handlePrev}
      prevDisabled={prevDisabled || false}
    />
  </form>
);

const SecondPage = ({ handleNext, handlePrev ,
  prevDisabled,
  nextDisabled,}: Pages) => (
  <form className="mx-auto w-[60%]">
    <Kycforms
      fields={additionalFields}
      buttonLabel="Next"
      onButtonClick={() => handleNext()}
      handlePrev={handlePrev}
    />
  </form>
);

const ThirdPage = ({
  handleNext,
  handlePrev,
  prevDisabled,
  nextDisabled,
}: Pages) => (
  <form className="mx-auto w-[60%]">
    <Kycforms
      fields={thirdfields}
      buttonLabel="Unlock Event Earnings"
      onButtonClick={() => handleNext()}
      handlePrev={handlePrev}
    />
  </form>
);

export default Page;
