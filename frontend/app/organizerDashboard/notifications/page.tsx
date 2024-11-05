"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { HiOutlineInbox, HiOutlineUserAdd, HiOutlineUserRemove, HiOutlineQuestionMarkCircle, HiOutlinePlay } from 'react-icons/hi'; // Import icons
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaTimes } from 'react-icons/fa';
import { useEventContext } from '@/context/EventDataContext';

const notifications = [
  {
    id: 1,
    message: "User XYZ has registered for category ABC in event PQR.",
    category: "New Registration",
    unread: true,
    time: "10:00 AM",
  },
  {
    id: 2,
    message: "User XYZ has withdrawn from category ABC in event PQR.",
    category: "Participant Withdrawal",
    unread: false,
    time: "11:00 AM",
  },
  {
    id: 3,
    message: "User XYZ asked a question.",
    category: "Q&A Question",
    unread: true,
    time: "12:00 PM",
  },
  {
    id: 4,
    message: "Event PQR is now live on liveplay.in!",
    category: "Live Event",
    unread: false,
    time: "1:00 PM",
  },
  {
    id: 5,
    message: "Event PQR was canceled. Refunds are being processed.",
    category: "Canceled Event",
    unread: false,
    time: "2:00 PM",
  },
  {
    id: 6,
    message: "User ABC has registered for category DEF in event XYZ.",
    category: "New Registration",
    unread: true,
    time: "3:00 PM",
  },
  {
    id: 7,
    message: "User DEF has withdrawn from category GHI in event XYZ.",
    category: "Participant Withdrawal",
    unread: false,
    time: "4:00 PM",
  },
  {
    id: 8,
    message: "User GHI asked a question about event XYZ.",
    category: "Q&A Question",
    unread: true,
    time: "5:00 PM",
  },
  {
    id: 9,
    message: "Event XYZ is now live on liveplay.in!",
    category: "Live Event",
    unread: false,
    time: "6:00 PM",
  },
  {
    id: 10,
    message: "Event XYZ was canceled. Refunds are being processed.",
    category: "Canceled Event",
    unread: false,
    time: "7:00 PM",
  },
  {
    id: 11,
    message: "User JKL has registered for category MNO in event PQR.",
    category: "New Registration",
    unread: true,
    time: "8:00 AM",
  },
  {
    id: 12,
    message: "User MNO has withdrawn from category PQR in event XYZ.",
    category: "Participant Withdrawal",
    unread: true,
    time: "9:00 AM",
  },
  {
    id: 13,
    message: "User OPQ asked a question about event ABC.",
    category: "Q&A Question",
    unread: true,
    time: "10:30 AM",
  },
  {
    id: 14,
    message: "Event ABC is now live on liveplay.in!",
    category: "Live Event",
    unread: false,
    time: "11:30 AM",
  },
  {
    id: 15,
    message: "Event ABC was canceled. Refunds are being processed.",
    category: "Canceled Event",
    unread: false,
    time: "12:30 PM",
  },
];

