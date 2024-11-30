import Image from 'next/image';
import React from 'react'
import { FaBasketballBall, FaStar } from 'react-icons/fa';
import { GiEntryDoor, GiShuttlecock, GiWhistle } from 'react-icons/gi';
import { MdCategory } from 'react-icons/md';
import { RiDiscountPercentLine, RiStarSmileFill } from 'react-icons/ri';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { VscGraph } from 'react-icons/vsc';
import { IoLocationSharp } from 'react-icons/io5';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import QnaSectionEventpage from './QnaSectionEventpage';
import Link from 'next/link';

interface EventCategory {
  id: number;
  category_name: string;
  price: number;
  category_type: string;
  has_discount: boolean;
  discount_type: string;
  discount_value: number;
}

interface EventDetails {
  id: string;
  event_name: string;
  sport: string;
  start_date: string;
  end_date: string;
  start_time: string;
  last_registration_date: string;
  last_withdrawal_date: string;
  venue_name: string;
  city: string;
  cash_price_pool: string;
  event_usp: string;
  categories: EventCategory[];
  show_qna: boolean;
  organizer_name: string;
}

const EventPageRightContent = ({ eventDetails }: { eventDetails: EventDetails }) => {
  const router = useRouter();
  
  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-4">
      {/* Main Event Info */}
      <div className="hidden lg:block border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 line-clamp-2">
          {eventDetails.event_name}
        </h1>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base">
            {eventDetails.sport}
          </Badge>
          {eventDetails.categories.some(cat => cat.has_discount) && (
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
              {new Date(eventDetails.start_date).toLocaleDateString()} | {eventDetails.start_time}
            </span>
          </div>
          <div className="flex items-center">
            <GiEntryDoor className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">
              Last Date to Register: {new Date(eventDetails.last_registration_date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <IoLocationSharp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">
              {eventDetails.venue_name}, {eventDetails.city}
            </span>
          </div>
          <div className="flex items-center">
            <HiCurrencyRupee className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base mr-2">Starting From:</span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold">
              ₹{Math.min(...eventDetails.categories.map(cat => cat.price))}
            </span>
          </div>
        </div>

        <Button
          onClick={() => router.push(`/choosecategory/${eventDetails.id}`)}
          variant="tertiary"
          className="w-full border-2 border-black py-8 text-xl"
        >
          Register Now
        </Button>
      </div>

      {/* Event Features */}
      <div className="hidden lg:block border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Event Features
        </h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from(new Set(eventDetails.categories.map(cat => cat.category_type))).map((type) => (
            <Badge key={type} className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base flex items-center">
              <FaBasketballBall className="mr-2" />
              {type}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col md:flex-row my-4">
          <span className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
            <MdCategory className="h-4 w-4 sm:h-5 sm:w-5" />
            Number of Categories:
            <strong className="font-normal">{eventDetails.categories.length}</strong>
          </span>
        </div>

        {eventDetails.cash_price_pool && (
          <div className="flex flex-col md:flex-row my-4">
            <span className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
              <FaStar className="h-4 w-4 sm:h-5 sm:w-5" />
              Cash Prize Pool:
              <strong className="font-normal">₹{eventDetails.cash_price_pool}</strong>
            </span>
          </div>
        )}

        {eventDetails.event_usp && (
          <div className="my-4">
            <h3 className="text-base sm:text-lg md:text-xl font-bold flex items-center mb-2">
              <FaStar className="mr-2 text-2xl" /> Event USP
            </h3>
            <p className="text-sm sm:text-base ml-6">{eventDetails.event_usp}</p>
          </div>
        )}
      </div>

      {/* Event Organizer */}
      <div className="hidden lg:block border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Event Organizer
        </h1>
        <div className="flex flex-row items-center md:items-start gap-4 mb-4">
          <Image
            src="/images/EventPoster.svg"
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
      </div>

      {eventDetails.show_qna && <QnaSectionEventpage isright={true} eventId={eventDetails.id} />}
    </div>
  );
};

export default EventPageRightContent;