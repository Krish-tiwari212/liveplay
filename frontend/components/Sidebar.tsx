"use client"

import { useAppContext } from "@/lib/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect, Dispatch, SetStateAction } from "react"; 
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaCogs, FaSignOutAlt, FaBars, FaUserCircle, FaChevronDown, FaChevronUp, FaStreetView } from 'react-icons/fa'; 
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { MdDrafts, MdOutlineBrowserUpdated, MdOutlineFeaturedPlayList, MdSchedule, MdSportsFootball } from "react-icons/md";

const Sidebar = ({ setnavexpanded }: { setnavexpanded :Dispatch<SetStateAction<boolean>>}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const [openEvents, setOpenEvents] = useState(false);
  const [openTeams, setOpenTeams] = useState(false);
  const [openMatches, setOpenMatches] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const toggleEvents = () => {
    setOpenEvents(!openEvents);
    if (openTeams) setOpenTeams(false);
    if (openMatches) setOpenMatches(false);
  };

  const toggleTeams = () => {
    setOpenTeams(!openTeams);
    if (openEvents) setOpenEvents(false);
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

  return (
    <div
      className={`sidebar ${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-800 text-white p-4 shadow-lg transition-width duration-300 ease-in-out flex flex-col h-full z-50 fixed`}
    >
      <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
        <button
          onClick={() => handleCollapse()}
          className="text-white hover:text-blue-400 transition-colors duration-200"
        >
          <FaBars className="text-2xl" />
        </button>
        {!isCollapsed && (
          <div className="text-3xl font-bold text-blue-800 ml-2">
            liveplay.in
          </div>
        )}
      </div>
      <div className="flex items-center mb-4 cursor-pointer">
        <FaUserCircle className="text-3xl " />
        {!isCollapsed && <span className="ml-2 text-lg">User Name</span>}
      </div>
      <ul className="space-y-2 flex-grow relative">
        <li>
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
        <li>
          <button
            className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
            onMouseEnter={() => isCollapsed && setTooltip("Events")}
            onMouseLeave={() => setTooltip(null)}
            onClick={toggleEvents}
          >
            <FaCalendarAlt className="mr-2 text-xl" />
            {!isCollapsed && (
              <>
                Events
                {openEvents ? (
                  <IoIosArrowUp className="ml-auto" />
                ) : (
                  <IoIosArrowDown className="ml-auto" />
                )}
              </>
            )}
            {isCollapsed && tooltip === "Events" && (
              <div className="absolute left-8 top-4 bg-white text-black text-sm p-2 rounded-bl rounded-tr rounded-br border border-gray-300 shadow-lg flex flex-col w-40">
                <Link href="/dashboard/create_event">
                  <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1">
                    <FaCalendarAlt className="mr-2" /> Create Event
                  </button>
                </Link>
                <Link href="/dashboard/category">
                  <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1">
                    <BiCategory className="mr-2" /> Category
                  </button>
                </Link>
                <Link href="/dashboard/drafts">
                  <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                    <MdDrafts className="mr-2" /> Drafts
                  </button>
                </Link>
                <Link href="/dashboard/enable_features">
                  <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                    <MdOutlineFeaturedPlayList className="mr-2" /> Enable
                    Features
                  </button>
                </Link>
                <Link href="/dashboard/view_events">
                  <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                    <FaStreetView className="mr-2" /> View Past Events
                  </button>
                </Link>
              </div>
            )}
          </button>
          {!isCollapsed && (
            <ul
              className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                openEvents ? "max-h-56" : "max-h-0"
              }`}
            >
              <li>
                <Link href="/dashboard/create_event">
                  <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                    {!isCollapsed && "Create Event"}
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/category">
                  <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                    {!isCollapsed && "Category"}
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/drafts">
                  <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                    {!isCollapsed && "Drafts"}
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/enable_features">
                  <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                    {!isCollapsed && "Enable Features"}
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/view_events">
                  <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                    {!isCollapsed && "View Events"}
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
            onMouseEnter={() => isCollapsed && setTooltip("Teams")}
            onMouseLeave={() => setTooltip(null)}
            onClick={toggleTeams}
          >
            <FaUsers className="mr-2 text-xl" />
            {!isCollapsed && (
              <>
                Teams
                {openTeams ? (
                  <IoIosArrowUp className="ml-auto" />
                ) : (
                  <IoIosArrowDown className="ml-auto" />
                )}
              </>
            )}
            {isCollapsed && tooltip === "Teams" && (
              <div className="absolute left-8 top-4 bg-white text-black text-sm p-2 rounded-bl rounded-tr rounded-br border border-gray-300 shadow-lg flex flex-col w-48">
                <Link href="/dashboard/registered_teams">
                  <button className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded">
                    <FaUsers className="mr-2" /> Registered Teams
                  </button>
                </Link>
              </div>
            )}
          </button>
          {!isCollapsed && (
            <ul
              className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                openTeams ? "max-h-40" : "max-h-0"
              }`}
            >
              <li>
                <Link href="/dashboard/registered_teams">
                  <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                    {!isCollapsed && "Registered Teams"}
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
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
            className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
              openMatches ? "max-h-40" : "max-h-0"
            }`}
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
        </li>
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
            <Link href="/dashboardo">
              <button
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
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;