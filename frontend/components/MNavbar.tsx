import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MdOutlineEvent } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdList } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const MNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {toast}=useToast()
  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleLogout = async() => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setIsLoggedIn(false); 
    toast({
      title: "Logout Succesful",
      description: "Succesfully Logged Out!",
      variant: "default",
    });
  };
  const router = useRouter();

  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-[#17202A] text-white gap-10 shadow-lg">
      <div className="flex items-center gap-10">
        <div className="text-lg font-bold tracking-wider">liveplay.in</div>
      </div>
      <Sheet>
        <SheetTrigger>
          <IoMdList size={30} />
        </SheetTrigger>
        <SheetContent className="bg-[#17202A] w-[35%] border-none rounded-lg shadow-lg p-4">
          <div className="flex flex-col pt-10">
            {isLoggedIn ? (
              <Link href={"/"}>
                <button
                  onClick={handleLogout}
                  className="bg-transparent flex text-white py-4"
                >
                  <FaUserCircle className="inline mr-2" size={30} />
                  <h1 className="block md:text-lg">LogOut</h1>
                </button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <button className="bg-transparent flex text-white py-4">
                  <FaUserCircle className="inline mr-2" size={30} />
                  <h1 className="block md:text-lg">SignIn</h1>
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center bg-white  text-[#17202A] rounded-full px-6 md:px-10 py-1 hover:bg-slate-400  transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500 border border-transparent"
              >
                <MdOutlineEvent className="inline mr-2" size={20} />
                Dashboard
              </button>
            )}
            <button className="flex items-center bg-purple-700 text-white px-6 py-1 hover:bg-purple-800 transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-900 border border-transparent">
              <MdOutlineEvent className="inline mr-2" size={20} />
              Create Event
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MNavbar;
