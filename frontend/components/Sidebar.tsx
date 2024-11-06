"use client"

import { useAppContext } from "@/lib/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect, Dispatch, SetStateAction, use } from "react"; 
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaCogs, FaSignOutAlt, FaBars, FaUserCircle, FaChevronDown, FaChevronUp, FaStreetView, FaUnlockAlt } from 'react-icons/fa'; 
import { IoIosArrowDown, IoIosArrowUp, IoIosNotificationsOutline } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import {
  MdDrafts,
  MdOutlineSecurity,
  MdOutlineFeaturedPlayList,
  MdSchedule,
  MdSportsFootball,
} from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEventContext } from "@/context/EventDataContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useUser } from "@/context/UserContext";

const Sidebar = ({ setnavexpanded }: { setnavexpanded :Dispatch<SetStateAction<boolean>>}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const { setUserType } = useEventContext();
  const [openEvents, setOpenEvents] = useState(false);
  const [openTeams, setOpenTeams] = useState(false);
  const [openMatches, setOpenMatches] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const path = usePathname();
  const isplayerdashboard = path.includes("playerdashboard");
  const {toast}=useToast()
  const router=useRouter()
  const {user}=useUser()
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
    setnavexpanded((prev) => !prev);
    setIsCollapsed(!isCollapsed);
    setOpenEvents(false);
    setOpenTeams(false);
    setOpenMatches(false);
  };
  const [userStatus,setUserStatus]=useState("organizer")

  const handleLogout = async() => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    toast({
      title: "Logout Succesful",
      description: "Succesfully Logged Out!",
      variant: "default",
    });
    router.push("/")
  };
  return (
    <div
      className={`lg:hidden ${
        isCollapsed ? "w-16" : "w-64"
      } bg-[#17202A] text-white p-4 shadow-lg transition-width duration-300 ease-in-out flex flex-col h-full z-50 fixed`}
    >
      <div className="flex items-center mt-8 border-b border-gray-700 pb-8">
        <button
          onClick={() => handleCollapse()}
          className="text-white hover:text-blue-400 transition-colors duration-200"
        >
          <Image
            src="/icons/Asset 2.png"
            alt="public/images/Asset 2.png"
            width={40}
            height={40}
          />
        </button>
        {!isCollapsed && (
          <Link href={"/"}>
            <div className="text-3xl font-bold text-gray-500  ml-2">
              <Image
                src="/images/SmallLogo.png"
                alt="public/images/Logo.png"
                width={150}
                height={150}
              />
            </div>
          </Link>
        )}
      </div>
      <ul className="space-y-2 flex-grow relative">
        {!isCollapsed && (
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
        )}
        {!isplayerdashboard && (
          <>
            <li>
              <Link href="/organizerDashboard">
                <button
                  onClick={() => handlePageChange("Dashboard")}
                  className={`flex items-center w-full p-2 rounded relative ${
                    activePage === "Dashboard"
                      ? "bg-[#CDDC29] text-[#17202A]"
                      : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                  }`}
                >
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaTachometerAlt />
                        </TooltipTrigger>
                        <TooltipContent
                          className={`flex items-center w-full text-left p-2 rounded py-1 `}
                        >
                          <FaTachometerAlt className="mr-2" /> Dashboard
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div
                      className={`flex items-center w-full text-left rounded`}
                    >
                      <FaTachometerAlt className="mr-2" /> Dashboard
                    </div>
                  )}
                </button>
              </Link>
            </li>
            <li>
              <Link href="/organizerDashboard/create_event">
                <button
                  onClick={() => handlePageChange("Create Events")}
                  className={`flex items-center w-full p-2 rounded relative ${
                    activePage === "Create Events"
                      ? "bg-[#CDDC29] text-[#17202A]"
                      : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                  }`}
                >
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaCalendarAlt />
                        </TooltipTrigger>
                        <TooltipContent
                          className={`flex items-center w-full text-left p-2 rounded py-1 `}
                        >
                          <FaCalendarAlt className="mr-2" /> Create New Event
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div
                      className={`flex items-center w-full text-left rounded`}
                    >
                      <FaCalendarAlt className="mr-2" /> Create New Event
                    </div>
                  )}
                </button>
              </Link>
            </li>
            <li>
              <Link href="/organizerDashboard/manage-events">
                <button
                  onClick={() => handlePageChange("Manage Events")}
                  className={`flex items-center w-full p-2 rounded relative ${
                    activePage === "Manage Events"
                      ? "bg-[#CDDC29] text-[#17202A]"
                      : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                  }`}
                >
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <MdOutlineFeaturedPlayList />
                        </TooltipTrigger>
                        <TooltipContent
                          className={`flex items-center w-full text-left p-2 rounded py-1 `}
                        >
                          <MdOutlineFeaturedPlayList className="mr-2" />
                          Event Management
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div
                      className={`flex items-center w-full text-left rounded`}
                    >
                      <MdOutlineFeaturedPlayList className="mr-2" />
                      Event Management
                    </div>
                  )}
                </button>
              </Link>
            </li>
            <li>
              <Link href={`/organizerDashboard/kyc/${user?.id}`}>
                <button
                  onClick={() => handlePageChange("Unlock Earnings")}
                  className={`flex items-center w-full p-2 rounded relative ${
                    activePage === "Unlock Earnings"
                      ? "bg-[#CDDC29] text-[#17202A]"
                      : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                  }`}
                >
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaUnlockAlt />
                        </TooltipTrigger>
                        <TooltipContent
                          className={`flex items-center w-full text-left p-2 rounded py-1 `}
                        >
                          <FaUnlockAlt className="mr-2 " /> Unlock Event
                          Earnings
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div
                      className={`flex items-center w-full text-left rounded`}
                    >
                      <FaUnlockAlt className="mr-2 " /> Unlock Event Earnings
                    </div>
                  )}
                </button>
              </Link>
            </li>
            <li>
              <Link href="/organizerDashboard/notifications">
                <button
                  onClick={() => handlePageChange("Notifications")}
                  className={`flex items-center w-full p-2 rounded relative ${
                    activePage === "Notifications"
                      ? "bg-[#CDDC29] text-[#17202A]"
                      : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                  }`}
                >
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoIosNotificationsOutline />
                        </TooltipTrigger>
                        <TooltipContent
                          className={`flex items-center w-full text-left p-2 rounded py-1 `}
                        >
                          <IoIosNotificationsOutline className="mr-2" />
                          Notifications
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div
                      className={`flex items-center w-full text-left rounded`}
                    >
                      <IoIosNotificationsOutline className="mr-2" />
                      Notifications
                    </div>
                  )}
                </button>
              </Link>
            </li>
          </>
        )}
        {isplayerdashboard && (
          <>
            <li>
              <Link href="/playerdashboard">
                <button
                  onClick={() => handlePageChange("Dashboard")}
                  className={`flex items-center w-full p-2 rounded relative ${
                    activePage === "Dashboard"
                      ? "bg-[#CDDC29] text-[#17202A]"
                      : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                  }`}
                >
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaTachometerAlt />
                        </TooltipTrigger>
                        <TooltipContent
                          className={`flex items-center w-full text-left p-2 rounded py-1 `}
                        >
                          <FaTachometerAlt className="mr-2" /> Dashboard
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div
                      className={`flex items-center w-full text-left rounded`}
                    >
                      <FaTachometerAlt className="mr-2" /> Dashboard
                    </div>
                  )}
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
      <hr className="my-4 border-gray-700" />
      <div className="mt-auto">
        <ul>
          <li>
            <Link href="organizerDashboard/setting">
              <button
                className={`flex items-center w-full py-2 pl-2  rounded transition-colors duration-200 relative ${
                  activePage === "Setings"
                    ? "bg-[#CDDC29] text-[#17202A]"
                    : "hover:bg-[#CDDC29] hover:text-[#17202A]"
                }`}
                onMouseEnter={() => isCollapsed && setTooltip("Settings")}
                onMouseLeave={() => setTooltip(null)}
              >
                <FaCogs className="mr-2 text-xl" /> {!isCollapsed && "Settings"}
                {isCollapsed && tooltip === "Settings" && (
                  <div className="absolute left-8 bottom-4 bg-white text-black text-sm p-2 rounded-tl rounded-tr rounded-br border border-gray-300 shadow-lg flex flex-col w-20">
                    Settings
                  </div>
                )}
              </button>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full py-2 pl-2  rounded transition-colors duration-200 relative ${
                activePage === "Log Out"
                  ? "bg-[#CDDC29] text-[#17202A]"
                  : "hover:bg-[#CDDC29] hover:text-[#17202A]"
              }`}
              onMouseEnter={() => isCollapsed && setTooltip("Logout")}
              onMouseLeave={() => setTooltip(null)}
            >
              <FaSignOutAlt className="mr-2 text-xl" />{" "}
              {!isCollapsed && "Logout"}
              {isCollapsed && tooltip === "Logout" && (
                <div className="absolute left-8 bottom-4 bg-white text-black text-sm p-2 rounded-tl rounded-tr rounded-br border border-gray-300 shadow-lg flex flex-col w-20">
                  Logout
                </div>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;