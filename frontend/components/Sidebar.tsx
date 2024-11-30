"use client"

import { useAppContext } from "@/lib/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect, Dispatch, SetStateAction } from "react"; 
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaCogs, FaSignOutAlt, FaBars, FaUserCircle, FaChevronDown, FaChevronUp, FaStreetView, FaUnlockAlt, FaTimes } from 'react-icons/fa'; 
import { IoIosArrowDown, IoIosArrowUp, IoIosNotificationsOutline } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import {
  MdDrafts,
  MdOutlineSecurity,
  MdOutlineFeaturedPlayList,
  MdSchedule,
  MdSportsFootball,
} from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEventContext } from "@/context/EventDataContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useUser } from "@/context/UserContext";
import { Button } from "./ui/button";

const Sidebar = ({ setnavexpanded }: { setnavexpanded :Dispatch<SetStateAction<boolean>>}) => {
  const [activePage, setActivePage] = useState("Dashboard");
  const { user, setUser } = useUser();
  const { setUserType, isNavbarCollapsed, setIsNavbarCollapsed } = useEventContext();
  const [openEvents, setOpenEvents] = useState(false);
  const [openTeams, setOpenTeams] = useState(false);
  const [openMatches, setOpenMatches] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const path = usePathname();
  const isplayerdashboard = path.includes("playerdashboard");
  const { toast } = useToast();
  const router = useRouter();

  const toggleEvents = () => {
    setOpenEvents(!openEvents);
    if (openTeams) setOpenTeams(false);
    if (openMatches) setOpenMatches(false);
  };

  const handleRoleChange = (value: string) => {
    setUserType(value);
    value === "organizer"
      ? router.push("/organizerDashboard")
      : router.push("/playerdashboard");

    handleCollapse();
  };

  const toggleMatches = () => {
    setOpenMatches(!openMatches);
    if (openEvents) setOpenEvents(false);
    if (openTeams) setOpenTeams(false);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const handleCollapse = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
    setOpenEvents(false);
    setOpenTeams(false);
    setOpenMatches(false);
  };

  const [userStatus, setUserStatus] = useState("organizer");

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
  };

  return (
    <div
      className={`lg:hidden ${
        isNavbarCollapsed ? "w-0 p-0" : "w-[70%] p-4"
      } bg-[#17202A] text-white shadow-lg transition-width duration-300 ease-in-out flex flex-col h-full z-40 fixed`}
    >
      <div className="flex items-center mt-8 border-b border-gray-700 pb-8">
        {!isNavbarCollapsed && (
            <div className="text-3xl font-bold text-gray-500 ml-2">
              <Image
                src="/images/Logo.png"
                alt="public/images/Logo.png"
                width={150}
                height={150}
              />
            </div>
        )}
        {!isNavbarCollapsed && (
          <button
            onClick={handleCollapse}
            className="ml-auto text-white hover:text-red-400 transition-colors duration-200"
          >
            <FaTimes className="text-xl text-[#CDDC29]" />
          </button>
        )}
      </div>
      {!isNavbarCollapsed && (
      <Link href="/">
        <Button
          className="w-full bg-[#141f29] text-[#ccdb28] border border-[#ccdb28] hover:bg-[#ccdb28] hover:text-[#141f29] md:hidden mb-2"
          size="xs"
        >
          Home
        </Button>
      </Link>
      )}
      {!isNavbarCollapsed && (
        <>
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
              <>
                <li>
                  <Link href="/organizerDashboard">
                    <button
                      onClick={() => {
                        handlePageChange("Dashboard");
                        handleCollapse();
                      }}
                      className={`flex items-center w-full p-2 rounded relative ${
                        activePage === "Dashboard"
                          ? "bg-[#CDDC29] text-[#17202A]"
                          : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                      }`}
                    >
                      <FaTachometerAlt className="mr-2" /> Dashboard
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/organizerDashboard/create_event">
                    <button
                      onClick={() => {
                        handlePageChange("Create Events");
                        handleCollapse();
                      }}
                      className={`flex items-center w-full p-2 rounded relative ${
                        activePage === "Create Events"
                          ? "bg-[#CDDC29] text-[#17202A]"
                          : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                      }`}
                    >
                      <FaCalendarAlt className="mr-2" /> Create New Event
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/organizerDashboard/manage-events">
                    <button
                      onClick={() => {
                        handlePageChange("Manage Events");
                        handleCollapse();
                      }}
                      className={`flex items-center w-full p-2 rounded relative ${
                        activePage === "Manage Events"
                          ? "bg-[#CDDC29] text-[#17202A]"
                          : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                      }`}
                    >
                      <MdOutlineFeaturedPlayList className="mr-2" />
                      Event Management
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={`/organizerDashboard/kyc/${user?.id}`}>
                    <button
                      onClick={() => {
                        handlePageChange("Unlock Earnings");
                        handleCollapse();
                      }}
                      className={`flex items-center w-full p-2 rounded relative ${
                        activePage === "Unlock Earnings"
                          ? "bg-[#CDDC29] text-[#17202A]"
                          : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                      }`}
                    >
                      <FaUnlockAlt className="mr-2 " /> Unlock Event Earnings
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/organizerDashboard/notifications">
                    <button
                      onClick={() => {
                        handlePageChange("Notifications");
                        handleCollapse();
                      }}
                      className={`flex items-center w-full p-2 rounded relative ${
                        activePage === "Notifications"
                          ? "bg-[#CDDC29] text-[#17202A]"
                          : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                      }`}
                    >
                      <IoIosNotificationsOutline className="mr-2" />
                      Notifications
                    </button>
                  </Link>
                </li>
              </>
            )}
            {isplayerdashboard && (
              <li>
                <Link href="/playerdashboard">
                  <button
                    onClick={() => {
                      handlePageChange("Dashboard");
                      handleCollapse();
                    }}
                    className={`flex items-center w-full p-2 rounded relative ${
                      activePage === "Dashboard"
                        ? "bg-[#CDDC29] text-[#17202A]"
                        : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                    }`}
                  >
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </button>
                </Link>
              </li>
            )}
          </ul>
          <hr className="my-4 border-gray-700 hidden lg:block" />
          <div className="mt-auto hidden lg:block">
            <ul>
              <li>
                <Link href="/organizerDashboard/settings">
                  <button
                    onClick={() => {
                      handlePageChange("Settings");
                      handleCollapse();
                    }}
                    className={`flex items-center w-full p-2 rounded relative ${
                      activePage === "Settings"
                        ? "bg-[#CDDC29] text-[#17202A]"
                        : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                    }`}
                  >
                    <FaCogs className="mr-2" /> Settings
                  </button>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handlePageChange("Log Out");
                    handleLogout();
                    handleCollapse();
                  }}
                  className={`flex items-center w-full p-2 rounded relative ${
                    activePage === "Log Out"
                      ? "bg-[#CDDC29] text-[#17202A]"
                      : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                  }`}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;