import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import data from "../data"; 
const { eventsArray } = data;

const Hero=()=> {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  return (
    <section className="w-full">
      <Carousel
        className="w-full h-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="w-[80%] h-full mx-auto">
          {eventsArray.map((e, i) => (
            <CarouselItem key={i}>
              <div className="w-full h-full relative">
                <Image src={e.image} alt={e.image} fill className="rounded-2xl"/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export default Hero


// import React, { useCallback } from "react";
// import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
// import { DotButton, useDotButton } from "./CarouselDotButton";
// import Autoplay from "embla-carousel-autoplay";
// import useEmblaCarousel from "embla-carousel-react";
// import data from "../data";
// const { eventsArray } = data;
// import Image from "next/image";

// type PropType = {
//   slides: number[];
//   options?: EmblaOptionsType;
// };

// const EmblaCarousel: React.FC<PropType> = (props) => {
//   const { slides, options } = props;
//   const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

//   const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
//     const autoplay = emblaApi?.plugins()?.autoplay;
//     if (!autoplay) return;

//     const resetOrStop =
//       autoplay.options.stopOnInteraction === false
//         ? autoplay.reset
//         : autoplay.stop;

//     resetOrStop();
//   }, []);

//   const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
//     emblaApi,
//     onNavButtonClick
//   );

//   return (
//     <section className="max-w-full mx-auto">
//       <div className="overflow-hidden w-full" ref={emblaRef}>
//         <div className="flex ml-2 w-full gap-4 mr-[-1rem]"> 
//           {eventsArray.map((e, i) => (
//             <div
//               className=" w-[70%] flex-none transform translate-z-10"
//               key={i}
//             >
//               <div className="bg-gray-200 shadow-inner rounded-2xl text-4xl font-semibold flex items-center justify-center h-[19rem] select-none">
//                 <Image src={e.image} alt={e.image} fill  className="rounded-2xl"/>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-center gap-4 mt-7">
//         <div className="flex justify-center items-center -mr-1 gap-5">
//           {scrollSnaps.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => onDotButtonClick(index)}
//               className={`flex items-center justify-center w-2 h-2 rounded-full transition-colors
//             ${index === selectedIndex ? "bg-black" : "bg-gray-500 "}`}
//             >
//               <span className="w-6 h-6 rounded-full shadow-inner"></span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmblaCarousel;
