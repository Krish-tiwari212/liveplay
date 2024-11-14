"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { FaPersonRunning } from 'react-icons/fa6';
import { BsPersonCheck } from "react-icons/bs";
import { IoArrowForwardCircle } from 'react-icons/io5';
import { FaTrophy } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { useRouter } from 'next/navigation';

const cardData = [
  {
    title: "10+ Sports",
    description: "Host events from a choice of 10+ sports.",
  },
  {
    title: "Earn Money with Unlimited Registrations",
    description: "Quick earning payouts to your bank account.",
  },
  {
    title: "Sponsor Integration",
    description: "Give your sponsors the limelight they deserve.",
  },
  {
    title: "Ad-Free & Mobile-Friendly",
    description: "No ads, No distraction.",
  },
  {
    title: "Live Match Scoring",
    description: "Update scores & participants can track them live.",
  },
  {
    title: "Order Custom T-Shirts",
    description: "Order customized T-shirts with yours and your club name.",
  },
  {
    title: "Early Bird Discounts",
    description: "Attract more participants by offering discounts.",
  },
  {
    title: "Flexible Event Cancellation",
    description:
      "Pay minimal fee, cancel your event and users get instant refunds.",
  },
];

const page = () => {
  const router=useRouter()
  return (
    <div>
      <nav className="bg-[#141f29] p-4">
        <Image
          src="/images/Logo.png"
          alt="Liveplay Logo"
          className="h-8"
          width={200}
          height={200}
        />
      </nav>
      <div
        style={{ backgroundImage: "url('/images/createeventbanner1.svg')" }}
        className="relative flex flex-col items-start pt-20 px-4 sm:px-8 text-white min-h-[500px] bg-cover bg-center w-full font-lato"
      >
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-black via-black/50 to-transparent opacity-60"></div>
        <div className="z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6">
            We <span className="text-[#ccdb28]">guarantee</span> your event
            success.
          </h1>
          <p className="text-sm sm:text-xl md:text-2xl mb-1 font-semibold ">
            More visibility, more registrations, more earnings—
            <span className="text-[#ccdb28] mx-2">all in one</span>platform
          </p>
          <p className="text-sm sm:text-xl md:text-2xl mb-12 font-semibold">
            Publish your event in under
            <span className="text-[#ccdb28] mx-2">10 minutes</span> for
            <span className="text-[#ccdb28] mx-2">FREE</span>
          </p>
          <Button
            onClick={() => {
              router.push("/auth/login");
            }}
            className="text-lg sm:text-xl pb-2"
            variant="tertiary"
          >
            Create your Event
          </Button>
        </div>
      </div>
      <div className="bg-[#141f29] py-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl text-white font-semibold mb-8 sm:mb-12">
          Create and Manage Your Event in Just a Few Steps
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-8">
          <div className="text-center">
            <p className="text-[#ccdb28] text-xl sm:text-2xl font-semibold mb-2">
              Create Event for Free
            </p>
            <Image
              src="/images/createventfree.svg"
              alt="Create Event for Free"
              width={300}
              height={300}
              className="w-full sm:w-auto"
            />
          </div>
          <div className="text-white text-xl sm:text-2xl">
            <Image
              src="/images/double arrow.svg"
              alt="Double Arrow"
              width={40}
              height={40}
              className="w-full sm:w-auto"
            />
          </div>
          <div className="text-center">
            <p className="text-[#ccdb28] text-xl sm:text-2xl font-semibold mb-2">
              Customize & Promote
            </p>
            <Image
              src="/images/customizeprompts.svg"
              alt="Customize & Promote"
              width={300}
              height={300}
              className="w-full sm:w-auto"
            />
          </div>
          <div className="text-white text-xl sm:text-2xl">
            <Image
              src="/images/double arrow.svg"
              alt="Double Arrow"
              width={40}
              height={40}
              className="w-full sm:w-auto"
            />
          </div>
          <div className="text-center">
            <p className="text-[#ccdb28] text-xl sm:text-2xl font-semibold mb-2">
              Real Time Tracking
            </p>
            <Image
              src="/images/realtimetracking.svg"
              alt="Real Time Tracking"
              width={300}
              height={300}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
      <div className="relative bg-[#ccdb28] pt-12 pb-20">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-12">
          <Card>
            <CardContent className="flex flex-col items-center py-8 px-4 min-w-[550px] h-auto gap-4 shadow-xl">
              <div className="flex justify-center items-center gap-1 text-4xl ">
                <FaPersonRunning />
                <h1 className="font-bold ">Players</h1>
              </div>
              <p className="text-[#65a30c] text-center text-6xl font-semibold ">
                FREE
              </p>
              <p className="text-[#141f29] text-3xl font-semibold">
                Just sign up and start playing
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center py-8 px-4 min-w-[550px] h-auto gap-4 shadow-xl">
              <div className="flex justify-center items-center gap-1 text-4xl">
                <BsPersonCheck />
                <h1 className="font-bold ">Organizers*</h1>
              </div>
              <p className="text-[#65a30c] text-center text-6xl font-semibold ">
                FREE
              </p>
              <p className="text-[#141f29] text-3xl font-semibold">
                Just sign up and create your sports event
              </p>
            </CardContent>
          </Card>
        </div>
        <p className="text-black text-center mt-4 text-md absolute right-2 bottom-2 font-semibold ">
          *No amount to be paid upfront by organizers. However, a 10% platform
          fee shall be deducted from event proceeds.
        </p>
      </div>
      <div className="bg-[#141f29] py-12">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl text-white font-semibold mb-8">
          Powerful Features for{" "}
          <span className="text-[#ccdb28]">Seamless Event Hosting</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-4 px-32">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className={`${
                [0, 2, 5, 7].includes(index)
                  ? "border border-[#141f29] bg-[#ccdb28] text-[#141f29]"
                  : "border border-[#ccdb28] bg-[#141f29] text-[#ccdb28]"
              } flex-1 flex justify-center items-center min-w-[290px] min-h-[290px]`}
            >
              <CardContent className="text-center p-4 flex flex-col justify-center items-center">
                <h3 className=" text-3xl font-semibold mb-2">{card.title}</h3>
                <p className="text-xl">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-col justify-center mt-8">
          <p className="text-white text-xl text-center mb-4">
            Payments powered by
          </p>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <Image
              src="/images/payment1 (1).svg"
              alt="PayU"
              width={200}
              height={90}
            />
            <Image
              src="/images/payment1 (2).svg"
              alt="Cashfree Payments"
              width={200}
              height={90}
            />
            <Image
              src="/images/payment1 (3).svg"
              alt="Razorpay"
              width={200}
              height={90}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#ccdb28] py-12 flex justify-center items-center w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[60%] border border-black">
          <h2 className="text-6xl font-bold text-[#141f29] mb-4">
            Free Match Generator
          </h2>
          <p className="text-2xl text-[#141f29] mb-6">
            Generate match fixtures for your event
          </p>
          <Button className="mb-6 text-lg">Start Generating Fixtures</Button>
          <ul className="text-left text-[#141f29] space-y-2 mx-12 text-2xl">
            <li className="flex gap-4 items-center">
              <IoArrowForwardCircle /> No Signup needed
            </li>
            <li className="flex gap-4 items-center">
              <FaTrophy /> 10+ Sports
            </li>
            <li className="flex gap-4 items-center">
              <MdEvent /> Team events / Singles events / Doubles Events
            </li>
            <li className="flex gap-4 items-center">
              <TbListDetails /> Knockouts, Group Playoffs & Round Robin
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url('/images/createeventbanner2.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "624px",
        }}
        className="flex flex-col justify-center items-center text-center  w-full relative"
      >
        <div className="absolute bg-[#141f29] opacity-60 py-8 w-full min-h-60"></div>
        <div className=" z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-[#ccdb28]">
            Ready to Take Your Event to the Next Level?
          </h2>
          <p className="text-lg sm:text-xl mb-6 text-white">
            Join hundreds of other organizers who trust{" "}
            <span className="font-bold text-[#ccdb28]">liveplay.in</span> and
            create your event now
          </p>
          <Button
            onClick={() => {
              router.push("/auth/login");
            }}
            className=" text-lg sm:text-xl"
            variant="tertiary"
          >
            Create your Event
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
