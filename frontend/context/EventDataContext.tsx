import React, { createContext, useContext, useState, ReactNode } from "react";

interface EventData {
  [key: string]: any; 
}

interface NotificationData {
  [key: string]: any;
}

interface UnlockCircle {
  fieldid: number;
  fieldstatus: boolean;
}

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  checkbox?: CheckboxField;
  filecontnet?: filecontent;
  fieldid: number;
}

interface CheckboxField {
  id: string;
  label: string;
}

interface filecontent {
  size: string;
  label: string;
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
  completeprofileDialog: boolean;
  setCompleteprofileDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isNavbarCollapsed: boolean;
  setIsNavbarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  unlockEventCircle: number;
  setUnlockEventCircle: React.Dispatch<React.SetStateAction<number>>;
  KYCContent: FormField;
  setKYCContent: React.Dispatch<React.SetStateAction<FormField>>;
  eventregistratiopage: EventData;
  seteventregistrationpage: React.Dispatch<React.SetStateAction<EventData>>;
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
  const [UserType, setUserType] = useState("organizer");
  const [notification, setNotification] = useState<NotificationData[]>([]);
  const [
    fetchedEventdatafromManagemeEvent,
    setFetchedEventdatafromManagemeEvent,
  ] = useState<EventData>({});
  const [kycCompleted, setKycCompleted] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [completeprofileDialog, setCompleteprofileDialog] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [unlockEventCircle, setUnlockEventCircle] = useState(0);
  const [KYCContent, setKYCContent] = useState<FormField>({
    id: "",
    label: "",
    type: "",
    name: "",
    fieldid: 0,
  });
  const [eventregistratiopage, seteventregistrationpage] = useState<EventData>(
    {}
  );


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
        setCompleteprofileDialog,
        isNavbarCollapsed,
        setIsNavbarCollapsed,
        unlockEventCircle,
        setUnlockEventCircle,
        KYCContent,
        setKYCContent,
        eventregistratiopage,
        seteventregistrationpage
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
