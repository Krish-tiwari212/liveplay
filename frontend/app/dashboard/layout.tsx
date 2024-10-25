"use client"

import Navbar from "@/components/DashboardNavbar";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { AppContextProvider, useAppContext } from "@/lib/context/AppContext";
import { useEffect, useState } from "react";
import MSidebar from "@/components/MSidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navexpanded,setnavexpanded]=useState(false)
  return (
    <AppContextProvider>
      <Sidebar setnavexpanded={setnavexpanded} />
      <div
        className={`flex h-screen ${navexpanded ? "opacity-40 bg-black" : ""}`}
      >
        <div className="flex-[2] lg:flex-[1] w-full">
          <MSidebar />
        </div>
        <div
          className={`bg-slate-200 overflow-x-hidden w-full h-full ml-16 md:ml-0 md:flex-[5] lg:flex-[4] xl:flex-[5]`}
        >
          <Navbar />
          {children}
        </div>
      </div>
    </AppContextProvider>
  );
 
}
