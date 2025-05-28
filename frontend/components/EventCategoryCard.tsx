import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface EventCategoryCardProps {
  event: {
    category_name: string;
    price: number;
    category_type: string;
    gender: string;
    age_range_option: string;
  };
}

const EventCategoryCard: React.FC<EventCategoryCardProps> = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div
      className={`border rounded px-4 py-2 shadow transition-all  duration-500 ${
        isExpanded ? "max-h-44 opacity-100" : "max-h-[80px]"
      }`}
    >
      <button
        onClick={toggleExpand}
        className="w-full flex justify-between items-center focus:outline-none mb-2"
      >
        <div className="flex flex-col justify-start items-start">
          <span className="font-semibold">{event.category_name}</span>
          <p className="text-lg font-bold">₹{event.price}</p>
        </div>
        <BiChevronDown
          className={`transform transition-transform flex-none h-8 w-8 duration-300 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out border-t border-gray-400 ${
          isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-2">
          <div className="flex items-center gap-2">
            <h1 className="font-bold">Category Type:</h1>
            <h1>{event.category_type}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold">Category Gender:</h1>
            <h1>
              {event.gender.charAt(0).toUpperCase() +
                event.gender.slice(1).toLowerCase()}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold">Age Range:</h1>
            <h1>{event.age_range_option}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCategoryCard; 