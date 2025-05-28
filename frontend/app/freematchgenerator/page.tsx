"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { IoInformationCircle } from "react-icons/io5";
import { useToast } from "@/hooks/use-toast";
import MatchFixtures from "@/components/MatchFixtures";

const SportsType = [
  {
    name: "Tennis",
    icon: <img src="/images/tennis.png" alt="Tennis" className="h-4 w-4" />,
  },
  {
    name: "Table Tennis",
    icon: (
      <img
        src="/images/table-tennis.png"
        alt="Table Tennis"
        className="h-4 w-4"
      />
    ),
  },
  {
    name: "Squash",
    icon: <img src="/images/squash.png" alt="Squash" className="h-4 w-4" />,
  },
  {
    name: "Badminton",
    icon: (
      <img src="/images/shuttlecock.png" alt="Badminton" className="h-4 w-4" />
    ),
  },
  {
    name: "Pickleball",
    icon: (
      <img src="/images/pickleball.png" alt="Pickleball" className="h-4 w-4" />
    ),
  },
  {
    name: "Padel",
    icon: <img src="/images/padel.png" alt="Padel" className="h-4 w-4" />,
  },
  {
    name: "Cricket",
    icon: <img src="/images/cricket.png" alt="Cricket" className="h-4 w-4" />,
  },
  {
    name: "Football",
    icon: <img src="/images/football.png" alt="Football" className="h-4 w-4" />,
  },
  {
    name: "Running",
    icon: <img src="/images/running.png" alt="Running" className="h-4 w-4" />,
  },
  {
    name: "Marathon",
    icon: <img src="/images/marathon.png" alt="Marathon" className="h-4 w-4" />,
  },
];

const Page = () => {
    const {toast}=useToast()
  const [data, setData] = useState({
    sport: "",
    eventName: "",
    playersPerTeam: "",
    thirdPlaceMatch: "yes",
    participantNames: [],
  });
  const [openfixtures,setopenfixtures]=useState(false)

  const inputFields = [
    { id: "sport", label: "Event Sport", type: "select" },
    { id: "eventName", label: "Event Name", type: "text" },
    {
      id: "playersPerTeam",
      label: "Number of Players/Team",
      type: "number",
    },
    {
      id: "thirdPlaceMatch",
      label: "Third Place Match?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "participant-names",
      label: "Enter Participant Names",
      type: "textarea",
      placeholder: "Separate participant names with a comma.",
    },
  ];

 const validateParticipantNames = (value:any) => {
   const participants = value.split(",").map((name:any) => name.trim());

   const isValid = participants.every((name: any) =>
     /^[a-zA-Z\s,-]+$/.test(name)
   );

   if (!isValid) {
     toast({
       title: "Error",
       description:
         "Names can only contain alphabets, spaces, hyphens, and commas.",
       variant: "destructive",
     });
     return false;
   }

   if (participants.length > 128) {
     toast({
       title: "Error",
       description: "Maximum 128 participants allowed.",
       variant: "destructive",
     });
     return false;
   }

   setData((prev) => ({ ...prev, participantNames: participants }));
    return true;
  };

  const handleInputChange = (id:any, value:any) => {
    if (id === "participant-names") {
      validateParticipantNames(value);
    } else {
      setData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleGenerate = () => {
    const { sport, eventName, playersPerTeam, participantNames } = data;

    // Check for empty fields
    if (
      !sport ||
      !eventName ||
      !playersPerTeam ||
      participantNames.length === 0
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields before generating.",
        variant: "destructive",
      });
      return;
    }

    // Check if participant names string ends with a comma
    const participantInput = document.getElementById(
      "participant-names"
    ) as HTMLTextAreaElement;
    if (participantInput && participantInput.value.trim().endsWith(",")) {
      toast({
        title: "Error",
        description: "Participant names should not end with a comma.",
        variant: "destructive",
      });
      return;
    }

    const totalPlayers = Number(playersPerTeam);

    // Check if the number of participants matches the required total players
    if (participantNames.length !== totalPlayers) {
      toast({
        title: "Error",
        description: `Number of participants (${participantNames.length}) must be equal to the number of players (${totalPlayers}).`,
        variant: "destructive",
      });
      return;
    }

    console.log(data);
    setopenfixtures(true);
  };



  return (
    <div className="w-full sm:w-[90%] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Free Match Generator</h1>
      <p className="text-xl mb-2">
        Effortlessly create match fixtures for your event in seconds.
      </p>

      <div className="p-2 rounded-lg mb-6 flex flex-col lg:flex-row gap-4 items-start justify-start font-semibold">
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="lightning">
            ⚡
          </span>
          <p className="text-lg">Instant Match Fixtures</p>
        </div>
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="trophy">
            🏆
          </span>
          <p className="text-lg">10+ Sports</p>
        </div>
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="clock">
            ⏰
          </span>
          <p className="text-lg">Set Match Timing</p>
        </div>
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="arrows">
            🔄
          </span>
          <p className="text-lg">Swap Player Positions</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        {inputFields.map((field) => (
          <div key={field.id}>
            {field.type === "textarea" ? (
              <div className="flex justify-between items-center">
                <Label
                  className="font-bold text-base md:text-lg"
                  htmlFor={field.id}
                >
                  {field.label}
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IoInformationCircle />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#141f29] text-[#ccdb28]">
                      <p>Maximum 128 participants allowed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <Label
                className="font-bold text-base md:text-lg"
                htmlFor={field.id}
              >
                {field.label}
              </Label>
            )}
            {field.type === "text" || field.type === "number" ? (
              <Input
                id={field.id}
                type={field.type}
                className="w-full"
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            ) : field.type === "textarea" ? (
              <textarea
                id={field.id}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg p-2"
                rows={4}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              ></textarea>
            ) : field.type === "radio" ? (
              <RadioGroup
                defaultValue="yes"
                className="mt-4"
                onValueChange={(value) => handleInputChange(field.id, value)}
              >
                {field.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.toLowerCase()}
                      id={option.toLowerCase()}
                    />
                    <Label htmlFor={option.toLowerCase()}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            ) : field.type === "select" ? (
              <Select
                onValueChange={(value) => handleInputChange(field.id, value)}
              >
                <SelectTrigger className="h-10 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg">
                  <SelectValue placeholder="Select Sport" />
                </SelectTrigger>
                <SelectContent>
                  {SportsType.map((sport) => (
                    <SelectItem
                      key={sport.name}
                      value={sport.name}
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        {sport.icon}
                        <span>{sport.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
          </div>
        ))}
      </div>

      <Button className="mt-4" variant="tertiary" onClick={handleGenerate}>
        Generate
      </Button>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-start mt-4">
        <p className="text-lg text-center">
          Want to track live scores, update match details, and access match
          cards?
        </p>
        <Button className="mt-2 md:mt-0" variant="tertiary">
          Unlock Live Scoring
        </Button>
      </div>
      {openfixtures ? <MatchFixtures data={data} /> : <></>}
      {/* <MatchFixtures data={data} /> */}
    </div>
  );
};

export default Page;
