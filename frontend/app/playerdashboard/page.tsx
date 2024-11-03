"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/lib/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaPlus, FaRegEye, FaRegThumbsUp } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaHandHoldingDollar,
  FaIndianRupeeSign,
  FaPeopleGroup,
} from "react-icons/fa6";
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
import { useUser } from '@/context/UserContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EventCard {
  id: number;
  desktop_cover_image_url: string;
  event_name: string;
  entries: string;
  revenue: string;
  event_views: string;
  interested_people: string;
  organizer_name: string;
}

interface Category {
  id: number;
  name: string;
  price: string;
}


const EventDetails = () => {
  return (
    <Card className="bg-gray-100 rounded-lg shadow-md p-5 mb-5 flex flex-col md:flex-row">
      <img 
        src="/images/img3.jpeg" 
        alt="Event" 
        className="w-1/3 md:w-1/4 rounded-lg" 
      />
      <div className="flex-1 md:pl-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Basketball</p>
            <h2 className="text-xl font-bold">Krish Event</h2>
            <p className="text-gray-800">Maratha Mandir: Mumbai Central</p>
            <p className="text-sm text-gray-600">Tue, 01 Nov | 11:30 am</p>
          </div>
        </div>
        <hr className="my-3 border-gray-300" />
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Organizer</p>
            <p className="font-bold">Krish</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">SEATS</p>
            <p className="font-bold">DRESS CI - F7</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function Home() {
  const { setTheme } = useAppContext();
  const { user } = useUser();
  const { setDashboardName, UserType, setNotification } = useEventContext();
  const [events, setEvents] = useState<EventCard[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registeredCategories, setRegisteredCategories] = useState<Category[]>([]);
  const router = useRouter();

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
    setDashboardName("Player Dashboard");
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
          title: "Failed to fetch events. Please check your network connection.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleWithdrawClick = async (eventId: number) => {
    setSelectedEvent(eventId);
    setIsModalOpen(true);
    try {
      const response = await fetch(`/api/event/categories/${eventId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Failed to fetch categories. Please check your network connection.",
        variant: "destructive",
      });
    }
  };

  const handleWithdrawFromCategory = (categoryName: string) => {
    toast({
      title: `You have successfully withdrawn from '${categoryName}' & our team shall initiate your refund.`,
      variant: "default",
    });
  };

  const handleViewRegistrationClick = async (eventId: number) => {
    try {
      const response = await fetch(`/api/event/categories/${eventId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRegisteredCategories(data.categories);
      setIsRegistrationModalOpen(true);
    } catch (error) {
      console.error("Error fetching registered categories:", error);
      toast({
        title: "Failed to fetch registered categories. Please check your network connection.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    const daySuffix = (day: number): string => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  return (
    <div className="flex flex-col m-3">
      <div className={`flex justify-between`}>
        <Button
          onClick={() => router.push("/auth/complete-profile")}
          className="text-md shadow-md shadow-gray-500 px-5 bg-red-500 text-white"
        >
          Complete your Profile!
        </Button>
        <Button
          onClick={() => router.push("/")}
          className="text-md shadow-md shadow-gray-500 px-5"
        >
          Register for Events
        </Button>
      </div>

      <section className="mt-4 bg-[#17202A] h-[9rem] shadow-xl rounded-lg p-4 relative mb-4">
        <div className="p-2 md:w-[60%] lg:w-[50%]">
          <h1 className="text-2xl font-bold text-gray-400 mb-4 md:mb-2">
            Hello {user?.user_metadata.full_name || user?.user_metadata.name} 👋
          </h1>
        </div>
        <div className="absolute left-4 -bottom-8 flex flex-wrap gap-4 w-full">
          <Card className="w-auto shadow-xl">
            <CardContent className="flex flex-col gap-1 mt-4">
              <h1 className="font-semibold text-lg">Events Participated</h1>
              <div className="flex justify-start items-center text-xl gap-2">
                <TbCoinRupeeFilled className="" />
                <h1 className="">0</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="w-auto shadow-xl">
            <CardContent className="flex flex-col gap-1 mt-4">
              <h1 className="font-semibold text-lg">
                Events I’m interested in
              </h1>
              <div className="flex justify-start items-center text-xl gap-2">
                <FaRegEye className="" />
                <h1 className="">0</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* <section className="flex gap-4 px-2 flex-wrap w-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Card className="flex-1 w-full shadow-xl">
                <CardContent className="flex flex-col mt-4">
                  <div className="flex justify-center items-center gap-4 text-xl">
                    <h1 className="font-semibold">Events Participated</h1>
                    <TbCoinRupeeFilled className="" />
                  </div>
                  <div className="flex justify-start items-center text-xl gap-1">
                    <FaPlus className="h-4 w-4" />
                    <h1 className="">0</h1>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-lg">Total Events Participated : 0</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Card className="flex-1 w-full shadow-xl">
                <CardContent className="flex flex-col mt-4">
                  <div className="flex justify-center items-center gap-4 text-xl">
                    <h1 className="font-semibold">Events I’m interested in</h1>
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
              <p className="text-lg"> Events I’m interested in : 0</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section> */}
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
                    <Skeleton className="h-[50px] w-[150px]" />
                    <Skeleton className="h-[50px] w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            events.map((event) => (
              <React.Fragment key={event.id}>
                <Card className="shadow-md cursor-pointer hover:shadow-2xl flex-none">
                  <CardContent className="py-4 flex gap-4 h-full">
                    <Link href={`/`}>
                      <Image
                        src={
                          event.desktop_cover_image_url ||
                          "/images/default.jpeg"
                        }
                        alt="eventBanner"
                        width={200}
                        height={200}
                        className="rounded-lg h-full shadow-xl flex-[1]"
                      />
                    </Link>
                    <div className="flex-[1]">
                      <h3 className="font-bold">{event.event_name}</h3>
                      <div className="flex flex-col justify-between">
                        <span>
                          Organizer: {event.organizer_name || "Mohit"}
                        </span>
                        <span>Venue: {event.venue_name || ""}</span>
                        <span>
                          Event Date:{" "}
                          {event.start_date
                            ? formatDate(event.start_date)
                            : "20th Nov 2024"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <Button
                          className="mt-2 bg-[#17202A] text-[#CDDC29] hover:text-white py-1 px-2 rounded hover:shadow-xl"
                          onClick={() => handleWithdrawClick(event.id)}
                        >
                          Withdraw From Event
                        </Button>
                        <Button
                          className="mt-2 bg-[#17202A] text-[#CDDC29] hover:text-white py-1 px-2 rounded hover:shadow-xl"
                          onClick={() => handleViewRegistrationClick(event.id)}
                        >
                          View My Registration
                        </Button>
                      </div>
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

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="hidden">Open</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl p-4 h-[34rem]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold mb-4">
                Withdraw from Categories
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                <EventDetails />
                Select the categories you want to withdraw from.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col p-2 border rounded-md shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      {category.category_name} - ${category.price}
                    </span>
                    <Button
                      className="bg-red-500 text-white px-2 py-1 text-sm rounded mt-4"
                      onClick={() =>
                        handleWithdrawFromCategory(category.category_name)
                      }
                    >
                      Withdraw
                    </Button>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>Type: {category.category_type}</p>
                    <p>Description: {category.ticket_description}</p>
                    <p>Discount Code: {category.discount_code}</p>
                    <p>
                      Valid From:{" "}
                      {new Date(category.from_date).toLocaleDateString()}
                    </p>
                    <p>
                      Valid Till:{" "}
                      {new Date(category.till_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
      {isRegistrationModalOpen && (
        <Dialog
          open={isRegistrationModalOpen}
          onOpenChange={setIsRegistrationModalOpen}
        >
          <DialogTrigger asChild>
            <Button className="hidden">Open</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl p-4 h-[30rem]">
            <DialogHeader>
              <EventDetails />
              <DialogTitle className="text-lg font-semibold">
                My Registered Categories
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Below are the categories you have registered for this event.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {registeredCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col p-2 border rounded-md shadow-sm"
                >
                  <span className="font-medium">
                    {category.category_name} - Rs. {category.price}
                  </span>
                </div>
              ))}
            </div>
            <Button
              className="mt-4 px-4 py-2 rounded"
              onClick={() => router.push("/cart")}
            >
              Register for More Categories
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}