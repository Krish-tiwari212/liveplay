"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaTrophy, FaUserFriends, FaCalendarAlt, FaClock, FaHandRock } from "react-icons/fa";
import { useEventContext } from "@/context/EventDataContext";
import Lottie from "react-lottie";
import loadingAnimation from "@/public/Animations/loading.json";

// Fetch Event Details
const fetchEventDetails = async (id: any) => {
  const response = await fetch(`/api/event/get_by_id/${id}`);
  const data = await response.json();
  return data;
};

interface MatchFixtureSetupProps {
  handleNext: () => void;
  id: string | string[];
}

const MatchFixtureSetup = ({ handleNext, id }: MatchFixtureSetupProps) => {
  const { EventEditData } = useEventContext();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [entries, setEntries] = useState([]);
  const [category, setCategory] = useState("");
  const [fixtureType, setFixtureType] = useState("");
  const [sport, setSport] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfGroups, setNumberOfGroups] = useState(2);
  const [matchSettings, setMatchSettings] = useState({
    setType: "Best of 3",
    pointsPerSet: 21,
    innings: 1,
    overs: 5,
    matchDuration: 90,
    extraTime: false,
  });

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

  const handleFixtureTypeChange = (value: string) => {
    setFixtureType(value);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Lottie options={{ animationData: loadingAnimation, loop: true }} height={150} />
        </div>
      )}

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">
        Match Fixture Setup <FaTrophy className="inline-block text-yellow-500 ml-2" />
      </h1>

      {/* Select Category & Fixture Type */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-3">
          <FaUserFriends className="text-xl text-blue-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat.category_name}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <FaHandRock className="text-xl text-green-500" />
          <select
            value={fixtureType}
            onChange={(e) => handleFixtureTypeChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Select Fixture Type</option>
            <option value="knockout">Knockout</option>
            <option value="group_playoffs">Group Playoffs</option>
            <option value="round_robin">Round Robin</option>
          </select>
        </div>
      </div>

      {/* Match Settings Form */}
      <h2 className="text-xl font-semibold mb-4">
        Match Settings <FaCalendarAlt className="inline-block text-red-500 ml-2" />
      </h2>
      <div className="space-y-4 mb-8">
        {["Badminton", "Tennis", "Table Tennis", "Padel", "Pickleball", "Squash"].includes(sport) && (
          <>
            <div>
              <label className="block mb-1">Set Type</label>
              <select
                value={matchSettings.setType}
                onChange={(e) => setMatchSettings({ ...matchSettings, setType: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option>Single Set</option>
                <option>Best of 3</option>
                <option>Best of 5</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Points per Set</label>
              <input
                type="number"
                value={matchSettings.pointsPerSet}
                onChange={(e) => setMatchSettings({ ...matchSettings, pointsPerSet: Number(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}
      </div>

      {/* Time Scheduling */}
      <h2 className="text-xl font-semibold mb-4">
        Scheduling <FaClock className="inline-block text-purple-500 ml-2" />
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block mb-1">Match Start Time</label>
          <input type="time" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Estimated Interval Between Matches</label>
          <input type="number" className="w-full p-2 border rounded" placeholder="Minutes" />
        </div>
      </div>

      {/* Drag and Drop Interface for Knockout and Group Playoffs */}
      {fixtureType === "knockout" && (
        <div className="p-4 border rounded mb-8">
          <h2 className="text-xl font-semibold mb-4">Drag & Drop Players</h2>
          <DragDropContext>
            <Droppable droppableId="entries">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {entries.map((entry, index) => (
                    <Draggable key={entry.id} draggableId={`${entry.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 mb-2 bg-gray-100 rounded shadow"
                        >
                          {entry.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default MatchFixtureSetup;
