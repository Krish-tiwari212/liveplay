import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EventCard from "./EventCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useToast } from "@/hooks/use-toast";

interface Event {
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
  city: string;
  pincode: string;
  event_description: string;
  event_usp: string;
  desktop_cover_image_url: string;
  mobile_cover_image_url: string;
  start_time: string;
  sport: string;
  cash_price_pool: string;
  organizer_name: string;
  categories: {
    id: number;
    price: number;
  }[];
}


const SportsType = [
  {
    name: "Tennis",
    icon: <img src="/images/tennis.png" alt="Tennis" className="h-4 w-4" />,
  },
  {
    name: "Table Tennis",
    icon: (
      <img
        src="/images/table-tennis.png"
        alt="Table Tennis"
        className="h-4 w-4"
      />
    ),
  },
  {
    name: "Squash",
    icon: <img src="/images/squash.png" alt="Squash" className="h-4 w-4" />,
  },
  {
    name: "Badminton",
    icon: (
      <img src="/images/shuttlecock.png" alt="Badminton" className="h-4 w-4" />
    ),
  },
  {
    name: "Pickleball",
    icon: (
      <img src="/images/pickleball.png" alt="Pickleball" className="h-4 w-4" />
    ),
  },
  {
    name: "Padel",
    icon: <img src="/images/padel.png" alt="Padel" className="h-4 w-4" />,
  },
  {
    name: "Cricket",
    icon: <img src="/images/cricket.png" alt="Cricket" className="h-4 w-4" />,
  },
  {
    name: "Football",
    icon: <img src="/images/football.png" alt="Football" className="h-4 w-4" />,
  },
  {
    name: "Running",
    icon: <img src="/images/running.png" alt="Running" className="h-4 w-4" />,
  },
  {
    name: "Marathon",
    icon: <img src="/images/marathon.png" alt="Marathon" className="h-4 w-4" />,
  },
  {
    name: "Box Cricket",
    icon: <img src="/images/cricket.png" alt="Cricket" className="h-4 w-4" />,
  },
  {
    name: "Turf Football",
    icon: <img src="/images/football.png" alt="Football" className="h-4 w-4" />,
  },
];

const CardCarousel = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const router=useRouter()
  const {toast}=useToast()
  const [isOnline, setIsOnline] = useState(false);
  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className="absolute hidden sm:block sm:-right-6 top-1/2 -mt-6 z-50 cursor-pointer"
        onClick={onClick}
      >
        <div className="bg-gray-800 rounded-full p-1 transition-colors duration-200 shadow-xl hover:bg-gray-700">
          <FaChevronRight className="text-white text-lg" />
        </div>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className="absolute hidden sm:block sm:-left-6 top-1/2 -mt-6 z-50 cursor-pointer"
        onClick={onClick}
      >
        <div className="bg-gray-800 rounded-full p-1 shadow-lg transition-colors duration-200 hover:bg-gray-700">
          <FaChevronLeft className="text-white text-lg" />
        </div>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: events.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: "my-6",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

 useEffect(() => {
   if (typeof window !== "undefined") {
     setIsOnline(navigator.onLine);

     const fetchEvents = async () => {
       try {
         const response = await fetch("/api/event/all_events");
         const data = await response.json();
         if (data.events.length > 0) {
           setEvents(data.events);
         } else {
           setEvents([]);
         }
       } catch (error) {
         console.error("Error fetching events:", error);
         toast({
           title:
             "We are unable to retrieve event details at the moment. Please check your network connection and try again.",
           variant: "destructive",
         });
       }
     };

     fetchEvents();

     const handleOnline = () => {
       setIsOnline(true);
       toast({
         title: "Network connection restored. Reloading the page....",
       });
       setTimeout(() => {
         window.location.reload();
       }, 3000); 
     };

     const handleOffline = () => {
       setIsOnline(false);
     };

     window.addEventListener("online", handleOnline);
     window.addEventListener("offline", handleOffline);

     return () => {
       window.removeEventListener("online", handleOnline);
       window.removeEventListener("offline", handleOffline);
     };
   }
 }, []);
  

  return (
    <div className="my-6 overflow-x-hidden">
      <div className="md:text-center mb-6 relative mx-4 md:mx-12 flex justify-between md:justify-center items-center">
        <h1 className="text-xl text-start md:text-center sm:text-2xl md:text-3xl text-gray-800 font-semibold">
          Upcoming Events
        </h1>
        <Select>
          <SelectTrigger className="md:absolute top-0 md:right-0 w-[110px] sm:w-[130px] md:w-[150px] lg:w-[170px] bg-white text-[#141f29] border border-[#141f29] ">
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            {SportsType.map((sport, i) => (
              <SelectItem
                key={sport.name}
                value={sport.name}
                className="flex items-center space-x-2"
              >
                <div className="flex items-center space-x-2">
                  {sport.icon}
                  <span>{sport.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Slider {...settings} className="mx-6 sm:mx-10 xl:mx-20">
        {events.map((e, i) => (
          <div className="px-2 xl:px-10 pb-6" key={i}>
            <EventCard
              id={e.id}
              eventDetails={e}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardCarousel;