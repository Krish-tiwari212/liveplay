"use client"

import PlayerRegistrationmenu from '@/components/PlayerRegistrationmenu';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger,DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import data from '@/data';
import { toast } from '@/hooks/use-toast';
import { CalendarIcon, Copy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GiConsoleController, GiEntryDoor } from 'react-icons/gi';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { IoLocationSharp, IoShareSocialSharp } from 'react-icons/io5';
import { PiHandWithdraw } from 'react-icons/pi';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { VscGraph } from 'react-icons/vsc';
import { Suspense } from "react";
import { useEventContext } from '@/context/EventDataContext';
import { createClient } from '@/utils/supabase/client';

interface Participant {
  id: string;
  user_id: string;
  name: string;
  status: string;
  registration_date: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    gender: string;
    date_of_birth: string;
  };
}

interface Category {
  id?: number;
  category_name?: string;
  total_quantity?: string;
  max_ticket_quantity?: string;
  price?: number;
  ticket_description?: string;
  discount_code?: string;
  discount?: boolean;
  category_type?: string;
  discountType?: string;
  number_of_discounts?: string;
  from_date?: string;
  till_date?: string;
  discount_value: number;
  percentage_input?: string;
  amount_input?: string;
  gender?: string;
  age_from?: string;
  age_to?: string;
  ageRangeOption?: string;
  max_teams_size?: number;
  sport?: string;
  teamName?: string;
  pairname?: string;
}

interface Event {
  id: string;
  event_name: string;
  date: string;
  location: string;
  description: string;
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
  event_usp: string;
  rewards_for_participants: string;
  playing_rules: string;
  desktop_cover_image_url: string;
  mobile_cover_image_url: string;
  categories:Category
}

