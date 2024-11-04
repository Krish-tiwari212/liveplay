"use client"

import Navbar from "@/components/DashboardNavbar";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { AppContextProvider, useAppContext } from "@/lib/context/AppContext";
import { useEffect, useState } from "react";
import MSidebar from "@/components/MSidebar";
import { EventProvider, useEventContext } from "@/context/EventDataContext";
import { UserProvider, useUser } from '@/context/UserContext';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navexpanded, setnavexpanded] = useState(false)

  return (
    <UserProvider>
      <AppContextProvider>
        <EventProvider>
          <KYCWrapper>
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
          </KYCWrapper>
        </EventProvider>
      </AppContextProvider>
    </UserProvider>
  );
}

function KYCWrapper({ children }: { children: React.ReactNode }) {
  const { kycCompleted } = useEventContext();
  const [showKYCPopup, setShowKYCPopup] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const isKYCPage = window.location.pathname.includes('/kyc');
    if (isKYCPage) {
      setShowKYCPopup(false);
      return;
    }

    if (!kycCompleted && user) {
      const lastPopupTime = localStorage.getItem('lastKYCPopupTime');
      const currentTime = Date.now();
      
      if (!lastPopupTime || currentTime - parseInt(lastPopupTime) > 1000) {
        setShowKYCPopup(true);
        localStorage.setItem('lastKYCPopupTime', currentTime.toString());
      }
    }

    return () => {
    };
  }, [user, kycCompleted]); 

  return (
    <>
      {showKYCPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">KYC Required</h2>
            <p className="mb-4">
              Please complete your KYC verification to continue using all
              features.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => {router.push(`organizerDashboard/kyc/${user?.id}`);setShowKYCPopup(false);}}
                className=""
              >
                Complete KYC
              </Button>
              <Button
                onClick={() => setShowKYCPopup(false)}
                className=""
              >
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
