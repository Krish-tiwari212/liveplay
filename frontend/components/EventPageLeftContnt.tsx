import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { BiLike } from 'react-icons/bi'
import { IoShareSocialSharp } from 'react-icons/io5'
import EventCategoryCard from './EventCategoryCard'
import QnaSectionEventpage from './QnaSectionEventpage'

const EventPageLeftContnt = ({eventDetails}:any) => {
  return (
    <div className="w-full lg:w-2/3 relative h-full">
      <div className="w-full h-full">
        <Image
          src="/images/img2.jpeg"
          alt="Event Poster"
          className="object-cover w-full h-64 sm:h-96 lg:h-[500px] rounded-lg"
          width={200}
          height={200}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center my-4 space-y-4 md:space-y-0">
        <h1
          className="text-xl font-semibold text-center lg:text-left"
          style={{ textShadow: "0 3px 0 #cddc29" }}
        >
          Liked By 1983 Players
        </h1>

        <div className="flex justify-center md:justify-between gap-2 xl:gap-12">
          <Button
            size="sm"
            variant="outline"
            className="border-2 shadow-lg border-black flex items-center"
          >
            <h1 className=" mr-1">Like</h1> <BiLike />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-2 shadow-lg border-black flex items-center"
          >
            <h1 className=" mr-1">Share</h1> <IoShareSocialSharp />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-2 shadow-lg border-black"
          >
            View Matches
          </Button>
        </div>

        <div className="flex justify-center items-center gap-4 bg-[#E6EAC5] px-4 rounded py-2 w-full md:w-auto">
          <h1 className="font-semibold text-center">Countdown</h1>
          <div className="flex gap-2 sm:gap-4">
            <div className="flex flex-col items-center justify-center leading-tight">
              <h1 className="font-semibold">12</h1>
              <p className="text-[10px]">Days</p>
            </div>
            <div className="flex flex-col items-center justify-center leading-tight">
              <h1 className="font-semibold">10</h1>
              <p className="text-[10px]">Hours</p>
            </div>
            <div className="flex flex-col items-center justify-center leading-tight">
              <h1 className="font-semibold">20</h1>
              <p className="text-[10px]">Minutes</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative h-auto sm:h-auto lg:h-auto">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Event Information</h1>
          <h2 className="mb-4">
            Total Registrations: {eventDetails.totalRegistrations}
            <a href="#" className="text-blue-600 ml-2 hover:underline">
              View player names
            </a>
          </h2>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Location</h3>
          <p>{eventDetails.location}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Description</h3>
          <p>{eventDetails.description}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Event Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventDetails.events.map((event: any, index: number) => (
              <EventCategoryCard key={index} event={event} />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Rewards</h3>
          <div className="mb-4">
            <p className="whitespace-pre-line">{eventDetails.rewards}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Rules</h3>
          <div className="mb-4">
            <p className="whitespace-pre-line">{eventDetails.rules}</p>
          </div>
        </div>
      </div>
      <QnaSectionEventpage/>
    </div>
  );
}

export default EventPageLeftContnt
