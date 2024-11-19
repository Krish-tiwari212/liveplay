import React, { useState } from 'react';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaRunning } from 'react-icons/fa';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { IoCalendarSharp, IoPerson, IoTicketSharp } from 'react-icons/io5';
import { MdPayment } from 'react-icons/md';
import { RiMoneyRupeeCircleFill } from 'react-icons/ri';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const feature1 = [
  { icon: "/icons/Vector.svg", text: "FREE for Players" },
  { icon: "/icons/person.svg", text: "FREE for Organizers" },
  { icon: "/icons/income 1.svg", text: "Earn Money" },
  {
    icon: "/icons/collaboration 1.svg",
    text: "Team & Pair Registrations",
  },
  { icon: "/icons/ticket 1.svg", text: "Event pass" },
  { icon: "/icons/Frame (3).svg", text: "Secure Payments" },
  { icon: "/icons/running 1.svg", text: "Know your competition" },
  { icon: "/icons/calendar (1) 1.svg", text: "Free Match Generator" },
  { icon: "/icons/wallet 1.svg", text: "Withdraw anytime" },
];

const HeroFeatures = () => {
  const [isPlayer, setIsPlayer] = useState<boolean | null>(null);
  const router=useRouter()

  return (
    <>
      <div className="hero-features p-4 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[90%] mx-auto">
          {feature1.map((feature, index) => (
            <div
              key={index}
              className={`feature-item p-2 flex justify-center items-center text-center ${
                feature1.length === 1 ? "col-span-full" : ""
              }`}
            >
              <span className="feature-icon text-2xl flex-none">
                <Image
                  src={feature.icon}
                  alt={feature.icon}
                  width={30}
                  height={30}
                />
              </span>
              <span className="feature-text ml-2 text-xl lg:text-3xl font-semibold text-nowrap">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
        {/* <div className="flex flex-wrap justify-between items-center mb-4 w-full md:w-[70%] mx-auto">
          {feature2.map((feature, index) => (
            <div key={index} className="feature-item p-2 flex w-full sm:w-auto">
              <span className="feature-icon text-2xl">
                <Image
                  src={feature.icon}
                  alt={feature.icon}
                  width={30}
                  height={30}
                />
              </span>
              <span className="feature-text ml-2 text-lg sm:text-2xl font-semibold">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between items-center w-full md:w-[80%] mx-auto">
          {feature3.map((feature, index) => (
            <div key={index} className="feature-item p-2 flex w-full sm:w-auto">
              <span className="feature-icon text-2xl">
                <Image
                  src={feature.icon}
                  alt={feature.icon}
                  width={30}
                  height={30}
                />
              </span>
              <span className="feature-text ml-2 text-lg sm:text-2xl font-semibold">
                {feature.text}
              </span>
            </div>
          ))}
        </div> */}
      </div>
      <div className="text-center bg-[#ccdb28] p-6">
        <h2 className="text-xl sm:text-4xl font-bold mb-6">
          Create, manage, participate and win!!
        </h2>
        <p className="text-md sm:text-2xl mb-6">
          Are you a Player or an Organizer?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {isPlayer === null ? (
            <>
              <Button
                className="bg-[#1f2937] text-[#ccdb28] text-md py-2 px-4 rounded"
                onClick={() => setIsPlayer(true)}
              >
                I am a Player
              </Button>
              <Button
                className="bg-purple-600 text-md text-white py-2 px-4 rounded"
                onClick={() => setIsPlayer(false)}
              >
                I am an Organizer
              </Button>
            </>
          ) : isPlayer ? (
            <Button
              onClick={() => router.push("/playerdashboard")}
              className="bg-black text-[#ccdb28] py-2 px-4 rounded"
            >
              View My Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/organizerDashboard")}
              className="bg-purple-600 text-white py-2 px-4 rounded"
            >
              Create Event
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default HeroFeatures;
