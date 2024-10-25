"use client"

import { useAppContext } from "@/lib/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect, Dispatch, SetStateAction } from "react"; 
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaCogs, FaSignOutAlt, FaBars, FaUserCircle, FaChevronDown, FaChevronUp, FaStreetView } from 'react-icons/fa'; 
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

const Sidebar = ({ setnavexpanded }: { setnavexpanded :Dispatch<SetStateAction<boolean>>}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const [openEvents, setOpenEvents] = useState(false);
  const [openTeams, setOpenTeams] = useState(false);
  const [openMatches, setOpenMatches] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const {toast}=useToast()
  const router=useRouter()
  const toggleEvents = () => {
    setOpenEvents(!openEvents);
    if (openTeams) setOpenTeams(false);
    if (openMatches) setOpenMatches(false);
  };

  const toggleMatches = () => {
    setOpenMatches(!openMatches);
    if (openEvents) setOpenEvents(false);
    if (openTeams) setOpenTeams(false);
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
      <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
        <button
          onClick={() => handleCollapse()}
          className="text-white hover:text-blue-400 transition-colors duration-200"
        >
          <Image
            src="/images/Asset 2.png"
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
        <li>
          <button
            className="flex items-center w-full py-2 pl-2 mb-3 hover:bg-gray-700 rounded transition-colors duration-200 relative"
            onMouseEnter={() => setTooltip("UserName")}
            onMouseLeave={() => setTooltip(null)}
            onClick={toggleEvents}
          ></button>
          <Link href="/dashboard">
            <button
              className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
              onMouseEnter={() => isCollapsed && setTooltip("Dashboard")}
              onMouseLeave={() => setTooltip(null)}
            >
              <FaTachometerAlt className="mr-2 text-xl" />
              {!isCollapsed && <>Dashboard</>}
              {isCollapsed && tooltip === "Dashboard" && (
                <div className="absolute left-8 top-4 bg-white text-black text-sm p-2 rounded-bl rounded-tr rounded-br border border-gray-300 shadow-lg flex flex-col w-48">
                  <Link href="/dashboard">
                    <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                      <FaTachometerAlt className="mr-2" /> Dashboard
                    </button>
                  </Link>
                </div>
              )}
            </button>
          </Link>
        </li>
        {userStatus === "organizer" && (
          <>
            <li>
              <div
                className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
                onMouseEnter={() =>
                  isCollapsed && setTooltip("OrganizerEvents")
                }
                onMouseLeave={() => setTooltip(null)}
                onClick={toggleEvents}
              >
                <FaCalendarAlt className="mr-2 text-xl" />
                {!isCollapsed && <>Events</>}
                {isCollapsed && tooltip === "OrganizerEvents" && (
                  <div className="absolute left-8 top-4 bg-white text-black text-sm p-2 rounded-bl rounded-tr rounded-br border border-gray-300 shadow-lg flex flex-col w-40">
                    <Link href="/dashboard/create_event">
                      <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1">
                        <FaCalendarAlt className="mr-2" /> Create Event
                      </button>
                    </Link>
                    <Link href="/dashboard/manage-events">
                      <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                        <MdOutlineFeaturedPlayList className="mr-2" /> Manage
                        Events
                      </button>
                    </Link>
                    <Link href="/dashboard/enable_features">
                      <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                        <MdOutlineFeaturedPlayList className="mr-2" /> Unlock
                        Event Earnings
                      </button>
                    </Link>
                    <Link href="/dashboard/enable_features">
                      <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                        <IoIosNotificationsOutline className="mr-2" />{" "}
                        Notifications
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <ul
                  className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out max-h-56`}
                >
                  <li>
                    <Link href="/dashboard/create_event">
                      <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                        {!isCollapsed && (
                          <>
                            <MdSchedule className="mr-2" /> Create Event
                          </>
                        )}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/enable_features">
                      <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                        {!isCollapsed && (
                          <>
                            <MdOutlineFeaturedPlayList className="mr-2" />{" "}
                            Enable Features
                          </>
                        )}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/kyc/1234">
                      <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                        {!isCollapsed && (
                          <>
                            <MdOutlineSecurity className="mr-2" /> Unlock
                            Earnings (kyc)
                          </>
                        )}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/kyc/1234">
                      <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                        {!isCollapsed && (
                          <>
                            <IoIosNotificationsOutline className="mr-2" />{" "}
                            Notifications
                          </>
                        )}
                      </button>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
        {userStatus === "player" && (
          <>
            <li>
              <button
                className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
                onMouseEnter={() => isCollapsed && setTooltip("UserEvents")}
                onMouseLeave={() => setTooltip(null)}
                onClick={toggleEvents}
              >
                <FaCalendarAlt className="mr-2 text-xl" />
                {!isCollapsed && <>Events</>}
                {isCollapsed && tooltip === "UserEvents" && (
                  <div className="absolute left-8 top-4 bg-white text-black text-sm p-2 rounded-bl rounded-tr rounded-br border border-gray-300 shadow-lg flex flex-col w-40">
                    <Link href="/dashboard/create_event">
                      <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1">
                        <FaCalendarAlt className="mr-2" /> Manage Events
                      </button>
                    </Link>
                    <Link href="/dashboard/enable_features">
                      <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                        <MdOutlineFeaturedPlayList className="mr-2" /> Events I
                        am interested in Features
                      </button>
                    </Link>
                    <Link href="/dashboard/enable_features">
                      <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                        <MdOutlineFeaturedPlayList className="mr-2" /> Withdraw
                        from Events
                      </button>
                    </Link>
                  </div>
                )}
              </button>
              {!isCollapsed && (
                <ul
                  className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out max-h-56`}
                >
                  <li>
                    <Link href="/dashboard/create_event">
                      <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                        {!isCollapsed && (
                          <>
                            <MdSchedule className="mr-2" /> Manage Events
                          </>
                        )}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/enable_features">
                      <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                        {!isCollapsed && (
                          <>
                            <MdOutlineFeaturedPlayList className="mr-2" />
                            Events I am interested
                          </>
                        )}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/enable_features">
                      <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                        {!isCollapsed && (
                          <>
                            <MdOutlineFeaturedPlayList className="mr-2" />
                            Withdraw from Events
                          </>
                        )}
                      </button>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}

        {/* <li>
          <button
            className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
            onMouseEnter={() => isCollapsed && setTooltip("Matches")}
            onMouseLeave={() => setTooltip(null)}
            onClick={toggleMatches}
          >
            <MdSportsFootball className="mr-2 text-xl" />
            {!isCollapsed && (
              <>
                Matches{" "}
                {openMatches ? (
                  <IoIosArrowUp className="ml-auto" />
                ) : (
                  <IoIosArrowDown className="ml-auto" />
                )}
              </>
            )}
            {isCollapsed && tooltip === "Matches" && (
              <div className="absolute left-8 top-4 bg-white text-black text-sm p-2 rounded-bl rounded-tr rounded-br border border-gray-300 shadow-lg flex flex-col w-48">
                <Link href="/dashboard/schedule_matches">
                  <button className=" w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1 flex items-center">
                    <MdSchedule className="mr-2" /> Schedule Matches
                  </button>
                </Link>
                <Link href="/dashboard/update_score">
                  <button className="w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1 flex items-center">
                    <MdOutlineBrowserUpdated className="mr-2" /> Update Scores
                  </button>
                </Link>
              </div>
            )}
          </button>
          <ul
            className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out max-h-40 `}
          >
            <li>
              <Link href="/dashboard/schedule_matches">
                <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                  {!isCollapsed && "Schedule Matches"}
                </button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/update_score">
                <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                  {!isCollapsed && "Update Scores"}
                </button>
              </Link>
            </li>
          </ul>
        </li> */}
      </ul>
      <hr className="my-4 border-gray-700" />
      <div className="mt-auto">
        <ul>
          <li>
            <Link href="/dashboard/setting">
              <button
                className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
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
              className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
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