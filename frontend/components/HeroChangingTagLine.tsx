import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroChangingTagLine = () => {
  const icons = ["/icons/confetti (1) 1.svg", "/icons/confetti (1) 1.svg", "/icons/video 1.svg", "/icons/discount 1.svg", "/icons/Frame (2).svg"];
  const taglines = [
    "FREE for Players - Zero Platform Fees",
    "FREE for Organizers - Zero Platform Fees",
    "View Live Match Scores and share results.",
    "Register early for Early Bird Discounts",
    "Sign up now and access Free Dashboard"
  ];
  const taglineslargs = [
    "FREE for Players – Zero Platform Fees for registering in events.",
    "FREE for Organizers - Zero Platform Fees for event creation and management.",
    "View Live Match Scores and share your match results.",
    "Register early to grab Early Bird Discounts",
    "Sign up now and access Player Dashboard for Free.",
  ];

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <div className="bg-[#cddc29] w-full flex justify-center items-center p-3 gap-2 pt-20">
      <div>
        <Image
          src={icons[currentTaglineIndex]}
          alt={icons[currentTaglineIndex]}
          width={30}
          height={30}
        />
      </div>
      <p className="text-lg sm:text-xl text-center sm:text-left transition-opacity duration-500 opacity-100">
        <span className="block md:hidden">
          {taglines[currentTaglineIndex]}
        </span>
        <span className="hidden md:block">
          {taglineslargs[currentTaglineIndex]}
        </span>
      </p>
    </div>
  );
};

export default HeroChangingTagLine;
