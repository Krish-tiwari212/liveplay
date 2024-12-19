import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RiExportFill } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa";

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

const MatchFixtures = ({ data }: MatchFixturesProps) => {
  const [matchesData, setMatchesData] = useState<any>({});
  const { participantNames, eventName } = data;

  const rounds = getTournamentRounds(participantNames);
  const firstRoundHeight = rounds[0].length * 200;

  // Update team selection
  const handleTeamChange = (
    roundIndex: number,
    matchIndex: number,
    teamKey: string,
    value: string
  ) => {
    setMatchesData((prev: any) => ({
      ...prev,
      [`round-${roundIndex}-match-${matchIndex}`]: {
        ...prev[`round-${roundIndex}-match-${matchIndex}`],
        [teamKey]: value,
      },
    }));
  };

  // Update match date and time
  const handleInputChange = (
    roundIndex: number,
    matchIndex: number,
    field: string,
    value: string
  ) => {
    setMatchesData((prev: any) => ({
      ...prev,
      [`round-${roundIndex}-match-${matchIndex}`]: {
        ...prev[`round-${roundIndex}-match-${matchIndex}`],
        [field]: value,
      },
    }));
  };

  return (
    <div className="py-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl md:text-2xl font-semibold">{eventName}</h1>
        <Button
          size="sm"
          variant="outline"
          className="border-2 shadow-lg border-black flex items-center"
        >
          <h1 className="mr-1">Export</h1> <RiExportFill />
        </Button>
      </div>
      <div
        id="match-fixtures"
        className="flex bg-[#141F29] overflow-auto text-white p-4 relative"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none ">
          <h1
            style={{
              zIndex: 0,
              fontSize: "20rem", // Increased for better clarity
              color: "rgba(255, 255, 255, 0.07)", // Subtle color for unobtrusive visibility
              transform: "rotate(-30deg)", // Slightly adjusted rotation
              whiteSpace: "nowrap", // Ensures text doesn't break into multiple lines
            }}
          >
            liveplay.in
          </h1>
        </div>

        {/* Tournament Rounds */}
        {rounds.map((round, roundIndex) => {
          const roundHeight = Math.min(
            firstRoundHeight,
            200 * Math.pow(2, roundIndex)
          );

          return (
            <div
              key={roundIndex}
              className="flex flex-col w-80" // Fixed width for each round
              style={{ flexShrink: 0 }}
            >
              <h3 className="text-xl font-semibold text-center py-2 border border-gray-300">
                Round {roundIndex + 1}
              </h3>
              <div>
                {round.map((match: any, matchIndex: number) => (
                  <div
                    key={matchIndex}
                    className="flex flex-col justify-center items-center w-full"
                    style={{ height: `${roundHeight}px` }}
                  >
                    <div className="shadow border border-gray-300 flex flex-col h-[200px] space-y-2 px-4 w-full">
                      <h1 className="mt-4">Match {match.matchNumber}</h1>

                      {/* Match Date and Time */}
                      <div className="flex gap-1 justify-center items-center">
                        <FaRegCalendarCheck className="mr-1" />
                        <Input
                          type="date"
                          placeholder="Match Date"
                          onChange={(e) =>
                            handleInputChange(
                              roundIndex,
                              matchIndex,
                              "date",
                              e.target.value
                            )
                          }
                          className="border h-8 rounded-md bg-[#141F29] text-white flex-[1] pl-2 placeholder:text-white text-sm border-none focus:outline-none focus:ring-0 focus:border-none appearance-none focus:shadow-none"
                          style={{
                            colorScheme: "dark",
                            WebkitAppearance: "none",
                          }}
                        />
                        <h1>|</h1>
                        <Input
                          type="time"
                          placeholder="Match Time"
                          onChange={(e) =>
                            handleInputChange(
                              roundIndex,
                              matchIndex,
                              "time",
                              e.target.value
                            )
                          }
                          className="border rounded-md bg-[#141F29] text-white h-8 flex-[1] pl-2 placeholder:text-white text-sm border-none focus:outline-none focus:ring-0 focus:border-none appearance-none focus:shadow-none"
                          style={{
                            colorScheme: "dark",
                            WebkitAppearance: "none",
                          }}
                        />
                      </div>

                      {/* Team 1 */}
                      {match.team1 !== "Bye" ? (
                        <Select
                          value={
                            matchesData[
                              `round-${roundIndex}-match-${matchIndex}`
                            ]?.team1 || (roundIndex === 0 ? match.team1 : "TBA")
                          }
                          onValueChange={(value) =>
                            handleTeamChange(
                              roundIndex,
                              matchIndex,
                              "team1",
                              value
                            )
                          }
                        >
                          <SelectTrigger className="text-[#141F29]">
                            <SelectValue
                              placeholder={
                                roundIndex === 0 ? match.team1 : "TBA"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="text-[#141F29]">
                            <SelectItem value="TBA">TBA</SelectItem>
                            {participantNames.map((team, i) => (
                              <SelectItem key={i} value={team}>
                                {team}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="flex justify-center items-center py-2 bg-white text-[#141F29] rounded-md w-full ">
                          {match.team2}
                        </span>
                      )}

                      {/* Team 2 */}
                      {match.team2 !== "Bye" ? (
                        <Select
                          value={
                            matchesData[
                              `round-${roundIndex}-match-${matchIndex}`
                            ]?.team2 || (roundIndex === 0 ? match.team2 : "TBA")
                          }
                          onValueChange={(value) =>
                            handleTeamChange(
                              roundIndex,
                              matchIndex,
                              "team2",
                              value
                            )
                          }
                        >
                          <SelectTrigger className="text-[#141F29]">
                            <SelectValue
                              placeholder={
                                roundIndex === 0 ? match.team2 : "TBA"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="text-[#141F29]">
                            <SelectItem value="TBA">TBA</SelectItem>
                            {participantNames.map((team, i) => (
                              <SelectItem key={i} value={team}>
                                {team}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="flex justify-center items-center py-2 bg-white text-[#141F29] rounded-md w-full ">
                          {match.team2}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Debug: Display Matches Data */}
      {/* <pre className="text-white mt-4 p-4 bg-gray-800 rounded-md">
        {JSON.stringify(matchesData, null, 2)}
      </pre> */}
    </div>
  );
};

const getTournamentRounds = (participants: string[]) => {
  const rounds: any[] = [];
  let currentRound = [...participants];

  const nearestPowerOf2 = Math.pow(
    2,
    Math.ceil(Math.log2(currentRound.length))
  );
  const byesCount = nearestPowerOf2 - currentRound.length;

  let roundMatches: any[] = [];
  let teamsWithByes = currentRound.slice(0, byesCount);
  let teamsWithMatches = currentRound.slice(byesCount);
  let matchNumber = 1;

  for (let i = 0; i < teamsWithMatches.length; i += 2) {
    roundMatches.push({
      team1: teamsWithMatches[i],
      team2: teamsWithMatches[i + 1],
      matchNumber: matchNumber++,
    });
  }

  rounds.push([
    ...roundMatches,
    ...teamsWithByes.map((team) => ({
      team1: team,
      team2: "Bye",
      matchNumber: matchNumber++,
    })),
  ]);
  currentRound = [
    ...teamsWithByes,
    ...roundMatches.map((match) => match.team1),
  ];

  while (currentRound.length > 1) {
    roundMatches = [];
    for (let i = 0; i < currentRound.length; i += 2) {
      roundMatches.push({
        team1: currentRound[i],
        team2: currentRound[i + 1],
        matchNumber: matchNumber++,
      });
    }
    rounds.push(roundMatches);
    currentRound = roundMatches.map((match) => match.team1);
  }

  return rounds;
};

export default MatchFixtures;
