"use client";

import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/lib/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaPlus, FaRegEye, FaStar } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import JoinTeamDialog from "@/components/JoinTeamDialog";
import { FiCopy } from "react-icons/fi";
import {
  FaHandHoldingDollar,
  FaIndianRupeeSign,
  FaPeopleCarryBox,
  FaPeopleGroup,
} from "react-icons/fa6";
import { LiaStreetViewSolid } from "react-icons/lia";
import { IoEnterOutline, IoInformationCircle, IoTicketOutline } from "react-icons/io5";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import FeedbackForm from "@/components/Rating";
import Rating from "@/components/Rating";
import { Label } from "@/components/ui/label";
import { BiLike } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { FaSmile } from "react-icons/fa";
import html2canvas from "html2canvas";

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

export default function Home() {
  const { setTheme } = useAppContext();
  const { user } = useUser();
  const {
    setDashboardName,
    UserType,
    setNotification,
    completeprofileDialog,
    setCompleteprofileDialog,
    profileCompleted,
    setProfileCompleted
  } = useEventContext();
  const [events, setEvents] = useState<EventCard[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<EventCard[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registeredCategories, setRegisteredCategories] = useState<Category[]>(
    []
  );
  const router = useRouter();
  const supabase = createClient();
  const [userDetails, setUserDetails] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedEventForWithdraw, setSelectedEventForWithdraw] = useState<
    string | null
  >(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedEventForFeedback, setSelectedEventForFeedback] = useState<
    number | null
  >(null);
  const [isRed, setIsRed] = useState(false);
  const [isYellow, setIsYellow] = useState(false);
  const [feedbackdisable,setFeedbackDisable]=useState(false)
  const [OrganizerConduct,setOrganizeConduct]=useState(0)
  const [Refreshments, setRefreshments] = useState(0);
  const [EventManagement,setEventManagement]=useState(0)
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [isEventPassOpen, setIsEventPassOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [organizerName, setOrganizerName] = useState('');
  const [teamDetails, setTeamDetails] = useState(null);
  const [participantdetails, setParticipantdetails] = useState(null);
  const [isLeader, setIsLeader] = useState(false);
  const [participantId, setParticipantId] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopyTeamCode = () => {
    navigator.clipboard.writeText(teamDetails.team_code)
      .then(() => {
        setCopySuccess('Team code copied to clipboard!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  useEffect(() => {
    const fetchPastEvents = async () => {
      if (!user) return;

      try {
        // Fetch participant entries for the given user ID
        const { data: participantEntries, error: participantError } = await supabase
          .from('participants')
          .select('event_id')
          .eq('user_id', user.id);

        if (participantError) throw participantError;

        if (!participantEntries || participantEntries.length === 0) {
          setPastEvents([]);
          return;
        }

        const eventIds = participantEntries.map(entry => entry.event_id);

        // Fetch event details using the event IDs and check if the event has ended
        const { data: events, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .in('id', eventIds)
          .lt('end_date', new Date().toISOString()); // Check if the event has ended

        if (eventsError) throw eventsError;

        setPastEvents(events);
      } catch (error) {
        console.error('Error fetching past events:', error);
      }
    };

    fetchPastEvents();
  }, [user, supabase]);

  useEffect(() => {
    const fetchLikedEvents = async () => {
      if (!user) return;

      try {
        // Fetch liked event IDs
        const { data: likedEvents, error: likedEventsError } = await supabase
          .from('user_event_likes')
          .select('event_id')
          .eq('user_id', user.id);

        if (likedEventsError) throw likedEventsError;

        // Fetch details of each liked event
        const eventDetailsPromises = likedEvents.map(async (likedEvent) => {
          const { data: eventData, error: eventError } = await supabase
            .from('events')
            .select('*')
            .eq('id', likedEvent.event_id)
            .single();

          if (eventError) throw eventError;

          return eventData;
        });

        const eventDetails = await Promise.all(eventDetailsPromises);
        setInterestedEvents(eventDetails);
      } catch (error) {
        console.error('Error fetching liked events:', error);
      }
    };

    fetchLikedEvents();
  }, [user, supabase]);

    const fetchEventData = async (eventId) => {
      try {
        // Fetch event data
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single();

        if (eventError) throw eventError;

        setEvent(eventData);

        // Fetch organizer name
        const { data: organizerData, error: organizerError } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', eventData.organizer_id)
          .single();

        if (organizerError) throw organizerError;

        setOrganizerName(organizerData.full_name);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

  const EventDetails = () => {
    return (
      <Card className="bg-gray-100 rounded-lg shadow-md p-5 mb-5 flex flex-col sm:flex-row">
        <img
          src={event.desktop_cover_image_url}
          alt="Event"
          className="w-full sm:w-1/3 md:w-1/4 rounded-lg"
        />
        <div className="flex-1 sm:pl-5">
          <div className="flex justify-between items-start pt-2 sm:pt-0">
            <div className="text-start">
              <p className="text-sm text-gray-500">{event.sport}</p>
              <h2 className="text-xl font-bold">{event.event_name}</h2>
              <p className="text-gray-800">{event.venue_name}: {event.city}</p>
              <p className="text-sm text-gray-600">
                {new Date(event.start_date).toLocaleDateString()} | {event.start_time}
              </p>
            </div>
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="flex justify-between">
            <div className="text-start">
              <p className="text-sm text-gray-500">Organizer</p>
              <p className="font-bold">{organizerName}</p>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRed((prev) => !prev);
      setIsYellow((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Handler for Opening Feedback Dialog
  const handleFeedbackClick = (eventId: number) => {
    setSelectedEventForFeedback(eventId);
    setIsFeedbackModalOpen(true);
  };

  // Handler for Closing Feedback Dialog
  const handleCloseFeedbackDialog = () => {
    setIsFeedbackModalOpen(false);
    setSelectedEventForFeedback(null);
  };

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
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user details:", error);
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
          title:
            "Failed to fetch events. Please check your network connection.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleWithdrawClick = async (eventId: string) => {
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

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(`/api/event/registered_events/${user?.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRegisteredEvents(data.events);
      } catch (error) {
        console.error("Error fetching registered events:", error);
        toast({
          title:
            "Failed to fetch registered events. Please check your network connection.",
          variant: "destructive",
        });
      }
    }
    fetchRegisteredEvents();
  }, [user?.id]);

  const handleConfirmWithdraw = async () => {
    if (selectedEventForWithdraw) {
      setIsAlertOpen(false);
      toast({
        title: `You have successfully withdrawn from '${selectedEventForWithdraw}' & our team shall initiate your refund.`,
        variant: "default",
      });
    }
  };

  const handleFeedbackSubmit = async () => {
    setIsAlertOpen(false);
    setFeedbackDisable(false);
  
    const total = OrganizerConduct + EventManagement + Refreshments;
    const avg = total / 3;
    setAverageRating(avg);
  
    const feedbackData = {
      userId: user?.id,
      feedbackText: "", 
      ratingOrganizerConduct: OrganizerConduct,
      ratingEventManagement: EventManagement,
      ratingVenueLocation: Refreshments,
    };
  
    try {
      const response = await fetch(`/api/event/feedback/${selectedEventForFeedback}`, { // Assuming you have the event ID stored in `eventId`
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setIsThankYouOpen(true);
        toast({
          title: "Feedback submitted successfully",
        });
      } else {
        toast({
          title: "Error submitting feedback",
          description: data.error || "Something went wrong",
          variant: "destructive",
        });
        console.error('Error submitting feedback:', data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit feedback",
        variant: "destructive",
      });
      console.error('Error submitting feedback:', error);
    }
  };

  useEffect(() => {
    const fetchParticipantId = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from('participants')
          .select('id')
          .eq('user_id', user.id)
          .eq('event_id', eventId)
          .single();

        if (error) {
          console.error('Error fetching participant ID:', error);
        } else {
          setParticipantId(data.id);
        }
      }
    };

    fetchParticipantId();
  }, [user?.id, eventId]);

  useEffect(() => {
    const fetchParticipantData = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from("participants") // Table where participant details are stored
          .select("*") // Fetch all participant details
          .eq("user_id", user.id) // Filters by the user's ID
          .eq("event_id", eventId) // Filters by the event ID
          .single(); // Expects a single result

        if (error) {
          console.error("Error fetching participant data:", error);
        } else {
          setParticipantdetails(data); 
          console.log(data)// Sets the fetched participant data in state
        }
      }
    };

    fetchParticipantData();
  }, [user?.id, eventId]);


  const handleViewRegistrationClick = async (eventId: number) => {
    await fetchEventData(eventId);
    setEventId(eventId);
    setIsRegistrationModalOpen(true);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const daySuffix = (day: number): string => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchCategoriesAndTeamDetails = async () => {
      try {
        // Fetch participant data
        const { data: participantData, error: participantError } = await supabase
          .from('participants')
          .select('*')
          .eq('id', participantId)
          .single();
  
        if (participantError) {
          console.error(participantError);
          return;
        }
  
        // Fetch all event categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('event_categories')
          .select('*')
          .eq('event_id', eventId);
  
        if (categoriesError) {
          console.error(categoriesError);
          return;
        }
  
        // Filter categories based on participant's registered category_id
        const registeredCategories = categoriesData.filter(category => category.id === participantData.category_id);
  
        setRegisteredCategories(registeredCategories);
  
        // Fetch team details if the participant is part of a team
        if (participantData.team_id) {
          const { data: teamData, error: teamError } = await supabase
            .from('teams')
            .select('*')
            .eq('id', participantData.team_id)
            .single();
  
          if (teamError) {
            console.error(teamError);
            return;
          }
  
          setTeamDetails(teamData);
          setIsLeader(participantData.leader); // Assuming the first participant is the leader

          const { data: teamMembersData, error: teamMembersError } = await supabase
            .from('participants')
            .select('id, name')
            .in('id', teamData.participant_ids);

          if (teamMembersError) {
            console.error(teamMembersError);
            return;
            
          }

          setTeamMembers(teamMembersData);
        }
      } catch (error) {
        console.error('Error fetching categories and team details:', error);
      }
    };
  
    if (isRegistrationModalOpen) {
      fetchCategoriesAndTeamDetails();
    }
  }, [isRegistrationModalOpen, participantId, eventId]);

  const handleWithdrawFromCategory = async (categoryName) => {
    setIsAlertOpen(true);
    try {
      // Fetch the category ID based on the category name
      const { data: categoryData, error: categoryError } = await supabase
        .from('event_categories')
        .select('id')
        .eq('category_name', categoryName)
        .single();
  
      if (categoryError) {
        console.error(categoryError);
        return;
      }
  
      const categoryId = categoryData.id;
  
      // Update the participant's record to remove the category
      const { error: updateError } = await supabase
        .from('participants')
        .update({ category_id: null })
        .eq('id', participantId)
        .eq('category_id', categoryId);
  
      if (updateError) {
        console.error(updateError);
        return;
      }
      setSelectedEventForWithdraw(categoryName);

      
    } catch (error) {
      console.error('Error withdrawing from category:', error);
    }
  };
  
  const handleRemoveTeamMember = async (memberId) => {
    try {
      // Fetch the current team details
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .select('participant_ids')
        .eq('id', teamDetails.id)
        .single();
  
      if (teamError) {
        console.error(teamError);
        return;
      }
  
      const updatedParticipantIds = teamData.participant_ids.filter(id => id !== memberId);
  
      // Update the team record to remove the specified member
      const { error: updateError } = await supabase
        .from('teams')
        .update({ participant_ids: updatedParticipantIds })
        .eq('id', teamDetails.id);
  
      if (updateError) {
        console.error(updateError);
        return;
      }

      const { error: removeParticipantError } = await supabase
        .from('participants')
        .delete()
        .eq('id', memberId);
      
      if (removeParticipantError) {
        console.error(removeParticipantError);
        return;
      }

      setIsRegistrationModalOpen(false);

    } catch (error) {
      console.error('Error removing team member:', error);
    }
  };

  const downloadImage = () => {
    const div = document.getElementById("Event_pass"); // Your div's ID
    html2canvas(div, {
      scale: 1, // Ensure the scale is set to 1 to preserve the original size
      width: div.offsetWidth, // Use the div's current width
      height: div.offsetHeight, // Use the div's current height
      x: 0, // Capture the full div from the left
      y: 0, // Capture the full div from the top
    }).then((canvas) => {
      // Create an image from the canvas
      const imgData = canvas.toDataURL("image/png");

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "Event Pass.png"; // You can change the filename here
      link.click();
    });
  };

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleWithdraw = async () => {
    // Add your withdrawal logic here
    // For example, call an API to process the withdrawal
    // After successful withdrawal, show a success message
    console.log('Withdrawal successful');
    setIsWithdrawModalOpen(false);
};
  return (
    <div className="flex flex-col m-3">
      {/* <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4`}>
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
      </div> */}
      <section className="mt-4 bg-[#17202A] sm:h-[9rem] shadow-xl rounded-lg p-4 relative mb-4 flex sm:gap-8 flex-col sm:flex-row">
        <div className="py-2">
          <h1 className="text-2xl font-semibold text-gray-400 mb-4 md:mb-2 flex gap-2 font-open-sauce">
            Hello
            <span className="text-[#CCDB28]">
              {user?.user_metadata.full_name || user?.user_metadata.name}
              👋
            </span>
          </h1>
        </div>
        <div
          className={`flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:py-2`}
        >
          {!userDetails?.gender && (
            <Button
              onClick={handleButtonClick}
              variant="tertiary"
              size="xs"
              className={`text-sm sm:text-md shadow-md shadow-gray-500 ${
                isRed ? "text-red-500" : ""
              }`}
            >
              Complete your Profile!
            </Button>
          )}
          <Button
            onClick={() => router.push("/")}
            variant="tertiary"
            size="xs"
            className="text-sm sm:text-md"
          >
            Register for Events
          </Button>
          <Button
            onClick={() => scrollToSection("pastEvents")}
            variant="tertiary"
            size="xs"
            className="text-sm sm:text-md"
          >
            Event Feedback
          </Button>
          <JoinTeamDialog userId={user?.id} />
        </div>
        <div className="absolute hidden left-4 -bottom-8 md:flex flex-wrap gap-4 w-full">
          <Card className="w-auto shadow-xl">
            <CardContent className="flex flex-col gap-1 mt-4">
              <h1 className="font-semibold text-lg">Events Participated</h1>
              <div className="flex justify-start items-center text-xl gap-2">
                <MdEventRepeat className="" />
                <h1 className="">{registeredEvents.length}</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="w-auto shadow-xl">
            <CardContent className="flex flex-col gap-1 mt-4">
              <h1 className="font-semibold text-lg">
                Events I’m interested in
              </h1>
              <div className="flex justify-start items-center text-xl gap-2">
                <BiLike className="" />
                <h1 className="">{interestedEvents.length}</h1>
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
              <h1 className="">{registeredEvents.length}</h1>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full sm:w-[48%] shadow-xl">
          <CardContent className="flex flex-col gap-1 mt-4">
            <h1 className="font-semibold text-lg">Events I’m interested in</h1>
            <div className="flex justify-start items-center text-xl gap-2">
              <BiLike className="" />
              <h1 className="">{interestedEvents.length}</h1>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="mt-8 bg-white shadow-md rounded-lg px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Registered Events</h2>
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
          ) : (
            registeredEvents.map((event, i) => (
              <React.Fragment key={event.id}>
                <Card className="shadow-md cursor-pointer hover:shadow-2xl flex-none min-w-[240px] max-w-[270px] sm:min-w-[450px] sm:max-w-[550px] border-2 border-gray-800">
                  <CardContent className="py-4 flex flex-col sm:flex-row gap-4 h-full">
                    <div className="flex-[1]">
                      <Image
                        src={
                          event.desktop_cover_image_url ||
                          "/images/default.jpeg"
                        }
                        alt="eventBanner"
                        width={200}
                        height={200}
                        className="rounded-lg h-full shadow-xl w-full "
                      />
                    </div>
                    <div className="flex flex-col flex-[1] justify-between">
                      <div>
                        <div className="flex flex-col items-start mb-2">
                          <h3 className="font-bold text-md line-clamp-2">
                            {event.event_name}
                          </h3>
                          <span className="text-[0.8rem] flex gap-1">
                            <h1 className="font-bold">By</h1>{" "}
                            {event.organizer_name || "Mohit"}
                          </span>
                        </div>
                        <div className="flex flex-col justify-between ">
                          <span className="flex gap-1">
                            <h1 className="font-bold">Venue:</h1>
                            {event.venue_name || ""}
                          </span>
                          <span className="flex gap-1 whitespace-nowrap">
                            <h1 className="font-bold">Event Date:</h1>
                            {event.start_date
                              ? formatDate(event.start_date)
                              : "20th Nov 2024"}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2 mt-2">
                        <button
                          className="text-sm bg-[#17202A] text-[#CDDC29] hover:text-white py-1 w-full rounded-lg hover:shadow-xl"
                          onClick={() => handleViewRegistrationClick(event.id)}
                        >
                          Registration panel
                        </button>
                        {/* <button
                          className="text-sm bg-[#E53935] text-white  py-1 w-full rounded-lg hover:shadow-xl"
                          onClick={() => handleWithdrawClick(event.id)}
                        >
                          Withdraw From Event
                        </button> */}
                        {/* {i % 2 == 0 && (
                          <span className="flex gap-1 text-sm text-gray-800">
                            <h1
                              className={`underline ${
                                isYellow ? "text-[#CDDC29]" : ""
                              }`}
                            >
                              Match Fixtures are live
                            </h1>
                          </span>
                        )} */}
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
        <h2 className="text-xl font-semibold mb-2">Events I'm Interested In</h2>
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
          ) : (
            interestedEvents.map((event, i) => (
              <React.Fragment key={event.id}>
                <Card className="shadow-md cursor-pointer hover:shadow-2xl flex-none min-w-[240px] h-[15rem] max-w-[270px] sm:min-w-[450px] sm:max-w-[550px] border-2 border-gray-800">
                  <CardContent className="py-4 flex flex-col sm:flex-row gap-4 h-full">
                    <div className="flex-[1]">
                      <Image
                        src={
                          event.desktop_cover_image_url ||
                          "/images/default.jpeg"
                        }
                        alt="eventBanner"
                        width={200}
                        height={200}
                        className="rounded-lg h-full shadow-xl w-full "
                      />
                    </div>
                    <div className="flex flex-col flex-[1] justify-between">
                      <div>
                        <div className="flex flex-col items-start mb-2">
                          <h3 className="font-bold text-md line-clamp-2">
                            {event.event_name}
                          </h3>
                          <span className="text-[0.8rem] flex gap-1">
                            <h1 className="font-bold">By</h1>{" "}
                            {event.organizer_name || "Mohit"}
                          </span>
                        </div>
                        <div className="flex flex-col justify-between ">
                          <span className="flex gap-1">
                            <h1 className="font-bold">Venue:</h1>
                            {event.venue_name || ""}
                          </span>
                          <span className="flex gap-1 whitespace-nowrap">
                            <h1 className="font-bold">Event Date:</h1>
                            {event.start_date
                              ? formatDate(event.start_date)
                              : "20th Nov 2024"}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2 mt-2">
                        <button
                          className="text-sm bg-[#17202A] text-[#CDDC29] hover:text-white py-1 w-full rounded-lg hover:shadow-xl"
                          onClick={() =>
                            router.push("/eventspage?event_id=" + event.id)
                          }
                        >
                          Register Now
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </React.Fragment>
            ))
          )}
        </div>
      </section>
      <section
        id="pastEvents"
        className="mt-8 bg-white shadow-md rounded-lg px-4 py-4"
      >
        <h2 className="text-xl font-semibold mb-2">Past Events</h2>
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
          ) : (
            pastEvents.map((event, i) => (
              <React.Fragment key={event.id}>
                <Card className="shadow-md cursor-pointer hover:shadow-2xl flex-none min-w-[240px] max-w-[270px] sm:min-w-[550px] border-2 border-gray-800">
                  <CardContent className="py-4 flex flex-col sm:flex-row gap-4 h-full">
                    <div className="flex-[1]">
                      <Image
                        src={
                          event.desktop_cover_image_url ||
                          "/images/default.jpeg"
                        }
                        alt="eventBanner"
                        width={200}
                        height={200}
                        className="rounded-lg h-full shadow-xl w-full "
                      />
                    </div>
                    <div className="flex flex-col flex-[1] justify-between">
                      <div>
                          <div className="flex flex-col items-start mb-2">
                            <h3 className="font-bold text-md line-clamp-2">
                              {event.event_name}
                            </h3>
                            <span className="text-[0.8rem] flex gap-1">
                              <h1 className="font-bold">By</h1>{" "}
                              {event.organizer_name || "Mohit"}
                            </span>
                          </div>
                          <div className="flex flex-col justify-between ">
                            <span className="flex gap-1">
                              <h1 className="font-bold">Venue:</h1>
                              {event.venue_name || ""}
                            </span>
                            <span className="flex gap-1 whitespace-nowrap">
                              <h1 className="font-bold">Event Date:</h1>
                              {event.start_date
                                ? formatDate(event.start_date)
                                : "20th Nov 2024"}
                            </span>
                          </div>
                        </div>
                      <div className="flex flex-col justify-between items-center gap-2 mt-2">
                        <button
                          className="text-sm bg-[#17202A] text-[#CDDC29] hover:text-white py-1 w-full rounded-lg hover:shadow-xl"
                          onClick={() => handleFeedbackClick(event.id)}
                          disabled={feedbackdisable}
                        >
                          Give Feedback
                        </button>
                        <button
                          className="text-sm bg-[#17202A] text-[#CDDC29] hover:text-white py-1 w-full rounded-lg hover:shadow-xl"
                          onClick={() => handleViewRegistrationClick(event.id)}
                        >
                          Registration panel
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </React.Fragment>
            ))
          )}
        </div>
      </section>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="hidden">Open</Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] sm:max-w-2xl p-4 flex flex-col h-[90%] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold mb-4">
                Withdraw from Categories
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                <EventDetails />
                Select the categories you want to withdraw from.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 h-[20rem]">
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
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
      {isWithdrawModalOpen && (
        <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
          <DialogTrigger asChild>
            <Button className="hidden">Open</Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] sm:max-w-md p-4 flex flex-col justify-between h-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Withdraw from Event</DialogTitle>
              <DialogDescription className="text-sm text-gray-500 text-start">
                Are you sure you want to withdraw from this event? You will receive an instant refund upon successful withdrawal.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={() => setIsWithdrawModalOpen(false)}>
                No
              </Button>
              <Button className="px-4 py-2 rounded" onClick={handleWithdraw}>
                Yes
              </Button>
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
              <DialogTitle className="text-lg font-semibold flex justify-between">
                <h1>My Registered Categories</h1>
                <Button size="xs" onClick={() => setIsEventPassOpen(true)}>
                  Event Pass
                </Button>
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 text-start">
                Below are the categories you have registered for this event.
              </DialogDescription>

              <div className="space-y-4">
                {registeredCategories.map((category) => (
                  <div className="flex justify-between gap-2" key={category.id}>
                    <div className="flex flex-col p-2 border rounded-md shadow-sm w-full">
                      <span className="font-medium text-start">
                        {category.category_name} - Rs. {category.price}
                      </span>
                    </div>
                    {isLeader && (
                      <Button
                        className="px-3 py-1 text-sm"
                        // onClick={() =>
                        //   handleWithdrawFromCategory(category.category_name)
                        // }
                        onClick={() => setIsWithdrawModalOpen(true)}
                      >
                        Withdraw
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {teamDetails && (
                <div className="mt-4">
                  <h2 className="text-start text-lg font-semibold mb-2">
                    {participantdetails ? "Partner" : "Team Members"}
                  </h2>
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <div
                        className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-white"
                        key={member.id}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-700">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {member.name}
                          </span>
                        </div>
                        {isLeader && member.id !== participantId && (
                          <Button
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                            onClick={() => handleRemoveTeamMember(member.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  {teamDetails.category_type !== "Singles" && (
                    <>
                      <div className="mt-4 flex items-center justify-between p-3 border rounded-md shadow-sm bg-white">
                        <div className="flex justify-center items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <IoInformationCircle className="text-xl " />
                              </TooltipTrigger>
                              <TooltipContent className="bg-[#141f29] text-[#ccdb28]">
                                <p>
                                  Share this code with Your Team or Your Partner
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <div className="flex items-start space-x-3">
                            <span className="text-sm font-medium text-gray-800">
                              {participantdetails
                                ? `Partner Code: ${teamDetails.team_code}`
                                : `Team Code: ${teamDetails.team_code}`}
                            </span>
                          </div>
                        </div>

                        <Button
                          className="px-3 py-1 text-sm rounded-md flex items-center"
                          onClick={handleCopyTeamCode}
                        >
                          <FiCopy className="mr-2" /> Copy
                        </Button>
                      </div>
                      {copySuccess && (
                        <div className="mt-2 text-green-500">{copySuccess}</div>
                      )}
                    </>
                  )}
                </div>
              )}
            </DialogHeader>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsRegistrationModalOpen(false)}
              >
                Close
              </Button>
              <Button
                className="px-4 py-2 rounded"
                onClick={() => router.push(`/eventspage?event_id=${eventId}`)}
              >
                Register for More Categories
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {completeprofileDialog && (
        <Dialog onOpenChange={handleCloseDialog} open={completeprofileDialog}>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogContent className="h-[90%] w-[90%] sm:max-w-2xl overflow-y-auto rounded">
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
      {isFeedbackModalOpen && selectedEventForFeedback && (
        <Dialog
          open={isFeedbackModalOpen}
          onOpenChange={setIsFeedbackModalOpen}
        >
          <DialogTrigger asChild>
            <Button className="hidden">Open Feedback</Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] sm:max-w-2xl p-4 flex flex-col h-auto overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl">Event Feedback</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Please provide your feedback for the event.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Rating
                eventId={selectedEventForFeedback}
                label="Organizer Conduct"
                description="Rate the organizer conduct (Out of 5 ⭐)"
                setratingvalue={setOrganizeConduct}
              />
              <Rating
                eventId={selectedEventForFeedback}
                label="Event Management"
                description="Rate the event management (Out of 5 ⭐)"
                setratingvalue={setEventManagement}
              />
              <Rating
                eventId={selectedEventForFeedback}
                label="Venue and location"
                description="Rate the Venue and Location (Out of 5 ⭐)"
                setratingvalue={setRefreshments}
              />
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handleCloseFeedbackDialog}>
                Close
              </Button>
              <Button variant="default" onClick={handleFeedbackSubmit}>
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {isThankYouOpen && averageRating !== null && (
        <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
          <DialogContent className="w-[90%] sm:max-w-md p-6 flex flex-col items-center h-auto">
            <FaSmile className="text-4xl mb-4" />
            <DialogTitle className="text-2xl mb-2">Thank You!</DialogTitle>
            <DialogDescription className="text-center text-gray-700">
              You have submitted an average rating of {averageRating.toFixed(1)}{" "}
              stars to this event organizer.
            </DialogDescription>
            <Button
              variant="default"
              className="mt-6"
              onClick={() => setIsThankYouOpen(false)}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
      {isEventPassOpen && (
        <Dialog open={isEventPassOpen} onOpenChange={setIsEventPassOpen}>
          <DialogContent
            id="Event_pass"
            className="w-[90%] max-w-md flex flex-col items-center h-auto p-4 rounded-md"
          >
            <div
              className="w-full h-96 bg-cover bg-center rounded-lg shadow-xl flex items-center justify-center relative"
              style={{
                backgroundImage: "url(/images/Asset_Background_VenuePass.svg)",
              }}
            >
              <Image
                src="/images/Card_VenuePass.svg"
                priority
                width={600}
                height={600}
                alt="Event Ticket"
                className="absolute w-[95%] sm:w-[90%] h-[50%] sm:h-[55%] rounded-lg  bottom-0"
              />
              <div className="absolute -bottom-6 sm:bottom-0 w-[90%] h-[55%] px-4 flex flex-col gap-1 py-4">
                <div className=" leading-tight">
                  <p className="text-[10px] sm:text-[12px] font-semibold text-[#64758B]">
                    Event Name
                  </p>
                  <h1 className="text-[11px] sm:text-[14px]">
                    {event.event_name}
                  </h1>
                </div>
                <div className=" leading-tight">
                  <p className="text-[10px] sm:text-[12px] font-semibold text-[#64758B]">
                    Category Name
                  </p>
                  <h1 className="text-[11px] sm:text-[14px]">
                    {registeredCategories[0].category_name}
                  </h1>
                </div>
                <div className=" leading-tight">
                  <p className="text-[10px] sm:text-[12px] font-semibold text-[#64758B]">
                    Player
                  </p>
                  <h1 className="text-[11px] sm:text-[14px]">
                    {userDetails.full_name}
                  </h1>
                </div>
                <div className=" leading-tight">
                  <p className="text-[10px] sm:text-[12px] font-semibold text-[#64758B]">
                    {participantdetails ? "Partner Name" : "Team Name"}
                  </p>
                  <h1 className="text-[11px] sm:text-[14px]">
                    {participantdetails
                      ? participantdetails.partner_name
                      : teamDetails.team_name}
                  </h1>
                </div>
                <div className=" leading-tight">
                  <p className="text-[10px] sm:text-[12px] font-semibold text-[#64758B]">
                    Venue
                  </p>
                  <h1 className="text-[11px] sm:text-[14px]">
                    {event.venue_name}
                  </h1>
                </div>
              </div>
              <div className="absolute bottom-0 w-[90%] h-[55%] ">
                <div className="leading-tight -rotate-90 absolute -right-6 bottom-16 ">
                  <p className="text-[10px] sm:text-[12px] font-semibold text-[#64758B]">
                    Event Date
                  </p>
                  <h1 className="text-[11px] sm:text-[14px]">
                    {formatDate(event.start_date)}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <Button
                variant="default"
                className=""
                onClick={() => setIsEventPassOpen(false)}
              >
                Close
              </Button>
              <Button variant="default" className="" onClick={downloadImage}>
                Download
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}