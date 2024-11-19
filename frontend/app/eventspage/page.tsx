import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, TrophyIcon, UsersIcon } from 'lucide-react';
import { FaBasketballBall, FaList, FaStar } from 'react-icons/fa';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { IoLocationSharp } from 'react-icons/io5';
import { VscGraph } from 'react-icons/vsc';
import { RiDiscountPercentLine, RiStarSmileFill } from 'react-icons/ri';
import { GiShuttlecock, GiWhistle } from 'react-icons/gi';
import { MdCategory } from 'react-icons/md';
import { GrTrophy } from 'react-icons/gr';

const EventPage = () => {
  return (
    <div className="mx-auto p-5">
      <div className="flex flex-col lg:flex-row overflow-hidden gap-4">
        <div className="w-full lg:w-2/3 relative h-64 sm:h-96 lg:h-[500px]">
          <Image
            src="/images/EventPoster.svg"
            alt="Event Poster"
            className="object-cover w-full h-full"
            fill
            priority
          />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col justify-between gap-4">
          {/* Event Details */}
          <div className="border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
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
                <IoLocationSharp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">
                  Major Dhyan Chand Stadium
                </span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap">
                <VscGraph className="w-4 h-4 sm:w-5 sm:h-5  mr-1" />
                <span className="text-sm sm:text-base">Registrations:</span>
                <span className="text-blue-600 text-sm sm:text-base">5173</span>
              </div>
              <div className="flex items-center">
                <HiCurrencyRupee className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base  mr-2">
                  Starting From:
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold">
                  ₹699
                </span>
              </div>
            </div>

            <Button
              variant="tertiary"
              className="w-full border-2 border-black text-sm sm:text-base"
            >
              Register Now
            </Button>
          </div>

          {/* Event Features */}
          <div className="border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
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
            <div className="flex flex-col md:flex-row my-1">
              <span className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
                <MdCategory className="h-4 w-4 sm:h-5 sm:w-5" />
                Number of Categories:
                <strong className="font-normal">10+</strong>
              </span>
              <a
                href="#"
                className="text-xs sm:text-sm text-blue-500 hover:underline mb-1 md:mb-0 md:mt-1"
              >
                (View Categories)
              </a>
            </div>
            <div className="flex flex-col md:flex-row my-1">
              <span className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
                <GrTrophy className="h-4 w-4 sm:h-5 sm:w-5" />
                Cash Prize Pool:
                <strong className="font-normal">₹100,000</strong>
              </span>
            </div>
            <div className="my-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center mb-2">
                <FaStar className="mr-2" /> Event USP
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
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center mb-2">
                <RiStarSmileFill className="mr-2" /> Sponsored By
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ml-6">
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
          <div className="border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
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

            <div className="space-y-1">
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
        </div>
      </div>
    </div>
  );
};

export default EventPage;
