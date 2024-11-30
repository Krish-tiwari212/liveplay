import Image from 'next/image';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { BiLike } from 'react-icons/bi';
import { IoLocationSharp, IoShareSocialSharp } from 'react-icons/io5';
import { Badge } from './ui/badge';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { CalendarIcon } from 'lucide-react';
import { VscGraph } from 'react-icons/vsc';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { GiEntryDoor } from 'react-icons/gi';
import { PiHandWithdraw } from 'react-icons/pi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QnaSectionEventpage from './QnaSectionEventpage';
import { useToast } from '@/hooks/use-toast';

interface EventCategory {
  id: number;
  category_name: string;
  price: number;
  ticket_description: string;
  has_discount: boolean;
  discount_type: string;
  discount_value: number;
  gender: string;
  min_age: number;
  max_age: number;
}

interface EventDetails {
  id: string;
  event_name: string;
  organizer_name: string;
  desktop_cover_image_url: string;
  mobile_cover_image_url: string;
  start_date: string;
  end_date: string;
  start_time: string;
  last_registration_date: string;
  last_withdrawal_date: string;
  venue_name: string;
  city: string;
  street_address: string;
  event_description: string;
  event_usp: string;
  playing_rules: string;
  rewards_for_participants: string;
  sport: string;
  countdown: boolean;
  show_qna: boolean;
  categories: EventCategory[];
}

const EventPageLeftContnt = ({ eventDetails }: { eventDetails: EventDetails }) => {
  const router = useRouter();
  const { toast } = useToast();
  const lowestPrice = Math.min(...eventDetails.categories.map(cat => cat.price));

  const handleShare = async () => {
    try {
      await navigator.share({
        title: eventDetails.event_name,
        text: eventDetails.event_description,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard!",
        description: "You can now share it with others",
      });
    }
  };

  return (
    <div className="w-full lg:w-2/3 relative h-full">
      {/* Event Image */}
      <div className="w-full h-full">
        <Image
          src={eventDetails.desktop_cover_image_url || '/images/default-event.jpg'}
          alt={eventDetails.event_name}
          className="object-cover w-full h-64 sm:h-96 lg:h-[500px] rounded-lg"
          width={1200}
          height={800}
          priority
        />
      </div>

      {/* Like and Share Section */}
      <div className="flex w-full flex-col md:flex-row justify-between items-center my-4 space-y-4 md:space-y-0">
        <div className="flex justify-center md:justify-between gap-2 xl:gap-12">
          <Button
            size="sm"
            variant="outline"
            className="border-2 shadow-lg border-black flex items-center"
            onClick={handleShare}
          >
            <h1 className="mr-1">Share</h1> <IoShareSocialSharp />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-2 shadow-lg border-black"
            onClick={() => router.push(`/event/${eventDetails.id}/matches`)}
          >
            View Matches
          </Button>
        </div>

        {eventDetails.countdown && (
          <div className="flex justify-center items-center gap-4 bg-[#E6EAC5] px-4 rounded py-2 w-full md:w-auto">
            <h1 className="font-semibold text-center">Countdown</h1>
            <CountdownTimer targetDate={new Date(eventDetails.start_date)} />
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="border-2 border-[#141F29] p-4 rounded-lg text-[#141F29] my-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
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
            <PiHandWithdraw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">
              Last Date to Withdraw: {new Date(eventDetails.last_withdrawal_date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <IoLocationSharp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">
              {eventDetails.venue_name}, {eventDetails.street_address}, {eventDetails.city}
            </span>
          </div>
          <div className="flex items-center">
            <HiCurrencyRupee className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base mr-2">Starting From:</span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold">
              ₹{lowestPrice}
            </span>
          </div>
        </div>

        <div>
          <Link href={`/choosecategory/${eventDetails.id}`}>
            <Button
              variant="tertiary"
              className="w-full border-2 border-black py-8 text-xl"
            >
              Register Now
            </Button>
          </Link>
          <Link href={`/event/${eventDetails.id}/registration-status`}>
            <p className="text-xl hover:underline text-blue-400 text-center mt-2">
              Already Registered?
            </p>
          </Link>
        </div>
      </div>

      {/* Event Description Section */}
      <div className="hidden lg:block space-y-6 mt-8">
        <section>
          <h2 className="text-xl font-bold mb-2">Event Description</h2>
          <p className="text-gray-700">{eventDetails.event_description}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">Event Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {eventDetails.categories.map((category) => (
              <div key={category.id} className="border p-4 rounded-lg">
                <h3 className="font-bold">{category.category_name}</h3>
                <p className="text-sm text-gray-600">{category.ticket_description}</p>
                <div className="mt-2">
                  <span className="font-bold">₹{category.price}</span>
                  {category.has_discount && (
                    <span className="text-green-600 ml-2">
                      {category.discount_type === 'percentage' 
                        ? `${category.discount_value}% off`
                        : `₹${category.discount_value} off`}
                    </span>
                  )}
                </div>
                {category.gender && (
                  <p className="text-sm mt-1">Gender: {category.gender}</p>
                )}
                {(category.min_age || category.max_age) && (
                  <p className="text-sm">
                    Age: {category.min_age} - {category.max_age} years
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">Playing Rules</h2>
          <p className="text-gray-700">{eventDetails.playing_rules}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">Rewards & Participation</h2>
          <p className="text-gray-700">{eventDetails.rewards_for_participants}</p>
        </section>
      </div>

      {eventDetails.show_qna && <QnaSectionEventpage isright={false} eventId={eventDetails.id} />}
    </div>
  );
};

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = React.useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);

      // Clear interval if we've reached the target date
      if (Object.values(timeLeft).every(v => v === 0)) {
        clearInterval(timer);
      }
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 sm:gap-4">
      <div className="flex flex-col items-center justify-center leading-tight bg-white px-2 py-1 rounded">
        <span className="font-semibold text-lg">{timeLeft.days}</span>
        <span className="text-xs">Days</span>
      </div>
      <div className="flex flex-col items-center justify-center leading-tight bg-white px-2 py-1 rounded">
        <span className="font-semibold text-lg">{timeLeft.hours}</span>
        <span className="text-xs">Hours</span>
      </div>
      <div className="flex flex-col items-center justify-center leading-tight bg-white px-2 py-1 rounded">
        <span className="font-semibold text-lg">{timeLeft.minutes}</span>
        <span className="text-xs">Mins</span>
      </div>
      <div className="flex flex-col items-center justify-center leading-tight bg-white px-2 py-1 rounded">
        <span className="font-semibold text-lg">{timeLeft.seconds}</span>
        <span className="text-xs">Secs</span>
      </div>
    </div>
  );
};

export default EventPageLeftContnt;