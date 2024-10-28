"use client";

import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/lib/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import {  useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaStreetViewSolid } from "react-icons/lia";
import { IoTicketOutline } from "react-icons/io5";
import EventCard from "@/components/EventCard";
import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdOutlineSecurity } from "react-icons/md";
import { useEventContext } from "@/context/EventDataContext";
const { events } = data;

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

export default function Home() {
  const { setTheme } = useAppContext();
  const { setDashboardName } = useEventContext();
  const router=useRouter()
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
    setDashboardName("Home");
  }, []);
  return (
    <div className="flex flex-col m-3">
      <div className="flex justify-between ">
        <Button
          onClick={() => router.push("/dashboard/kyc/1234")}
          className="text-2xl shadow-md shadow-gray-500 w-auto px-20"
        >
          {/* <MdOutlineSecurity className="mr-2" /> */}
          Unlock Event Earnings (Kyc)
        </Button>
        <Button
          onClick={() => router.push("/dashboard/create_event")}
          className="text-2xl shadow-md shadow-gray-500 "
        >
          Create Event
        </Button>
      </div>
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Active Events</h2>
        <div className="flex space-x-4 overflow-x-auto pb-8">
          {activeEvents.map((event) => (
            <Card
              onClick={() =>
                router.push(`/dashboard/manage-events/${event.id}`)
              }
              key={event.id}
              className="shadow-md cursor-pointer hover:shadow-2xl"
            >
              <CardContent className="py-4 flex gap-4">
                <Image
                  src={event.image}
                  alt="eventBanner"
                  width={200}
                  height={200}
                  className="rounded-lg h-44 shadow-xl "
                />
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <div className="flex flex-col justify-between">
                    <span>Entries: {event.entries}</span>
                    <span>Revenue: {event.revenue}</span>
                    <span>Event Views: {event.views}</span>
                    <span>Interested People: {event.interested}</span>
                  </div>
                  <Link href="/event/share-link">
                    <Button className="w-full mt-2 bg-[#17202A] text-[#CDDC29] hover:text-white p-1 rounded hover:shadow-xl">
                      Share
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white shadow-md rounded-lg px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Past Events</h2>
        <div className="flex space-x-4 overflow-x-auto pb-8">
          {pastEvents.map((event) => (
            <Card
              key={event.id}
              className="shadow-md cursor-pointer hover:shadow-2xl"
            >
              <CardContent className="py-4 flex gap-4">
                <Image
                  src={event.image}
                  alt="eventBanner"
                  width={200}
                  height={200}
                  className="rounded-lg h-44 shadow-xl "
                />
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <div className="flex flex-col justify-between">
                    <span>Entries: {event.entries}</span>
                    <span>Revenue: {event.revenue}</span>
                    <span>Event Views: {event.views}</span>
                    <span>Interested People: {event.interested}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-6 bg-white shadow-md rounded-l px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Drafts</h2>
        <div className="flex space-x-4 overflow-x-auto pb-8">
          {drafts.map((draft) => (
            <Card
              key={draft.id}
              className="shadow-md cursor-pointer hover:shadow-2xl"
              onClick={() =>
                router.push(`/dashboard/manage-events/${draft.id}`)
              }
            >
              <CardContent className="py-4 flex gap-4">
                <Image
                  src={draft.image}
                  alt="eventBanner"
                  width={200}
                  height={200}
                  className="rounded-lg h-44 shadow-xl "
                />
                <div>
                  <h3 className="font-bold">{draft.title}</h3>
                  <div className="text-center items-center h-36 mt-2 rounded-lg bg-slate-100 w-36 shadow-xl"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
