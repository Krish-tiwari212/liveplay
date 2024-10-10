"use client"

import React, { useState } from 'react';

const RegisteredTeams = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      name: "Soccer Tournament",
      image:
        "https://www.bing.com/ck/a?!&&p=b50d1c9dea6a89bbJmltdHM9MTcyNzgyNzIwMCZpZ3VpZD0yZTY5NjNlNi02NTlkLTYwMDQtMThmMS03MDBkNjQ5YjYxMWUmaW5zaWQ9NTU4Nw&ptn=3&ver=2&hsh=3&fclid=2e6963e6-659d-6004-18f1-700d649b611e&u=a1L2ltYWdlcy9zZWFyY2g_cT1zb2NjZXIlMjBpbWFnZXMmRk9STT1JUUZSQkEmaWQ9OTI1OUEzMDY1NEZEQTJDQjVDMzEyNzVDMzg4MUQwOTlBMjI2REY5RA&ntb=1",
      details: "Details about the Soccer Tournament",
      teams: [
        { name: "Team A", details: "Registered on: 2023-10-01" },
        { name: "Team C", details: "Registered on: 2023-10-03" },
      ],
    },
    {
      name: "Basketball League",
      image:
        "https://www.bing.com/ck/a?!&&p=6b5c9f0b5fa9d309JmltdHM9MTcyNzgyNzIwMCZpZ3VpZD0yZTY5NjNlNi02NTlkLTYwMDQtMThmMS03MDBkNjQ5YjYxMWUmaW5zaWQ9NTc1Ng&ptn=3&ver=2&hsh=3&fclid=2e6963e6-659d-6004-18f1-700d649b611e&u=a1L2ltYWdlcy9zZWFyY2g_cT1iYXNrZXRiYWxsJTIwaW1hZ2VzJkZPUk09SVFGUkJBJmlkPTQ3NkJEMjgyQjkyN0I4MDEyMDU0NEJCNzcwQzJEODE0MzAzQTlFMzA&ntb=1",
      details: "Details about the Basketball League",
      teams: [{ name: "Team B", details: "Registered on: 2023-10-02" }],
    },
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="w-full bg-white p-4 shadow-lg m-3">
      <h1 className="text-xl font-bold mb-4">Registered Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event, index) => (
          <div key={index} className="border rounded shadow-sm p-4 cursor-pointer" onClick={() => handleEventClick(event)}>
            <img src={event.image} alt={event.name} className="w-full h-32 object-cover mb-2" />
            <h2 className="font-semibold">{event.name}</h2>
            <p>{event.details}</p>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="mt-4 border rounded shadow-sm p-4">
          <h2 className="text-lg font-bold">{selectedEvent.name} Teams</h2>
          <ul>
            {selectedEvent.teams.map((team, index) => (
              <li key={index} className="mb-2 p-2 border rounded shadow-sm">
                <h3 className="font-semibold">{team.name}</h3>
                <p>{team.details}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RegisteredTeams;
