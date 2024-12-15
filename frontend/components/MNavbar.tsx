import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MdLocationOn, MdOutlineEvent } from "react-icons/md";
import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { IoMdList } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client"; 
import Image from "next/image";
import { Button } from "./ui/button";
import { RiLoginCircleFill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useUser } from "@/context/UserContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface location {
  latitude:number |null;
  longitude: number|null
}

interface Mnavbar{
  location?:location
}

const MNavbar = ({ location }: Mnavbar) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();
  const { user, loading, setUser } = useUser();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // State to control the Sheet (Navbar) open state
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log(data);
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
      setIsSheetOpen(false); // Close the Sheet on logout
    } else {
      const result = await response.json();
      toast({
        title: "Logout Failed",
        description: result.error || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleButtonClick = (action: () => void) => {
    action();
    setIsSheetOpen(false);
  };

  return (
    <div className="lg:hidden flex w-full items-center justify-between p-4 bg-[#17202A] text-white shadow-lg z-20">
      <div className="flex items-center gap-4">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger>
            <FaBars className="text-3xl text-[#ccdb28]" />
          </SheetTrigger>
          <SheetContent
            className="bg-[#141f29] pt-16 border-none lg:hidden"
            side="top"
          >
            <div className="flex flex-col pt-10">
              {/* <Select>
                <SelectTrigger className="w-full h-[30px] text-2xl bg-[#141f29] font-semibold text-[#ccdb28] border border-[#ccdb28] flex justify-center items-center py-8 mb-4">
                  <div className="flex justify-center items-center mr-2">
                    <MdLocationOn className="mr-2 text-2xl" />
                    <SelectValue placeholder="Location" className="text-2xl" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Pune</SelectItem>
                  <SelectItem value="dark">Delhi</SelectItem>
                  <SelectItem value="system">Chennai</SelectItem>
                </SelectContent>
              </Select> */}
              <Button
                onClick={() =>
                  handleButtonClick(() => router.push("/eventspage"))
                }
                className="w-full mb-4 bg-[#141f29] text-[#ccdb28] border border-[#ccdb28] text-2xl py-8"
              >
                Free Match Generator
              </Button>
              <Button
                onClick={() =>
                  handleButtonClick(() => router.push("/createeventstaticpage"))
                }
                className="w-full mb-4 bg-[#141f29] text-[#ccdb28] border border-[#ccdb28] text-2xl py-8"
              >
                Create Event
              </Button>
              {isLoggedIn && (
                <Button
                  onClick={() =>
                    handleButtonClick(() => router.push("/playerdashboard"))
                  }
                  className="w-full mb-4 bg-[#141f29] text-[#ccdb28] border border-[#ccdb28] text-2xl py-8"
                >
                  Dashboard
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-10">
          <div
            onClick={() => router.push("/")}
            className="tracking-wider cursor-pointer"
          >
            <Image
              src="/images/Logo.png"
              alt="/images/Logo.png"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger
          className="lg:hidden"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <Avatar>
            <AvatarImage src={user?.user_metadata.picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mr-10 w-40 p-1 bg-[#17202A] focus:ring-offset-none border-none z-10">
          <div className="mt-auto">
            <ul>
              <li>
                {isLoggedIn ? (
                  <Link href={"/"}>
                    <Button
                      onClick={handleLogout}
                      variant="tertiary"
                      className="flex justify-center items-center w-full"
                      size="xs"
                    >
                      <RiLoginCircleFill className="inline" />
                      <h1 className="">Log Out</h1>
                    </Button>
                  </Link>
                ) : (
                  <Link href={"/auth/login"}>
                    <Button
                      variant="tertiary"
                      className=" flex justify-center items-center w-full"
                      size="xs"
                    >
                      <RiLoginCircleFill className="inline" />
                      <h1 className="">Sign Up/Login</h1>
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MNavbar;