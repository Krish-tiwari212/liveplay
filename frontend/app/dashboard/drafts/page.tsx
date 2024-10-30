"use client"

import { useEventContext } from '@/context/EventDataContext';
import React, { useEffect } from 'react'

const Drafts = () => {

  const { setDashboardName } = useEventContext();
  useEffect(() => {
    setDashboardName("Drafts");
  }, []);
  return (
    <div className="w-full bg-slate-200 p-2">
      <h1 className="">Drafts</h1>
    </div>
  );
}

export default Drafts
