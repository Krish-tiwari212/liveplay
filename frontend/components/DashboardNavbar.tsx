"use client";

import { useAppContext } from "@/lib/context/AppContext";

import { Switch } from "@/components/ui/switch";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
  MdSportsFootball,
} from "react-icons/md";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Value } from "@radix-ui/react-select";
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
  const pathname = usePathname();
  const pageName = pathname ? pathname.split("/").pop()?.toUpperCase() : "HOME"; 
  const { theme, setTheme } = useAppContext();
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState("organizer");

  return (
    <div className="flex justify-between items-center p-4 m-3 bg-gray-800 text-white rounded-lg ">
      <div className="text-lg font-bold">
        {pageName === "1234" ? "KYC" : pageName}
      </div>
      <div className="flex items-center">
        <div className="flex space-x-4 ml-4 items-center">
          <MdOutlineChat className="text-white hidden md:block" />
          <MdNotifications className="text-white hidden md:block" />
          <MdPublic className="text-white hidden md:block" />
          <div className="flex gap-5 items-center justify-center">
            {/* <Switch id="theme" className="" onClick={(e)=>setTheme(e)} />
            <Label>{theme} Mode</Label> */}
            <Select onValueChange={setTheme}>
              <SelectTrigger className="w-auto md:w-[180px] bg-gray-800 border focus-visible:ring-offset-gray-600">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
            onMouseEnter={() => setTooltip("UserName")}
            onMouseLeave={() => setTooltip(null)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center w-full pl-2 hover:bg-gray-700 hover:rounded transition-colors relative">
                    <FaUserCircle className="text-3xl" />
                    <div className="flex flex-col justify-start items-start ml-2">
                      <span className={`text-xl`}>Mohit</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="relative">
                  <div className="flex flex-col items-center w-full">
                    <div
                      onClick={() => {
                        setUserStatus("organizer");
                      }}
                      className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1"
                    >
                      <FaUserCircle className="mr-2" /> As an Organizer
                    </div>
                    <div
                      onClick={() => {
                        setUserStatus("player");
                      }}
                      className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded"
                    >
                      <MdSportsFootball className="mr-2" /> As a Player
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
