"use client"

import Navbar from "@/components/DashboardNavbar";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { AppContextProvider, useAppContext } from "@/lib/context/AppContext";
import { useEffect, useState } from "react";


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
        <div className={`bg-slate-200 overflow-x-hidden w-full h-full ml-16 `}>
          <Navbar />
          {children}
        </div>
      </div>
    </AppContextProvider>
  );
 
}
