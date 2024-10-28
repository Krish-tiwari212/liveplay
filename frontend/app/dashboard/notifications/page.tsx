"use client";

import { useEventContext } from "@/context/EventDataContext";
import React, { useEffect } from "react";

const page = () => {
  const { setDashboardName } = useEventContext();
  useEffect(() => {
    setDashboardName("Notifications");
  }, []);
  return <div></div>;
};

export default page;
