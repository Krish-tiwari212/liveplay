import { useToast } from '@/hooks/use-toast';
import  Link  from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaBars, FaCalendarAlt, FaCogs, FaSignOutAlt, FaTachometerAlt, FaUserCircle } from 'react-icons/fa';
import { MdOutlineFeaturedPlayList, MdOutlineSecurity, MdSchedule, MdSportsFootball } from 'react-icons/md';

const MSidebar = () => {
  const pathname = usePathname()
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
      title: "Logout Succesful",
      description: "Succesfully Logged Out!",
      variant: "default",
    });
    router.push("/");
  };
  return (
    <div
      className={`hidden bg-gray-800 text-white p-4 shadow-lg transition-width duration-300 ease-in-out md:flex flex-col h-full z-50 sticky flex-[1]`}
    >
      <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
        <button
          onClick={() => handleCollapse()}
          className="text-white hover:text-blue-400 transition-colors duration-200"
        >
          <FaBars className="text-2xl" />
        </button>
        <Link href={"/"}>
          <div className="text-3xl font-bold text-gray-500  ml-2">
            liveplay.in
          </div>
        </Link>
      </div>
      <ul className="space-y-2 flex-grow relative">
        <li>
          <button
            className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
            onMouseEnter={() => setTooltip("UserName")}
            onMouseLeave={() => setTooltip(null)}
            onClick={toggleEvents}
          >
            <FaUserCircle className="mr-2 text-4xl" />
            <div className="flex flex-col justify-start items-start ml-2 ">
              <span className={`text-lg`}>Mohit</span>
              {userStatus === "organizer" && (
                <span className="text-sm">(as an organizer)</span>
              )}
              {userStatus === "player" && (
                <span className="text-sm">(as an player)</span>
              )}
            </div>
            {tooltip === "UserName" && (
              <div
                className={`absolute left-48 top-4 bg-white text-black text-sm p-2 rounded-bl rounded-tr rounded-br border border-gray-300 shadow-lg flex flex-col w-40`}
              >
                <button
                  onClick={() => {
                    setUserStatus("organizer");
                  }}
                  className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded mb-1"
                >
                  <FaUserCircle className="mr-2" /> As an Organizer
                </button>
                <button
                  onClick={() => {
                    setUserStatus("player");
                  }}
                  className="flex items-center w-full text-left hover:bg-gray-200 transition-colors duration-200 p-2 rounded"
                >
                  <MdSportsFootball className="mr-2" /> As a Player
                </button>
              </div>
            )}
          </button>

          <li>
            <Link href="/dashboard">
              <button className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative">
                <FaTachometerAlt className="mr-2 text-xl" /> Dashboard
              </button>
            </Link>
          </li>
        </li>
        {userStatus === "organizer" && (
          <>
            <li>
              <button
                className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
                onClick={toggleEvents}
              >
                <FaCalendarAlt className="mr-2 text-xl" /> Events
              </button>
              <ul
                className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out max-h-56`}
              >
                <li>
                  <Link href="/dashboard/create_event">
                    <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                      <MdSchedule className="mr-2" /> Create Event
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/enable_features">
                    <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                      <MdOutlineFeaturedPlayList className="mr-2" /> Enable
                      Features
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/kyc/1234">
                    <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                      <MdOutlineSecurity className="mr-2" /> Unlock Earnings
                      (kyc)
                    </button>
                  </Link>
                </li>
              </ul>
            </li>
          </>
        )}
        {userStatus === "player" && (
          <>
            <li>
              <button className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative">
                <FaCalendarAlt className="mr-2 text-xl" /> Events
              </button>
              <ul
                className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out max-h-56`}
              >
                <li>
                  <Link href="/dashboard/create_event">
                    <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                      <MdSchedule className="mr-2" /> Manage Events
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/enable_features">
                    <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                      <MdOutlineFeaturedPlayList className="mr-2" />
                      Events I am interested
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/enable_features">
                    <button className="flex items-center w-full p-2 hover:bg-gray-600 rounded transition-colors duration-200">
                      <MdOutlineFeaturedPlayList className="mr-2" />
                      Withdraw from Events
                    </button>
                  </Link>
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>
      <hr className="my-4 border-gray-700" />
      <div className="mt-auto">
        <ul>
          <li>
            <Link href="/dashboard/setting">
              <button className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative">
                <FaCogs className="mr-2 text-xl" /> {"Settings"}
              </button>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full py-2 pl-2 hover:bg-gray-700 rounded transition-colors duration-200 relative"
            >
              <FaSignOutAlt className="mr-2 text-xl" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MSidebar
