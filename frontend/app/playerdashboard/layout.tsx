"use client";

import Navbar from "@/components/DashboardNavbar";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { AppContextProvider, useAppContext } from "@/lib/context/AppContext";
import { useEffect, useState } from "react";
import MSidebar from "@/components/MSidebar";
import { EventProvider, useEventContext } from "@/context/EventDataContext";
import { UserProvider, useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navexpanded, setnavexpanded] = useState(false);
  return (
    <UserProvider>
      <AppContextProvider>
        <EventProvider>
          <CompletProfileWrapper>
            <Sidebar setnavexpanded={setnavexpanded} />
            <div
              className={`flex h-screen ${
                navexpanded ? "opacity-40 bg-black" : ""
              }`}
            >
              <div className="flex-[1] w-full">
                <MSidebar />
              </div>
              <div
                className={`bg-slate-200 overflow-x-hidden w-full h-full ml-16 md:ml-0 md:flex-[5] `}
              >
                <Navbar />
                {children}
              </div>
            </div>
          </CompletProfileWrapper>
        </EventProvider>
      </AppContextProvider>
    </UserProvider>
  );
}

function CompletProfileWrapper({ children }: { children: React.ReactNode }) {
  const { profileCompleted,setCompleteprofileDialog,completeprofileDialog } = useEventContext();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {

    if (!profileCompleted && user) {
      setShowProfilePopup(true);
    }

    const interval = setInterval(() => {
      if (!profileCompleted && user) {
        setShowProfilePopup(true);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user, profileCompleted]);

  return (
    <>
      {showProfilePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Complete Profile</h2>
            <p className="mb-4">
              Please complete your Profile to continue using all
              features.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setShowProfilePopup(false);
                  setCompleteprofileDialog(true);
                }}
                className=""
              >
                Complete Profile
              </Button>
              <Button onClick={() => setShowProfilePopup(false)} className="">
                Remind Me Later
              </Button>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
