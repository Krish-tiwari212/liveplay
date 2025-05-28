import Image from 'next/image';
import React from 'react'
import { FiVideo } from 'react-icons/fi';

interface CarouselCardsProps {
    title: string;
    image: string;
}

const CarouselCards = ({ title, image }: CarouselCardsProps) => { 
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 relative h-[25rem] w-full">
      <div className=" bg-black flex-[4] h-full w-full relative">
        <div className=' w-full h-40 md:h-full '>
          <Image
            src={image}
            alt={image}
            className=""
            fill 
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default CarouselCards
