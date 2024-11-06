"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  MdSportsFootball,
} from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@/context/UserContext';
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useEventContext } from "@/context/EventDataContext";
import { useRouter } from "next/navigation";
import Image from "next/image";


const Navbar = () => {
  const {DashboardName, notification} = useEventContext();
  const unreadNotifications = notification.filter(notif => !notif.read);
  const [userStatus, setUserStatus] = useState("organizer");
  const { user, loading } = useUser();
  const router=useRouter()
  const path = usePathname();
  const isplayerdashboard = path.includes("playerdashboard");
  const defaultname=isplayerdashboard?"Player Dashboard":"Organizer Dashboard";

  useEffect(() => {
    console.log(user)
  } , [user])  

  return (
    <div className="flex justify-between items-center p-4 m-3 bg-[#17202A] text-white rounded-lg ">
      <div className="text-lg sm:text-2xl text-[#CDDC29] font-bold">
        {DashboardName || defaultname}
      </div>
      <div className="flex items-center">
        <div className="flex space-x-4 ml-4 items-center">
          {!isplayerdashboard && (
            <button
              className="relative"
              onClick={() => router.push("organizerDashboard/notifications")}
            >
              <IoIosNotificationsOutline className="text-3xl" />
              <div className="absolute -top-2 -right-2 text-[0.6rem] bg-red-700  rounded-full py-1 px-2 flex items-center justify-center">
                {unreadNotifications.length}
              </div>
            </button>
          )}
          <button className="flex items-center w-full py-2 hover:bg-gray-700 rounded transition-colors duration-200 relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center w-full px-2 hover:bg-gray-700 hover:rounded transition-colors relative">
                    {user?.user_metadata.picture ? (
                      <Image src={user?.user_metadata.picture} alt="profile" width={40} height={40} className="rounded-full" />
                    ) : (
                      <FaUserCircle className="text-3xl" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="relative">
                  <div className="flex flex-col items-center w-full">
                    <div
                      onClick={() => {
                        router.push("/organizerDashboard/profile")
                      }}
                      className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1"
                    >
                      <Avatar>
                        <AvatarImage src={user?.user_metadata.picture} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar> Profile
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
