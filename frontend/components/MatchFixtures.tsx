import React from "react";
import { Button } from "./ui/button";
import { RiExportFill } from "react-icons/ri";

interface Data {
  sport: string;
  eventName: string;
  playersPerTeam: string;
  thirdPlaceMatch: string;
  participantNames: string[];
}

interface MatchFixturesProps {
  data: Data;
}

const dummyData = {
  sport: "Soccer",
  eventName: "Knockout Championship",
  playersPerTeam: "11",
  thirdPlaceMatch: "Yes",
  participantNames: [
    "Team A",
    "Team B",
    "Team C",
    "Team D",
    "Team E",
    "Team F",
    "Team G",
    "Team H",
    "Team I",
    "Team J",
    "Team K",
    "Team L",
    "Team M",
    "Team N",
    "Team O",
    "Team P",
    "Team Q",
    "Team R",
    "Team S",
    "Team T",
  ],
};

const MatchFixtures = ({ data }: MatchFixturesProps) => {
  const generateTableData = (participants: string[]) => {
    const rounds: string[][] = [];

    // Ensure an even number of participants by adding a placeholder "Bye" team if necessary
    if (participants.length % 2 !== 0) {
      participants.push("Bye");
    }

    let currentRound = [...participants];

    while (currentRound.length > 1) {
      // Pair teams for matches in this round
      rounds.push(
        currentRound.reduce((acc, team, index) => {
          if (index % 2 === 0) {
            acc.push(`${currentRound[index]} vs ${currentRound[index + 1]}`);
          }
          return acc;
        }, [] as string[])
      );

      // Generate the next round by halving the number of matches
      const nextRound = [];
      for (let i = 0; i < currentRound.length / 2; i++) {
        nextRound.push(`Winner of Match ${i + 1}`);
      }
      currentRound = nextRound;
    }

    // Add the final single match
    rounds.push(currentRound);

    return rounds;
  };

  const tableRounds = generateTableData(dummyData.participantNames);

  // Dynamically calculate column headers based on the number of rounds
  const generateColumnHeaders = (rounds: string[][]) => {
    const totalRounds = rounds.length;
    const headers = [];

    if (totalRounds > 4) {
      headers.push("Round 1");
    }

    for (let i = 2; i <= totalRounds - 4; i++) {
      headers.push(`Round ${i}`);
    }

    if (totalRounds > 3) {
      headers.push("Quarterfinals");
    }

    if (totalRounds > 2) {
      headers.push("Semifinals");
    }

    headers.push("Finals", "Winner");

    return headers;
  };

  const columnHeaders = generateColumnHeaders(tableRounds);

  const fillFinalsAndWinner = (rounds: string[][]) => {
    const finalRound = rounds[rounds.length - 2]; // Second to last round (Finals)
    const winner = rounds[rounds.length - 1][0]; // Last round winner

    return rounds.map((round, roundIndex) => {
      if (roundIndex === rounds.length - 2) {
        return finalRound.map((match, index) => (index === 0 ? match : ""));
      }
      if (roundIndex === rounds.length - 1) {
        return [winner];
      }
      return round;
    });
  };

  const adjustedRounds = fillFinalsAndWinner(tableRounds);

  // Generate a date and time for each match (example: "2024-12-16 10:00 AM")
  const getMatchDateTime = (index: number) => {
    const baseDate = new Date("2024-12-16T10:00:00Z");
    baseDate.setMinutes(baseDate.getMinutes() + index * 30); // Increment by 30 minutes for each match
    return baseDate.toLocaleString();
  };

  // Function to calculate the dynamic height based on column index
  const calculateMatchHeight = (columnIndex: number) => {
    return `${100 * Math.pow(2, columnIndex)}px`; // Height doubles with each column index
  };

  return (
    <div className="">
      <div className="flex justify-between items-center my-4 ">
        <h1 className="text-xl font-semibold">{dummyData.eventName}</h1>
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant="outline"
          className="border-2 shadow-lg border-black flex items-center"
        >
          <h1 className="mr-1">Export</h1> <RiExportFill />
        </Button>
      </div>
      <div className="bg-[#141F29] overflow-auto h-auto w-auto p-4">
        <div className="flex">
          {columnHeaders.map((header, index) => (
            <div
              key={index}
              className="flex-1 border border-gray-600 w-24 p-2 text-center text-white font-bold"
            >
              {header}
            </div>
          ))}
        </div>
        <div className="flex">
          {adjustedRounds.map((round, colIndex) => (
            <div
              key={colIndex}
              className="flex-1 border border-gray-600 text-center text-white "
            >
              {round.map((match, rowIndex) => {
                const matchNumber = colIndex * round.length + rowIndex + 1;
                return (
                  <div
                    key={rowIndex}
                    className="p-4 border-b border-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-white">{`Match ${matchNumber}`}</div>
                      <div className="text-white">
                        {getMatchDateTime(matchNumber - 1)}
                      </div>
                      <div className="flex flex-col items-center">
                        {match.split(" vs ").map((team, index) => (
                          <div key={index} className="text-white">
                            {team}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchFixtures;
