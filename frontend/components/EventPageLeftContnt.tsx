"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { BiLike } from "react-icons/bi";
import { IoInformationCircle, IoLocationSharp, IoPeople, IoPerson, IoShareSocialSharp } from "react-icons/io5";
import EventCategoryCard from "./EventCategoryCard";
import QnaSectionEventpage from "./QnaSectionEventpage";
import { Badge } from "./ui/badge";
import { RiDiscountPercentLine, RiStarSmileFill } from "react-icons/ri";
import { CalendarIcon, Copy } from "lucide-react";
import { VscGraph } from "react-icons/vsc";
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaBasketballBall, FaRegHandshake, FaRunning, FaStar, FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { GrTrophy } from "react-icons/gr";
import { GiEntryDoor, GiShuttlecock, GiWhistle } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";
import { PiHandWithdraw } from "react-icons/pi";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import CountdownTimer from "./Countdown";
import EventPageRightContent from "./EventPageRightContent";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface EventCategory {
  id: number;
  event_id: string;
  category_name: string;
  total_quantity: number;
  max_ticket_quantity: number;
  price: number;
  ticket_description: string;
  discount_code: string;
  category_type: string;
  number_of_discounts: number;
  percentage_input: number;
  from_date: string;
  till_date: string;
  discount_value: number;
  amount_input: number;
  max_age: number;
  min_age: number;
  gender: string;
  has_discount: boolean;
  discount_type: string;
  discount_start_date: string;
  discount_end_date: string;
  age_range_option: string;
}

interface EventDetails {
  id: string;
  event_name: string;
  organizer_contact_number: string;
  organizer_email: string;
  start_date: string;
  end_date: string;
  last_registration_date: string;
  last_withdrawal_date: string;
  venue_name: string;
  street_address: string;
  additional_details: string;
  city: string;
  pincode: string;
  venue_not_decided: boolean;
  map_view: string;
  event_description: string;
  event_usp: string;
  rewards_for_participants: string;
  playing_rules: string;
  desktop_cover_image_url: string;
  mobile_cover_image_url: string;
  start_time: string;
  countdown: boolean;
  enable_fixtures: boolean;
  sport: string;
  venue_link: string;
  selected_plan: string;
  organizer_id: string;
  website_link: string;
  insta_link: string;
  state: string;
  cash_price_pool: string;
  want_tshirts: boolean;
  show_qna: boolean;
  gst_compliance: boolean;
  status: string;
  organizer_name: string;
  categories: EventCategory[];
}

