import React, { useEffect } from 'react';
import { FaCheckCircle, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';
import { Button } from './ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEventContext } from '@/context/EventDataContext';
const KYCFinalPage = () => {
  const router = useRouter();
  const {KYCContent}=useEventContext()
  useEffect(()=>{
    console.log(KYCContent)
  },[])
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
