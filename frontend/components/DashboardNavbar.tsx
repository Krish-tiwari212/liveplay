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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@/context/UserContext';

import { Value } from "@radix-ui/react-select";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useEventContext } from "@/context/EventDataContext";


const Navbar = () => {
  const pathname = usePathname();
  const {DashboardName}=useEventContext()
  const pageName = pathname ? pathname.split("/").pop()?.toUpperCase() : "Home"; 
  const { theme, setTheme } = useAppContext();
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState("organizer");
  const { user, loading } = useUser();

  return (
    <div className="flex justify-between items-center p-4 m-3 bg-[#17202A] text-white rounded-lg ">
      <div className="text-lg text-[#CDDC29] font-bold">{DashboardName || "Home"}</div>
      <div className="flex items-center">
        <div className="flex space-x-4 ml-4 items-center">
          <button>
            <IoIosNotificationsOutline className="text-xl" />
          </button>
          <button
            className="flex items-center w-full py-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
            onMouseEnter={() => setTooltip("UserName")}
            onMouseLeave={() => setTooltip(null)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center w-full px-2 hover:bg-gray-700 hover:rounded transition-colors relative">
                    <Avatar>
                      <AvatarImage src={user?.user_metadata.avatar_url} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
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
