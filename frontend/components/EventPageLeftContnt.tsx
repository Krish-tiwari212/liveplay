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

const EventPageLeftContnt = ({eventDetails}:any) => {
  const path=usePathname()
  const id=path.split("/")[2]
  const router=useRouter()
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
      <div className="flex w-full  flex-col md:flex-row justify-between items-center my-4 space-y-4 md:space-y-0">
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
            onClick={() => setIsLiked(!isLiked)}
            className={`border-2 shadow-lg border-black flex items-center ${
              isLiked ? "bg-[#ccdb28] text-black" : ""
            }`}
          >
            <h1 className=" mr-1">{isLiked ? "Liked" : "Like"}</h1> <BiLike />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-2 shadow-lg border-black flex items-center"
              >
                <h1 className=" mr-1">Share</h1> <IoShareSocialSharp />
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
      <div className="lg:hidden border-2 border-[#141F29] p-4 rounded-lg text-[#141F29] my-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 line-clamp-2">
          Summer Basketball Tournament Pro League Men Champ 2.0 2024
        </h1>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base">
            Badminton
          </Badge>
          <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base">
            Elite
          </Badge>
          <Badge className="bg-[#E6EAC5] text-[#F3524F] text-sm sm:text-base flex items-center">
            <RiDiscountPercentLine className="mr-2" />
            Early Bird Discount
          </Badge>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">
              25 December 2024 | 8 PM onwards
            </span>
          </div>
          <div className="flex items-center">
            <GiEntryDoor className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">
              Last Date to Register: 20 December 2024
            </span>
          </div>
          <div className="flex items-center">
            <PiHandWithdraw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">
              Last Date to Withdraw: 23 December 2024
            </span>
          </div>
          <div className="flex items-center">
            <IoLocationSharp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">
              Major Dhyan Chand Stadium
            </span>
          </div>
          <Link href={`/eventregistrationpage/${id}`}>
            <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap">
              <VscGraph className="w-4 h-4 sm:w-5 sm:h-5  mr-1" />
              <span className="text-sm sm:text-base">Registrations:</span>
              <span className="text-blue-600 text-sm sm:text-base">5173</span>
            </div>
          </Link>
          <div className="flex items-center">
            <HiCurrencyRupee className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base  mr-2">Starting From:</span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold">
              ₹699
            </span>
          </div>
        </div>

        <div>
          <Button
            onClick={() => router.push("/eventspage/1234")}
            variant="tertiary"
            className="w-full border-2 border-black py-8 text-xl"
          >
            Register Now
          </Button>
          <Link href={`/playerdashboard`}>
            <p className="text-xl hover:underline text-blue-400 text-center mt-2">
              Already Registered ?
            </p>
          </Link>
        </div>
      </div>

      {/* Event Features */}
      <div className="lg:hidden border-2 border-[#141F29] p-4 rounded-lg text-[#141F29] my-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Event Features
        </h1>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base flex items-center">
            <FaBasketballBall className="mr-2" />
            Single
          </Badge>
          <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base flex items-center">
            <FaBasketballBall className="mr-2" />
            Double
          </Badge>
          <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base flex items-center">
            <FaBasketballBall className="mr-2" />
            Team
          </Badge>
        </div>
        <div className="flex flex-col md:flex-row my-4">
          <span className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
            <MdCategory className="h-4 w-4 sm:h-5 sm:w-5" />
            Number of Categories:
            <strong className="font-normal">10</strong>
          </span>
          <a
            href="#"
            className="text-md text-blue-500 hover:underline ml-6 sm:ml-0 mb-1 md:mb-0 md:mt-1 "
          >
            (View Categories)
          </a>
        </div>
        <div className="flex flex-col md:flex-row my-4">
          <span className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
            <GrTrophy className="h-4 w-4 sm:h-5 sm:w-5" />
            Cash Prize Pool:
            <strong className="font-normal">₹100,000</strong>
          </span>
        </div>
        <div className="my-4">
          <h3 className="text-base sm:text-lg md:text-xl font-bold flex items-center mb-2">
            <FaStar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Event USP
          </h3>
          <ul className="space-y-2 ml-6">
            <li className="flex items-center text-sm sm:text-base">
              <GiShuttlecock className="mr-2 flex-none h-4 w-4 sm:h-5 sm:w-5" />
              Yonex AS 2 Feather Shuttles for premium gameplay.
            </li>
            <li className="flex items-center text-sm sm:text-base">
              <GiWhistle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-none" />
              External Umpires ensuring fair and professional matches.
            </li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-base sm:text-lg md:text-xl font-bold flex items-center mb-2">
            <RiStarSmileFill className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Sponsored
            By
          </h3>
          <div className="grid grid-cols-3 gap-4 ml-6">
            <div className="rounded-lg flex flex-col p-4">
              <Image
                src="/images/sponsor (1).svg"
                alt="Nexus Global Ventures"
                width={60}
                height={60}
                className="mb-2 object-contain"
              />
              <span className="text-[11px]  md:text-sm leading-none">
                Nexus Global Ventures
              </span>
            </div>
            <div className="rounded-lg flex flex-col p-4">
              <Image
                src="/images/sponsor (2).svg"
                alt="Summit Crest Corporation"
                width={60}
                height={60}
                className="mb-2 object-contain"
              />
              <span className="text-[11px]  md:text-sm leading-none">
                Summit Crest Corporation
              </span>
            </div>
            <div className="rounded-lg flex flex-col p-4 text-sm">
              <Image
                src="/images/sponsor (1).svg"
                alt="Titan Edge Enterprises"
                width={60}
                height={60}
                className="mb-2 object-contain"
              />
              <span className="text-[11px] md:text-sm leading-none">
                Titan Edge Enterprises
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Organizer */}
      <div className="lg:hidden border-2 border-[#141F29] p-4 rounded-lg text-[#141F29] my-4">
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
              Siri Fort Board Sports Trust Committee Delhi
            </h1>
            <Image
              src="/images/EliteBadgeDark.svg"
              alt="Elite Badge"
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className="lg:hidden space-y-1">
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
            Ratings:
            <span className="font-normal">5173</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
            Events Hosted:
            <span className="font-normal">5173</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
            Hosting Since:
            <span className="text-blue-600 font-normal">5173</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
            Phone:
            <span className="text-blue-600 font-normal">5173</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
            Email:
            <span className="text-blue-600 font-normal">5173</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
            Website:
            <span className="text-blue-600 font-normal">5173</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap font-bold text-sm sm:text-base">
            <Image
              src="/icons/image 60.svg"
              alt="Instagram Icon"
              width={16}
              height={16}
              className="sm:w-5 sm:h-5"
            />
            <span className="text-blue-600 font-normal">Instagram</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-full relative h-auto sm:h-auto lg:h-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Event Information</h1>
            <h2 className="mb-4">
              Total Registrations: {eventDetails.totalRegistrations}
              <a href="#" className="text-blue-600 ml-2 hover:underline">
                View player names
              </a>
            </h2>
          </div>
          <div className="mr-5">
            <h1 className="text-blue-400 hover:underline text-2xl cursor-pointer ">
              Already Registered ?
            </h1>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Location</h3>
          <Link href="/location">
            <p className="hover:underline hover:to-blue-400">
              {eventDetails.location}
            </p>
          </Link>
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
      <QnaSectionEventpage isright={false} />
    </div>
  );
}

export default EventPageLeftContnt
