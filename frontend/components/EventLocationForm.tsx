import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

// Define the interface for form fields
interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

// Define the interface for form data
interface EventLocationFormData {
  fields?: FormField[];
  formData: any; // Accept formData as a prop
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFormType: React.Dispatch<React.SetStateAction<any>>;
  setEventData: React.Dispatch<React.SetStateAction<any>>;
}

// Define the form fields
const formFields: FormField[] = [
  { id: "venueName", label: "Venue Name", type: "text", name: "venueName", placeholder: "Enter Venue", required: true },
  { id: "eventStreet", label: "Street", type: "text", name: "eventStreet", placeholder: "Enter Street", required: true },
  { id: "eventAddress", label: "Address", type: "text", name: "eventAddress", placeholder: "Enter address", required: true },
  { id: "eventPincode", label: "Pincode", type: "text", name: "eventPincode", placeholder: "Enter pincode", required: true },
];

const EventLocationForm: React.FC<EventLocationFormData> = ({
  formData,
  setFormData,
  setFormType,
  setEventData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="bg-white p-5 rounded-lg shadow-2xl">
      <div className="flex flex-wrap w-full">
        {formFields.map((field) => (
          <div key={field.id} className="w-full lg:w-[47%] m-2 flex flex-col">
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              type={field.type}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              value={formData[field.name as keyof EventLocationFormData] || ""}
              onChange={handleChange}
              className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
            />
          </div>
        ))}
        <div className="mt-2 mx-2 items-top flex justify-start space-x-2">
          <Checkbox id="venue" />
          <div className="flex flex-col leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Venue Not Decided Yet
            </label>
            <p className="text-[0.8rem] text-muted-foreground">
              Once checked, the form limits input to only the city field. This
              ensures the user can continue the process even if they don't have
              the final venue details yet.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventLocationForm;
