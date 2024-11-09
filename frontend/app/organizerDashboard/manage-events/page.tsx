"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { FaCalendarAlt, FaRegEye, FaRegThumbsUp } from 'react-icons/fa';
import { IoShareSocialSharp, IoTicketOutline } from 'react-icons/io5';
import { FaHandHoldingDollar, FaPeopleGroup } from 'react-icons/fa6';
import { LiaStreetViewSolid } from 'react-icons/lia';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEventContext } from '@/context/EventDataContext';
import { Skeleton } from '@/components/ui/skeleton';
import { TbCoinRupeeFilled } from 'react-icons/tb';
import { useUser } from '@/context/UserContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";


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
  const { user } = useUser();
  useEffect(() => {
    setDashboardName("Event Management");
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Link copied to clipboard!",
          variant: "default",
        });
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        toast({
          title: "Failed to copy link. Please try again.",
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = user?.id;
        const url = userId ? `/api/event/all_events?organizer_id=${userId}` : "/api/event/all_events";
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Failed to fetch events. Please check your network connection.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchEvents();
  }, [user?.id]); 
  return (
    <div className="m-3 relative ">
      <h1 className="text-[#17202A] text-3xl font-bold">Manage Events</h1>
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Active Events</h2>
        <div className="flex flex-row space-x-4 overflow-x-auto pb-8">
          {isLoading ? (
            <div className="flex space-x-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="flex flex-col sm:flex-row h-[400px] w-[250px] sm:h-[200px] sm:w-[400px] gap-2"
                  key={index}
                >
                  <Skeleton className="h-[250px] w-full sm:h-full sm:w-[250px] rounded-xl" />
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
                  className="shadow-md cursor-pointer hover:shadow-2xl flex-none min-w-[200px] max-w-[270px] sm:min-w-[400px] sm:max-w-[450px]"
                  onClick={() => {
                    router.push(
                      `/organizerDashboard/manage-events/${event.id}`
                    );
                  }}
                >
                  <CardContent className="py-4 flex flex-col sm:flex-row gap-4 h-full border-2 border-gray-800 rounded-md">
                    <div className="flex-[1]">
                      <Image
                        src={
                          event.desktop_cover_image_url ||
                          "/images/default.jpeg"
                        }
                        alt="eventBanner"
                        width={200}
                        height={200}
                        className="rounded-lg h-full w-full shadow-xl  border-2 border-gray-800"
                      />
                    </div>
                    <div className="flex-[1] flex flex-col justify-between">
                      <div className="flex flex-col">
                        <h3 className="font-bold line-clamp-2 overflow-hidden text-ellipsis">
                          {event.event_name} Badminton Pro Sports 2024
                        </h3>
                        <div className="flex flex-col justify-between">
                          <span className="flex gap-2 items-center">
                            <p className="font-semibold ">Sales:</p>{" "}
                            {event.revenue || "7800"}
                          </span>
                          <span className="flex gap-2 items-center">
                            <p className="font-semibold ">Views:</p>{" "}
                            {event.event_views || "20000"}
                          </span>
                          <span className="flex gap-2 items-center">
                            <p className="font-semibold ">Registrations:</p>{" "}
                            {event.entries || "200"}
                          </span>
                          <span className="flex gap-2 items-center">
                            <p className="font-semibold ">Interested:</p>{" "}
                            {event.interested_people || "891"}
                          </span>
                          {/* <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="flex gap-2 items-center">
                                <TbCoinRupeeFilled />{" "}
                                {event.revenue || "₹12000"}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Event sales : ₹0</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="flex gap-2 items-center">
                                <FaRegEye /> {event.event_views || "2"}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Event views : 0</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="flex gap-2 items-center">
                                <FaPeopleGroup /> {event.entries || "12345"}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Event Registrations : {event.entries || "N/A"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="flex gap-2 items-center">
                                <FaRegThumbsUp />{" "}
                                {event.interested_people || "20"}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Interested Peoples : 0</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider> */}
                        </div>
                      </div>
                      {/* <Link href={`/event/${event.id}/share-link`}>
                        <button className="w-full bg-[#17202a] text-[#cddc29] hover:text-white flex gap-2 mt-2 py-1 rounded-lg hover:shadow-xl justify-center items-center">
                          <h1>Share</h1>
                          <IoShareSocialSharp />
                        </button>
                      </Link> */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="z-50 w-full bg-[#17202a] text-[#cddc29] hover:text-white flex gap-2 mt-2 py-1 rounded-lg hover:shadow-xl justify-center items-center"
                          >
                            <h1>Share</h1>
                            <IoShareSocialSharp />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md h-auto">
                          <DialogHeader>
                            <DialogTitle>Share link</DialogTitle>
                            <DialogDescription>
                              Anyone who has this link will be able to view
                              this.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                              <Label htmlFor="link" className="sr-only">
                                Link
                              </Label>
                              <Input
                                id="link"
                                defaultValue={`/event/${event.id}/share-link`}
                                readOnly
                              />
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              className="px-3"
                              onClick={() =>
                                handleCopy(`/event/${event.id}/share-link`)
                              }
                            >
                              <span className="sr-only">Copy</span>
                              <Copy />
                            </Button>
                          </div>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
