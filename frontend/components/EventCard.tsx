"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  HiCurrencyRupee,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { Button } from "./ui/button";
import { BiLike } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { VscGraph } from "react-icons/vsc";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface EventCategory {
  id: number;
  price: number;
  category_name: string;
}

interface EventDetails {
  id: string;
  event_name: string;
  organizer_name: string;
  start_date: string;
  start_time: string;
  venue_name: string;
  city: string;
  desktop_cover_image_url: string;
  sport: string;
  categories: EventCategory[];
}

interface EventCardProps {
  id: string;
  eventDetails: EventDetails;
}

const EventCard = ({ id, eventDetails }: EventCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [session, setSession] = useState(null);

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
        .eq("event_id", id)
        .single();

      if (error) {
        return;
      }

      if (data) {
        setIsLiked(true);
      }
    };

    fetchLikeStatus();
  }, [id, supabase, session]);

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
        .eq("event_id", id);

      if (error) {
        return;
      }
    } else {
      const { error } = await supabase.from("user_event_likes").insert([
        {
          user_id: user.id,
          event_id: id,
        },
      ]);

      if (error) {
        return;
      }
    }

    setIsLiked(!isLiked);
  };

  // Format date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(eventDetails.start_date));

  // Format time
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(`1970-01-01T${eventDetails.start_time}`));

  // Get minimum price from categories
  const minPrice =
    eventDetails.categories.length > 0
      ? Math.min(...eventDetails.categories.map((cat) => cat.price))
      : 0;

  return (
    <div className="max-w-[500px] cursor-pointer h border border-black w-full group/card rounded-lg overflow-hidden shadow-lg bg-white">
      <Link href={`/eventspage?event_id=${id}`}>
        <div
          className={cn("relative h-52 w-full bg-cover bg-center rounded-t-lg")}
          style={{
            backgroundImage: `url(${eventDetails.desktop_cover_image_url})`,
          }}
        >
          <div className="group hover:bg-[#141f29] hover:opacity-80 h-full w-full flex justify-center items-center transition duration-300 ease-in-out">
            <h1 className="text-white text-xl opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
              Event Details
            </h1>
          </div>
        </div>
      </Link>

      <div className="bg-white px-4 py-1 flex flex-col justify-between">
        <div>
          <div className="bg-[#E6EAC5] text-black text-xs px-2 py-1 rounded inline-block">
            {eventDetails.sport}
          </div>
          <h1 className="font-bold text-xl text-gray-900 line-clamp-2">
            {eventDetails.event_name}
          </h1>
          <p className="text-[#64758B] text-nowrap">
            By {eventDetails.organizer_name}
          </p>
          <div className="text-[13px]">
            <p className="text-[#141F29] flex items-center text-nowrap">
              <HiOutlineCalendar className="mr-2 text-md" />
              {formattedDate} | {formattedTime} Onwards
            </p>
            <p className="text-[#141F29] flex items-center text-nowrap">
              <HiOutlineMapPin className="mr-2 flex-none text-md" />
              {eventDetails.venue_name}, {eventDetails.city}
            </p>
            <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
              <p className="text-[12px] flex items-center gap-1 text-nowrap">
                <HiCurrencyRupee className="text-lg" />
                STARTING FROM: ₹{minPrice}
              </p>
              <Link href={`/eventspage?event_id=${id}`}>
                <p className="text-gray-500 text-[12px] flex items-center gap-1 cursor-pointer hover:underline text-nowrap">
                  <VscGraph className="text-lg" />
                  Registrations:
                  <span className="text-blue-600 font-semibold text-[14px] ">
                    {eventDetails.categories.length}
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-4 mb-1 text-[12px] gap-2">
          <div className="flex justify-between sm:justify-start gap-2">
            <Button
              variant="outline"
              size="xs"
              className="text-[10px] border border-black px-2"
            >
              View Matches
            </Button>
            <Button
              variant="outline"
              size="xs"
              className={`text-[12px] border border-black hover:bg-[#ccdb28] hover:text-black flex justify-center items-center gap-1 px-2 ${
                isLiked ? "bg-[#ccdb28] text-black" : ""
              }`}
              onClick={handleLike}
            >
              {isLiked ? "Liked" : "Like"}
              <BiLike className="" />
            </Button>
          </div>
          <Button
            onClick={() => router.push(`/choosecategory/${id}`)}
            variant="tertiary"
            size="xs"
            className="border border-black text-[12px]"
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;