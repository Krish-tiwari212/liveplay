import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import VideoEventCard from "./VideoEventCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define the Event interface
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
  additional_details: string;
  city: string;
  pincode: string;
  venue_not_decided: boolean;
  map_view: string | null;
  event_description: string;
  event_usp: string;
  rewards_for_participants: string;
  playing_rules: string;
  desktop_cover_image_url: string;
  mobile_cover_image_url: string;
  created_at: string;
  updated_at: string;
  start_time: string;
  countdown: boolean;
  enable_fixtures: boolean;
}

const AllEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event/all_events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className="absolute -right-4 top-1/2 -mt-6 z-50 cursor-pointer"
        onClick={onClick}
      >
        <div className="bg-[#17202A] rounded-full p-3 transition-colors duration-200 shadow-xl hover:bg-gray-700">
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
        <div className="bg-[#17202A] rounded-full p-3 shadow-lg transition-colors duration-200 hover:bg-gray-700">
          <FaChevronLeft className="text-white text-2xl" />
        </div>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: "flex items-stretch",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
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

  return (
    <div className="my-10">
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#17202A]">
          More Events
        </h1>
      </div>
      <div className="max-w-9xl mx-auto px-7 sm:px-6 lg:px-8 md:mt-16">
        <Slider {...settings}>
          {events.map((e) => (
            <div className="flex-shrink-0 w-full px-5 md:px-8 py-5" key={e.id}>
              <VideoEventCard
                image={e.desktop_cover_image_url}
                gifUrl={e.mobile_cover_image_url}
                name={e.event_name}
                eventname={e.event_name}
                date={e.start_date}
                time={e.start_time}
                location={e.venue_name}
                price={500}
                noOfEntries={100}
                sport={e.venue_name}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AllEvents;