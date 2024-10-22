
import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import data from "../data"; 
const { videoEventData } = data;
import VideoEventCard from "./VideoEventCard";
import EventCard from "./EventCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AllEvents = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
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
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          More Events
        </h1>
      </div>
      <div className="max-w-9xl mx-auto px-7 sm:px-6 lg:px-8 md:mt-16">
        <Slider {...settings}>
          {videoEventData.map((e, i) => (
            <div className="flex-shrink-0 w-full px-5 md:px-8 py-5" key={i}>
              <VideoEventCard
                image={e.image}
                gifUrl={e.gifUrl}
                name={e.name}
                eventname={e.eventname}
                date={e.date}
                time={e.time}
                location={e.location}
                price={e.price}
                noOfEntries={e.noOfEntries}
                sport={e.sport}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AllEvents;

