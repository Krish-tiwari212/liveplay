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
import { createClient } from "@/utils/supabase/client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navexpanded, setnavexpanded] = useState(true);
  return (
    <UserProvider>
      <AppContextProvider>
        <EventProvider>
          <CompletProfileWrapper>
            <Sidebar setnavexpanded={setnavexpanded} />
            <div
              className={`flex h-screen ${
                !navexpanded ? "opacity-40 bg-black" : ""
              }`}
            >
              <div className="flex-[1] w-full">
                <MSidebar />
              </div>
              <div
                className={`bg-slate-200 overflow-x-hidden w-full h-full lg:flex-[3] xl:flex-[5]  `}
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
  const { profileCompleted, setCompleteprofileDialog } = useEventContext();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useUser();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user?.id)
          .single();

        if (error) {
          console.error('Error fetching user details:', error);
        } else {
          setUserDetails(data);
        }
      }
    };
    fetchUserDetails();
  }, [user?.id, supabase]);

  useEffect(() => {
    if (userDetails && !userDetails.gender && user) {
      setShowProfilePopup(true);
    } else {
      setShowProfilePopup(false);
    }

    const interval = setInterval(() => {
      if (userDetails && !userDetails.gender && user) {
        setShowProfilePopup(true);
      }
    }, 3 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user, userDetails]);

  return (
    <>
      {showProfilePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[35%]">
            <h2 className="text-xl font-bold mb-4">Complete Profile</h2>
            <p className="mb-4">
              Please complete your Profile to continue using all features.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setShowProfilePopup(false);
                  setCompleteprofileDialog(true);
                }}
              >
                Complete Profile
              </Button>
              <Button onClick={() => setShowProfilePopup(false)}>
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
