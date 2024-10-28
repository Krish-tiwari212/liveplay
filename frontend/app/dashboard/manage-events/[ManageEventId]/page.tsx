"use client";

import CategoryPreview from "@/components/CategoryPreview";
import EnableFeatures from "@/components/EnableFeatures";
import EventInformation from "@/components/EventInformation";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { useEventContext } from "@/context/EventDataContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import successAnimation from "@/public/Animations/Success.json";
import loadingAnimation from "@/public/Animations/loading.json"; 
import { IoCreate } from "react-icons/io5";
import { MdOutlineCategory, MdOutlineFeaturedPlayList } from "react-icons/md";
import Lottie from "react-lottie";

const ProgressBarCheckpointsManageEventID = [
  {
    icon: <IoCreate />,
    label: "Event Setup",
    placement: 1,
  },
  {
    icon: <MdOutlineCategory />,
    label: "Category Setup",
    placement: 2,
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    label: "Enable Features",
    placement: 3,
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

const page = ({
  params: ManageEventId,
}: {
  params: { ManageEventId: string };
}) => {
  const {EventEditData,setEventEditData,setEditPage}=useEventContext()
  const router=useRouter()
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setDashboardName } = useEventContext();
  useEffect(() => {
    setDashboardName(`${"Event Name"}`); 
    setEventEditData(data);
    setEditPage("manageEvent")
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
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

  const handleeditButton = () => {
    if (!isLoading) {
      setIsLoading(true);
      setIsPlaying(false);
      setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true); 
      }, 5000);
    }
    const differences = Object.keys(EventEditData).reduce((acc:any, key:any) => {
      if (JSON.stringify(data[key]) !== JSON.stringify(EventEditData[key])) {
        acc[key] = EventEditData[key] ;
      }
      return acc;
    }, {});
    console.log(differences);
  };

  return (
    <div className={`m-3 h-full relative `}>
      <ProgressBar
        currentpage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        checkpoints={ProgressBarCheckpointsManageEventID}
      />
      <div className="absolute right-3 top-10 lg:top-0">
        <Button onClick={handleeditButton} className="w-20">
          Edit
        </Button>
      </div>{" "}
      <div className="relative">
        <div className="mt-20 lg:mt-16 w-full rounded-lg shadow-lg">
          {currentPage === 1 && <EventInformation handleNext={handleNext} />}
          {currentPage === 2 && <CategoryPreview handleNext={handleNext} />}
          {currentPage === 3 && <EnableFeatures handleNext={handleNext} />}
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
