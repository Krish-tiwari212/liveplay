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
import { UserProvider } from "@/context/UserContext";

export default function Home() {
  return (
    <UserProvider>
      <MNavbar />
      <Navbar />
      <Hero />
      <CardCarousel />
      <AllEvents />
      <Footer/>
    </UserProvider>
  );
}
