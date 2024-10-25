import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EventCard from "./EventCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    slidesToShow: 4,
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
        const response = await fetch('/api/event/all_events');
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
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="my-10 ">
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Featured Events</h1>
      </div>
      <div className="mx-auto px-7 sm:px-6 lg:px-8 md:mt-16">
        <Slider {...settings}>
          {events.map((e, i) => (
            <div className="flex-shrink-0 w-full px-5 md:px-6" key={i}>
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
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardCarousel;