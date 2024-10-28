import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useEventContext } from "@/context/EventDataContext";

interface DrawfixturesProps{
  setFeatureData: React.Dispatch<React.SetStateAction<any>>;
}

const Drawfixtures = ({ setFeatureData }: DrawfixturesProps) => {
  const [fixtures, setFixtures] = useState([
    { id: 1, teamA: "Team A", teamB: "Team B", buy: false },
    { id: 2, teamA: "Team C", teamB: "No-show", buy: true },
    { id: 3, teamA: "Team E", teamB: "Team F", buy: false },
    { id: 4, teamA: "Team G", teamB: "Team H", buy: true },
    { id: 5, teamA: "Team I", teamB: "Team J", buy: false },
    { id: 6, teamA: "Team K", teamB: "Team L", buy: true },
    { id: 7, teamA: "Team M", teamB: "Team N", buy: false },
    { id: 8, teamA: "Team O", teamB: "No-show", buy: true },
    { id: 9, teamA: "Team Q", teamB: "Team R", buy: false },
    { id: 10, teamA: "Team S", teamB: "Team T", buy: true },
    { id: 11, teamA: "Team U", teamB: "Team V", buy: false },
    { id: 12, teamA: "Team W", teamB: "Team X", buy: true },
  ]);
  const [showFixtures,setShowFixtures]=useState(false)
  const { EventData, setEventData } = useEventContext();

  const midIndex = Math.ceil(fixtures.length / 2);
  const firstHalf = fixtures.slice(0, midIndex);
  const secondHalf = fixtures.slice(midIndex);
  const handleFixtures=()=>{
    setShowFixtures((prev)=>!prev)
    // setFeatureData((prevData: any) => ({
    //   ...prevData,
    //   enableFixtures: !showFixtures,
    // }));
    setEventData((prevData: any) => ({
      ...prevData,
      enableFixtures: !showFixtures,
    }));
  }

  useEffect(() => {
    if (EventData) {
      setShowFixtures(EventData.enableFixtures || false); 
    }
  }, [EventData]);

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg w-full p-8">
      <div className="flex items-center space-x-2 relative">
        <Switch
          id="enable-countdown"
          onCheckedChange={handleFixtures}
          checked={showFixtures}
        />
        <Label htmlFor="airplane-mode">Enable Fixtures</Label>
      </div>
      {showFixtures && (
        <>
          <div className="text-center text-4xl mb-5">
            <h1>Fixtures For your tournament</h1>
          </div>
          <div className="flex justify-between">
            <div className="flex-[2]">
              {firstHalf.map((fixture, i) => (
                <div
                  key={fixture.id}
                  className={`flex justify-center items-center`}
                >
                  <div
                    className={`flex justify-center items-center bg-white w-auto py-2 relative ${
                      i % 2 == 0 ? "mr-auto" : "ml-auto"
                    }`}
                  >
                    <div className="flex items-center relative">
                      <div className=" border border-[#17202A]  p-1 max-w-56 px-4 relative transform -skew-x-12 text-center">
                        {fixture.teamA}
                      </div>
                      <div className=" bg-[#17202A] text-white rounded transform -skew-x-12  p-2 text-3xl relative">
                        <h1>Vs</h1>
                      </div>
                      <div className="  border border-[#17202A]  p-1 max-w-56 px-4 relative transform -skew-x-12 text-center">
                        {fixture.teamB}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center flex-[1]">
              <Image
                src="/icons/FixturesImage.svg"
                alt="Image"
                className="my-4"
                width={300}
                height={300}
              />
            </div>
            <div className="flex-[2]">
              {secondHalf.map((fixture, i) => (
                <div
                  key={fixture.id}
                  className={`flex justify-center items-center`}
                >
                  <div
                    className={`flex justify-center items-center bg-white w-auto py-2 relative ${
                      i % 2 == 0 ? "mr-auto" : "ml-auto"
                    }`}
                  >
                    <div className="flex items-center relative">
                      <div className=" border border-[#17202A]  p-1 max-w-56 px-4 relative transform -skew-x-12 text-center">
                        {fixture.teamA}
                      </div>
                      <div className=" bg-[#17202A] text-white rounded transform -skew-x-12  p-2 text-3xl relative">
                        <h1>Vs</h1>
                      </div>
                      <div className="  border border-[#17202A]  p-1 max-w-56 px-4 relative transform -skew-x-12 text-center">
                        {fixture.teamB}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Drawfixtures;
