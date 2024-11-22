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

export default function Home() {
  return (
    <UserProvider>
      <MNavbar />
      <Navbar />
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
          <ul className="text-center text-[#141f29] space-y-2 lg:ml-32 text-[16px] md:text-2xl  ">
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
      <HeroFeatures />
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#f9faed] to-[#edf68a] px-4 py-12">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-4xl font-extrabold text-[#141f29] mb-4 text-center leading-tight">
            Contact Us
          </h1>
          <p className="text-md text-gray-700 mb-8 text-center">
            Whether you’re here to host, join, cheer, or just say "Hi," we’d
            love to hear from you!
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="w-8 h-8  flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-[#141f29]">
                  Address
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  212-A, Amar Cottages CHS,
                  <br />
                  Bhosale Nagar, Hadapsar,
                  <br />
                  Pune - 411028
                </p>
              </div>
            </div>
            {/* Email */}
            <div className="flex items-start space-x-4">
              <FaEnvelope className="w-8 h-8  flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-[#141f29]">Email</h2>
                <p className="text-gray-600">liveplayindia@gmail.com</p>
              </div>
            </div>
            {/* Company */}
            <div className="flex items-start space-x-4">
              <FaBuilding className="w-8 h-8 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-[#141f29]">
                  Company
                </h2>
                <p className="text-gray-600">
                  Impact Stream Ventures (PAN: AALFI0173P) proudly brings you
                  liveplay.in™
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaComments className="w-8 h-8  flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-[#141f29]">
                  Get in Touch
                </h2>
                <p className="text-gray-600">
                  We’re always game for a chat! 😄
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a href="mailto:liveplayindia@gmail.com">
              <Button className="px-6 py-3 rounded-full shadow-lg">
                Contact Us Now
              </Button>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </UserProvider>
  );
}
