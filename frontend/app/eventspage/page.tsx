"use client"

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, TrophyIcon, UsersIcon } from 'lucide-react';
import { FaBasketballBall, FaList, FaStar } from 'react-icons/fa';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { IoLocationSharp, IoShareSocialSharp } from 'react-icons/io5';
import { VscGraph } from 'react-icons/vsc';
import { RiDiscountPercentLine, RiStarSmileFill } from 'react-icons/ri';
import { GiShuttlecock, GiWhistle } from 'react-icons/gi';
import { MdCategory } from 'react-icons/md';
import { GrTrophy } from 'react-icons/gr';
import { BiLike } from 'react-icons/bi';
import CardCarousel from '@/components/CardCarousel';
import EventPageLeftContnt from '@/components/EventPageLeftContnt';
import EventPageRightContent from '@/components/EventPageRightContent';

const eventDetails = {
  totalRegistrations: 17263,
  location:
    "Major Dhyann Chand Stadium, Guru Gobind Singh Sports College campus, Kursi Rd, Guramba, Uttar Pradesh 262062",
  description:
    "Get ready to hit the court! Join us this Sunday for an action-packed basketball tournament designed for players of all skill levels. Whether you’re an experienced baller or just enjoy shooting hoops with friends, this event promises to bring excitement, energy, and unforgettable moments.",
  events: [
    {
      name: "Men's Singles",
      price: 1000,
      CategoryType: "Single",
      CategoryGender: "Male",
      AgeRange: "Open",
    },
    {
      name: "Women's Singles",
      price: 1000,
      CategoryType: "Single",
      CategoryGender: "Male",
      AgeRange: "Open",
    },
    {
      name: "Men Team Match",
      price: 1000,
      CategoryType: "Single",
      CategoryGender: "Male",
      AgeRange: "Open",
    },
    {
      name: "Women Team Match",
      price: 1000,
      CategoryType: "Single",
      CategoryGender: "Male",
      AgeRange: "Open",
    },
    {
      name: "Men's Doubles",
      price: 1000,
      CategoryType: "Single",
      CategoryGender: "Male",
      AgeRange: "Open",
    },
    {
      name: "Women's Doubles",
      price: 1000,
      CategoryType: "Single",
      CategoryGender: "Male",
      AgeRange: "Open",
    },
    {
      name: "Under 17",
      price: 1000,
      CategoryType: "Single",
      CategoryGender: "Male",
      AgeRange: "Open",
    },
    {
      name: "Under 8",
      price: 1000,
      CategoryType: "Single",
      CategoryGender: "Male",
      AgeRange: "Open",
    },
  ],
  rewards: `Team Rewards:The champions of the tournament will receive a sparkling trophy, exclusive medals, and an impressive cash prize of ₹500,000. The runners-up, the second-best team, will not leave empty-handed—they'll be awarded a stunning trophy, medals, and a cash prize of ₹250,000.
    Individual Awards:
    The Most Valuable Player (MVP) award will be given to one player who shows exceptional performance, and this player will receive a special prize along with a certificate. The Best Defender will be recognized for standing firm against the opposition and keeping them at bay, while the Best Shooter will be celebrated for scoring the highest points throughout the tournament.
    Participation Rewards:
    Each participant will receive an exclusive tournament jersey and a goodie bag filled with surprises, including merchandise, vouchers, and more. Additionally, there are other exciting surprises awaiting everyone involved in the event.
    `,
  rules: `Team Composition:Each team must have a minimum of 5 players and a maximum of 8 players. Substitutions are allowed but only during stoppages or timeouts.
    Match Format:
    The tournament will follow a knockout format. Each match will consist of two 10-minute halves with a 5-minute halftime break.
    Conduct:
    Unsportsmanlike behavior, such as aggressive fouls or arguing with referees, will result in warnings or disqualification. Teams are expected to respect the decisions of the referees at all times.
    Game Rules:
    Standard basketball rules apply, including fouls, violations, and time limits.
    Timing and Schedule:
    Teams must report at least 30 minutes before their scheduled match time. Late arrivals may result in automatic forfeiture of the match.
    Dress Code:
    All players must wear the tournament-provided jersey during matches.
    COVID-19 Precautions:
    All participants and spectators must follow safety guidelines, including temperature checks and sanitization protocols.
    `,
};

const EventPage = () => {
  return (
    <div className="mx-auto p-5">
      <div className="flex flex-col lg:flex-row gap-4">
        <EventPageLeftContnt eventDetails={eventDetails}/>
        <EventPageRightContent/>
      </div>
      <CardCarousel />
    </div>
  );
};

export default EventPage;
