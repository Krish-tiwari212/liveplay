import React, { useEffect } from 'react';
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
import { ChartBar } from './ChartBar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from './ui/button';

interface ReportProps{
    handleNext:()=>void
}

const data = [
  {
    title: "salespercategory",
    value: [1500, 1200, 1100, 1110, 1220, 1000, 900],
  },
  {
    title: "entriesPerCategory",
    value: [50,70,30,40,70,10,4,40,3,9,2,10,70,20,90],
  },
];

const Report = ({ handleNext }: ReportProps) => {
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
  
  const CdataSales = data[0].value.map((value, index) => {
    const fill =
      value === Math.max(...data[0].value)
        ? "#17202a"
        : value === Math.min(...data[0].value)
        ? "#17202a"
        : "#17202a";
    return {
      category: `category${index + 1}`,
      salsepercategory: value,
      fill: fill,
    };
  });

  const CdataEntries = data[1].value.map((value, index) => {
    const fill =
      value === Math.max(...data[1].value)
        ? "#17202a"
        : value === Math.min(...data[1].value)
        ? "#17202a"
        : "#17202a";
    return {
      category: `Category ${index + 1}`,
      entriesPerCategory: value,
      fill: fill,
    };
  });

  const chartData = [
    {
      Cdata: CdataSales,
      chartConfig: {
        salsepercategory: {
          label: "Sales : Rs",
        },
        ...CdataSales.reduce((acc: any, curr) => {
          acc[curr.category] = {
            label: curr.category,
            color:
              "hsl(var(--chart-" +
              parseInt(curr.category.replace("category", "")) +
              "))",
          };
          return acc;
        }, {}),
      },
      type: "horizontal",
      dataKey: "salsepercategory",
      datakey1: "category",
      title: "Sales per category",
      description: "Shows how much each category contributed to total sales.",
    },
    {
      Cdata: CdataEntries,
      chartConfig: {
        entriesPerCategory: {
          label: "Entries ",
          color: "#17202a",
        },
        ...CdataEntries.reduce((acc: any, curr) => {
          acc[curr.category] = {
            label: curr.category,
            color:
              "hsl(var(--chart-" +
              parseInt(curr.category.replace("category", "")) +
              "))",
          };
          return acc;
        }, {}),
      },
      type: "vertical",
      dataKey: "entriesPerCategory",
      datakey1: "category",
      title: "Registrations per category",
      description: "Shows the number of participants per category. ",
    },
  ];

  const participants = [
    {
      name: "Alice Smith",
      address: "123 Main St",
      city: "New York",
      pincode: "10001",
      dob: "1990-01-01",
      gender: "Female",
      bloodGroup: "A+",
      contact: "1234567890",
      email: "alice@example.com",
      registrationDate: "2023-02-15",
      category: "Category 1",
      partnerName: "Partner A",
      teamName: "Team Alpha",
    },
    {
      name: "Bob Johnson",
      address: "456 Elm St",
      city: "Los Angeles",
      pincode: "90001",
      dob: "1985-05-15",
      gender: "Male",
      bloodGroup: "B+",
      contact: "1234567890",
      email: "bob@example.com",
      registrationDate: "2023-03-10",
      category: "Category 2",
      partnerName: "Partner B",
      teamName: "Team Beta",
    },
    {
      name: "Charlie Brown",
      address: "789 Oak St",
      city: "Chicago",
      pincode: "60601",
      dob: "1992-07-20",
      gender: "Male",
      bloodGroup: "O+",
      contact: "1234567890",
      email: "charlie@example.com",
      registrationDate: "2023-04-05",
      category: "Category 3",
      partnerName: "Partner C",
      teamName: "Team Gamma",
    },
    {
      name: "Diana Prince",
      address: "321 Pine St",
      city: "Miami",
      pincode: "33101",
      dob: "1988-03-30",
      gender: "Female",
      bloodGroup: "AB+",
      contact: "1234567890",
      email: "diana@example.com",
      registrationDate: "2023-01-20",
      category: "Category 1",
      partnerName: "Partner D",
      teamName: "Team Delta",
    },
    {
      name: "Ethan Hunt",
      address: "654 Maple St",
      city: "Seattle",
      pincode: "98101",
      dob: "1980-11-11",
      gender: "Male",
      bloodGroup: "A-",
      contact: "1234567890",
      email: "ethan@example.com",
      registrationDate: "2023-02-25",
      category: "Category 2",
      partnerName: "Partner E",
      teamName: "Team Epsilon",
    },
    {
      name: "Fiona Gallagher",
      address: "987 Birch St",
      city: "Boston",
      pincode: "02101",
      dob: "1995-09-09",
      gender: "Female",
      bloodGroup: "B-",
      contact: "1234567890",
      email: "fiona@example.com",
      registrationDate: "2023-03-15",
      category: "Category 3",
      partnerName: "Partner F",
      teamName: "Team Zeta",
    },
    {
      name: "George Costanza",
      address: "159 Cedar St",
      city: "San Francisco",
      pincode: "94101",
      dob: "1975-12-12",
      gender: "Male",
      bloodGroup: "O-",
      contact: "1234567890",
      email: "george@example.com",
      registrationDate: "2023-04-01",
      category: "Category 1",
      partnerName: "Partner G",
      teamName: "Team Eta",
    },
    {
      name: "Hannah Baker",
      address: "753 Spruce St",
      city: "Austin",
      pincode: "73301",
      dob: "1998-05-05",
      gender: "Female",
      bloodGroup: "AB-",
      contact: "1234567890",
      email: "hannah@example.com",
      registrationDate: "2023-04-10",
      category: "Category 2",
      partnerName: "Partner H",
      teamName: "Team Theta",
    },
    {
      name: "Ian Malcolm",
      address: "852 Willow St",
      city: "Denver",
      pincode: "80201",
      dob: "1965-06-06",
      gender: "Male",
      bloodGroup: "A+",
      contact: "1234567890",
      email: "ian@example.com",
      registrationDate: "2023-04-15",
      category: "Category 3",
      partnerName: "Partner I",
      teamName: "Team Iota",
    },
    {
      name: "Julia Roberts",
      address: "963 Fir St",
      city: "Phoenix",
      pincode: "85001",
      dob: "1970-04-04",
      gender: "Female",
      bloodGroup: "B+",
      contact: "1234567890",
      email: "julia@example.com",
      registrationDate: "2023-04-20",
      category: "Category 1",
      partnerName: "Partner J",
      teamName: "Team Kappa",
    },
  ];

  const noOfParticipants = Object.keys(participants[0]).length-1;
  return (
    <div className=" text-gray-800 px-5 pb-10">
      <h1 className="text-3xl text-gray-800 font-bold mb-8">Event Report</h1>
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
                chartData={data.Cdata}
                processCategory={processCategory}
                dataKey={data.dataKey}
                chartConfig={data.chartConfig}
                title={data.title}
                description={data.description}
                type={data.type}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-white p-5 rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-3xl text-gray-800 mb-4 font-semibold ">
            List of Participants
          </h2>
          <Dialog>
            <DialogTrigger>
              <div className="px-4 py-2 bg-gray-800 text-[#cddc29] rounded-md">
                View Full Data
              </div>
            </DialogTrigger>
            <DialogContent type="table">
              <DialogTitle>List of Participants</DialogTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Pincode</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date of registration</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Partner Name</TableHead>
                    <TableHead>Team Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {participant.name}
                      </TableCell>
                      <TableCell>{participant.address}</TableCell>
                      <TableCell>{participant.city}</TableCell>
                      <TableCell className="text-right">
                        {participant.pincode}
                      </TableCell>
                      <TableCell>{participant.dob}</TableCell>
                      <TableCell>{participant.gender}</TableCell>
                      <TableCell>{participant.bloodGroup}</TableCell>
                      <TableCell>{participant.contact}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>{participant.registrationDate}</TableCell>
                      <TableCell>{participant.category}</TableCell>
                      <TableCell>{participant.partnerName}</TableCell>
                      <TableCell>{participant.teamName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <TableFooter>
                  <TableRow>
                    <TableCell colSpan={noOfParticipants}>
                      Total Participants
                    </TableCell>
                    <TableCell className="text-right">
                      {participants.length}
                    </TableCell>
                  </TableRow>
                </TableFooter> */}
              </Table>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Pincode</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date of registration</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Partner Name</TableHead>
              <TableHead>Team Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.slice(0, 3).map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {participant.name}
                </TableCell>
                <TableCell>{participant.address}</TableCell>
                <TableCell>{participant.city}</TableCell>
                <TableCell className="text-right">
                  {participant.pincode}
                </TableCell>
                <TableCell>{participant.dob}</TableCell>
                <TableCell>{participant.gender}</TableCell>
                <TableCell>{participant.bloodGroup}</TableCell>
                <TableCell>{participant.contact}</TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>{participant.registrationDate}</TableCell>
                <TableCell>{participant.category}</TableCell>
                <TableCell>{participant.partnerName}</TableCell>
                <TableCell>{participant.teamName}</TableCell>
              </TableRow>
            ))}
            {participants.length > 3 && (
              <TableRow>
                <TableCell colSpan={noOfParticipants} className="text-center">
                  + {participants.length - 3} more participants
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total Participants</TableCell>
              <TableCell>{participants.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="mt-4 bg-white p-5 rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-3xl text-gray-800 mb-4 font-semibold ">
            Participants Who Withdrew
          </h2>
          <Dialog>
            <DialogTrigger>
              <div className="px-4 py-2 bg-gray-800 text-[#cddc29] rounded-md">
                View Full Data
              </div>
            </DialogTrigger>
            <DialogContent type="table">
              <DialogTitle>Participants Who Withdrew</DialogTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Pincode</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date of registration</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Partner Name</TableHead>
                    <TableHead>Team Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {participant.name}
                      </TableCell>
                      <TableCell>{participant.address}</TableCell>
                      <TableCell>{participant.city}</TableCell>
                      <TableCell className="text-right">
                        {participant.pincode}
                      </TableCell>
                      <TableCell>{participant.dob}</TableCell>
                      <TableCell>{participant.gender}</TableCell>
                      <TableCell>{participant.bloodGroup}</TableCell>
                      <TableCell>{participant.contact}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>{participant.registrationDate}</TableCell>
                      <TableCell>{participant.category}</TableCell>
                      <TableCell>{participant.partnerName}</TableCell>
                      <TableCell>{participant.teamName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={noOfParticipants}>
                      Total Participants
                    </TableCell>
                    <TableCell className="text-right">
                      {participants.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Pincode</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date of registration</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Partner Name</TableHead>
              <TableHead>Team Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.slice(0, 3).map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {participant.name}
                </TableCell>
                <TableCell>{participant.address}</TableCell>
                <TableCell>{participant.city}</TableCell>
                <TableCell>{participant.pincode}</TableCell>
                <TableCell>{participant.dob}</TableCell>
                <TableCell>{participant.gender}</TableCell>
                <TableCell>{participant.bloodGroup}</TableCell>
                <TableCell>{participant.contact}</TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>{participant.registrationDate}</TableCell>
                <TableCell>{participant.category}</TableCell>
                <TableCell>{participant.partnerName}</TableCell>
                <TableCell>{participant.teamName}</TableCell>
              </TableRow>
            ))}
            {participants.length > 3 && (
              <TableRow>
                <TableCell colSpan={noOfParticipants} className="text-center">
                  + {participants.length - 3} more participants
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>Total Participants</TableCell>
              <TableCell className="text-right">
                {participants.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="mt-4 bg-white p-5 rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-3xl text-gray-800 mb-4 font-semibold ">
            Interested Participants
          </h2>
          <Dialog>
            <DialogTrigger>
              <div className="px-4 py-2 bg-gray-800 text-[#cddc29] rounded-md">
                View Full Data
              </div>
            </DialogTrigger>
            <DialogContent type="table">
              <DialogTitle>Interested Participants</DialogTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Pincode</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {participant.name}
                      </TableCell>
                      <TableCell>{participant.address}</TableCell>
                      <TableCell>{participant.city}</TableCell>
                      <TableCell className="text-right">
                        {participant.pincode}
                      </TableCell>
                      <TableCell>{participant.dob}</TableCell>
                      <TableCell>{participant.gender}</TableCell>
                      <TableCell>{participant.bloodGroup}</TableCell>
                      <TableCell>{participant.contact}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={noOfParticipants}>
                      Total Participants
                    </TableCell>
                    <TableCell className="text-right">
                      {participants.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Pincode</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.slice(0, 3).map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {participant.name}
                </TableCell>
                <TableCell>{participant.address}</TableCell>
                <TableCell>{participant.city}</TableCell>
                <TableCell>{participant.pincode}</TableCell>
                <TableCell>{participant.dob}</TableCell>
                <TableCell>{participant.gender}</TableCell>
                <TableCell>{participant.bloodGroup}</TableCell>
                <TableCell>{participant.contact}</TableCell>
                <TableCell>{participant.email}</TableCell>
              </TableRow>
            ))}
            {participants.length > 3 && (
              <TableRow>
                <TableCell colSpan={noOfParticipants} className="text-center">
                  + {participants.length - 3} more participants
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>Total Participants</TableCell>
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
