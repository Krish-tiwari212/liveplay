"use client"

import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'
import { IoShareSocialSharp } from 'react-icons/io5';

const EventPage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event_id");
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
    <div className=" my-5 text-black w-full max-w-[95%] md:max-w-[50%] lg:max-w-[40%] overflow-y-auto mx-auto shadow-xl rounded-md p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">name</h1>
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
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            Joined Since: <span className="font-normal">date</span>
          </h1>
        </div>
      </div>

      {/* Events Section */}
      <div className="w-full flex flex-col sm:flex-row gap-4 my-6">
        <div className="flex flex-col justify-center items-center bg-[#CCDB28] rounded-lg w-full sm:w-1/2 h-20 shadow-md">
          <h1 className="text-sm sm:text-lg font-semibold">Events Hosted</h1>
          <h1 className="text-sm sm:text-lg">5</h1>
        </div>
        <div className="flex flex-col justify-center items-center bg-[#CCDB28] rounded-lg w-full sm:w-1/2 h-20 shadow-md">
          <h1 className="text-sm sm:text-lg font-semibold">Events Played</h1>
          <h1 className="text-sm sm:text-lg">1</h1>
        </div>
      </div>

      {/* User Activity */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold mb-4">User Activity</h1>
        <div className="flex flex-col gap-4">
          {new Array(6).fill(null).map((_, idx) => (
            <div
              key={idx}
              className="flex gap-2 bg-[#F4F4F4] rounded-md w-full px-4 py-2"
            >
              <h1 className="font-semibold text-sm sm:text-lg">Hosted: </h1>
              <p className="text-sm sm:text-md">
                Summer Basketball Tournament Pro League Men Champ 2.0 2024
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EventPage />
  </Suspense>
);

export default page
