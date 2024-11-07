"use client";
import { useEventContext } from "@/context/EventDataContext";
import { useState, useEffect, useContext } from "react";
import loadingAnimation from "@/public/Animations/loading.json"; 
import Lottie from "react-lottie";

const fetchEventDetails = async (id:any) => {
  const response = await fetch(`/api/event/get_by_id/${id}`);
  const data = await response.json();
  return data;
};

const dummyEntries = [
  {
    id: 1,
    name: "Team Alpha",
    details: "A skilled soccer team with a strong defense.",
    contact: {
      email: "teamalpha@example.com",
      phone: "123-456-7890",
    },
    captain: "John Doe",
    members: ["Alice Smith", "Bob Johnson", "Charlie Brown"],
    wins: 8,
    losses: 2,
    draws: 1,
  },
  {
    id: 2,
    name: "Team Bravo",
    details: "A basketball team known for their fast breaks.",
    contact: {
      email: "teambravo@example.com",
      phone: "234-567-8901",
    },
    captain: "Jane Roe",
    members: ["Diana Prince", "Clark Kent", "Bruce Wayne"],
    wins: 10,
    losses: 0,
    draws: 0,
  },
  {
    id: 3,
    name: "Team Charlie",
    details: "An experienced volleyball team with multiple championships.",
    contact: {
      email: "teamcharlie@example.com",
      phone: "345-678-9012",
    },
    captain: "Mary Jane",
    members: ["Peter Parker", "Gwen Stacy", "Harry Osborn"],
    wins: 6,
    losses: 4,
    draws: 1,
  },
  {
    id: 4,
    name: "Team Delta",
    details: "A rookie soccer team eager to prove themselves.",
    contact: {
      email: "teamdelta@example.com",
      phone: "456-789-0123",
    },
    captain: "Peter Parker",
    members: ["Liz Allan", "Flash Thompson", "Michelle Jones"],
    wins: 3,
    losses: 7,
    draws: 0,
  },
];

interface DrawCreationProps {
  handleNext: () => void;
  id: string | string[];
}

const DrawCreation = ({ handleNext,id }: DrawCreationProps) => {
  const { EventEditData } = useEventContext();
  const { setDashboardName } = useEventContext();
  const [event, setEvent] = useState(null);
  const [entries, setEntries] = useState([]);
  const [category, setCategory] = useState("");
  const [drawType, setDrawType] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    if (id) {
      const loadEventDetails = async () => {
        setIsLoading(true);
        const event = await fetchEventDetails(id);
        setEvent(event);
        setCategories(event.categories || []);
        setIsLoading(false);
      };
      loadEventDetails();
    }
  }, [id]);

  const handleSubmit = () => {
    setEntries(dummyEntries); 
  };

  const renderMatchBrackets = () => {
    if (drawType === "single_elimination") {
      return renderSingleElimination();
    } else if (drawType === "double_elimination") {
      return renderDoubleElimination();
    } else if (drawType === "group_playoffs") {
      return renderGroupPlayoffs();
    } else if (drawType === "round_robin") {
      return renderRoundRobin();
    }
    return null;
  };

  const renderSingleElimination = () => {
    const rounds = [];
    let roundEntries = entries.slice();

    while (roundEntries.length > 1) {
      rounds.push(roundEntries);
      roundEntries = roundEntries.reduce(
        (acc, _, idx) =>
          idx % 2 === 0
            ? acc.concat({ id: idx, name: `Winner of Match ${idx / 2 + 1}` })
            : acc,
        []
      );
    }
    rounds.push(roundEntries);

    return (
      <div className="brackets space-y-8 m-3">
        {rounds.map((round, i) => (
          <div key={i} className="round space-y-4">
            <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800">
              Round {i + 1}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {round.map((match) => (
                <div
                  key={match.id}
                  className="match p-4 border rounded-lg shadow-md bg-white"
                >
                  <p className="text-lg font-medium text-gray-700 text-center">
                    {match.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDoubleElimination = () => {
    const winnersBracket = renderSingleElimination();
    const losersBracket = renderSingleElimination();

    return (
      <div className="double-elimination space-y-12 m-3">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Winners Bracket
          </h3>
          {winnersBracket}
        </div>
        <div>
          <h3 className="text-2xl font-semibold mt-12 mb-4 text-gray-800">
            Losers Bracket
          </h3>
          {losersBracket}
        </div>
        <div className="finals mt-12">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Final Match
          </h3>
          <div className="match p-4 border rounded-lg shadow-md bg-indigo-50 text-center">
            <p className="text-lg font-medium text-gray-800">
              Winner of Winners Bracket vs Winner of Losers Bracket
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderGroupPlayoffs = () => {
    const groups = [
      entries.slice(0, entries.length / 2),
      entries.slice(entries.length / 2),
    ];

    return (
      <div className="group-playoffs space-y-8 m-3">
        {groups.map((group, i) => (
          <div key={i} className="group space-y-4">
            <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800">
              Group {i + 1}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {group.map((entry) => (
                <div
                  key={entry.id}
                  className="match p-4 border rounded-lg shadow-md bg-gray-50"
                >
                  <p className="text-lg font-medium text-gray-700 text-center">
                    {entry.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderRoundRobin = () => {
    const matches = [];
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        matches.push(`${entries[i].name} vs ${entries[j].name}`);
      }
    }

    return (
      <div className="round-robin space-y- m-3">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Round Robin Matches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match, idx) => (
            <div
              key={idx}
              className="match p-4 border rounded-lg shadow-md bg-white"
            >
              <p className="text-lg font-medium text-gray-700 text-center">
                {match}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto m-5 sm:p-6 ">
      <h1 className="text-3xl font-bold mb-4">Draw Creation</h1>
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <Lottie
            options={{ animationData: loadingAnimation, loop: true }}
            height={400}
            width={400}
          />
        </div>
      )}
      {event && (
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-4xl font-bold my-8">{event.event_name}</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="drawType"
            >
              Draw Type
            </label>
            <select
              id="drawType"
              value={drawType}
              onChange={(e) => setDrawType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Draw Type</option>
              <option value="single_elimination">Single Elimination</option>
              <option value="double_elimination">Double Elimination</option>
              <option value="group_playoffs">Group Playoffs</option>
              <option value="round_robin">Round Robin</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          {/* <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Entries</h2>
            <div className="flex flex-wrap">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="max-w-sm rounded overflow-hidden shadow-lg m-4"
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{entry.name}</div>
                    <p className="text-gray-700 text-base">{entry.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Match Brackets</h2>
            {renderMatchBrackets()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawCreation;
