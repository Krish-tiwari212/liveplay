import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toast, ToastProvider } from "@radix-ui/react-toast";
import { Toaster } from "@/components/ui/toaster";
import { Icon } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LivePlay",
  description: "",
  icons: [
    "/images/LiveplayLogoIcon.png"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
