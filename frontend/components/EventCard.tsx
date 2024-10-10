"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineMapPin } from "react-icons/hi2";
import { Button } from "./ui/button";

interface EventCardProps {
  image: string;
  date: string;
  name: string;
  eventname: string;
  location: string;
  time: string;
  noOfEntries: number;
  sport: string;
  price:number
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
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl w-full mx-auto flex flex-col justify-between p-4"
        )}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-br from-black to-transparent opacity-90"></div>
      </div>
      <div className="inset-0 flex flex-col justify-end p-2 z-10 border shadow-2xl rounded-b-md">
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
        <Button size="sm" className="mt-2">
          Register
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
