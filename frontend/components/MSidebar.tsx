import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaBars, FaCalendarAlt, FaCogs, FaSignOutAlt, FaTachometerAlt, FaUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineFeaturedPlayList, MdOutlineSecurity, MdSchedule, MdSportsFootball } from 'react-icons/md';
import Image from 'next/image';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useUser } from '@/context/UserContext';
import { useEventContext } from '@/context/EventDataContext';

const MSidebar = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const { toast } = useToast();
  const router = useRouter();
  const { user, setUser } = useUser();
  const { setUserType, UserType } = useEventContext();
  const path = usePathname();
  const isplayerdashboard = path.includes("playerdashboard");

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
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
  };

  const handleButtonClick = (page: string) => {
    setActivePage(page); 
  };


  const handleRoleChange = (value: string) => {
    setUserType(value)
    value === "organizer" ? router.push("/organizerDashboard") : router.push("/playerdashboard");
    
  };

  return (
    <div
      className={`hidden bg-[#17202A] text-white p-4 shadow-lg transition-width duration-300 ease-in-out md:flex flex-col h-full z-50 sticky flex-[1]`}
    >
      <div className="flex items-center mb-6 border-b border-gray-700 pb-6 pt-6">
        <Link href={"/"}>
          <div className="text-3xl font-bold text-gray-500 ml-2">
            <Image
              src="/images/Logo.png"
              alt="public/images/Logo.png"
              width={200}
              height={200}
            />
          </div>
        </Link>
      </div>

      <ul className="space-y-2 flex-grow relative">
        <Select
          defaultValue={isplayerdashboard ? "player" : "organizer"}
          onValueChange={handleRoleChange}
        >
          <SelectTrigger className="h-10 p-2 bg-[#17202A] border-2 border-gray-700 rounded-md text-sm shadow-2xl text-white focus:border-[#17202A] focus:shadow-lg">
            <SelectValue placeholder="Organizer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="organizer">Organizer</SelectItem>
            <SelectItem value="player">Player</SelectItem>
          </SelectContent>
        </Select>
        {!isplayerdashboard && (
          <li>
            <Link href="/organizerDashboard">
              <button
                onClick={() => handleButtonClick("Dashboard")}
                className={`flex items-center w-full py-2 pl-2 rounded transition-colors duration-200 relative ${
                  activePage === "Dashboard"
                    ? "bg-[#CDDC29] text-[#17202A]"
                    : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                }`}
              >
                <FaTachometerAlt className="mr-2 text-xl" /> Dashboard
              </button>
            </Link>
            <div className="flex items-center justify-between w-full py-2 pl-1 rounded transition-colors duration-200">
              <h1 className="text-xl">Organizer</h1>
            </div>
            <ul
              className={`space-y-1 pl-2 overflow-hidden transition-all duration-300 ease-in-out`}
            >
              <li>
                <Link href="/organizerDashboard/create_event">
                  <button
                    onClick={() => handleButtonClick("Create Events")}
                    className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                      activePage === "Create Events"
                        ? "bg-[#CDDC29] text-[#17202A]"
                        : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                    }`}
                  >
                    <MdSchedule className="mr-2 text-xl" /> Create New Events
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/organizerDashboard/manage-events">
                  <button
                    onClick={() => handleButtonClick("Manage Events")}
                    className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                      activePage === "Manage Events"
                        ? "bg-[#CDDC29] text-[#17202A]"
                        : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                    }`}
                  >
                    <MdOutlineFeaturedPlayList className="mr-2 text-xl" />
                    Event Management
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/organizerDashboard/kyc/1234">
                  <button
                    onClick={() => handleButtonClick("Unlock Earnings")}
                    className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                      activePage === "Unlock Earnings"
                        ? "bg-[#CDDC29] text-[#17202A]"
                        : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                    }`}
                  >
                    <MdOutlineSecurity className="mr-2 text-xl" /> Unlock
                    Earnings KYC
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/organizerDashboard/notifications">
                  <button
                    onClick={() => handleButtonClick("Notifications")}
                    className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                      activePage === "Notifications"
                        ? "bg-[#CDDC29] text-[#17202A]"
                        : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                    }`}
                  >
                    <IoIosNotificationsOutline className="mr-2 text-xl" />{" "}
                    Notifications
                  </button>
                </Link>
              </li>
            </ul>
          </li>
        )}
        {isplayerdashboard && (
          <li>
            <Link href="/playerdashboard">
              <button
                onClick={() => handleButtonClick("Dashboard")}
                className={`flex items-center w-full py-2 pl-2 rounded transition-colors duration-200 relative ${
                  activePage === "Dashboard"
                    ? "bg-[#CDDC29] text-[#17202A]"
                    : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                }`}
              >
                <FaTachometerAlt className="mr-2 text-xl" /> Dashboard
              </button>
            </Link>
            <div className="flex items-center justify-between w-full py-2 pl-1 rounded transition-colors duration-200">
              <h1 className="text-xl">Player</h1>
            </div>
            <ul
              className={`space-y-1 pl-2 overflow-hidden transition-all duration-300 ease-in-out `}
            >
              <li>
                <Link href="/playerdashboard/manage-events">
                  <button className="flex items-center w-full p-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200">
                    <MdSchedule className="mr-2 text-xl" /> Manage Events
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/playerdashboard">
                  <button className="flex items-center w-full p-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200">
                    <MdOutlineFeaturedPlayList className="mr-2 text-xl" />
                    Events I am interested
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/playerdashboard">
                  <button className="flex items-center w-full p-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200">
                    <MdOutlineFeaturedPlayList className="mr-2 text-xl" />
                    Withdraw from Events
                  </button>
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
      <hr className="my-4 border-gray-700" />
      <div className="mt-auto">
        <ul>
          <li>
            <Link href="/organizerDashboard/setting">
              <button className="flex lg:text-md items-center w-full py-2 pl-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200 relative">
                <FaCogs className="mr-2 text-xl" /> Settings
              </button>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full py-2 pl-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200 relative"
            >
              <FaSignOutAlt className="mr-2 text-xl" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MSidebar;
