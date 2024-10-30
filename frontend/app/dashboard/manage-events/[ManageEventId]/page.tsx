"use client";

import CategoryPreview from "@/components/CategoryPreview";
import EnableFeatures from "@/components/EnableFeatures";
import EventInformation from "@/components/EventInformation";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { useEventContext } from "@/context/EventDataContext";
import { GrOverview } from "react-icons/gr";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import successAnimation from "@/public/Animations/Success.json";
import loadingAnimation from "@/public/Animations/loading.json"; 
import { IoCreate } from "react-icons/io5";
import { TbReportSearch, TbTournament } from "react-icons/tb";
import { MdLiveTv, MdOutlineCategory, MdOutlineFeaturedPlayList, MdOutlineRocketLaunch } from "react-icons/md";
import Lottie from "react-lottie";
import EventMatrics from "@/components/EventMatrics";
import EventBoosters from "@/components/EventBoosters";
import Report from "@/components/Report";
import LiveMatchTracking from "@/components/LiveMatchTracking";
import DrawCreation from "@/components/DrawCreation";

const ProgressBarCheckpointsManageEventID = [
  {
    icon: <GrOverview />,
    label: "Event Overview",
    placement: 1,
  },
  {
    icon: <TbReportSearch />,
    label: "Event Reports",
    placement: 2,
  },
  {
    icon: <IoCreate />,
    label: "Event Setup",
    placement: 3,
  },
  {
    icon: <MdOutlineCategory />,
    label: "Category Setup",
    placement: 4,
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    label: "Enable Features",
    placement: 5,
  },
  {
    icon: <TbTournament />,
    label: "Draw Creation",
    placement: 6,
  },
  {
    icon: <MdLiveTv />,
    label: "Live Match Tracker",
    placement: 7,
  },
];

const data = {
  LastRegistrationDate: "2024-10-18",
  LastWithdrawalDate: "2024-10-24",
  categories: [
    {
      amountInput: "",
      categoryName: "yuu",
      categoryType: "Doubles",
      discount: false,
      discountType: "",
      discountValue: "",
      discountcode: "",
      fromDate: "",
      id: 1,
      maxTicketQuantity: "",
      numberOfDiscounts: "",
      percentageInput: "",
      price: "12341241",
      ticketDescription:
        "it 08 8r  68rp7r -6 f6ruf86 6r r jhfithgd 5yjd ydk co7dyifv ikd c7",
      tillDate: "",
      totalQuantity: "",
    },
  ],
  city: "Chennai",
  countdown: true,
  desktopBanner: new File(
    [
      /* file data */
    ],
    "WhatsApp Image 2024-09-07 at 11.10.27_cc9bc7bd.jpg",
    {
      type: "image/jpeg",
      lastModified: 1725798902654,
    }
  ),
  enableFixtures: true,
  eventAddress: "Chennai International Airport Terminal 1",
  eventDescription:
    "yf uoouf uo u uduod oud u du du ud od otd ot d d uot dou doud oud ud uod ud uodd od d dhdkh kd kdtdytddd td iyt dhgc thd tdiyt d",
  eventName: "sxdcfvgbhnj",
  eventPincode: "600016",
  eventUSP:
    "yf uoouf uo u uduod oud u du du ud od otd ot d d uot dou doud oud ud uod ud uodd od d dhdkh kd kdtdytddd td iyt dhgc thd tdiyt d",
  eventenddate: "2024-10-17",
  eventstartDate: "2024-10-25",
  mobileBanner: new File(
    [
      /* file data */
    ],
    "WhatsApp Image 2024-09-07 at 11.10.27_cc9bc7bd.jpg",
    {
      type: "image/jpeg",
      lastModified: 1725798902654,
    }
  ),
  organiserName: "roshan",
  organiserNumber: "1234567890",
  organiseremailaddress: "f 6ff f6f06 f0ouy",
  playingRules:
    "yf uoouf uo u uduod oud u du du ud od otd ot d d uot dou doud oud ud uod ud uodd od d dhdkh kd kdtdytddd td iyt dhgc thd tdiyt d",
  rewardsAndParticipation:
    "yf uoouf uo u uduod oud u du du ud od otd ot d d uot dou doud oud ud uod ud uodd od d dhdkh kd kdtdytddd td iyt dhgc thd tdiyt d",
  selectedPlan: "elite",
  selectsport: "Tennis",
  startTime: "12:26",
  venueName: "dfvb",
  venuelink: "yf oufy uyfou",
};

