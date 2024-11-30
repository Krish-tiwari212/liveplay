"use client";

import { FaMapMarkerAlt, FaEnvelope, FaBuilding, FaComments } from 'react-icons/fa';
import CardCarousel from "@/components/CardCarousel";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import AllEvents from "@/components/AllEvents";
import Footer from "@/components/Footer";
import { useAppContext } from "@/lib/context/AppContext";
import MNavbar from "@/components/MNavbar";
import { UserProvider } from "@/context/UserContext";
import HeroChangingTagLine from "@/components/HeroChangingTagLine";
import SportsSlider from "@/components/SportsSlider";
import { TbListDetails } from "react-icons/tb";
import { MdEvent } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { IoArrowForwardCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import HeroFeatures from "@/components/HeroFeatures";

interface location {
  latitude: number | null;
  longitude: number | null;
}
export default function Home() {
   const [location, setLocation] = useState<location>({
     latitude: null,
     longitude: null,
   });

   useEffect(() => {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         (position) => {
           const { latitude, longitude } = position.coords;
           setLocation({ latitude, longitude });
         },
         (error) => {
           console.error("Error fetching location:", error.message);
         }
       );
     } else {
       console.warn("Geolocation is not supported by this browser.");
     }
   }, []);
  return (
    <UserProvider>
      <MNavbar location={location} />
      <Navbar location={location} />
      <HeroChangingTagLine ishero={true} />
      <Hero />
      <CardCarousel />
      <SportsSlider />
      <div
        id="hero-features"
        className=" pt-8 flex justify-center items-center w-full"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[90%] lg:w-[60%] border border-black">
          <h2 className="text-3xl md:text-6xl font-bold text-[#141f29] mb-2 md:mb-4">
            <span className="italic">Free</span> Match Generator
          </h2>
          <p className="text-[16px] md:text-2xl text-[#141f29] mb-4 md:mb-6">
            Generate match fixtures for your event
          </p>
          <Button className="mb-6 text-lg">Start Generating Fixtures</Button>
          <ul className="text-start text-[#141f29] space-y-2 lg:ml-32 text-[16px] md:text-2xl  ">
            <li className="flex gap-4 items-center">
              <IoArrowForwardCircle className="flex-none" />
              <h1>No Signup needed</h1>
            </li>
            <li className="flex gap-4 ">
              <FaTrophy className="flex-none" /> <h1>10+ Sports</h1>
            </li>
            <li className="flex gap-4">
              <MdEvent className="flex-none" />
              <h1>Team events / Singles events / Doubles Events</h1>
            </li>
            <li className="flex gap-4 ">
              <TbListDetails className="flex-none" />
              <h1>Knockouts, Group Playoffs & Round Robin</h1>
            </li>
          </ul>
        </div>
      </div>
      <HeroFeatures />
      <Footer />
    </UserProvider>
  );
}
