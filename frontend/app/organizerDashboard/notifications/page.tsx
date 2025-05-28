"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { HiOutlineInbox, HiOutlineUserAdd, HiOutlineUserRemove, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEventContext } from '@/context/EventDataContext';
import { useUser } from '@/context/UserContext';
import { createClient } from '@/utils/supabase/client';

const page = () => {
  const supabase = createClient();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>("Inbox");
  const { setDashboardName, setNotification } = useEventContext();

  const [notificationsState, setNotificationsState] = useState([]);
  const [reply, setReply] = useState<{ [key: number]: string }>({}); 
  const [replyVisible, setReplyVisible] = useState<{ [key: number]: boolean }>({}); 

  const fetchEventsAndQnA = async () => {
    const { data: events, error } = await supabase
      .from('events')
      .select('id')
      .eq('organizer_id', user?.id); // Replace with actual user ID

    if (error) {
      console.error('Error fetching events:', error);
      return;
    }

    const qnaPromises = events.map(event =>
      fetch(`/api/event/fetch-qna/${event.id}`).then(res => res.json())
    );

    const qnaResponses = await Promise.all(qnaPromises);
    const qnaQuestions = qnaResponses.flatMap(response => response.questions.map(question => ({
      id: question.id,
      message: question.question_text,
      category: "Q&A Question",
      unread: true,
      time: new Date(question.created_at).toLocaleTimeString(),
    })));

    setNotificationsState(qnaQuestions);
  };

  useEffect(() => {
    setDashboardName("Notifications");
    fetchEventsAndQnA();
  }, []);

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

  const handleReplySubmit = async (id: number) => {
    try {
      const response = await fetch(`/api/event/answer/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answerText: reply[id] }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit reply');
      }
  
      markAsRead(id);
      console.log(`Reply to notification ${id}: ${reply[id]}`);
      setReplyVisible((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
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

  return (
    <div className="flex m-3 bg-white rounded-md min-h-screen">
      <div className="hidden md:flex w-1/3 xl:w-1/4 bg-[#17202a] p-4 rounded-l-md flex-col justify-between min-h-screen">
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
            className={` flex items-center transition-colors rounded-md px-4 py-2 duration-200 hover:text-cad927 ${
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
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
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

export default page;