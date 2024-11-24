"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { HiCurrencyRupee, HiOutlineCalendar, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineMapPin } from "react-icons/hi2";
import { Button } from "./ui/button";
import { IoTicketSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VscGraph } from "react-icons/vsc";
import { BiLike } from "react-icons/bi";
import Link from "next/link";

interface EventCardProps {
  id:string,
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
  id,
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
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(`1970-01-01T${time}`)); 

  return (
    <>
      <div className="max-w-[500px] cursor-pointer h border border-black w-full group/card rounded-lg overflow-hidden shadow-lg bg-white">
        <Link href="/eventspage">
          <div
            className={cn(
              "relative h-52 w-full bg-cover bg-center rounded-t-lg "
            )}
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="group hover:bg-[#141f29] hover:opacity-80 h-full w-full flex justify-center items-center transition duration-300 ease-in-out">
              <h1 className="text-white text-xl opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                Event Details
              </h1>
            </div>
          </div>
        </Link>

        <div className="bg-white px-4 py-1 flex flex-col justify-between">
          <div>
            <div className="bg-[#E6EAC5] text-black text-xs px-2 py-1 rounded inline-block">
              {sport}
            </div>
            <h1 className="font-bold text-xl text-gray-900  line-clamp-2 h-[60px]">
              {eventname} Summer Basketball Tournament Pro League Delhi Champion
              Smart City New Event Pro
            </h1>
            <p className="text-[#64758B] text-nowrap">
              By Tiruvalayavudayarthiraaksaksnakns
            </p>
            <div className="text-[13px]">
              <p className="text-[#141F29] flex items-center text-nowrap">
                <HiOutlineCalendar className="mr-2 text-md" />
                {formattedDate} | {formattedTime} Onwards
              </p>
              <p className="text-[#141F29] flex items-center text-nowrap">
                <HiOutlineMapPin className="mr-2 flex-none text-md" />
                {location}
              </p>
              <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                <p className="text-[12px] flex items-center gap-1 text-nowrap">
                  <HiCurrencyRupee className="text-lg" />
                  STARTING FROM: ₹{price}
                </p>
                <Link href={`/eventspage/${id}`}>
                  <p className="text-gray-500 text-[12px] flex items-center gap-1 cursor-pointer hover:underline text-nowrap">
                    <VscGraph className="text-lg" />
                    Registrations:
                    <span className="text-blue-600">{noOfEntries}</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-4 mb-1 text-[12px] gap-2">
            <div className="flex justify-between sm:justify-start gap-2">
              <Button
                variant="outline"
                size="xs"
                className="text-[10px] border border-black px-2"
              >
                View Matches
              </Button>
              <Button
                variant="outline"
                size="xs"
                className={`text-[12px] border border-black hover:bg-[#ccdb28] hover:text-black flex justify-center items-center gap-1 px-2 ${
                  isLiked ? "bg-[#ccdb28] text-black" : ""
                }`}
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? "Liked" : "Like"}
                <BiLike className="" />
              </Button>
            </div>
            <Button
              onClick={() => router.push("/choosecategory")}
              variant="tertiary"
              size="xs"
              className="border border-black text-[12px]"
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>

      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white rounded-lg shadow-2xl transition-transform transform p-10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#17202A]">
                {eventname}
              </DialogTitle>
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
                    <h2 className="font-bold text-lg text-gray-700">
                      Organised By: {name}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center">
                      <HiOutlineCalendar className="inline mr-2" />
                      {formattedDate} | {formattedTime}
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
                      <Button className="text-sm bg-[#17202A] text-white hover:shadow-md">
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="relative border mx-2 rounded-lg shadow-xl p-6 bg-gray-50">
                  <h1 className="text-lg font-bold text-gray-700 mb-2">
                    Event Guide
                  </h1>
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