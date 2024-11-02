"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { FaCalendarAlt } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaStreetViewSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEventContext } from "@/context/EventDataContext";
import { Skeleton } from "@/components/ui/skeleton";

interface EventCard {
  id: number;
  desktop_cover_image_url: string;
  event_name: string;
  entries: string;
  revenue: string;
  event_views: string;
  interested_people: string;
  organizer_name:string
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
  const router = useRouter();
  const [events, setEvents] = useState<EventCard[]>([]);
  const { setDashboardName, UserType } = useEventContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setDashboardName("Manage Events");
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
        <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
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
                    <Skeleton className="h-[50px] w-[150px]" />
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
                        <span>
                          Organizer: {event.organizer_name || "Mohit"}
                        </span>
                        <span>Venue: {event.revenue || "$0"}</span>
                        <span>
                          Event Dates: {event.event_views || "20th Nov 2024"}
                        </span>
                      </div>
                      <Link href={`/event/${event.id}/share-link`}>
                        <Button className="w-full mt-2 bg-[#17202A] text-[#CDDC29] hover:text-white py-1 px-2 rounded hover:shadow-xl">
                          Withdraw From Event
                        </Button>
                      </Link>
                      <Link href={`/event/${event.id}/share-link`}>
                        <Button className="w-full mt-2 bg-[#17202A] text-[#CDDC29] hover:text-white py-1 px-2 rounded hover:shadow-xl">
                          View My Registration
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
    </div>
  );
};

export default page;
