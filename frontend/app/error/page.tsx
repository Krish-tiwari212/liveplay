"use client"

import Image from "next/image";
import React, { useState, useEffect } from "react";

const Page = () => {
  const images = [
    "/icons/Property 1=Default.svg",
    "/icons/Property 1=Variant2.svg",
    "/icons/Property 1=Variant3.svg",
    "/icons/Property 1=Variant4.svg",
    "/icons/Property 1=Variant5.svg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 400);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="flex w-full h-[30rem] justify-center items-center flex-col">
      <div>
        <Image
          src={images[currentIndex]}
          alt={`Logo ${currentIndex + 1}`}
          width={100}
          height={100}
          priority
          className="mb-4"
        />
      </div>
      <h1 className="text-4xl font-semibold ml-1">
        🏏Score - 404<span className="font-light">/0</span>
      </h1>
      <h1 className="text-xl">We’ll get you back on the pitch soon</h1>
    </div>
  );
};

export default Page;
