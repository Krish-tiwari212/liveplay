import { useAppContext } from "@/lib/context/AppContext";
import { Loader } from "lucide-react";
import React from "react";

interface SidebarProps {
  setFormType: (type: string) => void;
  content: { title: string }[];
}


const Sidebar: React.FC<SidebarProps> = ({ setFormType,content }) => {
  const { theme, setTheme } = useAppContext();
  return (
    <div
      className={`h-full flex-[1] rounded-lg p-6 justify-between flex flex-col shadow-lg bg-white`}
    >
      <h2 className="text-lg font-bold mb-4 text-black">Create Event</h2>
      <div className="space-y-2">
        {content.map((e, i) => (
          <button
            key={i}
            onClick={() => setFormType(e.title)}
            className={`w-full text-gray-600 py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 hover:text-white transition duration-200 text-start`}
          >
            {e.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
