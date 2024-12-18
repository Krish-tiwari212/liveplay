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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@/context/UserContext';
import { FaUserCircle, FaBars, FaCogs, FaSignOutAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useEventContext } from "@/context/EventDataContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";


const Navbar = () => {
  const {DashboardName, notification,isNavbarCollapsed,setIsNavbarCollapsed} = useEventContext();
  const unreadNotifications = notification.filter(notif => !notif.read);
  const [userStatus, setUserStatus] = useState("organizer");
  const { user, loading,setUser } = useUser();
  const router=useRouter()
  const path = usePathname();
  const isplayerdashboard = path.includes("playerdashboard");
  const defaultname=isplayerdashboard?"Player Dashboard":"Organizer Dashboard";
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setUser(null);
        toast({
          title: "Logout Successful",
          description: "Successfully Logged Out!",
          variant: "default",
        });
        router.push("/");
      } else {
        const data = await response.json();
        toast({
          title: "Logout Failed",
          description: data.error || "An error occurred during logout.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Server error occurred during logout.",
        variant: "destructive",
      });
    }
    setIsPopoverOpen(false);
  };



  return (
    <div className="flex justify-between items-center p-4 m-3 bg-[#17202A] text-white rounded-lg ">
      <div className="flex items-center">
        <button
          className="mr-4 lg:hidden"
          onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
        >
          <FaBars className="text-2xl" />
        </button>
        <div className="text-sm sm:text-2xl text-[#CDDC29] font-bold mr-2">
          {DashboardName || defaultname}
        </div>
      </div>
      <div className="flex items-center">
        <Link href="/">
          <Button
            className="w-full bg-[#141f29] text-[#ccdb28] border border-[#ccdb28] hover:bg-[#ccdb28] hover:text-[#141f29] hidden md:block"
            size="xs"
          >
            Home
          </Button>
        </Link>
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
          <button className="hidden lg:flex items-center w-full py-2 rounded transition-colors duration-200 relative">
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild></TooltipTrigger>
                <TooltipContent className="relative">
                  <div className="flex flex-col items-center w-full">
                    <div
                      onClick={() => {
                        router.push("/organizerDashboard/profile");
                      }}
                      className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1"
                    >
                      <Avatar>
                        <AvatarImage src={user?.user_metadata.picture} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      Profile
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
            <div className="flex items-center w-full px-2 transition-colors relative">
              {user?.user_metadata.picture ? (
                <Image
                  src={user?.user_metadata.picture}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle className="text-3xl" />
              )}
            </div>
          </button>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger
              className="lg:hidden"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <Avatar>
                <AvatarImage src={user?.user_metadata.picture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mr-10 w-40 p-1 bg-[#17202A] focus:ring-offset-none border-none z-10">
              <div className="mt-auto">
                <ul>
                  <li>
                    <Link href="/organizerDashboard/settings">
                      <button
                        onClick={() => setIsPopoverOpen(false)}
                        className={`flex items-center w-full px-2 py-1 rounded relative text-[#CDDC29] bg-[#17202A] mb-2  border border-[#CDDC29]`}
                      >
                        <FaCogs className="mr-2" /> Settings
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className={`flex items-center w-full px-2 py-1 rounded relative text-[#CDDC29] bg-[#17202A] border border-[#CDDC29]`}
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
