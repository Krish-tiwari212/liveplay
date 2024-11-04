import { Input } from './ui/input';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch, MdMenu, MdOutlineEvent, MdPerson } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client'; // Assuming you have a Supabase client setup

const Navbar = () => {
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      setIsLoggedIn(false);
      toast({
        title: "Logout Successful",
        description: "Successfully Logged Out!",
        variant: "default",
      });
    } else {
      const result = await response.json();
      toast({
        title: "Logout Failed",
        description: result.error || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const router = useRouter();

  return (
    <div className="hidden md:flex items-center justify-between p-4 bg-[#17202A] text-white gap-10 shadow-lg">
      <div className="flex items-center gap-10">
        <div className="text-lg md:text-3xl font-bold tracking-wider">
          liveplay.in
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-900 border border-transparent">
          <MdOutlineEvent className="inline mr-2" size={20} />
          Create Event
        </button>
        {isLoggedIn && (
          <button
            onClick={() => router.push("playerdashboard")}
            className="flex items-center bg-white text-[#17202A] rounded-full px-6 md:px-10 py-2 hover:bg-slate-400 transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500 border border-transparent"
          >
            <MdOutlineEvent className="inline mr-2" size={20} />
            Dashboard
          </button>
        )}
        {isLoggedIn ? (
          <Link href={"/"}>
            <button
              onClick={handleLogout}
              className="bg-transparent flex items-center text-white md:px-4 py-2 ml-4 hover:text-gray-400 transition"
            >
              <FaUserCircle className="inline md:mr-2" size={30} />
              <h1 className="hidden md:block md:text-lg">Log Out</h1>
            </button>
          </Link>
        ) : (
          <Link href={"/auth/login"}>
            <button className="bg-transparent flex items-center text-white md:px-4 py-2 ml-4 hover:text-gray-400 transition">
              <FaUserCircle className="inline md:mr-2" size={30} />
              <h1 className="hidden md:block md:text-lg">Sign In</h1>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;