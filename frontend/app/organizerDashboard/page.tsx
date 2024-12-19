"use client";

import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/lib/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaPlus,
  FaRegEye,
  FaRegThumbsUp,
  FaUnlockAlt,
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaHandHoldingDollar,
  FaIndianRupeeSign,
  FaPeopleGroup,
} from "react-icons/fa6";
import { LiaStreetViewSolid } from "react-icons/lia";
import { IoShareSocialSharp, IoTicketOutline } from "react-icons/io5";
import EventCard from "@/components/EventCard";
import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdOutlineSecurity } from "react-icons/md";
import { useEventContext } from "@/context/EventDataContext";
const { events } = data;
import { Skeleton } from "@/components/ui/skeleton";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { useUser } from "@/context/UserContext";
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
import { createClient } from '@/utils/supabase/client';

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

export default function Home() {
  const { setTheme } = useAppContext();
  const { setDashboardName, UserType, setNotification } = useEventContext();
  const [events, setEvents] = useState<EventCard[]>([]);
  const [eventDetails, setEventDetails] = useState({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const [isRed, setIsRed] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasOrganizerDetails, setHasOrganizerDetails] = useState(false);
  const [registrations, setRegistrations] = useState({});
  const [sales, setSales] = useState({});
  const [views, setViews] = useState({});
  const [interested, setInterested] = useState({});
  const [totalViews, setTotalViews] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [totalInterested, setTotalInterested] = useState(0);
  const supabase = createClient();

  const fetchEventDetails = async (eventId) => {
    const { data: registrationsData, error: registrationsError } = await supabase
      .from('participants')
      .select('*')
      .eq('event_id', eventId);

    const { data: salesData, error: salesError } = await supabase
      .from('participants')
      .select('total_amount')
      .eq('event_id', eventId);

    const { data: interestedData, error: interestedError } = await supabase
      .from('user_event_likes')
      .select('*')
      .eq('event_id', eventId);

    const { data: viewsData, error: viewsError } = await supabase
      .from('event_views')
      .select('*')
      .eq('event_id', eventId);

    if (registrationsError || salesError || interestedError) {
      console.error('Error fetching event details:', registrationsError || salesError || interestedError);
      return;
    }

    const totalSalesForEvent = salesData.reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0);

    setRegistrations(prev => ({ ...prev, [eventId]: registrationsData.length }));
    setSales(prev => ({ ...prev, [eventId]: totalSalesForEvent }));
    setInterested(prev => ({ ...prev, [eventId]: interestedData.length }));
    // Assuming views are fetched from another table or API
    setViews(prev => ({...prev, [eventId]: viewsData?.length})); // Replace with actual views fetching logic
    setTotalViews(prev => prev + (viewsData?.length || 0));
    setTotalSales(prev => prev + totalSalesForEvent);
    setTotalRegistrations(prev => prev + registrationsData.length);
    setTotalInterested(prev => prev + interestedData.length);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = user?.id;
        if (!userId) {
          setIsLoading(false);
          return;
        }

        const url = `/api/event/all_events?organizer_id=${userId}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setEvents(data.events || []);

        const eventDetailsPromises = data.events.map(event => fetchEventDetails(event.id));
        await Promise.all(eventDetailsPromises);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [user?.id]);

  useEffect(() => {
    const fetchOrganizerDetails = async () => {
      if (!user?.id) {
        console.error('User ID is not available');
        return;
      }

      const { data, error } = await supabase
        .from('organizer_details')
        .select('user_id')
        .eq('user_id', user.id)
        .single();
      console.log(data);
      if (error) {
        console.error('Error fetching organizer details:', error);
      } else {
        console.log('Fetched organizer details:', data);
        setHasOrganizerDetails(!!data);
      }
    };

    fetchOrganizerDetails();
  }, [user?.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRed((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

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
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/event/categories/d262e530-8109-4d6f-9c9d-e74f92a28806"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setDashboardName("Organizer Dashboard");
    console.log(UserType);
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

  return (
    <div className="flex flex-col m-3">
      <section className="mt-4 bg-[#17202A] sm:h-[9rem] shadow-xl rounded-lg p-4 relative mb-4 flex sm:gap-8 flex-col sm:flex-row ">
        <div className="py-2">
          <h1 className="text-2xl font-semibold text-white mb-4 md:mb-2 flex gap-2 font-open-sauce">
            Hello
            <span className="text-[#CCDB28] font-semibold">
              {user?.user_metadata.full_name || user?.user_metadata.name}
              👋
            </span>
          </h1>
        </div>
        <div className={`flex flex-col sm:flex-row gap-4 sm:py-2`}>
          {!hasOrganizerDetails && (
            <Button
              onClick={() => router.push(`/organizerDashboard/kyc/${user?.id}`)}
              variant="tertiary"
              size="xs"
              className={`text-sm sm:text-md shadow-md shadow-gray-500 ${
                isRed ? "text-red-500" : ""
              }`}
            >
              <FaUnlockAlt className="mr-2 text-xl" />
              Unlock Event Earnings
            </Button>
          )}
          <Button
            onClick={() => router.push("/organizerDashboard/create_event")}
            variant="tertiary"
            size="xs"
            className="text-sm sm:text-md shadow-md shadow-gray-500"
          >
            Create Event
          </Button>
        </div>
        <div className="hidden absolute left-4 -bottom-8 md:flex flex-wrap gap-4 w-full">
          <Card className="w-auto shadow-xl">
            <CardContent className="flex flex-col gap-1 mt-4">
              <h1 className="font-semibold text-lg">Event Sales</h1>
              <div className="flex justify-start items-center text-xl gap-2">
                <TbCoinRupeeFilled />
                <h1 className="">{totalSales || 0}</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="w-auto shadow-xl">
            <CardContent className="flex flex-col gap-1 mt-4">
              <h1 className="font-semibold text-lg">Event Views</h1>
              <div className="flex justify-start items-center text-xl gap-2">
                <FaRegEye />
                <h1 className="">{totalViews || 0}</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="w-auto shadow-xl">
            <CardContent className="flex flex-col gap-1 mt-4">
              <h1 className="font-semibold text-lg">Events Hosted</h1>
              <div className="flex justify-start items-center text-xl gap-2">
                <FaCalendarCheck />
                <h1 className="">{events.length || 0}</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="w-auto shadow-xl">
            <CardContent className="flex flex-col gap-1 mt-4">
              <h1 className="font-semibold text-lg">Event Registrations</h1>
              <div className="flex justify-start items-center text-xl gap-2">
                <FaPeopleGroup />
                <h1 className="">{totalRegistrations || 0}</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="flex gap-3 flex-wrap md:hidden">
        <Card className="w-full sm:w-[48%] shadow-xl">
          <CardContent className="flex flex-col gap-1 mt-4">
            <h1 className="font-semibold text-lg">Event Sales</h1>
            <div className="flex justify-start items-center text-xl gap-2">
              <TbCoinRupeeFilled />
              <h1 className="">{totalSales}</h1>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full sm:w-[48%] shadow-xl">
          <CardContent className="flex flex-col gap-1 mt-4">
            <h1 className="font-semibold text-lg">Event Views</h1>
            <div className="flex justify-start items-center text-xl gap-2">
              <FaRegEye />
              <h1 className="">{totalViews}</h1>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full sm:w-[48%] shadow-xl">
          <CardContent className="flex flex-col gap-1 mt-4">
            <h1 className="font-semibold text-lg">Events Hosted</h1>
            <div className="flex justify-start items-center text-xl gap-2">
              <FaCalendarCheck />
              <h1 className="">{events.length}</h1>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full sm:w-[48%] shadow-xl">
          <CardContent className="flex flex-col gap-1 mt-4">
            <h1 className="font-semibold text-lg">Event Registrations</h1>
            <div className="flex justify-start items-center text-xl gap-2">
              <FaPeopleGroup />
              <h1 className="">{totalRegistrations}</h1>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Active Events</h2>
        <div className="flex space-x-4 overflow-x-auto pb-8">
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
          ) : events.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-8">
              <div className="text-gray-500 text-center">
                <Image
                  src="/images/no-events.svg" // Add this image to your public folder
                  alt="No events"
                  width={200}
                  height={200}
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
                <p className="mb-4">You haven't created any events yet.</p>
                <Button
                  onClick={() =>
                    router.push("/organizerDashboard/create_event")
                  }
                  variant="tertiary"
                  size="lg"
                  className="text-sm sm:text-md shadow-md shadow-gray-500"
                >
                  <FaPlus className="mr-2" />
                  Create Your First Event
                </Button>
              </div>
            </div>
          ) : (
            events.map((event) => (
              <React.Fragment key={event.id}>
                <Card className="shadow-md cursor-pointer flex-none min-w-[200px] max-w-[270px] sm:min-w-[400px] sm:max-w-[450px]">
                  <CardContent className="py-4 flex flex-col sm:flex-row gap-4 h-full border-2 border-gray-800 rounded-md">
                    <div
                      className="flex-[1] relative group rounded-lg"
                      onClick={() =>
                        router.push(
                          `/organizerDashboard/manage-events/${event.id}`
                        )
                      }
                    >
                      <Image
                        src={
                          event.desktop_cover_image_url ||
                          "/images/default.jpeg"
                        }
                        alt="eventBanner"
                        width={200}
                        height={200}
                        className="rounded-lg h-full w-full shadow-xl border-2 border-gray-800"
                      />
                      <div className="absolute inset-0 bg-gray-800 bg-opacity-0 group-hover:bg-opacity-80 flex items-center justify-center rounded-lg transition-opacity duration-300">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-open-sauce ">
                          Event Details
                        </span>
                      </div>
                    </div>

                    <div className="flex-[1] flex flex-col justify-between">
                      <div className="flex flex-col">
                        <h3 className="font-bold line-clamp-2 overflow-hidden text-ellipsis">
                          {event.event_name}
                        </h3>
                        <div className="flex flex-col justify-between">
                          <span className="flex gap-2 items-center">
                            <p className="font-semibold ">Sales:</p>{" "}
                            {sales[event.id] || "0"}
                          </span>
                          <span className="flex gap-2 items-center">
                            <p className="font-semibold ">Views:</p>{" "}
                            {views[event.id] || "0"}
                          </span>
                          <span className="flex gap-2 items-center">
                            <p className="font-semibold ">Registrations:</p>{" "}
                            {registrations[event.id] || "0"}
                          </span>
                          <span className="flex gap-2 items-center">
                            <p className="font-semibold ">Interested:</p>{" "}
                            {interested[event.id] || "0"}
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
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="z-10 w-full bg-[#17202a] text-[#cddc29] hover:text-white flex gap-2 mt-2 py-1 rounded-lg hover:shadow-xl justify-center items-center"
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
                                defaultValue={`${window.location.origin}/eventspage?event_id=${event.id}`}
                                readOnly
                              />
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              className="px-3"
                              onClick={() =>
                                handleCopy(
                                  `${window.location.origin}/eventspage?event_id=${event.id}`
                                )
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
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 py-4">
        <h2 className="text-xl font-semibold mb-2">Past Events</h2>
      </section>
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 py-4">
        <h2 className="text-xl font-semibold mb-2">Drafts</h2>
      </section>
    </div>
  );
}
