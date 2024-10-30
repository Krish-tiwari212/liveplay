"use client";

import { useEventContext } from "@/context/EventDataContext";
import React, { useEffect } from "react";

const Profile = () => {
  const { setDashboardName } = useEventContext();
  useEffect(() => {
    setDashboardName("Profile");
  }, []);
  return (
    <div className="w-full bg-slate-200 p-2">
      <h1 className="">Profile</h1>
    </div>
  );
};

export default Profile;
