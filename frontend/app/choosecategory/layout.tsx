"use client";

import "../globals.css";
import { useState, useEffect } from "react";
import MNavbar from "@/components/MNavbar";
import Navbar from "@/components/Navbar";
import HeroChangingTagLine from "@/components/HeroChangingTagLine";
import Footer from "@/components/Footer";
import { CartProvider, useCartContext } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext"; // Assuming you have this context

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <CartProvider>
        {" "}
        {/* CartProvider wraps everything */}
        <MainLayout>{children}</MainLayout>
      </CartProvider>
    </UserProvider>
  );
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { tagline } = useCartContext(); // Access tagline from CartContext

  useEffect(() => {
    console.log(tagline); // Debug: Log tagline to ensure it's working
  }, [tagline]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <MNavbar />
        <Navbar />
        <HeroChangingTagLine ishero={true} />
        <HeroChangingTagLine tagline={tagline} />
        {children}
      </main>
      <Footer />
    </div>
  );
};
