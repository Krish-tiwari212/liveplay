import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface FeedbackFormInterface {
  eventId: any;
  label: string;
  setratingvalue: (value: number) => void;
  description?:string
}

const Rating = ({ eventId, label, setratingvalue,description }: FeedbackFormInterface) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    star: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setRating(star);
      setratingvalue(star);
    } else if (event.key === "ArrowRight" && star < 5) {
      const newRating = star + 1;
      setRating(newRating);
      setratingvalue(newRating);
    } else if (event.key === "ArrowLeft" && star > 1) {
      const newRating = star - 1;
      setRating(newRating);
      setratingvalue(newRating);
    }
  };

  const handleClick = (star: number) => {
    setRating(star);
    setratingvalue(star);
  };

  return (
    <div className="flex flex-col m-5">
      <h2 className="text-2xl font-semibold leading-none">{label}</h2>
      <p className="text-[14px] font-normal mb-1">{description}</p>
      <div className="flex flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-3xl cursor-pointer transition-colors duration-200 mx-1
              ${
                hover >= star || rating >= star
                  ? "text-[#cdde2b]"
                  : "text-[#272e3f]"
              }
              focus:outline-none `}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(star)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, star)}
            aria-label={`${star} Star`}
            role="button"
          >
            <FaStar />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
