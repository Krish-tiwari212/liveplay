import React from 'react';
import { FaDollarSign, FaUser, FaHeart, FaEye, FaTimes, FaRupeeSign } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartBar, description } from './ChartBar';
import { XAxis } from 'recharts';import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReportProps{
    handleNext:()=>void
}

const Report = ({ handleNext }: ReportProps) => {
  const metrics = [
    {
      title: "Total Sales",
      description: "Total sales from the event",
      icon: <FaRupeeSign />,
      data: 5000,
    },
    {
      title: "Total Page Views",
      description: "Number of People who viewd this event",
      icon: <FaUser />,
      data: 150,
    },
    {
      title: "Number of Registrations",
      description: "Total number of registrations",
      icon: <FaEye />,
      data: 75,
    },
    {
      title: "Number of Interested People",
      description: "Number of People interested in the event",
      icon: <FaTimes />,
      data: 10,
    },
  ];

  const chartData = [
    {
      Cdata: [
        { category: "Category 1", SalePerCategory: 2000 },
        { category: "Category 2", SalePerCategory: 1500 },
        { category: "Category 3", SalePerCategory: 1200 },
      ],
      chartConfig: {
        SalePerCategory: {
          label: "Sales Per Category",
          color: "#17202a",
        },
      },
      xaxis: "SalePerCategory",
      title: "Revenue as Per Categories",
      description: "Shows how much each category contributed to total sales.",
      footerTitle: "Sales Per Category",
    },
    {
      Cdata: [
        { category: "Category 1", EntriesPerCategory: 50 },
        { category: "Category 2", EntriesPerCategory: 70 },
        { category: "Category 3", EntriesPerCategory: 30 },
        { category: "Category 4", EntriesPerCategory: 40 },
        { category: "Category 5", EntriesPerCategory: 70 },
        { category: "Category 6", EntriesPerCategory: 10 },
        { category: "Category 7", EntriesPerCategory: 4 },
        { category: "Category 8", EntriesPerCategory: 4 },
        { category: "Category 9", EntriesPerCategory: 3 },
        { category: "Category 10", EntriesPerCategory: 9 },
        { category: "Category 11", EntriesPerCategory: 30 },
        { category: "Category 12", EntriesPerCategory: 10 },
        { category: "Category 13", EntriesPerCategory: 70 },
        { category: "Category 14", EntriesPerCategory: 20 },
        { category: "Category 15", EntriesPerCategory: 90 },
      ],
      chartConfig: {
        EntriesPerCategory: {
          label: "Entries Per Category",
          color: "#17202a",
        },
      },
      xaxis: "EntriesPerCategory",
      title: "Entries as Per Categories",
      description: "Shows the number of participants per category. ",
      footerTitle: "Entries Per Category",
    },
  ];

  const participants = [
    {
      name: "Alice Smith",
      registrationDate: "2023-02-15",
      category: "Category 1",
      contactInfo: "alice@example.com",
    },
    {
      name: "Bob Johnson",
      registrationDate: "2023-03-10",
      category: "Category 2",
      contactInfo: "bob@example.com",
    },
    {
      name: "Charlie Brown",
      registrationDate: "2023-04-05",
      category: "Category 3",
      contactInfo: "charlie@example.com",
    },
  ];

  return (
    <div className=" text-gray-800 p-5">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Event Report</h1>
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

      <div className="charts flex flex-col md:flex-row gap-5 text-white">
        {chartData.map((data, i) => {
          const processCategory =
            data.Cdata.length > 8
              ? (value: any) => value.charAt(0) + value.slice(-2)
              : (value: any) => value;
          return (
            <div className="w-full md:w-[50%]" key={i}>
              <ChartBar
                processCategory={processCategory}
                xaxis={data.xaxis}
                chartConfig={data.chartConfig}
                data={data.Cdata}
                title={data.title}
                description={data.description}
                footertitle={data.footerTitle}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-white p-5 rounded-lg">
        <h2 className="text-3xl text-gray-800 mb-4 font-semibold ">
          List of Participants
        </h2>
        <Table>
          <TableCaption>List of unique participants registered.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Contact Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {participant.name}
                </TableCell>
                <TableCell>{participant.registrationDate}</TableCell>
                <TableCell>{participant.category}</TableCell>
                <TableCell className="text-right">
                  {participant.contactInfo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Participants</TableCell>
              <TableCell className="text-right">
                {participants.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="mt-4 bg-white p-5 rounded-lg">
        <h2 className="text-3xl text-gray-800 mb-4 font-semibold ">
          Participants Who Withdrew
        </h2>
        <Table>
          <TableCaption>
            List of participants who withdrew from the event.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Contact Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {participant.name}
                </TableCell>
                <TableCell>{participant.registrationDate}</TableCell>
                <TableCell>{participant.category}</TableCell>
                <TableCell className="text-right">
                  {participant.contactInfo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Participants</TableCell>
              <TableCell className="text-right">
                {participants.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="mt-4 bg-white p-5 rounded-lg">
        <h2 className="text-3xl text-gray-800 mb-4 font-semibold ">
          Interested Participants
        </h2>
        <Table>
          <TableCaption>
            List of participants who expressed interest via the “I’m Interested”
            feature.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Contact Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {participant.name}
                </TableCell>
                <TableCell>{participant.registrationDate}</TableCell>
                <TableCell>{participant.category}</TableCell>
                <TableCell className="text-right">
                  {participant.contactInfo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Participants</TableCell>
              <TableCell className="text-right">
                {participants.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Report;
