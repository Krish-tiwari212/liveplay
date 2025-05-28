import React, { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaUser,
  FaHeart,
  FaEye,
  FaTimes,
  FaRupeeSign,
  FaRegEye,
  FaRegThumbsUp,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartBar } from "./ChartBar";
import { LineChartDemo } from "./LineChart";
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
import { Button } from "./ui/button";
import { FaPeopleGroup } from "react-icons/fa6";
import { PieChartDemo } from "./PieChart";
import { BiLike } from "react-icons/bi";
import { createClient } from "@/utils/supabase/client";

interface ReportProps {
  handleNext: () => void;
  eventId: string;
}

const data = [
  {
    title: "salespercategory",
    categories: ["Men's Singles", "Women's Singles"],
    value: [0, 0],
  },
  {
    title: "entriesPerCategory",
    categories: ["Men's Singles", "Women's Singles"],
    value: [0, 0],
  },
];

const Report = ({ handleNext, eventId }: ReportProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participants, setParticipants] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/event/categories/${eventId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const metrics = [
    {
      title: "Event Sales",
      description: "Total Entry Fees Collected",
      icon: <FaRupeeSign />,
      data: data?.totalEntryFeesCollected || 0,
    },
    {
      title: "Event Views",
      description: "Total number of users who have viewed this event",
      icon: <FaRegEye />,
      data: data?.totalEventViews || 0,
    },
    {
      title: "Number of Registrations",
      description: "Total number of event registrations",
      icon: <FaPeopleGroup />,
      data: data?.totalNumberOfRegistrations || 0,
    },
    {
      title: "Number of Interested People",
      description: "Total number of users interested in this event",
      icon: <BiLike />,
      data: data?.totalInterestedPeople || 0,
    },
  ];

  const colors = [
    "#4186f5",
    "#fbd04e",
    "#f17b72",
    "#7ba9f8",
    "#45bcc6",
    "#ff6d00",
    "#32a754",
    "#fdbd00",
    "#ed4037",
    "#4ec9a3",
  ];

  const CdataSales =
    data?.sales?.map((sale, index) => {
      const fill = colors[index % colors.length];
      return {
        category: sale.category,
        salsepercategory: sale.total_sales,
        fill: fill,
      };
    }) || [];

  const CdataEntries =
    data?.registrations?.map((registration) => {
      const category = data.categories?.find(
        (cat) => cat.id === registration.category_id
      );
      return {
        category: category?.category_name || "Unknown",
        entriesPerCategory: registration.total_registrations,
        fill: "#4186f5",
      };
    }) || [];

  const SalesData = {
    Cdata: CdataSales,
    chartConfig: {
      salsepercategory: {
        label: "Sales : Rs ",
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
  };

  const EntriesData = {
    Cdata: CdataEntries,
    chartConfig: {
      entriesPerCategory: {
        label: "Registrations ",
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
  };

  useEffect(() => {
    const fetchParticipantsData = async () => {
      try {
        // Fetch participants data
        const { data: participantsData, error: participantsError } = await supabase
          .from('participants')
          .select('*')
          .eq('event_id', eventId);
  
        if (participantsError) throw participantsError;
  
        if (!participantsData || participantsData.length === 0) {
          setParticipants([]);
          return;
        }
        // Fetch user details for each participant
        const participantsWithDetails = await Promise.all(
          participantsData.map(async (participant) => {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('id', participant.user_id)
              .single();
  
            if (userError) throw userError;
  
            return {
              name: userData.full_name,
              address: userData.address,
              city: userData.city,
              pincode: userData.pincode,
              dob: userData.date_of_birth,
              gender: userData.gender,
              bloodGroup: userData.blood_group,
              contact: userData.contact_number,
              email: userData.email,
              registrationDate: participant.registration_date,
              category: participant.category_id, // Assuming category_id maps to a category name
              partnerName: participant.partner_name, // Assuming partner_name is a field in participants
              teamName: participant.team_id, // Assuming team_id maps to a team name
            };
          })
        );
  
        setParticipants(participantsWithDetails);
      } catch (error) {
        console.error('Error fetching participants data:', error);
      }
    };
  
    fetchParticipantsData();
  }, [eventId]);

  const noOfParticipants = participants.length > 0 ? Object.keys(participants[0]).length - 1 : 0;
  return (
    <div className=" text-gray-800 px-2 sm:px-5  pb-10">
      <h1 className="text-3xl text-gray-800 font-bold mb-4 sm:mb-8">
        Event Report
      </h1>
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
      <div className="charts flex flex-col xl:flex-row gap-5 text-white h-auto">
        <div className="w-full xl:w-[50%] h-full">
          <PieChartDemo
            chartData={SalesData.Cdata}
            processCategory={(value: any) => value}
            dataKey={SalesData.dataKey}
            chartConfig={SalesData.chartConfig}
            title={SalesData.title}
            description={SalesData.description}
            type={SalesData.type}
          />
        </div>
        <div className="w-full xl:w-[50%] h-full">
          <LineChartDemo
            chartData={EntriesData.Cdata}
            processCategory={(value: any) => value}
            dataKey={EntriesData.dataKey}
            chartConfig={EntriesData.chartConfig}
            title={EntriesData.title}
            description={EntriesData.description}
            type={EntriesData.type}
          />
        </div>
      </div>

      <div className="mt-4 bg-white p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between">
          <h2 className="text-2xl sm:text-3xl text-gray-800 mb-4 font-semibold ">
            List of Participants
          </h2>
          <Dialog>
            <DialogTrigger>
              <div className="px-4 py-2 bg-gray-800 text-[#cddc29] rounded-md">
                View Full Data
              </div>
            </DialogTrigger>
            <DialogContent className="h-auto w-[90%]">
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
        </Table>
      </div>

      <div className="mt-4 bg-white p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between">
          <h2 className="text-2xl sm:text-3xl text-gray-800 mb-4 font-semibold ">
            Participants Who Withdrew
          </h2>
          <Dialog>
            <DialogTrigger>
              <div className="px-4 py-2 bg-gray-800 text-[#cddc29] rounded-md">
                View Full Data
              </div>
            </DialogTrigger>
            <DialogContent className="h-auto w-[90%]">
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
        </Table>
      </div>

      <div className="mt-4 bg-white p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between">
          <h2 className="text-2xl sm:text-3xl text-gray-800 mb-4 font-semibold ">
            Interested Participants
          </h2>
          <Dialog>
            <DialogTrigger>
              <div className="px-4 py-2 bg-gray-800 text-[#cddc29] rounded-md">
                View Full Data
              </div>
            </DialogTrigger>
            <DialogContent className="h-auto w-[90%]">
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
        </Table>
      </div>
    </div>
  );
};

export default Report;
