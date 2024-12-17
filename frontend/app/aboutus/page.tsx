import React from "react";

const page = () => {
  return (
    <div className="py-8 px-4 md:py-12 md:px-20">
      <h1 className="text-2xl md:text-4xl font-semibold mb-8">About Us</h1>
      <p className="mb-2 text-base md:text-lg">
        Welcome to <span className="font-bold ">liveplay.in</span> – a platform
        built for sports enthusiasts, by sports enthusiasts!
      </p>
      <p className="mb-8 text-base md:text-lg">
        We help organizers host sports events and make it easy for players to
        discover and join them across 10+ sports.
      </p>

      <h1 className="text-xl md:text-3xl font-semibold mb-4">
        A Note from the Founder
      </h1>
      <p className="mb-4 text-base md:text-lg">
        We created liveplay.in to make event hosting simpler for organizers and
        event discovery smoother for players. The platform is designed to be
        user-friendly and packed with features to add real value to your
        sporting journey.
      </p>
      <p className="mb-4 text-base md:text-lg">
        That said, we know there’s always room to improve, and we’re eager to
        hear from you! Share your feedback—whether it’s good, bad, or somewhere
        in between—and shoot your questions to me directly at{" "}
        <span className="font-bold ">mohit@liveplay.in</span>
      </p>
      <p className="mb-4 text-base md:text-lg">
        We’ll do our best to enhance your experience and grow together.
      </p>
      <p className="mb-4 text-base md:text-lg">
        A special shoutout to the incredible core team behind liveplay.in who
        have worked tirelessly to bring this platform to life:{" "}
        <span className="font-bold ">Roshan, Krish,</span> and{" "}
        <span className="font-bold ">Kuber</span>
      </p>
      <p className="mb-4 text-base md:text-lg font-bold">
        Mohit <br />
        Founder
      </p>
    </div>
  );
};

export default page;
