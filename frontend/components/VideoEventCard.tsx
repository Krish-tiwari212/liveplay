"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HiOutlineMapPin, HiOutlineCalendar, HiOutlineClock,  HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdOutlineSportsScore } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  const [openDialog,setOpenDialog]=useState(false)
  return (
    <>
      <div
        className="max-w-xs w-full rounded-xl shadow-xl cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <div
          className={cn(
            "roup w-full cursor-pointer overflow-hidden relative card h-64 rounded-t-xl shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800 ",
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
        <div className="w-full">
          {/* <div className="flex flex-row items-center space-x-4 z-30 mt-2 p-2">
            <Image
              height="70"
              width="70"
              alt="Avatar"
              src={image}
              className="h-10 w-10 rounded-full shadow-2xl border-2 object-cover"
            />
            <div className="flex flex-col leading-3 justify-center">
              <p className="font-normal text-base relative z-10">
                {name}
              </p>
              <p className="text-">organiser</p>
            </div>
          </div> */}
          <div className="inset-0 flex flex-col justify-end p-2 z-10 ">
            <h1 className={`font-bold text-xl md:text-3xl relative`}>
              {eventname}
            </h1>
            <p className={`font-normal text-base relative my-4`}>
              <HiOutlineCalendar className="inline mr-1" />
              {date} <HiOutlineClock className="inline mx-1" /> {time}
            </p>
            <p className={`font-normal text-base relative`}>
              {name} | {sport} | {noOfEntries} entries
            </p>
            <p className={`font-normal text-base relative flex items-center`}>
              <HiOutlineMapPin className="mr-2" />
              {location}
            </p>
            <p className={`font-bold text-lg relative flex items-center`}>
              <HiOutlineCurrencyDollar className="mr-1" />${price.toFixed(2)}
            </p>
            <Button size="sm" className="mt-2">Register</Button>
          </div>
        </div>
      </div>

      {/* 
        <div className="flex flex-row items-center space-x-4 z-30 absolute top-5 ">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src={image}
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {name}
            </p>
            <p className="text-sm text-white">organiser</p>
          </div>
        </div>
        <div className="inset-0 flex flex-col justify-end p-4 z-10 bg-gradient-to-br from-black to-transparent ">
          <h1 className={`font-bold text-xl md:text-3xl text-white relative`}>
            {eventname}
          </h1>
          <p className={`font-normal text-base text-white relative my-4`}>
            <HiOutlineCalendar className="inline mr-1" />
            {date} <HiOutlineClock className="inline mx-1" /> {time}
          </p>
          <p className={`font-normal text-base text-white relative`}>
            {name} | {sport} | {noOfEntries} entries
          </p>
          <p
            className={`font-normal text-base text-white relative flex items-center`}
          >
            <HiOutlineMapPin className="mr-2" />
            {location}
          </p>
          <p
            className={`font-bold text-lg text-white relative flex items-center`}
          >
            <HiOutlineCurrencyDollar className="mr-1" />${price.toFixed(2)}
          </p>
        </div>
      */}
      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white rounded-lg shadow-lg transition-transform transform w-[55%] p-10">
            <div className="flex items-center relative gap-2">
              <div className="flex flex-col w-full h-full flex-[3] gap-5">
                <div className="flex-[2] relative object-cover h-full w-full top-0 shadow-2xl">
                  <Image
                    src={image}
                    alt={eventname}
                    fill
                    className="rounded-md"
                  />
                </div>
                <div className="flex-[1] relative object-cover h-full w-full  "></div>
              </div>
              <div className="flex flex-col gap-5 flex-[2]">
                <div className=" relative border mx-2 rounded-lg shadow-xl">
                  <div className="p-4 flex flex-col gap-2">
                    <h2 className="font-bold text-lg">Organised By : {name}</h2>
                    <p className="text-sm text-gray-600">
                      <HiOutlineCalendar className="inline mr-2" />
                      {date} |{time}
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                      <HiOutlineMapPin className="mr-2" />
                      {location}
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                      <MdOutlineSportsScore className="mr-2" />
                      Sport: {sport}
                    </p>
                    <div className="flex items-start justify-between gap-10">
                      <p className="flex items-start font-bold text-sm text-gray-600">
                        <HiOutlineCurrencyDollar className="mr-2" size={20} />
                        {price} onwards
                      </p>
                      <Button
                        className="text-sm bg-gray-800 hover:shadow-md"
                        size="xs"
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
                <div className=" relative border mx-2 rounded-lg shadow-xl">
                  <h1 className="px-4 py-1">Event Guide</h1>
                  <hr className=""></hr>
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-sm text-gray-600">
                      No of Entries : {noOfEntries}
                    </p>
                    <p className="text-sm text-gray-600">
                      Tshirt : {"provided"}
                    </p>
                  </div>
                </div>
                <div className=" relative border mx-2 rounded-lg shadow-xl">
                  <div className="p-4 flex justify-between items-center ">
                    <div>
                      <h1 className="">Invite Your Fiends</h1>
                      <p className="text-[0.6rem] text-gray-600">
                        and enjoy shared Experience
                      </p>
                    </div>
                    <IoMdShareAlt className="mr-2" size={20} />
                  </div>
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
