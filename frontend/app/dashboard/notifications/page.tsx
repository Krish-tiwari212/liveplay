"use client";

import { Button } from "@/components/ui/button";
import { useEventContext } from "@/context/EventDataContext";
import React, { useEffect, useState } from "react";

const page = () => {
  const { setDashboardName } = useEventContext();
  const [selectedButton, setSelectedButton] = useState("All");

  useEffect(() => {
    setDashboardName("Notifications");
  }, []);

  const notifications = [
    { id: 1, type: "Unread", title: "New Message", content: "You have a new message from John." },
    { id: 2, type: "Event Updates", title: "Event Approved: Soccer Match", content: "Your event 'Soccer Match' has been approved and is now visible on the platform." },
    { id: 3, type: "Participant Actions", title: "New Participant Joined", content: "Alice has joined your event." },
    { id: 4, type: "Reminders", title: "Event Reminder", content: "Don't forget your event tomorrow!" },
    { id: 5, type: "Unread", title: "New Comment", content: "You have a new comment on your post." },
    { id: 6, type: "Event Updates", title: "Event Canceled: Music Festival", content: "Your event 'Music Festival' has been canceled." },
    { id: 7, type: "Participant Actions", title: "Participant Left", content: "Bob has left your event." },
    { id: 8, type: "Reminders", title: "Payment Reminder", content: "Your payment is due in 3 days." },
    { id: 9, type: "Unread", title: "New Friend Request", content: "You have a new friend request from Sarah." },
    { id: 10, type: "Event Updates", title: "Event Rescheduled: Art Exhibition", content: "Your event 'Art Exhibition' has been rescheduled." },
  ];

  const filteredNotifications = notifications.filter(notification => 
    selectedButton === "All" ? true : notification.type === selectedButton
  );

  const buttons = [
    { label: "All" },
    { label: "Unread" },
    { label: "Event Updates" },
    { label: "Participant Actions" },
    { label: "Reminders" },
  ];
  return (
    <div className="bg-white text-gray-800 rounded-lg min-h-screen p-4 m-3">
      <h1 className="text-4xl font-bold mb-2">Notifications</h1>
      <p className="text-gray-800 mb-6">You have {filteredNotifications.length} notifications</p>
      <div className="flex space-x-4 mb-6">
        {buttons.map((button) => (
          <Button
            key={button.label}
            className={`px-4 rounded-md ${selectedButton === button.label ? 'bg-[#CDDC29] text-gray-800' : ''}`}
            onClick={() => setSelectedButton(button.label)}
          >
            {button.label}
          </Button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredNotifications.map(notification => (
          <div key={notification.id} className="bg-white border border-gray-800 shadow-md rounded-lg p-4 flex justify-between items-start">
            <div className="flex items-start">
              <span className="material-icons text-gray-800 mr-2">event</span>
              <div>
                <h2 className="font-bold text-xl">{notification.title}</h2>
                <p className="text-gray-400">{notification.content}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Button className="py-1 px-2 rounded">View Details</Button>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-6 font-bold py-2 px-4 rounded">
        Clear All Notifications
      </Button>
    </div>
  );
};

export default page;