const page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Inbox");
  const { setDashboardName, setNotification } = useEventContext();

  const [notificationsState, setNotificationsState] = useState(notifications);
  const [reply, setReply] = useState<{ [key: number]: string }>({}); 
  const [replyVisible, setReplyVisible] = useState<{ [key: number]: boolean }>({}); 

  const filteredNotifications =
    selectedCategory === "Inbox"
      ? notificationsState
      : notificationsState.filter(
          (notification) => notification.category === selectedCategory
        );

  const markAsRead = (id: number) => {
    setNotificationsState((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification
      )
    );
  };

  const handleReplySubmit = (id: number) => {
    markAsRead(id);
    console.log(`Reply to notification ${id}: ${reply[id]}`);
    setReplyVisible((prev) => ({ ...prev, [id]: false })); 
  };

  const handleReplyLater = (id: number) => {
    setReplyVisible((prev) => ({ ...prev, [id]: false })); 
  };

  const markAllAsRead = () => {
    setNotificationsState((prev) =>
      prev.map((notification) =>
        notification.category === "Q&A Question" ? notification : { ...notification, unread: false }
      )
    );
  };

  useEffect(() => {
    setDashboardName("Notifications");
    setNotification(notifications);
  }, []);

  return (
    <div className="flex m-3 bg-white rounded-md h-[36rem]">
      <div className="hidden md:flex w-1/4 bg-[#17202a] p-4 rounded-l-md flex-col justify-between h-full">
        <ul className="space-y-2">
          <li
            className={` flex items-center transition-colors rounded-md px-4 py-2 duration-200 hover:text-cad927 ${
              selectedCategory === "Inbox"
                ? "bg-[#cad927] text-gray-800"
                : "text-white"
            }`}
            onClick={() => setSelectedCategory("Inbox")}
            style={{ cursor: "pointer" }}
          >
            <HiOutlineInbox className="mr-2" /> Inbox
          </li>
          <li
            className={` flex items-center transition-colors rounded-md px-4 py-2  duration-200 hover:text-cad927 ${
              selectedCategory === "New Registration"
                ? "bg-[#cad927] text-gray-800"
                : "text-white"
            }`}
            onClick={() => setSelectedCategory("New Registration")}
            style={{ cursor: "pointer" }}
          >
            <HiOutlineUserAdd className="mr-2" /> New Registrations
          </li>
          <li
            className={` flex items-center transition-colors rounded-md px-4 py-2  duration-200 hover:text-cad927 ${
              selectedCategory === "Participant Withdrawal"
                ? "bg-[#cad927] text-gray-800"
                : "text-white"
            }`}
            onClick={() => setSelectedCategory("Participant Withdrawal")}
            style={{ cursor: "pointer" }}
          >
            <HiOutlineUserRemove className="mr-2" /> Participant Withdrawals
          </li>
          <li
            className={` flex items-center transition-colors rounded-md px-4 py-2  duration-200 hover:text-cad927 ${
              selectedCategory === "Q&A Question"
                ? "bg-[#cad927] text-gray-800"
                : "text-white"
            }`}
            onClick={() => setSelectedCategory("Q&A Question")}
            style={{ cursor: "pointer" }}
          >
            <HiOutlineQuestionMarkCircle className="mr-2" /> Q&A
          </li>
          {/* <li
            className={` flex items-center transition-colors rounded-md px-4 py-2  duration-200 hover:text-cad927 ${
              selectedCategory === "Live Event"
                ? "bg-[#cad927] text-gray-800"
                : "text-white"
            }`}
            onClick={() => setSelectedCategory("Live Event")}
            style={{ cursor: "pointer" }}
          >
            <HiOutlinePlay className="mr-2" /> Live Events
          </li> */}
          {/* <li
            className={` flex items-center transition-colors rounded-md px-4 py-2 duration-200 hover:text-cad927 ${
              selectedCategory === "Canceled Event"
                ? "bg-[#cad927] text-gray-800"
                : "text-white"
            }`}
            onClick={() => setSelectedCategory("Canceled Event")}
            style={{ cursor: "pointer" }}
          >
            <FaTimes className="mr-2" /> Canceled Events
          </li> */}
        </ul>
        <div>
          <Button className="border border-gray-600 mt-4 w-full" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        </div>
      </div>

      <main className="flex-1 p-4 overflow-y-auto">
        <Tabs defaultValue="unread" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value="read">
            {filteredNotifications
              .filter((notification) => !notification.unread)
              .map((notification) => (
                <Card
                  key={notification.id}
                  className={`bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer mb-2 border-l-4 border-l-[#17202a]`}
                >
                  <div className="flex justify-between">
                    <span
                      className={`font-bold ${
                        notification.unread ? "text-gray-800" : "text-gray-700"
                      }`}
                    >
                      {notification.category}
                    </span>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <span className="text-gray-500">{notification.time}</span>
                      {notification.category === "Q&A Question" && (
                        <Button>Reply</Button>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-500">{notification.message}</span>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="unread">
            {filteredNotifications
              .filter((notification) => notification.unread)
              .map((notification) => (
                <Card
                  key={notification.id}
                  className={`bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer mb-2 relative border-l-4 border-l-[#17202a]`}
                >
                  <div className="flex justify-between relative">
                    <span
                      className={`font-bold ${
                        notification.unread ? "text-black" : "text-gray-700"
                      }`}
                    >
                      {notification.category}
                    </span>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <span className="text-gray-500">{notification.time}</span>
                      {notification.category === "Q&A Question" &&
                        !replyVisible[notification.id] && (
                          <Button
                            onClick={() =>
                              setReplyVisible((prev) => ({
                                ...prev,
                                [notification.id]: !prev[notification.id],
                              }))
                            }
                          >
                            Reply
                          </Button>
                        )}
                    </div>
                  </div>
                  <span className="text-gray-500">{notification.message}</span>
                  {notification.category === "Q&A Question" && (
                    <>
                      {replyVisible[notification.id] && (
                        <>
                          <div className="my-2 flex gap-2">
                            <Input
                              placeholder="Type your reply..."
                              value={reply[notification.id] || ""}
                              onChange={(e) =>
                                setReply({
                                  ...reply,
                                  [notification.id]: e.target.value,
                                })
                              }
                            />
                            <div className="flex flex-col gap-4">
                              <Button
                                onClick={() =>
                                  handleReplySubmit(notification.id)
                                }
                              >
                                Submit Reply
                              </Button>
                              <Button
                                onClick={() =>
                                  handleReplyLater(notification.id)
                                }
                              >
                                Reply Later
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default page
