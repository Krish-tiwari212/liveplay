"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineMapPin } from "react-icons/hi2";
import { Button } from "./ui/button";
import { IoTicketSharp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EventCardProps {
  image: string;
  date: string;
  name: string;
  eventname: string;
  location: string;
  time: string;
  noOfEntries: number;
  sport: string;
  price: number;
}

const EventCard = ({
  image = "",
  date,
  name,
  eventname,
  location,
  time,
  noOfEntries,
  sport,
  price,
}: EventCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div
        className="max-w-sm w-full group/card rounded-lg overflow-hidden h-[42rem] shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <div
          className={cn(
            "relative h-96 w-full bg-cover bg-center"
          )}
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
          <div className="absolute bottom-0 left-0 w-full flex justify-between p-4 bg-gradient-to-t from-black via-transparent to-transparent">
            <p className="text-white text-sm">
              <HiOutlineCalendar className="inline mr-1" />
              {date}
            </p>
            <p className="text-white text-sm">
              <HiOutlineClock className="inline mx-1" /> {time}
            </p>
          </div>
        </div>
        <div className="bg-white p-4">
          <h1 className="font-bold text-xl text-gray-900">{eventname}</h1>
          <p className="text-gray-700 flex items-center mt-2">
            <HiOutlineMapPin className="mr-2" />
            {location}
          </p>
          <p className="text-gray-700 flex items-center mt-2">
            <IoTicketSharp className="mr-2 text-orange-500" />
            Max {noOfEntries} entries
          </p>
          <p className="text-gray-700 flex items-center mt-2">
            <HiOutlineCurrencyDollar className="mr-2" />
            ${price.toFixed(2)}
          </p>
          <Button size="sm" className="mt-4 w-[92%] absolute bottom-8 bg-[#1f2937] text-white hover:brightness-100">
            Register
          </Button>
        </div>
      </div>

      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white rounded-lg shadow-2xl transition-transform transform w-[55%] p-10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#17202A]">{eventname}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center relative gap-6">
              <div className="flex flex-col w-full h-full flex-[3] gap-5">
                <div className="flex-[2] relative h-full w-full top-0 shadow-2xl rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={eventname}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-[1] relative object-cover h-full w-full"></div>
              </div>
              <div className="flex flex-col gap-5 flex-[2]">
                <div className="relative border mx-2 rounded-lg shadow-xl p-6 bg-gray-50">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-lg text-gray-700">Organised By: {name}</h2>
                    <p className="text-sm text-gray-600 flex items-center">
                      <HiOutlineCalendar className="inline mr-2" />
                      {date} | {time}
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                      <HiOutlineMapPin className="mr-2" />
                      {location}
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                      Sport: {sport}
                    </p>
                    <div className="flex items-start justify-between gap-10 mt-4">
                      <p className="flex items-start font-bold text-sm text-gray-600">
                        <HiOutlineCurrencyDollar className="mr-2" size={20} />
                        {price} onwards
                      </p>
                      <Button
                        className="text-sm bg-[#17202A] text-white hover:shadow-md"
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="relative border mx-2 rounded-lg shadow-xl p-6 bg-gray-50">
                  <h1 className="text-lg font-bold text-gray-700 mb-2">Event Guide</h1>
                  <hr />
                  <div className="flex flex-col gap-2 mt-4">
                    <p className="text-sm text-gray-600">
                      No of Entries: {noOfEntries}
                    </p>
                    <p className="text-sm text-gray-600">
                      Tshirt: {"provided"}
                    </p>
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

export default EventCard;