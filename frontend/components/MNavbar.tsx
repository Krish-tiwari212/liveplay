import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOutlineEvent } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdList } from "react-icons/io";


const MNavbar = () => {
  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white gap-10 shadow-lg">
      <div className="flex items-center gap-10">
        <div className="text-lg font-bold tracking-wider">liveplay.in</div>
      </div>
      <Sheet>
        <SheetTrigger>
          <IoMdList size={30} />
        </SheetTrigger>
        <SheetContent className="bg-gray-800 w-[35%] border-none rounded-lg shadow-lg p-4">
          <div className="flex flex-col pt-10">
            <button className="bg-transparent flex text-white py-4">
              <FaUserCircle className="inline mr-2" size={30} />
              <h1 className="block md:text-lg">LogIn / SignUp</h1>
            </button>
            <button className="flex items-center bg-purple-700  text-white rounded-lg px-6 md:px-10 py-1 hover:bg-purple-800  transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-900 border border-transparent">
              <MdOutlineEvent className="inline mr-2" size={20} />
              Create Event
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MNavbar