const EventPageLeftContent = ({
  eventDetails,
  eventId,
}: {
  eventDetails: EventDetails;
  eventId: string;
}) => {
  const path = usePathname();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

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

  const getFullLocation = () => {
    return `${eventDetails.venue_name}, ${eventDetails.street_address}, ${eventDetails.city}, ${eventDetails.state}, ${eventDetails.pincode}`;
  };

  const [averageRating, setAverageRating] = useState(0);
  const [eventsHosted, setEventsHosted] = useState(0);
  const [hostingSince, setHostingSince] = useState<string | null>(null);
  const supabase = createClient();
  const [likeCount, setLikeCount] = useState(0);
  const [session, setSession] = useState(null);
  const [sponsors, setSponsors] = useState<string[]>([]);
  const [registrations, setRegistrations] = useState(0);

  useEffect(() => {
    const getRegistrations = async () => {
      const { data, error } = await supabase
        .from("participants")
        .select("*")
        .eq("event_id", eventId);

      if (error) {
        console.error("Error fetching registrations:", error);
        return;
      }
      setRegistrations(data.length);
    };
    getRegistrations();
  }, [eventId]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const { data: sponsors, error: sponsorsError } = await supabase
        .from("sponsors")
        .select("*")
        .eq("event_id", eventId);

      if (sponsorsError) {
        console.error("Error fetching sponsors:", sponsorsError);
        return;
      }
      console.log(sponsors);
      setSponsors(sponsors);
    };

    fetchSponsors();
  }, [eventId]);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      setSession(currentSession);
    };

    checkSession();
  }, []);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!session) return;

      const user = session.user;
      if (!user) return;

      const { data, error } = await supabase
        .from("user_event_likes")
        .select("*")
        .eq("user_id", user.id)
        .eq("event_id", eventDetails.id)
        .single();

      if (error) {
        return;
      }

      if (data) {
        setIsLiked(true);
      }
    };

    const fetchLikeCount = async () => {
      const { data, error } = await supabase
        .from("user_event_likes")
        .select("*", { count: "exact" })
        .eq("event_id", eventDetails.id);

      if (error) {
        return;
      }

      setLikeCount(data.length);
    };

    fetchLikeStatus();
    fetchLikeCount();
  }, [eventDetails.id, supabase, session]);

  const handleLike = async () => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    const user = session.user;
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    if (isLiked) {
      const { error } = await supabase
        .from("user_event_likes")
        .delete()
        .eq("user_id", user.id)
        .eq("event_id", eventDetails.id);

      if (error) {
        return;
      }

      setLikeCount(likeCount - 1);
    } else {
      const { error } = await supabase.from("user_event_likes").insert([
        {
          user_id: user.id,
          event_id: eventDetails.id,
        },
      ]);

      if (error) {
        return;
      }

      setLikeCount(likeCount + 1);
    }

    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const { data: feedback, error: feedbackError } = await supabase
        .from('feedback')
        .select('*')
        .eq('event_id', eventId);

      if (feedbackError) {
        console.error('Error fetching feedback:', feedbackError);
        return;
      }

      const totalRatings = feedback.reduce((acc, curr) => acc + curr.rating, 0);
      const avgRating = feedback.length ? totalRatings / feedback.length : 0;
      setAverageRating(avgRating);

      const { data: organizerEvents, error: organizerEventsError } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', eventDetails.organizer_id);

      if (organizerEventsError) {
        console.error('Error fetching organizer events:', organizerEventsError);
        return;
      }

      setEventsHosted(organizerEvents.length);
      setHostingSince(organizerEvents.length ? organizerEvents[0].created_at : null);
    };

    fetchDetails();
  }, [eventId]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full lg:w-2/3 relative h-full">
      <div className="w-full h-full">
        <Image
          src={eventDetails.desktop_cover_image_url || "/images/img2.jpeg"}
          alt="Event Poster"
          className="object-cover w-full h-64 sm:h-96 lg:h-[500px] rounded-lg"
          width={1920}
          height={1080}
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 66vw,
                50vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="flex w-full flex-col md:flex-row justify-between  items-center my-4 space-y-4 md:space-y-0">
        <h1
          className="text-2xl font-semibold text-center lg:text-left"
          style={{ textShadow: "0 3px 0 #cddc29" }}
        >
          {eventDetails.event_name}
        </h1>

        <div className="flex justify-center md:justify-between gap-2 xl:gap-8">
          <div className="flex gap-2 justify-center items-center">
            <Button
              variant="outline"
              size="xs"
              className={`text-[12px] border-2 shadow-lg border-black hover:bg-[#ccdb28] hover:text-black flex justify-center items-center gap-1 px-2 ${
                isLiked ? "bg-[#ccdb28] text-black" : ""
              }`}
              onClick={handleLike}
            >
              {isLiked ? "Liked" : "Like"}
              <BiLike className="" />
            </Button>
            <p className="text-[12px] mt-[0.4rem] text-gray-500">
              {likeCount} Likes
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-2 shadow-lg border-black flex items-center"
              >
                <h1 className="mr-1">Share</h1> <IoShareSocialSharp />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md h-auto">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={`${window.location.origin}/eventspage?event_id=${eventId}`}
                    readOnly
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="px-3"
                  onClick={() =>
                    handleCopy(
                      `${window.location.origin}/eventspage?event_id=${eventId}`
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

          <Button
            size="sm"
            variant="outline"
            className="border-2 shadow-lg border-black"
          >
            View Matches
          </Button>
        </div>

        {eventDetails.countdown && (
          <CountdownTimer
            targetDate={eventDetails.start_date}
            targetTime={eventDetails.start_time}
          />
        )}
      </div>

      <div className=" w-full lg:w-1/3 flex flex-col gap-4">
        <div className="bloc lg:hidden border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 line-clamp-2">
            {eventDetails.event_name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base">
              {eventDetails.sport}
            </Badge>
            <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base">
              {eventDetails.selected_plan}
            </Badge>
            {eventDetails.categories.some((cat) => cat.has_discount) && (
              <Badge className="bg-[#E6EAC5] text-[#F3524F] text-sm sm:text-base flex items-center">
                <RiDiscountPercentLine className="mr-2" />
                Early Bird Discount
              </Badge>
            )}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">
                {new Date(eventDetails.start_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                | {eventDetails.start_time} onwards
              </span>
            </div>
            <div className="flex items-center">
              <GiEntryDoor className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">
                Last Date to Register:{" "}
                {new Date(
                  eventDetails.last_registration_date
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <PiHandWithdraw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">
                Last Date to Withdraw:{" "}
                {new Date(
                  eventDetails.last_withdrawal_date
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <IoLocationSharp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">
                {eventDetails.venue_name}
              </span>
            </div>
            <Link
              href={`/eventregistrationpage?event_id=${eventId}`}
              className="flex items-center gap-1 cursor-pointer"
            >
              <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap">
                <VscGraph className="w-4 h-4 sm:w-5 sm:h-5  mr-1" />
                <span className="text-sm sm:text-base">Registrations:</span>
                <span className="text-blue-600 text-sm sm:text-base">
                  {registrations || 0}
                </span>
              </div>
            </Link>
            <div className="flex items-center">
              <HiCurrencyRupee className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base  mr-2">Starting From:</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold">
                ₹{Math.min(...eventDetails.categories.map((cat) => cat.price))}
              </span>
            </div>
          </div>
          <Link href={`/choosecategory/${eventId}`}>
            <Button
              variant="tertiary"
              className="w-full border-2 border-black py-8 text-xl"
            >
              Register Now
            </Button>
          </Link>
          <Link href={`/playerdashboard`}>
            <div className="mr-5 flex gap-2 justify-center items-center w-full py-2">
              <h1 className="text-blue-400 hover:underline text-xl cursor-pointer">
                Already Registered?
              </h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <IoInformationCircle className="text-2xl " />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#141f29] text-[#ccdb28]">
                    <p>Enter Team / Doubles Pair Code in your Dashboard.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Link>
        </div>
        <div className="block lg:hidden border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            Event Features
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {/* Create a Set to filter out duplicates */}
            {Array.from(
              new Set(eventDetails.categories.map((cat) => cat.category_type))
            ).map((categoryType) => {
              let icon;

              // Determine which icon to use based on the category_type
              switch (categoryType) {
                case "Team":
                  icon = <FaPeopleGroup className="mr-2" />;
                  break;
                case "Doubles":
                  icon = <IoPeople className="mr-2" />;
                  break;
                case "Singles":
                  icon = <IoPerson className="mr-2" />;
                  break;
                default:
                  icon = <FaBasketballBall className="mr-2" />;
                  break;
              }

              return (
                <Badge
                  key={categoryType}
                  className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base flex items-center"
                >
                  {icon}
                  {categoryType}
                </Badge>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row my-4">
            <span className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
              <MdCategory className="mr-2 text-xl" />
              Number of Categories:
              <strong className="font-normal">
                {eventDetails.categories.length}+
              </strong>
            </span>
            <button
              onClick={() => scrollToSection("Event_Categories")}
              className="text-xs sm:text-sm text-blue-500 hover:underline mb-1 md:mb-0 md:mt-1"
            >
              (View Categories)
            </button>
          </div>
          <div className="flex flex-col md:flex-row my-4">
            <span className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
              <GrTrophy className="mr-2 text-xl" />
              Cash Prize Pool:
              <strong className="font-normal">
                ₹{eventDetails.cash_price_pool}
              </strong>
            </span>
          </div>
          <div className="my-4">
            <h3 className="text-base sm:text-lg md:text-xl font-bold flex items-center mb-2">
              <FaStar className="mr-2 text-2xl" /> Event USP
            </h3>
            <ul className="space-y-2 ml-8">
              {eventDetails.event_usp.split("\n").map((usp, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm sm:text-base"
                >
                  {usp}
                </li>
              ))}
            </ul>
          </div>
          {sponsors.length > 0 ? (
            <div className="my-4">
              <h3 className="text-base sm:text-lg md:text-xl font-bold flex items-center mb-2">
                <RiStarSmileFill className="mr-2 text-2xl" /> Sponsored By
              </h3>
              {sponsors.length && (
                <div className="grid grid-cols-3 gap-4 ml-6">
                  {sponsors.map((sponsor, index) => (
                    <div key={index} className="rounded-lg flex flex-col p-4">
                      <Image
                        src={sponsor.image_url}
                        alt={sponsor.name}
                        width={60}
                        height={60}
                        className="mb-2 object-contain border border-black"
                      />
                      <span className="text-[11px]  md:text-sm leading-none">
                        {sponsor.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* Event Organizer */}
        <div className="block lg:hidden border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            Event Organizer
          </h1>
          <div className="flex flex-row items-center md:items-start gap-4 mb-4">
            <Image
              src={`https://robohash.org/${eventDetails.organizer_id}.png`}
              alt="Organizer Image"
              width={150}
              height={150}
              className="rounded-full w-20 sm:w-24 h-20 sm:h-24 object-cover"
            />
            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold mb-2">
                {eventDetails.organizer_name}
              </h1>
              <Image
                src="/images/EliteBadgeDark.svg"
                alt="Elite Badge"
                width={100}
                height={100}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
              Ratings:
              <span className="font-normal">{averageRating.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
              Events Hosted:
              <span className="font-normal">{eventsHosted}</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
              Hosting Since:
              <span className="text-blue-600 font-normal">
                {new Date(hostingSince).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
              Phone:
              <span className="text-blue-600 font-normal">
                {eventDetails.organizer_contact_number}
              </span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
              Email:
              <span className="text-blue-600 font-normal">
                {eventDetails.organizer_email}
              </span>
            </div>
            {eventDetails.website_link && (
              <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
                Website:
                <span className="text-blue-600 font-normal">
                  {eventDetails.website_link}
                </span>
              </div>
            )}
            {eventDetails.insta_link && (
              <Link
                href={`https://www.instagram.com/${eventDetails.insta_link.replace(
                  "@",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base"
              >
                <Image
                  src="/icons/image 60.svg"
                  alt="Instagram Icon"
                  width={16}
                  height={16}
                  className="sm:w-5 sm:h-5"
                />
                <span className="text-blue-600 font-normal">Instagram</span>
              </Link>
            )}
          </div>
        </div>

        {/* <div className="lg:hidden border-2 border-[#141F29] p-4 rounded-lg text-[#141F29] my-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 line-clamp-2">
          {eventDetails.event_name}
        </h1>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base">
            {eventDetails.sport}
          </Badge>
          <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base">
            {eventDetails.selected_plan}
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold">Start Date</p>
              <p className="text-xs sm:text-sm">{eventDetails.start_date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold">End Date</p>
              <p className="text-xs sm:text-sm">{eventDetails.end_date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IoLocationSharp className="w-5 h-5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold">Location</p>
              <p className="text-xs sm:text-sm">{getFullLocation()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GiEntryDoor className="w-5 h-5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold">Last Registration</p>
              <p className="text-xs sm:text-sm">{eventDetails.last_registration_date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PiHandWithdraw className="w-5 h-5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold">Last Withdrawal</p>
              <p className="text-xs sm:text-sm">{eventDetails.last_withdrawal_date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HiCurrencyRupee className="w-5 h-5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold">Cash Prize Pool</p>
              <p className="text-xs sm:text-sm">₹{eventDetails.cash_price_pool}</p>
            </div>
          </div>
        </div> */}

        {/* <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-sm sm:text-base">{eventDetails.event_description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Event USP</h2>
            <p className="text-sm sm:text-base">{eventDetails.event_usp}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Rewards</h2>
            <p className="text-sm sm:text-base whitespace-pre-line">
              {eventDetails.rewards_for_participants}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Rules</h2>
            <p className="text-sm sm:text-base whitespace-pre-line">
              {eventDetails.playing_rules}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Event Categories</h2>
          <div className="grid grid-cols-1 gap-4">
            {eventDetails.categories.map((category) => (
              <EventCategoryCard key={category.id} event={category} />
            ))}
          </div>
        </div> */}
      </div>
      <div className="hidden lg:block w-full relative h-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Event Information</h1>
            <h2 className="mb-4">
              Total Registrations: {registrations || 0}
              <Link
                href={`/eventregistrationpage?event_id=${eventId}`}
                className="text-blue-600 ml-2 hover:underline"
              >
                View player names
              </Link>
            </h2>
          </div>
          <Link href={`/playerdashboard`}>
            <div className="mr-5 flex gap-2">
              <h1 className="text-blue-400 hover:underline text-2xl cursor-pointer">
                Already Registered?
              </h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <IoInformationCircle className="text-2xl " />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#141f29] text-[#ccdb28]">
                    <p>Enter Team / Doubles Pair Code in your Dashboard.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Link>
        </div>

        {/* Location Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Location</h3>
          {eventDetails.venue_not_decided ? (
            <p>Venue to be announced</p>
          ) : (
            <Link href={eventDetails.venue_link || "/location"}>
              <p className="hover:underline hover:text-blue-400">
                {getFullLocation()}
              </p>
            </Link>
          )}
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Description</h3>
          <p className="whitespace-pre-line text-lg">
            {eventDetails.event_description}
          </p>
        </div>

        {/* Event Categories Section */}
        <div className="mb-6" id="Event_Categories1">
          <h3 className="text-2xl font-bold mb-2">Event Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
            {eventDetails.categories.map((category) => (
              <EventCategoryCard key={category.id} event={category} />
            ))}
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Rewards</h3>
          <div className="mb-4">
            <p className="whitespace-pre-line">
              {eventDetails.rewards_for_participants}
            </p>
          </div>
        </div>

        {/* Rules Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Rules</h3>
          <div className="mb-4">
            <p className="whitespace-pre-line">{eventDetails.playing_rules}</p>
          </div>
        </div>

        {/* Additional Details */}
        {eventDetails.additional_details && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Additional Information</h3>
            <div className="mb-4">
              <p className="whitespace-pre-line">
                {eventDetails.additional_details}
              </p>
            </div>
          </div>
        )}

        {/* Organizer Contact Information */}
        {/* <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Contact Information</h3>
          <div className="space-y-2">
            <p>Phone: {eventDetails.organizer_contact_number}</p>
            <p>Email: {eventDetails.organizer_email}</p>
            {eventDetails.website_link && (
              <p>
                Website:{" "}
                <a 
                  href={eventDetails.website_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {eventDetails.website_link}
                </a>
              </p>
            )}
            {eventDetails.insta_link && (
              <p>
                Instagram:{" "}
                <a 
                  href={eventDetails.insta_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {eventDetails.insta_link}
                </a>
              </p>
            )}
          </div>
        </div> */}
      </div>
      {eventDetails.show_qna && (
        <QnaSectionEventpage isright={false} eventId={eventId} />
      )}
    </div>
  );
};

export default EventPageLeftContent;
