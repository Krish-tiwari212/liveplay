import React, { useEffect } from 'react';
import { FaCheckCircle, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';
import { Button } from './ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEventContext } from '@/context/EventDataContext';
import { toast } from "@/hooks/use-toast";
import { useUser } from '@/context/UserContext';

const KYCFinalPage = () => {
  const router = useRouter();
  const {KYCContent}=useEventContext();
  const {user} = useUser();
  useEffect(() => {
    console.log(KYCContent);
  
    const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    };
  
    const postOrganizerDetails = async () => {
      try {
        const aadharFrontBase64 = await convertFileToBase64(KYCContent.aadharFront);
        const aadharBackBase64 = await convertFileToBase64(KYCContent.aadharBack);
        const panBase64 = await convertFileToBase64(KYCContent.pan);
  
        let content = {
          ...KYCContent,
          user_id: user?.id,
          aadharFront: aadharFrontBase64,
          aadharBack: aadharBackBase64,
          pan: panBase64
        };
  
        const response = await fetch(`/api/auth/kyc`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(content),
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit organizer details');
        }
  
        const result = await response.json();
        toast({
          title: "Organizer details submitted successfully",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: error.message,
          variant: "error",
        });
      }
    };
  
    postOrganizerDetails();
  }, [KYCContent]);
  return (
    <div className="flex items-center justify-center min-h-[500px] p-4">
      <div className="space-y-6 max-w-lg w-full">
        <div className="flex justify-center">
          <Image
            src="/images/KYCTick.svg"
            alt="/images/KYCTick.svg"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-4xl font-semibold text-center">
          KYC Verification Complete!
        </h1>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <div className="flex gap-2 items-center bg-white rounded-md shadow-md px-4 py-6 border-2 border-[#cddc29] w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px]">
            <Image
              src="/images/KYC Icon1.svg"
              alt="/images/KYC Icon1.svg"
              width={20}
              height={20}
            />
            <span>All required documents have been validated</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-md shadow-md px-4 py-6 border-2 border-[#cddc29] w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px]">
            <Image
              src="/images/KYC Icon2.svg"
              alt="/images/KYC Icon2.svg"
              width={20}
              height={20}
            />
            <span>
              Your earnings will be transferred to your registered account
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/organizerDashboard")}
            size="xs"
            variant="tertiary"
            className=""
          >
            Go back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KYCFinalPage;
