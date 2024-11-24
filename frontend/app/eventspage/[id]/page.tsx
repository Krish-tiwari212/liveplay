"use client"

import PlayerRegistrationmenu from '@/components/PlayerRegistrationmenu';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { CalendarIcon, Copy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { GiEntryDoor } from 'react-icons/gi';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { IoLocationSharp, IoShareSocialSharp } from 'react-icons/io5';
import { PiHandWithdraw } from 'react-icons/pi';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { VscGraph } from 'react-icons/vsc';

const page = ({}) => {
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
    const router=useRouter()
  return (
    <div className="mx-auto p-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3 relative h-full">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Player Registration</h1>
            <div className="flex items-center justify-between">
              <h1 className="font bold text-lg">Total registrations: 1728</h1>

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
                        defaultValue={`/event/1/share-link`}
                        readOnly
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="px-3"
                      onClick={() => handleCopy(`/event/1/share-link`)}
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
          <PlayerRegistrationmenu />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="w-full h-64 hidden md:block">
            <Image
              src="/images/img2.jpeg"
              alt="Event Poster"
              className="object-cover w-full h-64 rounded-lg"
              width={200}
              height={200}
            />
          </div>
          <div className="border-2 border-[#141F29] p-4 rounded-lg text-[#141F29]">
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
    </div>
  );
}

export default page
