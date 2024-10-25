"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HiOutlineMapPin, HiOutlineCalendar, HiOutlineClock, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdOutlineSportsScore } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface EventCardProps {
  image: string;
  gifUrl: string;
  date: string;
  name: string;
  eventname: string;
  location: string;
  time: string;
  noOfEntries: number;
  sport: string;
  price: number;
}

const VideoEventCard = ({
  image = "",
  date,
  gifUrl,
  price,
  noOfEntries,
  name,
  eventname,
  location,
  time,
  sport,
}: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div
        className="max-w-sm w-full h-[35rem] rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => setOpenDialog(true)}
      >
        <div
          className={cn(
            "group w-full cursor-pointer overflow-hidden relative card h-64 rounded-t-xl shadow-lg mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
            "bg-cover",
            "before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-0",
            "transition-all duration-500"
          )}
          style={{
            backgroundImage: `url('${isHovered ? gifUrl : image}')`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        ></div>
        <div className="w-full p-4">
          <h1 className="font-bold text-xl md:text-2xl">{eventname}</h1>
          <p className="font-normal text-base my-2">
            <HiOutlineCalendar className="inline mr-1" />
            {date} <HiOutlineClock className="inline mx-1" /> {time}
          </p>
          <p className="font-normal text-base my-2">
            {name} | {sport} | {noOfEntries} entries
          </p>
          <p className="font-normal text-base flex items-center my-2">
            <HiOutlineMapPin className="mr-2" />
            {location}
          </p>
          <p className="font-bold text-lg flex items-center my-2">
            <HiOutlineCurrencyDollar className="mr-1" />${price.toFixed(2)}
          </p>
          <Button className="mt-2 w-[92%] bg-[#1f2937] absolute bottom-8 hover:brightness-150">Register</Button>
        </div>
      </div>

      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white rounded-lg shadow-lg transition-transform transform w-[90%] md:w-[55%] p-6 md:p-10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{eventname}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-[3]">
                <Image
                  src={image}
                  alt={eventname}
                  layout="responsive"
                  width={700}
                  height={475}
                  className="rounded-md shadow-lg"
                />
              </div>
              <div className="flex-[2] flex flex-col gap-4">
                <div className="border rounded-lg shadow-md p-4">
                  <h2 className="font-bold text-lg">Organised By: {name}</h2>
                  <p className="text-sm text-gray-600">
                    <HiOutlineCalendar className="inline mr-2" />
                    {date} | {time}
                  </p>
                  <p className="flex items-center text-sm text-gray-600">
                    <HiOutlineMapPin className="mr-2" />
                    {location}
                  </p>
                  <p className="flex items-center text-sm text-gray-600">
                    <MdOutlineSportsScore className="mr-2" />
                    Sport: {sport}
                  </p>
                  <div className="flex items-center justify-between gap-10">
                    <p className="flex items-center font-bold text-sm text-gray-600">
                      <HiOutlineCurrencyDollar className="mr-2" size={20} />
                      {price} onwards
                    </p>
                    <Button className="text-sm bg-[#17202A] hover:shadow-md" size="xs">
                      Register
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg shadow-md p-4">
                  <h1 className="font-bold text-lg">Event Guide</h1>
                  <hr className="my-2" />
                  <p className="text-sm text-gray-600">No of Entries: {noOfEntries}</p>
                  <p className="text-sm text-gray-600">Tshirt: provided</p>
                </div>
                <div className="border rounded-lg shadow-md p-4 flex justify-between items-center">
                  <div>
                    <h1 className="font-bold text-lg">Invite Your Friends</h1>
                    <p className="text-sm text-gray-600">and enjoy shared experience</p>
                  </div>
                  <IoMdShareAlt className="mr-2" size={20} />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default VideoEventCard;