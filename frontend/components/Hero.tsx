import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import data from "@/data";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  const { eventsArray } = data;
  return (
    <div className="w-full px-4 py-6 md:px-6 lg:px-12 bg-[#141f29]">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="bg-[#141f29]">
          {eventsArray.map((e, i) => (
            <CarouselItem key={i} className="py-3 bg-[#141f29] rounded-sm">
              <div className="bg-[#141f29] flex flex-col items-center w-full max-w-3xl mx-auto ">
                <Card className="border-none w-full relative">
                  <CardHeader className="p-0 relative  border-6 border-[#cddc29]">
                    <Image
                      src={e.image}
                      alt={e.title}
                      layout="responsive"
                      width={400}
                      height={250}
                      className="object-cover w-full h-60 sm:h-72 md:h-56 lg:h-64 xl:h-72"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10"></div>
                  </CardHeader>
                  <CardContent className="absolute bottom-0 flex flex-row items-center justify-between pt-3 p-3 sm:p-4 lg:p-6 w-full z-20">
                    <div className="w-full sm:w-auto">
                      <CardTitle className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white">
                        {e.title}
                      </CardTitle>
                    </div>
                    <Button
                      variant="tertiary"
                      size="xs"
                      className={`ml-2 sm:ml-4 w-auto text-xs sm:text-sm md:text-base lg:text-lg ${
                        e.buttoncolor === "purple"
                          ? "bg-purple-600 text-white"
                          : ""
                      }`}
                    >
                      {e.buttontext}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex bg-[#cddc29] text-[#141f29] border-none w-8 h-8" />
        <CarouselNext className="hidden md:flex bg-[#cddc29] text-[#141f29] border-none w-8 h-8" />
      </Carousel>
    </div>
  );
}

export default Hero
