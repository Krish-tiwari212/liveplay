"use client"
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Kycforms from '@/components/Kycforms';
import { verify } from 'crypto';
import { toast } from '@/hooks/use-toast';
import { IoCreate } from 'react-icons/io5';
import { MdAccountBalance, MdOutlineCategory, MdOutlineFeaturedPlayList, MdPersonalInjury } from 'react-icons/md';
import ProgressBar from '@/components/ProgressBar';
import { useEventContext } from '@/context/EventDataContext';
import { useUser } from '@/context/UserContext';
import KYCFinalPage from '@/components/KYCFinalPage';

interface CheckboxField {
  id: string;
  label: string;
}


interface filecontent {
  size: string;
  label: string;
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

const ProgressBarCheckpoints = [
  {
    icon: <MdPersonalInjury />,
    label: "Identity Details",
    placement: 1,
  },
  {
    icon: (
      <img
        src="/icons/Aadhar-White.svg"
        alt="Upload Adhar"
        className="w-5 h-5"
      />
    ),
    label: "Upload Document",
    placement: 2,
  },
  {
    icon: <MdAccountBalance />,
    label: "Bank Details",
    placement: 3,
  },
];

const fields = [
  [{
    fieldid:1,
    id: "fullName",
    label: "Full Name",
    type: "text",
    name: "fullName",
    placeholder: "Enter Full Name",
    required: true,
  },
  {
    fieldid:1,
    id: "contactNumber",
    label: "Contact Number",
    type: "text",
    name: "contactNumber",
    placeholder: "Enter Contact Number",
    required: true,
  },
  {
    fieldid:1,
    id: "fullAddress",
    label: "Full Address",
    type: "text",
    name: "fullAddress",
    placeholder: "Enter Full Address",
    required: true,
  },
  {
    fieldid:1,
    id: "city",
    label: "City",
    type: "text",
    name: "city",
    placeholder: "Enter City",
    required: true,
  },
  {
    fieldid:1,
    id: "pincode",
    label: "Pincode",
    type: "text",
    name: "pincode",
    placeholder: "Enter Pincode",
    required: true,
  },
],[
  {
    fieldid: 2,
    id: "aadharFront",
    label: "Upload Document (Addhar)",
    type: "file",
    name: "aadharFront",
    required: true,
    filecontnet: {
      size: "JPG,PNG",
      label: "Upload Aadhar (Front)",
    },
  },
  {
    fieldid: 2,
    id: "aadharBack",
    label: "Upload Document (Pan)",
    type: "file",
    name: "aadharBack",
    required: true,
    filecontnet: {
      size: "JPG,PNG",
      label: "Upload Aadhar (Back)",
    },
  },
  {
    fieldid: 2,
    id: "pan",
    label: "Upload Document (Pan)",
    type: "file",
    name: "pan",
    required: true,
    filecontnet: {
      size: "JPG,PNG",
      label: "Upload PAN",
    },
  },
],
   [
  {
    fieldid: 3,
    id: "accountName",
    label: "Name as per Account",
    type: "text",
    name: "accountName",
    placeholder: "Enter Name as per Account",
    required: true,
  },
  {
    fieldid: 3,
    id: "accountNumber",
    label: "Account Number",
    type: "text",
    name: "accountNumber",
    placeholder: "Enter Account Number",
    required: true,
  },
  {
    fieldid: 3,
    id: "reAccountNumber",
    label: "Re-enter Account Number",
    type: "text",
    name: "reAccountNumber",
    placeholder: "Re-enter Account Number",
    required: true,
  },
  {
    fieldid: 3,
    id: "ifscCode",
    label: "IFSC Code",
    type: "text",
    name: "ifscCode",
    placeholder: "Enter IFSC Code",
    required: true,
  },
  {
    fieldid: 3,
    id: "bankName",
    label: "Bank Name",
    type: "select",
    name: "bankName",
    placeholder: "Enter Bank Name",
    required: true,
  },
],
];

const Page = () => {
  const { setDashboardName,setEditPage} = useEventContext();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

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

  useEffect(() => {
    setDashboardName("Unlock Event Earnings");
    setEditPage("KYC")
  }, [setDashboardName]);

  return (
    <div className="m-3 relative">
      {/* <ProgressBar
        forpage="KYC"
        currentpage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        checkpoints={ProgressBarCheckpoints}
      /> */}
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
      {currentPage === 4 && <KYCFinalPage />}
    </div>
  );
};

interface Pages {
  handleNext: () => void;
  handlePrev: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

const FirstPage = ({
  handleNext,
  handlePrev,
  prevDisabled,
  nextDisabled,
}: Pages) => {
  return (
    <form className="mx-auto w-full lg:w-[60%]">
      <Kycforms
        fields={fields[0]}
        buttonLabel="Next"
        onButtonClick={() => handleNext()}
        handlePrev={handlePrev}
        prevDisabled={prevDisabled || false}
      />
    </form>
  );};

const SecondPage = ({
  handleNext,
  handlePrev,
  prevDisabled,
  nextDisabled,
}: Pages) => {
  return (
    <form className="mx-auto w-full lg:w-[60%]">
      <Kycforms
        fields={fields[1]}
        buttonLabel="Next"
        onButtonClick={() => handleNext()}
        handlePrev={handlePrev}
      />
    </form>
  );
  
}

const ThirdPage = ({
  handleNext,
  handlePrev,
  prevDisabled,
  nextDisabled,
}: Pages) => {
  return (
    <form className="mx-auto w-full lg:w-[60%]">
      <Kycforms
        fields={fields[2]}
        buttonLabel="Unlock Event Earnings"
        onButtonClick={() => handleNext()}
        handlePrev={handlePrev}
      />
    </form>
  );};

export default Page;
