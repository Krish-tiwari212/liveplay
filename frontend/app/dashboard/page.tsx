"use client";

import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/lib/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import {  useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaStreetViewSolid } from "react-icons/lia";
import { IoTicketOutline } from "react-icons/io5";
import EventCard from "@/components/EventCard";
import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdOutlineSecurity } from "react-icons/md";
import { useEventContext } from "@/context/EventDataContext";
const { events } = data;



export default function Home() {
  const { setTheme } = useAppContext();
  const { setDashboardName } = useEventContext();
  const router=useRouter()
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    setTheme(matchMedia.matches ? "dark" : "light");
    matchMedia.addEventListener("change", handleThemeChange);
    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, []);
  useEffect(() => {
    setDashboardName("Home");
  }, []);
  return (
    <div className="flex flex-col m-3">
      <div className="flex justify-between ">
        <Button
          onClick={() => router.push("/dashboard/kyc/1234")}
          className="text-md shadow-md shadow-gray-500 w-auto px-20"
        >
          <MdOutlineSecurity className="mr-2" />
          Unlock Event Earnings (Kyc)
        </Button>
        <Button
          onClick={() => router.push("/dashboard/create_event")}
          className="text-2xl shadow-md shadow-gray-500 "
        >
          Create Event +
        </Button>
      </div>
      <section className="mt-4 bg-[#17202A] h-[9rem] shadow-xl rounded-lg p-4 relative mb-4">
        {/* <h1 className="hidden absolute md:block font-bold text-[4rem] lg:text-[5rem] right-2 -bottom-5 text-gray-500">
          liveplay.in
        </h1> */}
        <div className="hidden md:flex gap-4 xl:gap-6 flex-wrap absolute -bottom-10">
          <Card className=" w-auto shadow-xl h-auto">
            <CardContent className="flex justify-between  items-center w-full h-full gap-2 mt-2">
              <FaCalendarAlt className="xl:text-[1.5rem]" />
              <div className="flex flex-col text-start">
                <h1 className="text-[0.62rem] lg:text-[0.79rem] xl:text-[1rem]  font-bold">
                  Total Events Hosted
                </h1>
                <h1 className="text-[0.58rem] lg:text-[0.7rem] xl:text-sm ">
                  7
                </h1>
              </div>
            </CardContent>
          </Card>
          <Card className=" w-auto shadow-xl h-auto">
            <CardContent className="flex justify-between  items-center w-full h-full gap-2 mt-2">
              <IoTicketOutline className="xl:text-[1.5rem]" />
              <div className="flex flex-col text-start">
                <h1 className="text-[0.62rem] lg:text-[0.79rem] xl:text-[1rem] font-bold">
                  Total Entries
                </h1>
                <h1 className="text-[0.58rem] lg:text-[0.7rem] xl:text-sm ">
                  1500
                </h1>
              </div>
            </CardContent>
          </Card>
          <Card className=" w-auto shadow-xl h-auto">
            <CardContent className="flex justify-between items-center w-full h-full gap-2 mt-2">
              <FaHandHoldingDollar className="xl:text-[1.5rem]" />
              <div className="flex flex-col text-start">
                <h1 className="text-[0.62rem] lg:text-[0.79rem] xl:text-[1rem]  font-bold">
                  Total Sales
                </h1>
                <h1 className="text-[0.58rem] lg:text-[0.7rem] xl:text-sm ">
                  50000
                </h1>
              </div>
            </CardContent>
          </Card>
          <Card className=" w-auto shadow-xl h-auto">
            <CardContent className="flex justify-between  items-center w-full h-full gap-2 mt-2">
              <LiaStreetViewSolid className="xl:text-[1.5rem]" />
              <div className="flex flex-col text-start">
                <h1 className="text-[0.62rem] lg:text-[0.79rem] xl:text-[1rem]  font-bold">
                  Total Events views
                </h1>
                <h1 className="text-[0.58rem] lg:text-[0.7rem] xl:text-sm ">
                  4500
                </h1>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="p-2 md:w-[60%] lg:w-[50%]">
          <h1 className="text-2xl font-bold text-gray-400 mb-4 md:mb-2">
            Hello Mohit 👋
          </h1>
        </div>
      </section>
      <section className="md:hidden">
        <div className="flex gap-6 flex-wrap">
          <Card className="w-1/2 h-full shadow-xl">
            <CardContent className="flex items-center w-full h-full gap-4 mt-2">
              <FaCalendarAlt className="text-[1.5rem]" />
              <div className="flex flex-col text-start">
                <h1 className="text-[1rem] font-bold">Total Events Hosted</h1>
                <h1 className="text-[0.7rem] xl:text-sm ">7</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="w-1/2 h-full shadow-xl">
            <CardContent className="flex items-center w-full h-full gap-4 mt-2">
              <IoTicketOutline className="text-[1.5rem]" />
              <div className="flex flex-col text-start">
                <h1 className="text-[1rem] font-bold">Total Entries</h1>
                <h1 className="text-[0.7rem] xl:text-sm ">1500</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="w-1/2 h-full shadow-xl">
            <CardContent className="flex items-center w-full h-full gap-4 mt-2">
              <FaHandHoldingDollar className="text-[1.5rem]" />
              <div className="flex flex-col text-start">
                <h1 className="text-[1rem] font-bold">Total Sales</h1>
                <h1 className="text-[0.7rem] xl:text-sm ">500000</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="w-1/2 h-full shadow-xl">
            <CardContent className="flex items-center w-full h-full gap-4 mt-2">
              <LiaStreetViewSolid className="text-[1.5rem]" />
              <div className="flex flex-col text-start">
                <h1 className="text-[1rem] font-bold">Total Events views</h1>
                <h1 className="text-[0.7rem] xl:text-sm ">4500</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="mt-14 bg-white shadow-md rounded-lg px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Active Events</h2>
        <div className="flex space-x-4 overflow-x-auto pb-8">
          <Card className="shadow-md cursor-pointer hover:shadow-2xl">
            <CardContent className="py-4 flex gap-4">
              <Image
                src={"/images/img1.jpeg"}
                alt="eventBanner"
                width={200}
                height={200}
                className="rounded-lg h-44 shadow-xl "
              />
              <div>
                <h3 className="font-bold">Badminton Cup</h3>
                <div className="flex flex-col justify-between">
                  <span>Entries: 55</span>
                  <span>Revenue: $0</span>
                  <span>Event Views: 0</span>
                  <span>Interested People: 0</span>
                </div>
                <Link href="/event/share-link">
                  <Button className="w-full mt-2 bg-[#17202A]  text-[#CDDC29] hover:text-white p-1 rounded hover:shadow-xl">
                    Share
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md cursor-pointer hover:shadow-2xl">
            <CardContent className="py-4 flex gap-4">
              <Image
                src={"/images/img2.jpeg"}
                alt="eventBanner"
                width={200}
                height={200}
                className="rounded-lg h-44 shadow-xl "
              />
              <div>
                <h3 className="font-bold">Badminton Cup</h3>
                <div className="flex flex-col justify-between">
                  <span>Entries: 55</span>
                  <span>Revenue: $0</span>
                  <span>Event Views: 0</span>
                  <span>Interested People: 0</span>
                </div>
                <Link href="/event/share-link">
                  <Button className="w-full mt-2  p-1 rounded hover:shadow-xl">
                    Share
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-14 bg-white shadow-md rounded-lg px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Past Events</h2>
        <div className="flex space-x-4 overflow-x-auto pb-8">
          <Card className="shadow-md cursor-pointer hover:shadow-2xl">
            <CardContent className="py-4 flex gap-4">
              <Image
                src={"/images/img3.jpeg"}
                alt="eventBanner"
                width={200}
                height={200}
                className="rounded-lg h-44 shadow-xl "
              />
              <div>
                <h3 className="font-bold">Badminton Cup</h3>
                <div className="flex flex-col justify-between">
                  <span>Entries: 400</span>
                  <span>Revenue: $0</span>
                  <span>Event Views: 0</span>
                  <span>Interested People: 0</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md cursor-pointer hover:shadow-2xl">
            <CardContent className="py-4 flex gap-4">
              <Image
                src={"/images/img5.jpeg"}
                alt="eventBanner"
                width={200}
                height={200}
                className="rounded-lg h-44 shadow-xl "
              />
              <div>
                <h3 className="font-bold">Badminton Cup</h3>
                <div className="flex flex-col justify-between">
                  <span>Entries: 55</span>
                  <span>Revenue: $0</span>
                  <span>Event Views: 0</span>
                  <span>Interested People: 0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="mt-6 bg-white shadow-md rounded-l px-4 pt-4">
        <h2 className="text-xl font-semibold mb-2">Drafts</h2>
        <div className="flex space-x-4 overflow-x-auto pb-8">
          <Card className="shadow-md cursor-pointer hover:shadow-2xl">
            <CardContent className="py-4 flex gap-4">
              <Image
                src={"/images/default.jpeg"}
                alt="eventBanner"
                width={200}
                height={200}
                className="rounded-lg h-44 shadow-xl "
              />
              <div>
                <h3 className="font-bold">Badminton Cup</h3>
                <div className="text-center items-center h-36 mt-2 rounded-lg bg-slate-100 w-36 shadow-xl"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md cursor-pointer hover:shadow-2xl">
            <CardContent className="py-4 flex gap-4">
              <Image
                src={"/images/img7.jpeg"}
                alt="eventBanner"
                width={200}
                height={200}
                className="rounded-lg h-44 shadow-xl "
              />
              <div className="">
                <h3 className="font-bold">Badminton Cup</h3>
                <div className="text-center items-center h-36 mt-2 rounded-lg bg-slate-100 w-36 shadow-xl"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
