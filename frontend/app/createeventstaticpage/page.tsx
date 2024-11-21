"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { FaPersonRunning } from 'react-icons/fa6';
import { BsPersonCheck } from "react-icons/bs";
import { IoArrowForwardCircle } from 'react-icons/io5';
import { FaBars, FaTrophy } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

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
  const router = useRouter();
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const scrollToSection = (id: string) => {
    setIsSheetOpen(false);
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionPosition - navbarHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <div>
      <nav className="bg-[#141f29] p-4 flex justify-between items-center fixed w-full z-20 ">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="mr-4 lg:hidden">
              <FaBars className="text-2xl text-[#ccdb28]" />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-[#141f29] pt-16 border-none" side="top">
            <div className="px-2 py-4">
              <Button
                onClick={() => scrollToSection("hero")}
                className="w-full mb-4 bg-[#141f29] text-[#ccdb28] border border-[#ccdb28] text-2xl py-8"
              >
                Home
              </Button>
              <Button
                onClick={() => scrollToSection("pricing")}
                className="w-full mb-4 bg-[#141f29] text-[#ccdb28] border border-[#ccdb28] text-2xl py-8"
              >
                Pricing
              </Button>
              <Button
                onClick={() => scrollToSection("features")}
                className="w-full mb-4 bg-[#141f29] text-[#ccdb28] border border-[#ccdb28] text-2xl py-8"
              >
                Features
              </Button>
              <Button
                onClick={() => scrollToSection("freeMatchGenerator")}
                className="w-full mb-4 bg-[#141f29] text-[#ccdb28] border border-[#ccdb28] text-2xl py-8"
              >
                Free Match Generator
              </Button>
              <Button
                onClick={() => {
                  router.push(
                    `${isLoggedIn ? "/organizerDashboard" : "/auth/login"}`
                  );
                  setIsSheetOpen(false);
                }}
                className="w-full text-2xl py-8"
                variant="tertiary"
              >
                Create Events
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <Image
          src="/images/Logo.png"
          alt="Liveplay Logo"
          className="h-8"
          width={200}
          height={200}
        />
        <div className="lg:flex space-x-4 hidden">
          <Button
            onClick={() => scrollToSection("hero")}
            className="bg-[#141f29] text-[#ccdb28] border border-[#ccdb28]"
          >
            Home
          </Button>
          <Button
            onClick={() => scrollToSection("pricing")}
            className="bg-[#141f29] text-[#ccdb28] border border-[#ccdb28]"
          >
            Pricing
          </Button>
          <Button
            onClick={() => scrollToSection("features")}
            className="bg-[#141f29] text-[#ccdb28] border border-[#ccdb28]"
          >
            Features
          </Button>
          <Button
            onClick={() => scrollToSection("freeMatchGenerator")}
            className="bg-[#141f29] text-[#ccdb28] border border-[#ccdb28]"
          >
            Free Match Generator
          </Button>
          <Button
            onClick={() => {
              router.push(
                `${isLoggedIn ? "/organizerDashboard" : "/auth/login"}`
              );
            }}
            variant="tertiary"
          >
            Create Events
          </Button>
        </div>
      </nav>
      <div
        id="hero"
        style={{ backgroundImage: "url('/images/createeventbanner1.svg')" }}
        className="relative flex flex-col items-start pt-32 px-4 sm:px-8 text-white min-h-[500px] bg-cover bg-center w-full font-lato"
      >
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-[#141f29] via-black/50 to-transparent opacity-60"></div>
        <div className="z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6">
            We <span className="text-[#ccdb28]">guarantee</span> your event
            success.
          </h1>
          <p className="text-sm sm:text-xl md:text-2xl mb-1 font-semibold ">
            More visibility, more registrations, more earnings{" "}
            <br className="sm:hidden" />
            <span className="text-[#ccdb28] mx-1">all in one</span>platform
          </p>
          <p className="text-sm sm:text-xl md:text-2xl mb-12 font-semibold">
            Publish your event in under
            <span className="text-[#ccdb28] mx-1">10 minutes</span> for
            <span className="text-[#ccdb28] mx-1">FREE</span>
          </p>
          <Button
            onClick={() => {
              router.push(
                `${isLoggedIn ? "/organizerDashboard" : "/auth/login"}`
              );
            }}
            className="text-lg sm:text-xl pb-2"
            variant="tertiary"
          >
            Create your Event
          </Button>
        </div>
      </div>
      <div className="bg-[#141f29] py-8 px-10 xl:px-32">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl text-white font-semibold mb-8 sm:mb-12">
          Create and Manage Your Event in Just a Few Steps
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="text-center">
            <p className="text-[#ccdb28] text-xl lg:text-2xl font-semibold mb-2">
              Create Event for Free
            </p>
            <Image
              src="/images/createventfree.svg"
              alt="Create Event for Free"
              width={300}
              height={300}
              className="w-full sm:w-auto "
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
            <p className="text-[#ccdb28] text-xl lg:text-2xl font-semibold mb-2">
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
            <p className="text-[#ccdb28] text-xl lg:text-2xl font-semibold mb-2">
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
      <div id="pricing" className="relative bg-[#ccdb28] pt-12 pb-32 md:pb-20">
        <div className="flex flex-col xl:flex-row justify-center items-center space-y-8 xl:space-y-0 xl:space-x-12">
          <Card>
            <CardContent className="flex flex-col items-center py-8 px-4 max-w-[350px] sm:min-w-[600px] lg:max-w-[550px] h-auto gap-4 shadow-xl">
              <div className="flex justify-center items-center gap-1 text-4xl ">
                <FaPersonRunning />
                <h1 className="font-bold ">Players</h1>
              </div>
              <p className="text-[#65a30c] text-center text-6xl font-semibold ">
                FREE
              </p>
              <p className="text-[#141f29] text-3xl font-semibold text-center">
                Just sign up and start playing
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center py-8 px-4 max-w-[350px] sm:min-w-[600px] lg:max-w-[550px] h-auto gap-4 shadow-xl">
              <div className="flex justify-center items-center gap-1 text-4xl ">
                <BsPersonCheck />
                <h1 className="font-bold ">Organizers*</h1>
              </div>
              <p className="text-[#65a30c] text-center text-6xl font-semibold ">
                FREE
              </p>
              <p className="text-[#141f29] text-3xl font-semibold text-center">
                Just sign up and create your sports event
              </p>
            </CardContent>
          </Card>
        </div>
        <p className="text-black text-center mt-4 text-[0.8rem] sm:text-md absolute right-2 bottom-2 font-semibold ">
          *No amount to be paid upfront by organizers.{" "}
          <br className="sm:hidden" />
          However, a platform fee shall be deducted from event proceeds.
        </p>
      </div>
      <div id="features" className="bg-[#141f29] py-12">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl text-white font-semibold mb-8">
          Powerful Features for
          <span className="text-[#ccdb28] mx-1 sm:mx-2">
            Seamless Event Hosting
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-10">
          {cardData.map((card, index) => (
            <React.Fragment key={index}>
              <Card
                className={`${
                  [0, 2, 5, 7].includes(index)
                    ? "border border-[#141f29] bg-[#ccdb28] text-[#141f29]"
                    : "border border-[#ccdb28] bg-[#141f29] text-[#ccdb28]"
                } justify-center items-center min-w-[200px] min-h-[200px] xl:min-w-[290px] xl:min-h-[290px] hidden lg:flex`}
              >
                <CardContent className="text-center p-4 flex flex-col justify-center items-center">
                  <h3 className="text-2xl xl:text-3xl font-semibold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-md xl:text-xl">{card.description}</p>
                </CardContent>
              </Card>
              <Card
                className={`${
                  [0, 3, 4, 7].includes(index)
                    ? "border border-[#141f29] bg-[#ccdb28] text-[#141f29]"
                    : "border border-[#ccdb28] bg-[#141f29] text-[#ccdb28]"
                }  justify-center items-center min-w-[200px] min-h-[200px] xl:min-w-[290px] xl:min-h-[290px] hidden sm:flex lg:hidden`}
              >
                <CardContent className="text-center p-4 flex flex-col justify-center items-center">
                  <h3 className="text-2xl xl:text-3xl font-semibold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-md xl:text-xl">{card.description}</p>
                </CardContent>
              </Card>
              <Card
                className={`${
                  [0, 2, 4, 6].includes(index)
                    ? "border border-[#141f29] bg-[#ccdb28] text-[#141f29]"
                    : "border border-[#ccdb28] bg-[#141f29] text-[#ccdb28]"
                } flex justify-center items-center min-w-[200px] min-h-[200px] xl:min-w-[290px] xl:min-h-[290px] sm:hidden`}
              >
                <CardContent className="text-center p-4 flex flex-col justify-center items-center">
                  <h3 className="text-2xl xl:text-3xl font-semibold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-md xl:text-xl">{card.description}</p>
                </CardContent>
              </Card>
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-col justify-center mt-8">
          <p className="text-white text-2xl sm:text-xl text-center mb-4">
            Payments powered by
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center xl:space-x-4 mt-2">
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
      <div
        id="freeMatchGenerator"
        className="bg-[#ccdb28] py-12 flex justify-center items-center w-full"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[90%] lg:w-[60%] border border-black">
          <h2 className="text-3xl md:text-6xl font-bold text-[#141f29] mb-2 md:mb-4">
            Free Match Generator
          </h2>
          <p className="text-[16px] md:text-2xl text-[#141f29] mb-4 md:mb-6">
            Generate match fixtures for your event
          </p>
          <Button className="mb-6 text-lg">Start Generating Fixtures</Button>
          <ul className="text-left text-[#141f29] space-y-2 ld:mx-12 text-[16px] md:text-2xl">
            <li className="flex gap-4 items-center">
              <IoArrowForwardCircle className="flex-none" />{" "}
              <h1>No Signup needed</h1>
            </li>
            <li className="flex gap-4 items-center">
              <FaTrophy className="flex-none" /> <h1>10+ Sports</h1>
            </li>
            <li className="flex gap-4 items-center">
              <MdEvent className="flex-none" />{" "}
              <h1>Team events / Singles events / Doubles Events</h1>
            </li>
            <li className="flex gap-4 items-center">
              <TbListDetails className="flex-none" />{" "}
              <h1>Knockouts, Group Playoffs & Round Robin</h1>
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
        <div className="absolute bg-[#141f29] opacity-60 w-full min-h-[300px]"></div>
        <div className=" z-10">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 text-[#ccdb28]">
            Ready to Take Your Event to the Next Level?
          </h2>
          <p className="text-md mx-4 sm:mx-0 sm:text-xl mb-6 text-white">
            Join hundreds of other organizers who trust
            <span className="font-bold text-[#ccdb28] mx-1">liveplay.in</span>
            and create your event now
          </p>
          <Button
            onClick={() => {
              router.push(
                `${isLoggedIn ? "/organizerDashboard" : "/auth/login"}`
              );
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
