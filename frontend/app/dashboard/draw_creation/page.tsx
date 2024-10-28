"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const fetchEvents = async () => {
  const response = await fetch('/api/event/all_events');
  const data = await response.json();
  return data.events;
};

const EventCard = ({ event }) => (
  <div  className='bg-white m-3'>
    <Link href={`/dashboard/draw_creation/${event.id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer">
        <img
          className="w-full"
          src={event.desktop_cover_image_url}
          alt={event.event_name}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{event.event_name}</div>
          <p className="text-gray-700 text-base">{event.event_description}</p>
          <p className="text-gray-700 text-base">
            {new Date(event.start_date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-base">{event.venue_name}</p>
        </div>
      </div>
    </Link>
  </div>
);

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const events = await fetchEvents();
      setEvents(events);
    };
    loadEvents();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8">Events</h1>
      <div className="flex flex-wrap">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;