"use client";

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

export default function Home() {
  return (
    <>
      <MNavbar />
      <Navbar />
      <Hero />
      <CardCarousel />
      <AllEvents />
      <Footer/>
    </>
  );
}
