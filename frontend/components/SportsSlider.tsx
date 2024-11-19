import React from 'react'
import "../app/globals.css";

const sportsTypes = [
  {
    name: "Tennis",
    src:"/images/tennis.png"
  },
  {
    name: "Table Tennis",
    src : "/images/table-tennis.png",
  },
  {
    name: "Squash",
    src:"/images/squash.png" 
  },
  {
    name: "Badminton",
    src:"/images/shuttlecock.png"
  },
  {
    name: "Pickleball",
    src:"/images/pickleball.png"
  },
  {
    name: "Padel",
    src:"/images/padel.png"
  },
  {
    name: "Cricket",
    src:"/images/cricket.png"
  },
  {
    name: "Football",
    src:"/images/football.png"
  },
  {
    name: "Running",
    src:"/images/running.png"
  },
  {
    name: "Marathon",
    src:"/images/marathon.png"
  },
];

const SportsSlider = () => {
  return (
    <div className="slider-container overflow-x-hidden whitespace-nowrap">
      <div className="slider flex gap-4">
        {[...sportsTypes, ...sportsTypes].map((sport, index) => (
          <div className="flex-shrink-0 text-center mx-4 flex justify-center items-center gap-2" key={`${sport.name}-${index}`}>
            <img src={sport.src} alt={sport.name} className="w-10 h-10 mx-auto" />
            <p className='text-2xl'>{sport.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SportsSlider
