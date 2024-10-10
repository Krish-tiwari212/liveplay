import { Input } from './ui/input';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch, MdMenu, MdOutlineEvent, MdPerson } from 'react-icons/md';

const Navbar = () => {

  return (
    <div className="hidden md:flex items-center justify-between p-4 bg-gray-800 text-white gap-10 shadow-lg">
      <div className="flex items-center gap-10">
        <div className="text-lg md:text-3xl font-bold tracking-wider">
          liveplay.in
        </div>
        <div className="flex flex-col md:flex-row items-center md:w-auto">
          <div className="hidden lg:flex items-center border border-gray-300 rounded-full p-1 h-10 bg-white w-[24rem] shadow-md">
            <MdSearch className="text-gray-600 ml-2" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full font-light ml-2 outline-none text-gray-800 h-full focus-visible:ring-offset-0 text-16 placeholder:text-16 bg-black-1 rounded-[6px] placeholder:text-gray-800 "
            />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button className="flex items-center bg-purple-700  text-white rounded-full px-6 md:px-10 py-1 hover:bg-purple-800  transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-900 border border-transparent">
          <MdOutlineEvent className="inline mr-2" size={20} />
          Create Event
        </button>
        <button className="bg-transparent flex items-center text-white md:px-4 py-2 ml-4">
          <FaUserCircle className="inline md:mr-2" size={30} />
          <h1 className="hidden md:block md:text-lg">LogIn / SignUp</h1>
        </button>
      </div>
    </div>
  );
}

export default Navbar
