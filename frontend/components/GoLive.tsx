import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import Lottie from 'react-lottie'
import successAnimation from '@/public/Animations/Success.json' 
import loadingAnimation from "@/public/Animations/loading.json"; 
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEventContext } from '@/context/EventDataContext';

const GoLive = () => {
  const {EventData, setEventData}=useEventContext()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  console.log(EventData)

  const handleButtonClick = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setIsPlaying(false);
  
      const formData = new FormData();
      formData.append('event_name', EventData.eventName);
      formData.append('organizer_contact_number', EventData.organiserNumber);
      formData.append('organizer_email', EventData.organiseremailaddress);
      formData.append('start_date', EventData.eventstartDate);
      formData.append('end_date', EventData.eventenddate);
      formData.append('last_registration_date', EventData.LastRegistrationDate);
      formData.append('last_withdrawal_date', EventData.LastWithdrawalDate);
      formData.append('start_time', EventData.startTime);
      formData.append('venue_name', EventData.venueName);
      formData.append('street_address', EventData.eventAddress);
      formData.append('city', EventData.city);
      formData.append('pincode', EventData.eventPincode);
      formData.append('venue_not_decided', EventData.venueNotDecided !== undefined ? EventData.venueNotDecided.toString() : 'false');
      formData.append('event_description', EventData.eventDescription);
      formData.append('event_usp', EventData.eventUSP);
      formData.append('rewards_for_participants', EventData.rewardsAndParticipation);
      formData.append('playing_rules', EventData.playingRules);
      formData.append('countdown', EventData.countdown !== undefined ? EventData.countdown.toString() : 'false');
      formData.append('enable_fixtures', EventData.enableFixtures !== undefined ? EventData.enableFixtures.toString() : 'false');
      formData.append('venue_link', EventData.venuelink);
      formData.append('sport', EventData.selectsport);
      formData.append('selected_plan', EventData.selectedPlan);
      formData.append('mobileBanner', EventData.mobileBanner);
      formData.append('desktopBanner', EventData.desktopBanner);
      formData.append(
        "eventData",
        JSON.stringify({
          categories: EventData.categories.map((category: any) => ({
            category_name: category.categoryName,
            total_quantity: category.totalQuantity !== "" ? parseInt(category.totalQuantity, 10) : 0,
            max_ticket_quantity: category.maxTicketQuantity !== "" ? parseInt(category.maxTicketQuantity, 10) : 0,
            price: parseFloat(category.price),
            ticket_description: category.ticketDescription,
            discount_code: category.discountcode,
            category_type: category.categoryType,
            number_of_discounts: category.numberOfDiscounts !== undefined ? parseInt(category.numberOfDiscounts, 10) : undefined,
            percentage_input: category.percentageInput !== undefined ? parseFloat(category.percentageInput) : undefined,
            from_date: category.fromDate == "" ? undefined : category.fromDate,
            till_date: category.tillDate == "" ? undefined : category.tillDate,
            amount_input: category.amountInput !== "" ? parseFloat(category.amountInput) : 0,
            discount_value: category.discountValue !== undefined ? parseFloat(category.discountValue) : undefined,
          })),
        })
      );
  
      try {
        const response = await fetch('/api/event/create', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          setIsLoading(false);
          setIsPlaying(true);
        } else {
          console.error('Error creating event:', response.statusText);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error creating event:', error);
        setIsLoading(false);
      }
    }
  };

  const handleAnimationComplete = () => {
    router.push("/dashboard");
    setEventData({})
  }

  return (
    <div className="w-full flex justify-center items-center h-80 mt-32">
      <div className="w-full mx-20 flex flex-col justify-center items-center">
        <Button
          onClick={handleButtonClick}
          disabled={isLoading}
          className="w-[30%] mx-auto"
        >
          <div className="relative w-full">
            <h1>Go Live</h1>
            <div className="absolute -bottom-10 -right-5">
              <Image
                src="/images/press.png"
                alt="public/images/press.png"
                width={50}
                height={50}
              />
            </div>
          </div>
        </Button>
        <h1 className="mt-10 text-2xl text-gray-800 font-bold text-center">
          One Step Away from creating your Event!
        </h1>
      </div>
      <div className="absolute ">
        {isLoading && (
          <Lottie
            options={{ animationData: loadingAnimation, loop: true }}
            height={400}
            width={400}
            isStopped={!isPlaying}
            isPaused={!isPlaying}
          />
        )}
        {isPlaying && (
          <Lottie
            options={{ animationData: successAnimation, loop: false }}
            height={400}
            width={400}
            isStopped={!isPlaying}
            isPaused={!isPlaying}
            eventListeners={[{ eventName: 'complete', callback: handleAnimationComplete }]}
          />
        )}
      </div>
    </div>
  );
}

export default GoLive