const EventPage = () => {
  const {eventregistratiopage,seteventregistrationpage}=useEventContext()
  const router = useRouter();
   const searchParams = useSearchParams();
   const eventId = searchParams.get("event_id");
   const [participants, setParticipants] = useState<Participant[]>([]);
   const [selectedParticipant, setSelectedParticipant] =
     useState<Participant | null>(null);
   const [event, setEvent] = useState<Event | null>(null);
   const [openplayerinfo,setOpenPlayerInfo]=useState(false)
   const [dialogData,setDialogData]=useState<Participant>({})
   const [openshare,setopenshare]=useState(false)

   useEffect(() => {
    const fetchParticipants = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('participants')
        .select(`
          id,
          name,
          status,
          registration_date,
          user:users (
            id,
            full_name,
            email,
            gender,
            date_of_birth
          )
        `)
        .eq('event_id', eventId);
      if (error) {
        console.error('Error fetching participants:', error);
      } else {
        setParticipants(data || []);
      }
    };

    if (eventId) {
      fetchParticipants();
    }
  }, [eventId]);

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

   useEffect(() => {
     if (!eventId) return;

     const fetchEventDetails = async () => {
       try {
         const response = await fetch(`/api/event/get_by_id/${eventId}`);
         if (!response.ok) throw new Error("Failed to fetch event data.");
         const data = await response.json();
         setEvent(data);
       } catch (error) {
         console.error(error);
       }
     };

     const fetchParticipants = async () => {
       try {
         const response = await fetch(`/api/event/get_entries/${eventId}`);
         if (!response.ok) throw new Error("Failed to fetch participants.");
         const data = await response.json();
         setParticipants(data);
       } catch (error) {
         console.error(error);
       }
     };

     fetchEventDetails();
     fetchParticipants();
   }, []);

   if (!event) {
     return <p>Loading event details...</p>;
   }

   if (!event.categories) {
     return <p>Loading categories...</p>;
   }

  return (
    <div className="mx-auto p-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3 relative h-full">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Player Registration</h1>
            <div className="flex items-center justify-between">
              <h1 className="font bold text-lg">
                Total registrations: {participants.length}
              </h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    variant="outline"
                    className="border-2 shadow-lg border-black flex items-center"
                  >
                    <h1 className=" mr-1">Share</h1> <IoShareSocialSharp />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md h-auto">
                  <AlertDialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                      Anyone who has this link will be able to view this.
                    </DialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input
                        id="link"
                        defaultValue={`${window.location.origin}/eventregistrationpage?event_id=${eventId}`}
                        readOnly
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="px-3"
                      onClick={() =>
                        handleCopy(
                          `${window.location.origin}/eventregistrationpage?event_id=${eventId}`
                        )
                      }
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
            </div>
          </div>
          <PlayerRegistrationmenu
            participants={participants}
            dialog={openplayerinfo}
            setDialog={setOpenPlayerInfo}
            dialogdata={dialogData}
            setdialogdata={setDialogData}
            categories={event.categories}
          />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="w-full h-full hidden md:block">
            <Image
              src={event?.desktop_cover_image_url}
              alt="Event Poster"
              className="object-cover rounded-lg"
              layout="responsive"
              width={1920} // Replace with the actual width of your image
              height={1080} // Replace with the actual height of your image
            />
          </div>
          <div className="border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 line-clamp-2">
              {event?.event_name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base">
                {event?.sport}
              </Badge>
              <Badge className="bg-[#E6EAC5] text-[#141F29] text-sm sm:text-base">
                {event?.selected_plan}
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
                  {new Date(event?.start_date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  | {event?.start_time} onwards
                </span>
              </div>
              <div className="flex items-center">
                <GiEntryDoor className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">
                  Last Date to Register:{" "}
                  {new Date(event?.last_registration_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <PiHandWithdraw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">
                  Last Date to Withdraw:{" "}
                  {new Date(event?.last_withdrawal_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <IoLocationSharp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">
                  {event?.venue_name}
                </span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:underline text-nowrap">
                <VscGraph className="w-4 h-4 sm:w-5 sm:h-5  mr-1" />
                <span className="text-sm sm:text-base">Registrations:</span>
                <span className="text-blue-600 text-sm sm:text-base">
                  {participants.length}
                </span>
              </div>
              <div className="flex items-center">
                <HiCurrencyRupee className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base  mr-2">
                  Starting From:
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold">
                  ₹
                  {Math.min(
                    ...(event?.categories.map((cat) => cat.price) || [])
                  )}
                </span>
              </div>
            </div>

            <Link href="/choosecategory">
              <Button
                variant="tertiary"
                className="w-full border-2 border-black py-8 text-xl"
              >
                Register Now
              </Button>
              <p className="text-blue-400 underline text-xl mt-2 text-center">
                Already Registered ?
              </p>
            </Link>
          </div>
        </div>
      </div>
      {openplayerinfo && dialogData && (
        <Dialog open={openplayerinfo} onOpenChange={setOpenPlayerInfo}>
          <DialogContent className="w-full max-w-[95%] md:max-w-[50%] lg:max-w-[40%] overflow-y-auto">
            <DialogDescription>
              <div className="mx-4 my-5 text-black">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                    {dialogData.name}
                  </h1>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setopenshare(true);
                    }}
                    variant="outline"
                    className="border-2 shadow-lg border-black flex items-center"
                  >
                    <h1 className="mr-1">Share</h1>
                    <IoShareSocialSharp />
                  </Button>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                  <Image
                    src={`https://robohash.org/b1b1e228-41be-43f1-bc61-27f335681734.png`}
                    alt="Organizer Image"
                    width={150}
                    height={150}
                    className="rounded-full w-20 sm:w-24 h-20 sm:h-24 object-cover border-2 border-black"
                  />
                  <div className="flex flex-col gap-2 items-center md:items-start">
                    <Image
                      src="/images/EliteBadgeDark.svg"
                      alt="Elite Badge"
                      width={100}
                      height={100}
                    />
                    <h1 className="text-sm sm:text-md font-semibold">
                      Profile Views: <span className="font-normal">36181</span>
                    </h1>
                    <h1 className="text-sm sm:text-md font-semibold">
                      Joined Since:{" "}
                      <span className="font-normal">
                        {dialogData.registration_date}
                      </span>
                    </h1>
                  </div>
                </div>

                {/* Events Section */}
                <div className="w-full flex flex-col sm:flex-row gap-4 my-6">
                  <div className="flex flex-col justify-center items-center bg-[#CCDB28] rounded-lg w-full sm:w-1/2 h-20 shadow-md">
                    <h1 className="text-sm sm:text-lg font-semibold">
                      Events Hosted
                    </h1>
                    <h1 className="text-sm sm:text-lg">5</h1>
                  </div>
                  <div className="flex flex-col justify-center items-center bg-[#CCDB28] rounded-lg w-full sm:w-1/2 h-20 shadow-md">
                    <h1 className="text-sm sm:text-lg font-semibold">
                      Events Played
                    </h1>
                    <h1 className="text-sm sm:text-lg">1</h1>
                  </div>
                </div>

                {/* User Activity */}
                <div>
                  <h1 className="text-lg sm:text-xl font-bold mb-4">
                    User Activity
                  </h1>
                  <div className="flex flex-col gap-4">
                    {new Array(6).fill(null).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2 bg-[#F4F4F4] rounded-md w-full px-4 py-2"
                      >
                        <h1 className="font-semibold text-sm sm:text-lg">
                          Hosted:{" "}
                        </h1>
                        <p className="text-sm sm:text-md">
                          Summer Basketball Tournament Pro League Men Champ 2.0
                          2024
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => setOpenPlayerInfo(false)}
                  variant="secondary"
                  className="bg-[#141f29] text-[#ccdb28]"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {openshare && (
        <Dialog open={openshare} onOpenChange={setopenshare}>
          <DialogContent className="sm:max-w-md h-auto">
            <AlertDialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={`${window.location.origin}/participantdetails?event_id=${eventId}`}
                  readOnly
                />
              </div>
              <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={() =>
                  handleCopy(
                    `${window.location.origin}/participantdetails?event_id=${eventId}`
                  )
                }
              >
                <span className="sr-only">Copy</span>
                <Copy />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="tertiary"
                  className="bg-[#141f29] text-[#ccdb28]"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EventPage />
  </Suspense>
);

export default page
