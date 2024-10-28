"use client";

import { useEventContext } from "@/context/EventDataContext";
import React, { useEffect } from "react";

const page = ({
  params: ManageEventId,
}: {
  params: { ManageEventId: string };
}) => {
  const { setDashboardName } = useEventContext();
  useEffect(() => {
    setDashboardName("ManageEventId");
  }, []);
  return (
    <div>
      <h1>{ManageEventId.ManageEventId}</h1>
    </div>
  );
};

export default page;
