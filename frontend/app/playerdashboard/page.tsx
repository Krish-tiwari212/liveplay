"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/lib/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaPlus, FaRegEye, FaRegThumbsUp } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import {
  FaHandHoldingDollar,
  FaIndianRupeeSign,
  FaPeopleCarryBox,
  FaPeopleGroup,
} from "react-icons/fa6";
import { LiaStreetViewSolid } from "react-icons/lia";
import { IoTicketOutline } from "react-icons/io5";
import EventCard from "@/components/EventCard";
import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdEventRepeat, MdOutlineSecurity } from "react-icons/md";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CompleteDetailsForm from "@/components/CompleteDetailsForm";

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
    <Card className="bg-gray-100 rounded-lg shadow-md p-5 mb-5 flex flex-col sm:flex-row">
      <img
        src="/images/img3.jpeg"
        alt="Event"
        className="w-full sm:w-1/3 md:w-1/4 rounded-lg"
      />
      <div className="flex-1 sm:pl-5">
        <div className="flex justify-between items-start pt-2 sm:pt-0">
          <div className="text-start">
            <p className="text-sm text-gray-500">Basketball</p>
            <h2 className="text-xl font-bold">Krish Event</h2>
            <p className="text-gray-800">Maratha Mandir: Mumbai Central</p>
            <p className="text-sm text-gray-600">Tue, 01 Nov | 11:30 am</p>
          </div>
        </div>
        <hr className="my-3 border-gray-300" />
        <div className="flex justify-between">
          <div className="text-start">
            <p className="text-sm text-gray-500">Organizer</p>
            <p className="font-bold">Krish</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function Home() {
  const { setTheme } = useAppContext();
  const { user } = useUser();
  const { setDashboardName, UserType, setNotification,completeprofileDialog,setCompleteprofileDialog } = useEventContext();
  const [events, setEvents] = useState<EventCard[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registeredCategories, setRegisteredCategories] = useState<Category[]>([]);
  const router = useRouter();
  const supabase = createClient();
  const [userDetails, setUserDetails] = useState(null); 
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedEventForWithdraw, setSelectedEventForWithdraw] = useState<
    string | null
  >(null);

  
  const handleButtonClick = () => {
    setCompleteprofileDialog(true);
  };
  
  const handleCloseDialog = () => {
    setCompleteprofileDialog(false);
  };

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
    console.log(user);
    setDashboardName("Player Dashboard");
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user details:', error);
        } else {
          setUserDetails(data);
        }
      }
    };
    console.log(userDetails);

    fetchUserDetails();
  }, [user?.id]);

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

  const handleWithdrawClick = async(eventId: number) => {
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
        title:
          "Failed to fetch categories. Please check your network connection.",
        variant: "destructive",
      });
    }
  };

  const handleConfirmWithdraw = async () => {
    if (selectedEventForWithdraw) {
      setIsAlertOpen(false);
      toast({
        title: `You have successfully withdrawn from '${selectedEventForWithdraw}' & our team shall initiate your refund.`,
        variant: "default",
      });
    }
  };

  const handleWithdrawFromCategory = (categoryName: string) => {
    setSelectedEventForWithdraw(categoryName);
    setIsAlertOpen(true);
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
      <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4`}>
        {!userDetails?.gender && (
          <Button
            onClick={handleButtonClick}
            className="text-sm sm:text-md shadow-md shadow-gray-500 sm:px-5 bg-red-500 text-white"
          >
            Complete your Profile!
          </Button>
        )}
        <Button
          onClick={() => router.push("/")}
          className="text-sm sm:text-md shadow-md shadow-gray-500 px-5"
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
        <div className="absolute hidden left-4 -bottom-8 md:flex flex-wrap gap-4 w-full">
          <Card className="w-auto shadow-xl">
            <CardContent className="flex flex-col gap-1 mt-4">
              <h1 className="font-semibold text-lg">Events Participated</h1>
              <div className="flex justify-start items-center text-xl gap-2">
                <MdEventRepeat className="" />
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
                <FaRegThumbsUp className="" />
                <h1 className="">0</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="flex gap-3 flex-wrap md:hidden">
        <Card className="w-full sm:w-[48%] shadow-xl">
          <CardContent className="flex flex-col gap-1 mt-4">
            <h1 className="font-semibold text-lg">Events Participated</h1>
            <div className="flex justify-start items-center text-xl gap-2">
              <MdEventRepeat className="" />
              <h1 className="">0</h1>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full sm:w-[48%] shadow-xl">
          <CardContent className="flex flex-col gap-1 mt-4">
            <h1 className="font-semibold text-lg">Events I’m interested in</h1>
            <div className="flex justify-start items-center text-xl gap-2">
              <FaRegThumbsUp className="" />
              <h1 className="">0</h1>
            </div>
          </CardContent>
        </Card>
      </section>
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
                <Card className="shadow-md cursor-pointer hover:shadow-2xl flex-none min-w-[400px] max-w-[500px]">
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
          <DialogContent className="w-[90%] sm:max-w-2xl p-4 flex flex-col h-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold mb-4">
                Withdraw from Categories
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                <EventDetails />
                Select the categories you want to withdraw from.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 h-[20rem] overflow-y-auto">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-lg text-gray-800">
                      {category.category_name} - ₹{category.price}
                    </span>
                    <Button
                      className="px-3 py-1 text-sm"
                      onClick={() =>
                        handleWithdrawFromCategory(category.category_name)
                      }
                    >
                      Withdraw
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Type:</strong> {category.category_type}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {category.ticket_description}
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
          <DialogContent className="w-[90%] sm:max-w-2xl p-4 flex flex-col justify-between h-auto">
            <DialogHeader>
              <EventDetails />
              <DialogTitle className="text-lg font-semibold">
                My Registered Categories
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Below are the categories you have registered for this event.
              </DialogDescription>
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
            </DialogHeader>
            <Button
              className="px-4 py-2 rounded"
              onClick={() => router.push("/cart")}
            >
              Register for More Categories
            </Button>
          </DialogContent>
        </Dialog>
      )}
      {completeprofileDialog && (
        <Dialog onOpenChange={handleCloseDialog} open={completeprofileDialog}>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogContent
            className="h-[90%] w-[90%] sm:max-w-2xl overflow-y-auto rounded"
          >
            <CompleteDetailsForm />
          </DialogContent>
        </Dialog>
      )}
      {isAlertOpen && (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent className="w-[90%] rounded">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to withdraw from this event? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmWithdraw}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}