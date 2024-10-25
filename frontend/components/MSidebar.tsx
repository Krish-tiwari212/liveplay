import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaBars, FaCalendarAlt, FaCogs, FaSignOutAlt, FaTachometerAlt, FaUserCircle } from 'react-icons/fa';
import { MdOutlineFeaturedPlayList, MdOutlineSecurity, MdSchedule, MdSportsFootball } from 'react-icons/md';
import Image from 'next/image';
import { IoIosNotificationsOutline } from 'react-icons/io';

const MSidebar = () => {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState("Dashboard");
  const [openEvents, setOpenEvents] = useState(false);
  const [openTeams, setOpenTeams] = useState(false);
  const [openMatches, setOpenMatches] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

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
    setOpenEvents(false);
    setOpenTeams(false);
    setOpenMatches(false);
  };

  const [userStatus, setUserStatus] = useState("organizer");

  const handleLogout = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    toast({
      title: "Logout Successful",
      description: "Successfully Logged Out!",
      variant: "default",
    });
    router.push("/");
  };

  const handleButtonClick = (page: string) => {
    setActivePage(page); // Set the active page when a button is clicked
  };

  return (
    <div
      className={`hidden bg-[#17202A] text-white p-4 shadow-lg transition-width duration-300 ease-in-out md:flex flex-col h-full z-50 sticky flex-[1]`}
    >
      <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
        <button
          onClick={() => handleCollapse()}
          className="text-white hover:text-blue-400 transition-colors duration-200"
        ></button>
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
        <div className="w-full py-2 pl-2">
          <h1 className="text-2xl">As An Organiser</h1>
        </div>
        <li>
          <Link href="/dashboard">
            <button 
              onClick={() => handleButtonClick("Dashboard")} // Update active page on click
              className={`flex items-center w-full py-2 pl-2 rounded transition-colors duration-200 relative ${activePage === "Dashboard" ? "bg-[#CDDC29] text-[#17202A]" : "hover:bg-[#CDDC29] hover:text-[#17202A]"}`}
            >
              <FaTachometerAlt className="mr-2 text-xl" /> Dashboard
            </button>
          </Link>
        </li>
        {userStatus === "organizer" && (
          <ul className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out max-h-56`}>
            <li>
              <Link href="/dashboard/create_event">
                <button 
                  onClick={() => handleButtonClick("Create Events")} // Update active page on click
                  className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${activePage === "Create Events" ? "bg-[#CDDC29] text-[#17202A]" : "hover:bg-[#CDDC29] hover:text-[#17202A]"}`}
                >
                  <MdSchedule className="mr-2 text-xl" /> Create Events
                </button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/manage-events">
                <button 
                  onClick={() => handleButtonClick("Manage Events")} // Update active page on click
                  className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${activePage === "Manage Events" ? "bg-[#CDDC29] text-[#17202A]" : "hover:bg-[#CDDC29] hover:text-[#17202A]"}`}
                >
                  <MdOutlineFeaturedPlayList className="mr-2 text-xl" /> Manage Events
                </button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/kyc/1234">
                <button className="flex items-center w-full p-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200">
                  <MdOutlineSecurity className="mr-2 text-xl" /> Unlock Earnings (kyc)
                </button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/kyc/1234">
                <button className="flex items-center w-full p-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200">
                  <IoIosNotificationsOutline className="mr-2 text-xl" /> Notifications
                </button>
              </Link>
            </li>
          </ul>
        )}
        {userStatus === "player" && (
          <>
            <button className="flex items-center w-full py-2 pl-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200 relative">
              <FaCalendarAlt className="mr-2 text-xl" /> Events
            </button>
            <ul className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out max-h-56`}>
              <li>
                <Link href="/dashboard/manage-events">
                  <button className="flex items-center w-full p-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200">
                    <MdSchedule className="mr-2" /> Manage Events
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/enable_features">
                  <button className="flex items-center w-full p-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200">
                    <MdOutlineFeaturedPlayList className="mr-2" />
                    Events I am interested
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/enable_features">
                  <button className="flex items-center w-full p-2 hover:bg-[#CDDC29] hover:text-[#17202A] rounded transition-colors duration-200">
                    <MdOutlineFeaturedPlayList className="mr-2" />
                    Withdraw from Events
                  </button>
                </Link>
              </li>
            </ul>
          </>
        )}
      </ul>
      <hr className="my-4 border-gray-700" />
      <div className="mt-auto">
        <ul>
          <li>
            <Link href="/dashboard/setting">
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
