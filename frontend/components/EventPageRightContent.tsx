import Image from "next/image";
import React from "react";
import { FaBasketballBall, FaRegHandshake, FaRunning, FaStar, FaUsers } from "react-icons/fa";
import { GiEntryDoor, GiShuttlecock, GiWhistle } from "react-icons/gi";
import { GrTrophy } from "react-icons/gr";
import { MdCategory } from "react-icons/md";
import { RiDiscountPercentLine, RiStarSmileFill } from "react-icons/ri";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HiCurrencyRupee } from "react-icons/hi2";
import { VscGraph } from "react-icons/vsc";
import { IoLocationSharp, IoPeople, IoPerson, IoShareSocialSharp } from "react-icons/io5";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import QnaSectionEventpage from "./QnaSectionEventpage";
import EventCategoryCard from "./EventCategoryCard";
import { BiLike } from "react-icons/bi";
import { PiHandWithdraw } from "react-icons/pi";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPeopleGroup } from "react-icons/fa6";

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


const EventPageRightContent = ({
  eventDetails,
  eventId,
}: {
  eventDetails: EventDetails;
  eventId: string;
}) => {
  const path = usePathname();
  const router = useRouter();
  const [averageRating, setAverageRating] = useState(0);
  const [eventsHosted, setEventsHosted] = useState(0);
  const [hostingSince, setHostingSince] = useState<string | null>(null);
  const [sponsors, setSponsors] = useState<string[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSponsors = async () => {
      const { data: sponsors, error: sponsorsError } = await supabase
        .from('sponsors')
        .select('*')
        .eq('event_id', eventId);

      if (sponsorsError) {
        console.error('Error fetching sponsors:', sponsorsError);
        return;
      }
      console.log(sponsors);
      setSponsors(sponsors);
    };

    fetchSponsors();
  }, [eventId]);

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
    <div className="w-full lg:w-1/3 flex flex-col gap-4">
      <div className="hidden lg:block border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
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
              {new Date(eventDetails.last_withdrawal_date).toLocaleDateString()}
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
                {eventDetails.categories.reduce(
                  (total, cat) => total + cat.total_quantity,
                  0
                )}
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
      </div>

      {/* Event Features */}
      <div className="hidden lg:block border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
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
            <MdCategory className="h-4 w-4 sm:h-5 sm:w-5" />
            Number of Categories:
            <strong className="font-normal">
              {eventDetails.categories.length}+
            </strong>
          </span>
          <button
            onClick={() => scrollToSection("Event_Categories1")}
            className="text-xs sm:text-sm text-blue-500 hover:underline mb-1 md:mb-0 md:mt-1"
          >
            (View Categories)
          </button>
        </div>
        <div className="flex flex-col md:flex-row my-4">
          <span className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
            <GrTrophy className="h-4 w-4 sm:h-5 sm:w-5" />
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
                    className="mb-2 object-contain"
                  />
                  <span className="text-[11px]  md:text-sm leading-none">
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Event Organizer */}
      <div className="hidden lg:block border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
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
      <div className="w-full lg:hidden relative h-auto sm:h-auto lg:h-auto">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Event Information</h1>
          <h2 className="mb-4">
            Total Registrations:{" "}
            {eventDetails.categories.reduce(
              (total, cat) => total + cat.total_quantity,
              0
            )}
            <Link
              href={`/eventregistrationpage?event_id=${eventId}`}
              className="text-blue-600 ml-2 hover:underline"
            >
              View player names
            </Link>
          </h2>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Location</h3>
          <p>
            {eventDetails.venue_name}{" "}
            <Link href={eventDetails.venue_link || "/location"}>
              <span className="text-blue-400">(Click here)</span>
            </Link>
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Description</h3>
          <p>{eventDetails.event_description}</p>
        </div>
        <div className="mb-6 lg:hidden" id="Event_Categories">
          <h3 className="text-xl font-bold mb-2">Event Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventDetails.categories.map((category, index) => (
              <>
                {console.log(category)}
                <EventCategoryCard key={index} event={category} />
              </>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Rewards</h3>
          <div className="mb-4">
            <p className="whitespace-pre-line">
              {eventDetails.rewards_for_participants}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Rules</h3>
          <div className="mb-4">
            <p className="whitespace-pre-line">{eventDetails.playing_rules}</p>
          </div>
        </div>
      </div>
      {eventDetails.show_qna && (
        <QnaSectionEventpage isright={true} eventId={eventId} />
      )}
    </div>
  );
};

export default EventPageRightContent;
