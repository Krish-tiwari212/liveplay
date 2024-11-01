"use client";

import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/lib/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaPlus, FaRegEye, FaRegThumbsUp } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaHandHoldingDollar, FaIndianRupeeSign, FaPeopleGroup } from "react-icons/fa6";
import { LiaStreetViewSolid } from "react-icons/lia";
import { IoTicketOutline } from "react-icons/io5";
import EventCard from "@/components/EventCard";
import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdOutlineSecurity } from "react-icons/md";
import { useEventContext } from "@/context/EventDataContext";
const { events } = data;
import { Skeleton } from "@/components/ui/skeleton";
import { TbCoinRupeeFilled } from "react-icons/tb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";



interface EventCard {
  id: number;
  desktop_cover_image_url: string;
  event_name: string;
  entries: string;
  revenue: string;
  event_views: string;
  interested_people: string;
  organizer_name:string;
}



export default function Home() {
  const { setTheme } = useAppContext();
  const { setDashboardName,UserType,setNotification } = useEventContext();
  const [events, setEvents] = useState<EventCard[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    setTheme(matchMedia.matches ? "dark" : "light");
    matchMedia.addEventListener("change", handleThemeChange);
    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    setDashboardName("Organizer organizerDashboard");
    console.log(UserType)
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event/all_events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title:
            "Failed to fetch events. Please check your network connection.",
            variant:"destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div className="flex flex-col m-3">
      <div className={`flex justify-between `}>
        <Button
          onClick={() => router.push("/organizerorganizerDashboard/kyc/1234")}
          className="text-md shadow-md shadow-gray-500 w-auto px-20"
        >
          Unlock Event Earnings KYC
        </Button>
        <Button
          onClick={() => router.push("/organizerDashboard/create_event")}
          className="text-md shadow-md shadow-gray-500 px-5"
        >
          Create Event
        </Button>
      </div>

      <section className="mt-4 bg-[#17202A] h-[9rem] shadow-xl rounded-lg p-4 relative mb-4">
        <div className="p-2 md:w-[60%] lg:w-[50%]">
          <h1 className="text-2xl font-bold text-gray-400 mb-4 md:mb-2">
            Hello Mohit 👋
          </h1>
        </div>
      </section>
      <section className="flex gap-4 px-2 flex-wrap w-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Card className="flex-1 w-full shadow-xl">
                <CardContent className="flex flex-col mt-4">
                  <div className="flex justify-center items-center gap-4 text-xl">
                    <h1 className="font-semibold">Event Sales</h1>
                    <TbCoinRupeeFilled className="" />
                  </div>
                  <div className="flex justify-start items-center text-xl gap-1">
                    <FaIndianRupeeSign className="h-4 w-4" />
                    <h1 className="">0</h1>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-lg">Event Sales : Rs. 0</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Card className="flex-1 w-full shadow-xl">
                <CardContent className="flex flex-col mt-4">
                  <div className="flex justify-center items-center gap-4 text-xl">
                    <h1 className="font-semibold">Event Views</h1>
                    <FaRegEye className="" />
                  </div>
                  <div className="flex justify-start items-center text-xl gap-1">
                    <FaPlus className="h-4 w-4" />
                    <h1 className="">0</h1>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-lg">Total Number of views : 0</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Card className="flex-1 w-full shadow-xl">
                <CardContent className="flex flex-col mt-4">
                  <div className="flex justify-center items-center gap-4 text-xl">
                    <h1 className="font-semibold">Events Hosted</h1>
                    <FaRegThumbsUp className="" />
                  </div>
                  <div className="flex justify-start items-center text-xl gap-1">
                    <FaPlus className="h-4 w-4" />
                    <h1 className="">{events.length}</h1>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-lg">Total Events Hosted : {events.length}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Card className="flex-1 w-full shadow-xl">
                <CardContent className="flex flex-col mt-4">
                  <div className="flex justify-center items-center gap-4 text-xl">
                    <h1 className="font-semibold">Events Entries</h1>
                    <FaPeopleGroup className="" />
                  </div>
                  <div className="flex justify-start items-center text-xl gap-1">
                    <FaPlus className="h-4 w-4" />
                    <h1 className="">0</h1>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-lg">Total Entries : 0</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Active Events</h2>
        <div className="flex space-x-4 overflow-x-auto pb-8">
          {isLoading ? (
            <div className="flex space-x-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex h-[200px] w-[400px] gap-2" key={index}>
                  <Skeleton className="h-full w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-[50px] w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            events.map((event) => (
              <React.Fragment key={event.id}>
                <Card
                  className="shadow-md cursor-pointer hover:shadow-2xl flex-none"
                  onClick={() =>
                    router.push(`/organizerDashboard/manage-events/${event.id}`)
                  }
                >
                  <CardContent className="py-4 flex gap-4 h-full">
                    <Image
                      src={
                        event.desktop_cover_image_url || "/images/default.jpeg"
                      }
                      alt="eventBanner"
                      width={200}
                      height={200}
                      className="rounded-lg h-full shadow-xl flex-[1]"
                    />
                    <div className="flex-[1]">
                      <h3 className="font-bold">{event.event_name}</h3>
                      <div className="flex flex-col justify-between">
                        <span>Entries: {event.entries || "N/A"}</span>
                        <span>Revenue: {event.revenue || "$0"}</span>
                        <span>Event Views: {event.event_views || "0"}</span>
                        <span>
                          Interested People: {event.interested_people || "0"}
                        </span>
                      </div>
                      <Link href={`/event/${event.id}/share-link`}>
                        <Button className="w-full mt-2 bg-[#17202A] text-[#CDDC29] hover:text-white p-1 rounded hover:shadow-xl">
                          Share
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </React.Fragment>
            ))
          )}
        </div>
      </section>
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 py-4">
        <h2 className="text-xl font-semibold mb-2">Past Events</h2>
      </section>
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 py-4">
        <h2 className="text-xl font-semibold mb-2">Drafts</h2>
      </section>
    </div>
  );
}
