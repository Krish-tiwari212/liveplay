"use client";

import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { AppContextProvider, useAppContext } from "@/lib/context/AppContext";
import { useEffect, useState } from "react";
import MSidebar from "@/components/MSidebar";
import { EventProvider, useEventContext } from "@/context/EventDataContext";
import { UserProvider, useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import MNavbar from "@/components/MNavbar";
import Navbar from "@/components/Navbar";
import HeroChangingTagLine from "@/components/HeroChangingTagLine";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navexpanded, setnavexpanded] = useState(true);
  return (
    <UserProvider>
      <UserProvider>
        <MNavbar />
        <Navbar />
        <HeroChangingTagLine ishero={true} />
        <HeroChangingTagLine extraclass="hidden" />
        {children}
        <Footer />
      </UserProvider>
    </UserProvider>
  );
}