// Define the type for the event data
interface EventData {
  LastRegistrationDate: string;
  LastWithdrawalDate: string;
  categories: Array<{
    amountInput: string;
    categoryName: string;
    categoryType: string;
    discount: boolean;
    discountType: string;
    discountValue: string;
    discountcode: string;
    fromDate: string;
    id: number;
    maxTicketQuantity: string;
    numberOfDiscounts: string;
    percentageInput: string;
    price: string;
    ticketDescription: string;
    tillDate: string;
    totalQuantity: string;
  }>;
  city: string;
  countdown: boolean;
  desktopBanner: File;
  enableFixtures: boolean;
  eventAddress: string;
  eventDescription: string;
  eventName: string;
  eventPincode: string;
  eventUSP: string;
  eventenddate: string;
  eventstartDate: string;
  mobileBanner: File;
  organiserName: string;
  organiserNumber: string;
  organiseremailaddress: string;
  playingRules: string;
  rewardsAndParticipation: string;
  selectedPlan: string;
  selectsport: string;
  startTime: string;
  venueName: string;
  venuelink: string;
}

const page = ({params}:any) => {
  const {EventEditData,setEventEditData,setEditPage}=useEventContext();
  const router=useRouter()
  const {ManageEventId}=useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<EventData | null>(null);
  const { setDashboardName } = useEventContext();
  useEffect(() => {
    setDashboardName(`${"Event Name"}`); 
    setEditPage("manageEvent")
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  };

  const fetchEventDetails = async (id: any) => {
    const response = await fetch(`/api/event/get_by_id/${id}`);
    const data = await response.json();
    setFetchedData(data);
    return data;
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAnimationComplete = () => {
    router.push("/dashboard/manage-events");
    setEventEditData({});
  };

  const handleeditButton = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setIsPlaying(false);
      setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true);
      }, 5000);

      const differences = Object.keys(EventEditData || {}).reduce(
        (acc: Record<string, any>, key: keyof EventData) => {
          if (
            JSON.stringify(fetchedData?.[key]) !==
            JSON.stringify(EventEditData?.[key])
          ) {
            acc[key] = EventEditData?.[key];
          }
          return acc;
        },
        {}
      );

      try {
        const response = await fetch(`/api/event/update/${ManageEventId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(differences),
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Event updated successfully:", result);
        } else {
          console.error("Failed to update event:", result.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };



  useEffect(() => {
    setDashboardName("Draw Creations");
    if (ManageEventId) {
      const loadEventDetails = async () => {
        const event = await fetchEventDetails(ManageEventId);
        setEventEditData(event);
      };
      loadEventDetails();
    }
  }, [ManageEventId]);

  return (
    <div className={`m-3 h-full relative `}>
      <ProgressBar
        forpage="manageEvent"
        currentpage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        checkpoints={ProgressBarCheckpointsManageEventID}
      />
      {(currentPage === 3 ||
        currentPage === 4 ||
        currentPage === 5) && (
          <div className="absolute right-3 top-10 lg:top-30">
            <Button onClick={handleeditButton} className="w-20">
              Edit
            </Button>
          </div>
        )}
      <div className="relative">
        <div className="mt-20 lg:mt-16 w-full rounded-lg">
          {currentPage === 1 && <EventMatrics handleNext={handleNext} />}
          {currentPage === 2 && <Report handleNext={handleNext} />}
          {currentPage === 3 && <EventInformation handleNext={handleNext} />}
          {currentPage === 4 && <CategoryPreview handleNext={handleNext} />}
          {currentPage === 5 && <EnableFeatures handleNext={handleNext} />}
          {currentPage === 6 && (
            <DrawCreation id={ManageEventId} handleNext={handleNext} />
          )}
          {currentPage === 7 && <LiveMatchTracking handleNext={handleNext} />}
        </div>
        {(isLoading || isPlaying) && (
          <div className="absolute inset-0 bg-gray-200  opacity-50 z-10" />
        )}

        <div className="absolute top-0 left-[25%] z-20">
          {isLoading && (
            <Lottie
              options={{ animationData: loadingAnimation, loop: true }}
              height={500}
              width={500}
              isStopped={!isPlaying}
              isPaused={!isPlaying}
            />
          )}
          {isPlaying && (
            <Lottie
              options={{ animationData: successAnimation, loop: false }}
              height={500}
              width={500}
              isStopped={!isPlaying}
              isPaused={!isPlaying}
              eventListeners={[
                { eventName: "complete", callback: handleAnimationComplete },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
