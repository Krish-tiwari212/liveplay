import React, { useState } from 'react'

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

interface EventInsights {
  fields?: FormField[];
  formData: any; // Accept formData as a prop
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFormType: React.Dispatch<React.SetStateAction<any>>; 
  setEventData:React.Dispatch<React.SetStateAction<any>>;
}

const EventInsights: React.FC<EventInsights> = ({
  formData,
  setFormData,
  setFormType,setEventData
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="bg-white p-5 rounded-lg shadow-2xl">
      <div className="flex flex-wrap w-full">
        {[
          {
            label: "Event Description",
            name: "eventDescription",
            placeholder: "Add description",
          },
          { label: "Event USP", name: "eventUSP", placeholder: "Add USP" },
          {
            label: "Rewards And Prices",
            name: "rewardsAndParticipation",
            placeholder: "Add Rewards",
          },
          {
            label: "Playing Rules",
            name: "playingRules",
            placeholder: "Add Rules",
          },
        ].map((field) => (
          <div key={field.name} className="w-full m-2 flex flex-col mb-4">
            <label className="" htmlFor={field.name}>
              {field.label}
            </label>
            <textarea
              id={field.name}
              name={field.name}
              rows={4}
              placeholder={field.placeholder}
              required
              value={formData[field.name as keyof typeof formData] || ""}
              onChange={handleChange}
              className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default EventInsights
