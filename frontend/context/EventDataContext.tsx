import React, { createContext, useContext, useState, ReactNode } from "react";

interface EventData {
  [key: string]: any; 
}

interface NotificationData {
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
  nextId: number;
  setNextId: React.Dispatch<React.SetStateAction<number>>;
  UserType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  notification: NotificationData[];
  setNotification: React.Dispatch<React.SetStateAction<NotificationData[]>>;
  fetchedEventdatafromManagemeEvent: EventData;
  setFetchedEventdatafromManagemeEvent: React.Dispatch<
    React.SetStateAction<EventData>
  >;
  kycCompleted: boolean;
  setKycCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  profileCompleted: boolean;
  setProfileCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  completeprofileDialog:boolean
  setCompleteprofileDialog: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [nextId, setNextId] = useState(0); 
  const [UserType,setUserType]=useState("organizer")
  const [notification, setNotification] = useState<NotificationData[]>([]);
  const [
    fetchedEventdatafromManagemeEvent,
    setFetchedEventdatafromManagemeEvent,
  ]=useState({})
  const [kycCompleted,setKycCompleted]=useState(false)
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [completeprofileDialog, setCompleteprofileDialog]=useState(false)

  return (
    <EventContext.Provider
      value={{
        EventData,
        nextId,
        setNextId,
        setEventData,
        isVenueNotDecided,
        setIsVenueNotDecided,
        DashboardName,
        setDashboardName,
        EventEditData,
        editPage,
        setEditPage,
        setEventEditData,
        UserType,
        setUserType,
        notification,
        setNotification,
        fetchedEventdatafromManagemeEvent,
        setFetchedEventdatafromManagemeEvent,
        kycCompleted,
        setKycCompleted,
        profileCompleted,
        setProfileCompleted,
        completeprofileDialog,
        setCompleteprofileDialog
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
