"use client";

export default function ParticipantsPage() {
  return (
    <div>
      <h1>Participants Page</h1>
    </div>
  );
}

// import { useEffect, useState, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { FaMedal, FaTrophy, FaRunning, FaBasketballBall, FaFutbol, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';

// interface Participant {
//   id: string;
//   user_id: string;
//   name: string;
//   status: string;
//   registration_date: string;
//   user: {
//     id: string;
//     full_name: string;
//     email: string;
//     gender: string;
//     date_of_birth: string;
//   };
// }

// interface Event {
//   id: string;
//   event_name: string;
//   date: string;
//   location: string;
//   description: string;
//   organizer_contact_number: string;
//   organizer_email: string;
//   start_date: string;
//   end_date: string;
//   last_registration_date: string;
//   last_withdrawal_date: string;
//   venue_name: string;
//   street_address: string;
//   additional_details: string;
//   city: string;
//   pincode: string;
//   event_usp: string;
//   rewards_for_participants: string;
//   playing_rules: string;
//   desktop_cover_image_url: string;
//   mobile_cover_image_url: string;
// }

// const Card = ({ children }: { children: React.ReactNode }) => (
//   <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow">
//     {children}
//   </div>
// );

// const ParticipantsPageContent = ({ eventId }: { eventId: string | null }) => {
//   const [participants, setParticipants] = useState<Participant[]>([]);
//   const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
//   const [event, setEvent] = useState<Event | null>(null);

//   useEffect(() => {
//     if (eventId) {
//       fetch(`/api/event/get_entries/${eventId}`)
//         .then(response => response.json())
//         .then(data => setParticipants(data.participants))
//         .catch(error => console.error(error));

//       fetch(`/api/event/get_by_id/${eventId}`)
//         .then(response => response.json())
//         .then(data => setEvent(data))
//         .catch(error => console.error(error));
//     }
//   }, [eventId]);

//   const handleParticipantClick = (participant: Participant) => {
//     setSelectedParticipant(participant);
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       {event && (
//         <div className="bg-white p-6 shadow-md rounded-lg">
//           <header className="mb-6 text-center">
//             <h1 className="text-4xl font-bold text-gray-800">Event Details</h1>
//           </header>
//           <div className="flex flex-wrap md:flex-nowrap md:justify-left items-start mb-6">
//             <img
//               src={event.desktop_cover_image_url}
//               alt="Event Cover"
//               className="rounded-lg shadow-md w-full md:w-1/4 h-48 object-cover mb-4 md:mb-0"
//             />
//             <div className="flex flex-col md:pl-6 space-y-3">
//               <h2 className="text-3xl font-semibold text-center text-gray-700">{event.name}</h2>
//               <div className="text-gray-600">
//                 <p><strong>Name:</strong> {event.event_name}</p>
//                 <p><FaMapMarkerAlt className="inline text-gray-500 mr-2" /> <strong>Location:</strong> {event.venue_name}, {event.street_address}, {event.city}, {event.pincode}</p>
//                 <p><FaEnvelope className="inline text-gray-500 mr-2" /> <strong>Contact:</strong> {event.organizer_contact_number} | {event.organizer_email}</p>
//                 <p><strong>Additional Details:</strong> {event.additional_details}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <h2 className="text-2xl font-bold text-center text-gray-800">Participants</h2>
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <ul className="divide-y divide-gray-200">
//           {participants.map(participant => (
//             <li key={participant.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <div onClick={() => handleParticipantClick(participant)} className="flex items-center cursor-pointer space-x-4">
//                     <Avatar className="w-12 h-12">
//                       <AvatarImage src={`https://robohash.org/${participant.user_id}.png`} />
//                       <AvatarFallback>{participant.user.full_name[0]}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="text-lg font-semibold">{participant.user.full_name}</p>
//                       <p className="text-sm text-gray-500">{participant.user.email}</p>
//                     </div>
//                   </div>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-lg p-6 bg-gray-50 rounded-lg shadow-lg">
//                   <DialogHeader>
//                     <DialogTitle className="text-xl font-semibold text-gray-800">Profile Information</DialogTitle>
//                     <DialogDescription>
//                       <div className="flex flex-col items-center mt-4">
//                         <Avatar className="w-24 h-24 mb-4">
//                           <AvatarImage src={`https://robohash.org/${selectedParticipant?.user_id}.png`} />
//                           <AvatarFallback>{selectedParticipant?.user.full_name[0]}</AvatarFallback>
//                         </Avatar>
//                         <p className="text-md"><strong>Name:</strong> {selectedParticipant?.user.full_name}</p>
//                         <p className="text-md"><strong>Email:</strong> {selectedParticipant?.user.email}</p>
//                         <p className="text-md"><strong>Gender:</strong> {selectedParticipant?.user.gender}</p>

//                         <div className="mt-6 w-full">
//                           <h3 className="text-xl font-semibold mb-2">Sports Participation</h3>
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <Card>
//                               <FaFutbol className="text-green-500 mb-2" /> Soccer Tournament 2022
//                             </Card>
//                             <Card>
//                               <FaBasketballBall className="text-orange-500 mb-2" /> Basketball League 2021
//                             </Card>
//                             <Card>
//                               <FaRunning className="text-red-500 mb-2" /> Marathon 2020
//                             </Card>
//                           </div>
//                         </div>
//                         <div className="mt-6 w-full">
//                           <h3 className="text-xl font-semibold mb-2">Achievements</h3>
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <Card>
//                               <FaMedal className="text-yellow-500 mb-2" /> 3 Gold Medals in Swimming
//                             </Card>
//                             <Card>
//                               <FaTrophy className="text-yellow-500 mb-2" /> Top Scorer in Soccer League
//                             </Card>
//                             <Card>
//                                 <FaRunning className="mr-2 mb-2 text-center text-red-500" /> Completed 5 marathons
//                               </Card>
//                               <Card>
//                                 <FaBasketballBall className="mr-2 mb-2 text-center text-orange-500" /> Member of national basketball team
//                               </Card>
//                               <Card>
//                                 <FaFutbol className="mr-2 mb-2 text-center text-green-500" /> Coach for junior soccer team
//                               </Card>
//                               <Card>
//                                 <FaMedal className="mr-2 mb-2 text-center text-yellow-500" /> Organized community sports events
//                               </Card>
//                           </div>
//                         </div>
//                       </div>
//                     </DialogDescription>
//                   </DialogHeader>
//                 </DialogContent>
//               </Dialog>
//               <Button onClick={() => handleParticipantClick(participant)}>View Profile</Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const ParticipantsPage = () => {
//   const searchParams = useSearchParams();
//   const eventId = searchParams.get("id");

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ParticipantsPageContent eventId={eventId} />
//     </Suspense>
//   );
// };

// export default ParticipantsPage;