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
import { toast } from "@/hooks/use-toast";

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
    icon: <MdOutlineRocketLaunch />,
    label: "Event Boosters",
    placement: 6,
  },
  {
    icon: <TbTournament />,
    label: "Draw Creation",
    placement: 7,
  },
  {
    icon: <MdLiveTv />,
    label: "Live Match Tracking",
    placement: 8,
  },
];


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
  const { setDashboardName,setFetchedEventdatafromManagemeEvent } = useEventContext();
  
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
    router.push("/organizerDashboard/manage-events");
    setEventEditData({});
  };

  const handleeditButton = async () => {
    if (!isLoading) {
        setIsLoading(true);
        setIsPlaying(false);
        
        const differences = Object.keys(EventEditData || {}).reduce(
            (acc: Record<string, any>, key: any) => {
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

        console.log(differences);

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
                setIsPlaying(true); 
            } else {
                console.error("Failed to update event:", result.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            toast({
              title:
                "Failed to fetch events. Please check your network connection.",
              variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }
};



  useEffect(() => {
    setDashboardName("Event Management");
    setEditPage("manageEvent");
    if (ManageEventId) {
      const loadEventDetails = async () => {
        const event = await fetchEventDetails(ManageEventId);
        setEventEditData(event);
        setFetchedEventdatafromManagemeEvent(event)
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
      <div className="relative">
        {EventEditData.enable_fixtures === true ? (
          <div className="mt-20 lg:mt-4 w-full rounded-lg">
            {currentPage === 1 && <EventMatrics handleNext={handleNext} />}
            {currentPage === 2 && <Report handleNext={handleNext} />}
            {currentPage === 3 && (
              <EventInformation
                handleNext={handleNext}
                ManageEventId={ManageEventId}
              />
            )}
            {currentPage === 4 && <CategoryPreview handleNext={handleNext} />}
            {currentPage === 5 && <EnableFeatures handleNext={handleNext} />}
            {currentPage === 6 && <EventBoosters handleNext={handleNext} />}
            {currentPage === 7 && (
              <DrawCreation id={ManageEventId} handleNext={handleNext} />
            )}
            {currentPage === 8 && <LiveMatchTracking handleNext={handleNext} />}
          </div>
        ) : (
          <div className="mt-20 lg:mt-4 w-full rounded-lg">
            {currentPage === 1 && <EventMatrics handleNext={handleNext} />}
            {currentPage === 2 && <Report handleNext={handleNext} />}
            {currentPage === 3 && (
              <EventInformation
                handleNext={handleNext}
                ManageEventId={ManageEventId}
              />
            )}
            {currentPage === 4 && <CategoryPreview handleNext={handleNext} />}
            {currentPage === 5 && <EnableFeatures handleNext={handleNext} />}
            {currentPage === 6 && <EventBoosters handleNext={handleNext} />}
            {currentPage === 7 && <LiveMatchTracking handleNext={handleNext} />}
          </div>
        )}

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
