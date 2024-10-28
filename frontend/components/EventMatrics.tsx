import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { FaBarsProgress, FaUserGroup } from 'react-icons/fa6';
import { IoBarChart } from 'react-icons/io5';
import { FaChartPie, FaRupeeSign, FaStar } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { GiSparklingSabre, GiTrophyCup } from "react-icons/gi";
import { TiChartBarOutline } from "react-icons/ti";
import { MdChecklist } from 'react-icons/md';
import { GoSponsorTiers } from "react-icons/go";

const keyMetrics = [
  {
    title: "Total Participants",
    value: 1000,
    change: "+10%",
    icon: <FaUserGroup />,
  },
  { title: "Tickets Sold", value: 800, change: "-5%", icon: <IoBarChart /> },
  {
    title: "Revenue Generated",
    value: "50,000",
    change: "+15%",
    icon: <FaRupeeSign />,
  },
  { title: "Active Teams", value: 5, change: "0%", icon: <SlCalender /> },
  {
    title: "New Registrations",
    value: 150,
    change: "+20%",
    icon: <GiSparklingSabre />,
  },
  { title: "Event Ratings", value: "4.5/5", change: "N/A", icon: <FaStar /> },
  {
    title: "Conversion Rate",
    value: "25%",
    change: "+5%",
    icon: <FaChartPie />,
  },
  {
    title: "Top Categories",
    value: "Soccer, Basketball",
    change: "N/A",
    icon: <TiChartBarOutline />,
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
    const router=useRouter()
  return (
    <div className=" text-gray-800">
      <header className="p-5 text-gray-800 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Event Metrics Dashboard</h1>
          <p className="text-gray-600">Current Sports Event Overview</p>
        </div>

        <Button onClick={() => router.push("/dashboard/draw_creation/")}>
          View Draw Creations
        </Button>
      </header>

      <main className="p-5 bg-white rounded-lg shadow-lg">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-white transform transition-transform duration-200 hover:scale-105"
            >
              <h2 className="text-lg font-semibold">{metric.title}</h2>
              <p className="text-xl">
                {metric.value}
                <span className="text-gray-500">({metric.change})</span>
              </p>
              {metric.icon}
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Secondary Metrics Cards */}
          {secondaryMetrics.map((metric, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-white transform transition-transform duration-200 hover:scale-105"
            >
              <h3 className="text-lg font-semibold">{metric.title}</h3>
              <ul className="list-disc pl-5">
                {metric.data.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              {metric.icon}
            </div>
          ))}
        </section>

        {/* <section className="mt-5">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            Event Attendance Over Time
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-2">
            Revenue by Category
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-2">
            Peak Registration Times
          </div>
        </section> */}
      </main>

      <footer className="p-5 bg-white text-gray-800">
        {/* Removed Export Data button */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Metric</th>
                <th className="border border-gray-300 p-2">Value</th>
                <th className="border border-gray-300 p-2">Change</th>
              </tr>
            </thead>
            <tbody>
              {keyMetrics.map((metric, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{metric.title}</td>
                  <td className="border border-gray-300 p-2">{metric.value}</td>
                  <td className="border border-gray-300 p-2">
                    {metric.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Metric</th>
                <th className="border border-gray-300 p-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {secondaryMetrics.map((metric, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{metric.title}</td>
                  <td className="border border-gray-300 p-2">
                    {metric.data.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </footer>
    </div>
  );
};

export default EventMatrics
