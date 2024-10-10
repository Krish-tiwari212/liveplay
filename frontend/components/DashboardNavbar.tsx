"use client";

import { useAppContext } from "@/lib/context/AppContext";

import { Switch } from "@/components/ui/switch";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Value } from "@radix-ui/react-select";


const Navbar = () => {
  const pathname = usePathname();
  const pageName = pathname ? pathname.split("/").pop()?.toUpperCase() : "HOME"; 
  const { theme, setTheme } = useAppContext();

  return (
    <div
      className="flex justify-between items-center p-4 m-3 bg-gray-800 text-white rounded-lg "
    >
      <div className="text-lg font-bold">{pageName}</div>
      <div className="flex items-center">
        <div className="flex space-x-4 ml-4 items-center">
          <MdOutlineChat className="text-white hidden md:block" />
          <MdNotifications className="text-white hidden md:block" />
          <MdPublic className="text-white hidden md:block" />
          <div className="flex gap-5 items-center justify-center">
            {/* <Switch id="theme" className="" onClick={toggleTheme} /> */}
            {/* <Label>{theme} Mode</Label> */}
            <Select onValueChange={setTheme}>
              <SelectTrigger className="w-auto md:w-[180px] bg-gray-800 border focus-visible:ring-offset-gray-600">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
