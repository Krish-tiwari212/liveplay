import { Input } from './ui/input';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch, MdMenu, MdOutlineEvent, MdPerson, MdLocationOn } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client'; 
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from './ui/button';
import { RiLoginCircleFill } from 'react-icons/ri';

interface location {
  latitude: number|null;
  longitude: number|null;
}

interface NavbarProps {
  location?: location;
}

const Navbar = ({ location }: NavbarProps) => {
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      setIsLoggedIn(false);
      toast({
        title: "Logout Successful",
        description: "Successfully Logged Out!",
        variant: "default",
      });
    } else {
      const result = await response.json();
      toast({
        title: "Logout Failed",
        description: result.error || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hidden lg:flex items-center justify-between p-4 bg-[#17202A] text-white gap-10 shadow-lg">
      <div className="flex items-center gap-5">
        <div
          onClick={() => router.push("/")}
          className="text-lg md:text-3xl font-bold tracking-wider flex-none cursor-pointer"
        >
          <Image
            src="/images/Logo.png"
            alt="/images/Logo.png"
            width={200}
            height={200}
          />
        </div>
        <Select>
          <SelectTrigger className="w-[120px] h-[30px] bg-[#141f29] font-semibold text-[#ccdb28] border border-[#ccdb28]">
            <MdLocationOn className="mr-1" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Pune</SelectItem>
            <SelectItem value="dark">Delhi</SelectItem>
            <SelectItem value="system">Chennai</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            scrollToSection("hero-features");
          }}
          size="xs"
          className="w-full bg-[#141f29] text-[#ccdb28] border border-[#ccdb28]"
        >
          Free Match Generator
        </Button>
        <Button
          onClick={() => {
            router.push("/createeventstaticpage");
          }}
          className="w-full bg-[#141f29] text-[#ccdb28] border border-[#ccdb28]"
          size="xs"
        >
          Create Event
        </Button>
        {isLoggedIn && (
          <Button
            onClick={() => router.push("/playerdashboard")}
            className="w-full bg-[#141f29] text-[#ccdb28] border border-[#ccdb28]"
            size="xs"
          >
            Dashboard
          </Button>
        )}
        {isLoggedIn ? (
          <Link href={"/"}>
            <Button
              onClick={handleLogout}
              variant="tertiary"
              className="flex justify-center items-center"
              size="xs"
            >
              <RiLoginCircleFill className="inline" />
              <h1 className="hidden md:block">Log Out</h1>
            </Button>
          </Link>
        ) : (
          <Link href={"/auth/login"}>
            <Button
              variant="tertiary"
              className=" flex justify-center items-center"
              size="xs"
            >
              <RiLoginCircleFill className="inline" />
              <h1 className="hidden md:block ">Sign Up/Login</h1>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;