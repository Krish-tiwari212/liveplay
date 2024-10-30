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
      formData.append("event_name", EventData.event_name);
      formData.append('organizer_contact_number', EventData.organizer_contact_number);
      // formData.append("organizer_name", EventData.organizer_name);
      formData.append("organizer_email", EventData.organizer_email);
      formData.append("start_date", EventData.start_date);
      formData.append("end_date", EventData.end_date);
      formData.append('last_registration_date', EventData.last_registration_date);
      formData.append("last_withdrawal_date", EventData.last_withdrawal_date);
      formData.append("start_time", EventData.start_time);
      formData.append("venue_name", EventData.venue_name);
      formData.append("street_address", EventData.street_address);
      formData.append("city", EventData.city);
      formData.append("pincode", EventData.pincode);
      formData.append(
        "venue_not_decided",
        EventData.venue_not_decided !== undefined
          ? EventData.venue_not_decided.toString()
          : "false"
      );
      formData.append("event_description", EventData.event_description);
      formData.append("event_usp", EventData.event_usp);
      formData.append(
        "rewards_for_participants",
        EventData.rewards_for_participants
      );
      formData.append("playing_rules", EventData.playing_rules);
      formData.append('countdown', EventData.countdown !== undefined ? EventData.countdown.toString() : 'false');
      // formData.append(
      //   "Gst_Compliance",
      //   EventData.Gst_Compliance !== undefined
      //     ? EventData.Gst_Compliance.toString()
      //     : "false"
      // );
      // formData.append(
      //   "want_Tshirts",
      //   EventData.want_Tshirts !== undefined
      //     ? EventData.want_Tshirts.toString()
      //     : "false"
      // );
      formData.append(
        "enable_fixtures",
        EventData.enable_fixtures !== undefined
          ? EventData.enable_fixtures.toString()
          : "false"
      );
      formData.append("venue_link", EventData.venue_link);
      formData.append("sport", EventData.sport);
      formData.append("selected_plan", EventData.selected_plan);
      formData.append("mobileBanner", EventData.mobileBanner);
      formData.append("desktopBanner", EventData.desktopBanner);
      formData.append(
        "eventData",
        JSON.stringify({
          categories: EventData.categories.map((category: any) => ({
            category_name: category.category_name,
            total_quantity:
              category.total_quantity !== ""
                ? parseInt(category.total_quantity, 10)
                : 0,
            max_ticket_quantity:
              category.max_ticket_quantity !== ""
                ? parseInt(category.max_ticket_quantity, 10)
                : 0,
            price: parseFloat(category.price),
            ticket_description: category.ticket_description,
            discount_code: category.discoundiscount_codetcode,
            category_type: category.category_type,
            number_of_discounts:
              category.number_of_discounts !== undefined
                ? parseInt(category.number_of_discounts, 10)
                : undefined,
            percentage_input:
              category.percentage_input !== undefined
                ? parseFloat(category.percentage_input)
                : undefined,
            from_date:
              category.from_date == "" ? undefined : category.from_date,
            till_date:
              category.till_date == "" ? undefined : category.till_date,
            amount_input:
              category.amount_input !== ""
                ? parseFloat(category.amount_input)
                : 0,
            discount_value:
              category.discount_value !== undefined
                ? parseFloat(category.discount_value)
                : undefined,
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
