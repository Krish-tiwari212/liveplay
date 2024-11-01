"use client"

import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { FaBarsProgress, FaUserGroup } from 'react-icons/fa6';
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
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';

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

const EventMatrics = ({ handleNext }: EventMatricsProps) => {
    const router = useRouter();
    const [showUpsell, setShowUpsell] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpgradeClick = () => {
        router.push('/payment');
    };

    const handleCancelClick = () => {
        if (window.confirm("Are you sure you want to cancel the event?")) {
            setIsModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleConfirmCancel = () => {
        console.log("Event cancelled");
        setIsModalOpen(false);
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
      </div>
    );
};

export default EventMatrics
