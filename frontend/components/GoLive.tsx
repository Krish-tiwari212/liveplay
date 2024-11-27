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
      
      try {
        // ... existing FormData setup code ...
  
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
    } else if (!isCheckboxChecked) {
      toast({
        title: "Terms & Conditions",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive",
      })
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
          <Checkbox id="terms2" onCheckedChange={()=>setIsCheckboxChecked(!isCheckboxChecked)} />
          <Label htmlFor="terms2">
            Agree with the 
            <span className="hover:underline cursor-pointer font-extrabold mx-1 text-sm md:text-lg">Terms & Conditions</span>
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
