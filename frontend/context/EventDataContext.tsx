import React, { createContext, useContext, useState, ReactNode } from "react";

interface EventData {
  [key: string]: any; 
}

interface EventContextType {
  EventData: EventData;
  setEventData: React.Dispatch<React.SetStateAction<EventData>>;
  isVenueNotDecided: boolean;
  setIsVenueNotDecided: React.Dispatch<React.SetStateAction<boolean>>;
  DashboardName: string;
  setDashboardName: React.Dispatch<React.SetStateAction<string>>;
  EventEditData: EventData;
  setEventEditData: React.Dispatch<React.SetStateAction<EventData>>;
  editPage: string;
  setEditPage: React.Dispatch<React.SetStateAction<string>>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [EventData, setEventData] = useState<EventData>({});
  const [EventEditData, setEventEditData] = useState<EventData>({});
  const [isVenueNotDecided, setIsVenueNotDecided] = useState(false);
  const [editPage, setEditPage] = useState("");  
  const [DashboardName, setDashboardName] = useState(""); 

  return (
    <EventContext.Provider
      value={{
        EventData,
        setEventData,
        isVenueNotDecided,
        setIsVenueNotDecided,
        DashboardName,
        setDashboardName,
        EventEditData,
        editPage, 
        setEditPage,
        setEventEditData
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};
