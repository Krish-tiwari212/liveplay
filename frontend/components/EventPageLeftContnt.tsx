"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { BiLike } from 'react-icons/bi'
import { IoLocationSharp, IoShareSocialSharp } from 'react-icons/io5'
import EventCategoryCard from './EventCategoryCard'
import QnaSectionEventpage from './QnaSectionEventpage'
import { Badge } from './ui/badge'
import { RiDiscountPercentLine, RiStarSmileFill } from 'react-icons/ri'
import { CalendarIcon, Copy } from 'lucide-react'
import { VscGraph } from 'react-icons/vsc'
import { HiCurrencyRupee } from 'react-icons/hi2'
import { FaBasketballBall, FaStar } from 'react-icons/fa'
import { MdCategory } from 'react-icons/md'
import { GrTrophy } from 'react-icons/gr'
import { GiEntryDoor, GiShuttlecock, GiWhistle } from 'react-icons/gi'
import { usePathname, useRouter } from 'next/navigation'
import { PiHandWithdraw } from 'react-icons/pi'
import Link from 'next/link'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { toast } from '@/hooks/use-toast'
import CountdownTimer from './Countdown'

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

const EventPageLeftContent = ({ eventDetails, eventId }: { eventDetails: EventDetails; eventId: string }) => {
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

  return (
    <div className="w-full lg:w-2/3 relative h-full">
      <div className="w-full h-full">
        <Image
          src={eventDetails.desktop_cover_image_url || "/images/img2.jpeg"}
          alt="Event Poster"
          className="object-cover w-full h-64 sm:h-96 lg:h-[500px] rounded-lg"
          width={1920}  // Increased width for better quality
          height={1080} // Increased height for better quality
          priority      // Prioritizes this image's loading
          quality={100} // Maximum image quality
          sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 66vw,
                50vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
      <div className="flex w-full flex-col md:flex-row justify-between items-center my-4 space-y-4 md:space-y-0">
        <h1
          className="text-xl font-semibold text-center lg:text-left"
          style={{ textShadow: "0 3px 0 #cddc29" }}
        >
          {eventDetails.event_name}
        </h1>

        <div className="flex justify-center md:justify-between gap-2 xl:gap-12">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsLiked(!isLiked)}
            className={`border-2 shadow-lg border-black flex items-center ${
              isLiked ? "bg-[#ccdb28] text-black" : ""
            }`}
          >
            <h1 className="mr-1">{isLiked ? "Liked" : "Like"}</h1> <BiLike />
          </Button>
          
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
                    defaultValue={`https://www.liveplay.in${path}`}
                    readOnly
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="px-3"
                  onClick={() => handleCopy(`https://www.liveplay.in${path}`)}
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
          <CountdownTimer targetDate={eventDetails.start_date} targetTime={eventDetails.start_time} />
        )}
      </div>

      {/* Mobile View Event Information */}
      <div className="lg:hidden border-2 border-[#141F29] p-4 rounded-lg text-[#141F29] my-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 line-clamp-2">
          {eventDetails.event_name}
        </h1>
        // ... continuing from Part 2

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
        </div>

        <div className="space-y-4">
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

        {/* Categories Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Event Categories</h2>
          <div className="grid grid-cols-1 gap-4">
            {eventDetails.categories.map((category) => (
              <EventCategoryCard key={category.id} event={category} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View Event Information */}
      <div className="hidden lg:block w-full relative h-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Event Information</h1>
            <h2 className="mb-4">
              Total Registrations: {eventDetails.totalRegistrations || 0}
              <Link
                href={`/eventregistrationpage/${eventId}`}
                className="text-blue-600 ml-2 hover:underline"
              >
                View player names
              </Link>
            </h2>
          </div>
          <Link href={`/playerdashboard`}>
            <div className="mr-5">
              <h1 className="text-blue-400 hover:underline text-2xl cursor-pointer">
                Already Registered?
              </h1>
            </div>
          </Link>
        </div>

        {/* Location Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Location</h3>
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
          <h3 className="text-xl font-bold mb-2">Description</h3>
          <p className="whitespace-pre-line">{eventDetails.event_description}</p>
        </div>

        {/* Event Categories Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Event Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventDetails.categories.map((category) => (
              <EventCategoryCard key={category.id} event={category} />
            ))}
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Rewards</h3>
          <div className="mb-4">
            <p className="whitespace-pre-line">{eventDetails.rewards_for_participants}</p>
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
              <p className="whitespace-pre-line">{eventDetails.additional_details}</p>
            </div>
          </div>
        )}

        {/* Organizer Contact Information */}
        <div className="mb-6">
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
        </div>
      </div>

      {/* QnA Section */}
      {eventDetails.show_qna && (
        <QnaSectionEventpage isright={false} eventId={eventId} />
      )}
    </div>
  );
};

export default EventPageLeftContent;