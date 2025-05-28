"use client"

import "../globals.css";
import { UserProvider } from '@/context/UserContext';
import { AppContextProvider } from "@/lib/context/AppContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </UserProvider>
  );
 
}
