import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import Lottie from 'react-lottie'
import successAnimation from '@/public/Animations/Success.json' 
import loadingAnimation from "@/public/Animations/loading.json"; 
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEventContext } from '@/context/EventDataContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from './ui/label';
import Link from 'next/link';
import { toast } from "@/hooks/use-toast";


const GoLive = () => {
  const {EventData, setEventData}=useEventContext()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const router = useRouter()
  console.log(EventData)

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleButtonClick = async () => {
    if (!isLoading && isCheckboxChecked) {
      setIsLoading(true);
      setIsPlaying(false);
  
      const formData = new FormData();
      
      // Add all basic event details
      formData.append("sport", EventData.sport);
      formData.append("event_name", EventData.event_name);
      formData.append("last_registration_date", EventData.last_registration_date);
      formData.append("last_withdrawal_date", EventData.last_withdrawal_date);
      formData.append("start_date", EventData.start_date);
      formData.append("end_date", EventData.end_date);
      formData.append("start_time", EventData.start_time);
      formData.append("organizer_name", EventData.organizer_name);
      formData.append("organizer_contact_number", EventData.organizer_contact_number);
      formData.append("organizer_email", EventData.organizer_email);
      formData.append("website_link", EventData.website_link || '');
      formData.append("insta_link", EventData.insta_link || '');
      formData.append("venue_name", EventData.venue_name);
      formData.append("street_address", EventData.street_address);
      formData.append("city", EventData.city);
      formData.append("state", EventData.state);
      formData.append("pincode", EventData.pincode);
      formData.append("venue_link", EventData.venue_link || '');
      formData.append("event_description", EventData.event_description);
      formData.append("event_usp", EventData.event_usp);
      formData.append("rewards_for_participants", EventData.rewards_for_participants || '');
      formData.append("playing_rules", EventData.playing_rules || '');
      formData.append("cash_price_pool", EventData.cash_price_pool || '');

      // Add boolean values
      formData.append("countdown", EventData.countdown?.toString() || 'false');
      formData.append("want_Tshirts", EventData.want_Tshirts?.toString() || 'false');
      formData.append("enable_fixtures", EventData.enable_fixtures?.toString() || 'false');
      formData.append("showqna", EventData.showqna?.toString() || 'false');
      formData.append("Gst_Compliance", EventData.Gst_Compliance?.toString() || 'false');

      // Add plan selection
      formData.append("selected_plan", EventData.selected_plan || 'standard');

      // Add mobile banner if it exists
      if (EventData.mobileBanner) {
        formData.append("mobileBanner", EventData.mobileBanner);
      }

      // Add categories as JSON string
      formData.append(
        "eventData",
        JSON.stringify({
          ...EventData,
          categories: EventData.categories.map((category: any) => ({
            category_name: category.category_name,
            ticket_description: category.ticket_description,
            price: category.price,
            total_quantity: category.total_quantity,
            max_ticket_quantity: category.max_ticket_quantity,
            category_type: category.category_type,
            discount: category.discount || false,
            discount_code: category.discount_code,
            discountType: category.discountType,
            number_of_discounts: category.number_of_discounts,
            from_date: category.from_date,
            till_date: category.till_date,
            discountValue: category.discountValue,
            percentage_input: category.percentage_input,
            amount_input: category.amount_input,
            gender: category.gender,
            age_from: category.age_from,
            age_to: category.age_to,
            ageRangeOption: category.ageRangeOption
          }))
        })
      );
  
      try {
        const response = await fetch('/api/event/create', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();

        if (response.ok) {
          setIsLoading(false);
          setIsPlaying(true);
          toast({
            title: "Success!",
            description: "Event created successfully",
            variant: "success",
          })
        } else {
          setIsLoading(false);
          toast({
            title: "Error creating event",
            description: data.error || "Something went wrong",
            variant: "destructive",
          })
          console.error('Error creating event:', data);
        }
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: error.message || "Failed to create event",
          variant: "destructive",
        })
        console.error('Error creating event:', error);
      }
    }
  };

  const handleAnimationComplete = () => {
    router.push("/organizerDashboard");
    setEventData({})
  }

  return (
    <div className="w-full flex justify-center items-center h-80 mt-20 md:mt-44">
      <div className="w-full mx-5 sm:mx-20 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-5xl text-gray-800 font-bold text-center mb-4">
          Awesome, Now lets get this Event Live🎉
        </h1>
        <h1 className="mt-4 text-gray-800 flex justify-center items-center gap-2 w-[90%] mx-auto">
          <Checkbox
            id="terms2"
            onCheckedChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
          />
          <Label htmlFor="terms2">
            Agree with the
            <Link href={`/policies/termsandcondition`}>
              <span className="hover:underline cursor-pointer font-extrabold mx-1 text-sm md:text-lg">
                Terms & Conditions
              </span>
            </Link>
            for hosting events on liveplay.in
          </Label>
        </h1>
        <Button
          variant="tertiary"
          size="none"
          className="mt-4 text-lg px-16 py-1"
          onClick={handleButtonClick}
          disabled={!isCheckboxChecked || isLoading}
        >
          <div className="relative w-full">
            <h1>Go Live 🚀</h1>
          </div>
        </Button>
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
            eventListeners={[
              { eventName: "complete", callback: handleAnimationComplete },
            ]}
          />
        )}
      </div>
    </div>
  );
}

export default GoLive
