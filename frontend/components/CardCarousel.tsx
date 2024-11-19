import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EventCard from "./EventCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
];


const CardCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState([]);

  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className="absolute -right-4 top-1/2 -mt-6 z-50 cursor-pointer"
        onClick={onClick}
      >
        <div className="bg-gray-800 rounded-full p-3 transition-colors duration-200 shadow-xl hover:bg-gray-700">
          <FaChevronRight className="text-white text-2xl" />
        </div>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className="absolute -left-4 top-1/2 -mt-6 z-50 cursor-pointer"
        onClick={onClick}
      >
        <div className="bg-gray-800 rounded-full p-3 shadow-lg transition-colors duration-200 hover:bg-gray-700">
          <FaChevronLeft className="text-white text-2xl" />
        </div>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: "flex items-stretch",
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
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event/all_events");
        const data = await response.json();
        const formattedEvents = data.events.map((event: any) => ({
          image: event.desktop_cover_image_url,
          date: event.start_date,
          name: event.event_name,
          eventname: event.event_name,
          location: `${event.venue_name}, ${event.city}`,
          time: event.start_time,
          noOfEntries: 100,
          sport: event.venue_name,
          price: 500,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="my-6">
      <div className="md:text-center mb-6 relative mx-12 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800">
          Upcoming Events
        </h1>
        <Select>
          <SelectTrigger className="w-[110px] sm:w-[130px] md:w-[150px] lg:w-[170px] bg-white text-[#141f29] border border-[#141f29] ">
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
      <div className="mx-auto w-[95%] overflow-x-auto flex gap-2 md:gap-4 scrollbar-hide">
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
        {events.map((e, i) => (
          <div className="w-full px-1 pb-6" key={i}>
            <div className="">
              <EventCard
                image={e.image}
                date={e.date}
                name={e.name}
                eventname={e.eventname}
                location={e.location}
                time={e.time}
                noOfEntries={e.noOfEntries}
                sport={e.sport}
                price={e.price}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
