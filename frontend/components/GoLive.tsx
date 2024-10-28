import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import Lottie from 'react-lottie'
import successAnimation from '@/public/Animations/Success.json' 
import loadingAnimation from "@/public/Animations/loading.json"; 
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const GoLive = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleButtonClick = () => {
    if (!isLoading) {
      setIsLoading(true);
      setIsPlaying(false);
      setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true);
      }, 5000);
    }
  }

  const handleAnimationComplete = () => {
    router.push("/dashboard");
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
