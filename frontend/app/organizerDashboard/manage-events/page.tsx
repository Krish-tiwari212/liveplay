"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { FaCalendarAlt, FaRegEye, FaRegThumbsUp } from 'react-icons/fa';
import { IoTicketOutline } from 'react-icons/io5';
import { FaHandHoldingDollar, FaPeopleGroup } from 'react-icons/fa6';
import { LiaStreetViewSolid } from 'react-icons/lia';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEventContext } from '@/context/EventDataContext';
import { Skeleton } from '@/components/ui/skeleton';
import { TooltipContent,Tooltip, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { TbCoinRupeeFilled } from 'react-icons/tb';


interface EventCard {
  id:number,
  desktop_cover_image_url: string;
  event_name: string;
  entries: string;
  revenue: string;
  event_views: string;
  interested_people: string;
}

const activeEvents = [
  {
    id: 1,
    title: "Badminton Cup",
    entries: 55,
    revenue: "$0",
    views: 0,
    interested: 0,
    image: "/images/img1.jpeg",
  },
  {
    id: 2,
    title: "Badminton Cup",
    entries: 55,
    revenue: "$0",
    views: 0,
    interested: 0,
    image: "/images/img2.jpeg",
  },
];

const pastEvents = [
  {
    id: 1,
    title: "Badminton Cup",
    entries: 400,
    revenue: "$0",
    views: 0,
    interested: 0,
    image: "/images/img3.jpeg",
  },
  {
    id: 2,
    title: "Badminton Cup",
    entries: 55,
    revenue: "$0",
    views: 0,
    interested: 0,
    image: "/images/img5.jpeg",
  },
];

const drafts = [
  {
    id: 1,
    title: "Badminton Cup",
    image: "/images/default.jpeg",
  },
  {
    id: 2,
    title: "Badminton Cup",
    image: "/images/img7.jpeg",
  },
];



const page = () => {
  const router=useRouter()
  const [events, setEvents] = useState<EventCard[]>([]);
  const { setDashboardName,UserType } = useEventContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setDashboardName("Event Management");
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
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  return (
    <div className="m-3 relative ">
      <h1 className="text-[#17202A] text-3xl font-bold">Manage Events</h1>
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Active Events</h2>
        <div className="flex flex-col md:flex-row space-x-4 overflow-x-auto pb-8">
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
                  className="shadow-md cursor-pointer hover:shadow-2xl flex-none min-w-[400px] max-w-[400px]"
                  onClick={() =>
                    router.push(`/organizerDashboard/manage-events/${event.id}`)
                  }
                >
                  <CardContent className="py-4">
                    <div className="flex gap-4">
                      <div className="w-[180px] h-[180px] relative">
                        <Image
                          src={
                            event.desktop_cover_image_url ||
                            "/images/default.jpeg"
                          }
                          alt="eventBanner"
                          fill
                          className="rounded-lg object-cover shadow-xl"
                        />
                      </div>
                      <div className="flex flex-col space-y-2 flex-1">
                        <h3 className="font-bold">{event.event_name}</h3>
                        <div className="flex flex-col justify-between">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="flex gap-2 items-center">
                                  <FaRegThumbsUp /> {event.entries || "N/A"}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Event Entries : {event.entries || "N/A"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="flex gap-2 items-center">
                                  <TbCoinRupeeFilled /> {event.revenue || "₹0"}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Event sales : ₹0</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="flex gap-2 items-center">
                                  <FaRegEye /> {event.event_views || "0"}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Event views : 0</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="flex gap-2 items-center">
                                  <FaPeopleGroup />{" "}
                                  {event.interested_people || "0"}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Interested Peoples : 0</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="mt-4">
                          <Link
                            href={`/event/${event.id}/share-link`}
                            className="block"
                          >
                            <Button className="w-full bg-[#17202A] text-[#CDDC29] hover:text-white p-1 rounded hover:shadow-xl">
                              Share
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </React.Fragment>
            ))
          )}
        </div>
      </section>

      <section className="mt-4 bg-white shadow-md rounded-lg px-4 py-4">
        <h2 className="text-xl font-semibold mb-2">Past Events</h2>
      </section>
      <section className="mt-6 bg-white shadow-md rounded-l px-4 py-4">
        <h2 className="text-xl font-semibold mb-2">Drafts</h2>
      </section>
    </div>
  );
}

export default page;
