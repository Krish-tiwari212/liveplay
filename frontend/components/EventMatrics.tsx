"use client"

import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { FaBarsProgress, FaIndianRupeeSign, FaUserGroup } from 'react-icons/fa6';
import { IoBarChart } from 'react-icons/io5';
import { FaChartPie, FaEye, FaRupeeSign, FaStar, FaTimes, FaUser } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { GiSparklingSabre, GiTrophyCup } from "react-icons/gi";
import { TiChartBarOutline } from "react-icons/ti";
import { MdChecklist } from 'react-icons/md';
import { GoSponsorTiers } from "react-icons/go";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from 'react';
import EventBoosters from './EventBoosters';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const metrics = [
  {
    title: "Event Sales",
    description: "Total Entry Fees Collected",
    icon: <FaRupeeSign />,
    data: 5000,
  },
  {
    title: "Event Views",
    description: "Total number of users who have viewed this event",
    icon: <FaUser />,
    data: 150,
  },
  {
    title: "Number of Registrations",
    description: "Total number of event registrations",
    icon: <FaEye />,
    data: 75,
  },
  {
    title: "Number of Interested People",
    description: "Total number of users interested in this event",
    icon: <FaTimes />,
    data: 10,
  },
];

const secondaryMetrics = [
  {
    title: "Top Performing Teams",
    data: ["Team A - 300", "Team B - 250"],
    icon: <GiTrophyCup />,
  },
  {
    title: "Check-in Statistics",
    data: ["Checked In: 900", "Registered: 1000"],
    icon: <MdChecklist />,
  },
  {
    title: "Sponsor Contributions",
    data: ["Sponsor A: 10,000", "Sponsor B: 5,000"],
    icon: <GoSponsorTiers />,
  },
  {
    title: "Completion Rate",
    data: ["Completed: 80%"],
    icon: <FaBarsProgress />,
  },
];

interface EventMatricsProps{
  handleNext: () => void;
}

const EventDetails = () => {
  return (
    <Card className="bg-gray-100 rounded-lg shadow-md p-5 mb-5 flex flex-col md:flex-row">
      <img 
        src="/images/img3.jpeg" 
        alt="Event" 
        className="w-1/3 md:w-1/4 rounded-lg" 
      />
      <div className="flex-1 md:pl-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Basketball</p>
            <h2 className="text-xl font-bold">Krish Event</h2>
            <p className="text-gray-800">Maratha Mandir: Mumbai Central</p>
            <p className="text-sm text-gray-600">Tue, 01 Nov | 11:30 am</p>
          </div>
        </div>
        <hr className="my-3 border-gray-300" />
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Organizer</p>
            <p className="font-bold">Krish</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">SEATS</p>
            <p className="font-bold">DRESS CI - F7</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const EventMatrics = ({ handleNext }: EventMatricsProps) => {
    const router = useRouter();
    const [showUpsell, setShowUpsell] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amountPaid, setAmountPaid] = useState(500);
    const cancellationFeePercentage = 0.05;

    const cancellationFee = amountPaid * cancellationFeePercentage;
    const totalRefundAmount = amountPaid - cancellationFee;

    const handleUpgradeClick = () => {
        router.push('/payment');
    };

    const handleCancelClick = () => {
        const confirmed = window.confirm("Are you sure you want to cancel the event?");
        if (confirmed) {
            setIsModalOpen(true);
        }
    };

    return (
      <div className="text-gray-800 px-5 ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-gray-800 font-bold">Event Overview</h1>
          <Button onClick={handleCancelClick}>Cancel Event</Button>
        </div>
        <main className="rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {metrics.map((metric, i) => (
              <Card
                key={i}
                className="transform transition-transform duration-200 hover:scale-105"
              >
                <CardHeader>
                  <CardTitle>{metric.title}</CardTitle>
                  <CardDescription>{metric.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center text-xl ">
                    {metric.icon}
                    <span>{metric.data}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {showUpsell && (
            <div className="p-5 rounded-lg shadow-lg mt-5">
              <h2 className="text-4xl font-bold text-gray-800 border-b-2 border-[#cddc29] mb-2">
                Boost Your Event Performance
              </h2>
              <p className="text-gray-800 mb-4">
                Noticed lower-than-expected registrations? Boost visibility and
                enhance participant experience with Pro and Elite plans.
              </p>
              <EventBoosters handleNext={handleNext} />
            </div>
          )}
        </main>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-gray-100 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Cancellation Details
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                <EventDetails />
                <div className="bg-blue-100 p-3 rounded-md mb-2">
                  <strong>Cancellation Policy:</strong> You can cancel this
                  event up to 12 hours before the registration time.
                  Cancellation fees apply as per policy.
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="mb-4 w-full">
              <h3 className="font-semibold text-xl mb-2">Refund Details</h3>
              <div className="flex flex-col bg-white  px-4 py-2">
                <div className="flex justify-between">
                  <p>Amount Paid: </p>
                  <p className="flex justify-center items-center">
                    <FaIndianRupeeSign className="w-3 h-3" />
                    {amountPaid.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Cancellation Fee (5%): </p>
                  <p className="flex justify-center items-center">
                    <FaIndianRupeeSign className="w-3 h-3" />
                    {cancellationFee.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Total Refund Amount: </p>
                  <p className="flex justify-center items-center">
                    <FaIndianRupeeSign className="w-3 h-3" />
                    {totalRefundAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-800 py-4">
              <Button onClick={() => setIsModalOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button>
                <div className="flex gap-2">
                  <p>Get Refund: </p>
                  <p className="flex justify-center items-center">
                    {totalRefundAmount.toFixed(2)}
                  </p>
                </div>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
};

export default EventMatrics
