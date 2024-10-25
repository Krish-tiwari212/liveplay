import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

interface EventDetailsFormProps {
  fields?: FormField[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFormType: React.Dispatch<React.SetStateAction<any>>;
  setEventData: React.Dispatch<React.SetStateAction<any>>;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  formData,
  setFormData,
  setFormType,
  setEventData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("eventFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  return (
    <form className="bg-white shadow-2xl p-5 rounded-lg">
      <div className="flex flex-wrap w-full">
        {fields.map((field) => (
          <div
            key={field.id}
            className={`${
              field.id === "eventName" ? "w-full" : "lg:w-[47%]"
            } w-full m-2 flex flex-col`}
          >
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name as keyof EventDetailsFormProps] || ""}
              onChange={handleChange}
              className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
            />
          </div>
        ))}
        <div className=" w-full mx-2 mt-2 flex flex-col mb-6">
          <label className="" htmlFor="OrganiserContactInfo">
            Organiser Contact Info
          </label>
          <div className="flex flex-col xl:flex-row w-full gap-3">
            <div className=" w-full flex flex-col">
              <label className="text-[0.8rem]" htmlFor="organiserName">
                Name
              </label>
              <input
                id="organiserName"
                type="text"
                name="organiserName"
                placeholder="Enter Name"
                required
                value={formData.organiserName || ""}
                onChange={handleChange}
                className=" w-full h-12 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
              />
            </div>
            <div className=" w-full  flex flex-col">
              <label className="text-[0.8rem]" htmlFor="organiserNumber">
                Number
              </label>
              <input
                id="organiserNumber"
                type="text"
                name="organiserNumber"
                placeholder="Enter Number"
                required
                value={formData.organiserNumber || ""}
                onChange={handleChange}
                className=" w-full h-12 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
              />
            </div>
            <div className=" w-full flex flex-col">
              <label className="text-[0.8rem]" htmlFor="organiseremailaddress">
                Email address
              </label>
              <input
                id="organiseremailaddress"
                type="email"
                name="organiseremailaddress"
                placeholder="Enter Email"
                required
                value={formData.organiseremailaddress || ""}
                onChange={handleChange}
                className=" w-full h-12 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
              />
            </div>
          </div>
          <div className="mt-2 items-top flex justify-start  space-x-2">
            <Checkbox id="contactInfo" />
            <div className="flex flex-col leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use organizer's info from profile.
              </label>
              <p className="text-[0.8rem] text-muted-foreground">
                Details would be Automatically fetched from your user profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
const fields = [
  {
    id: "eventName",
    label: "Event Name",
    type: "text",
    name: "eventName",
    placeholder: "Enter Event Title",
    required: true,
  },
  {
    id: "LastRegistrationDate",
    label: "Last Registration Date",
    type: "date",
    name: "lastRegistrationDate",
    required: true,
  },
  {
    id: "LastWithdrawalDate",
    label: "Last Withdrawal Date",
    type: "date",
    name: "lastWithdrawalDate",
    required: true,
  },
  {
    id: "eventstartDate",
    label: "Event Start Date",
    type: "date",
    name: "eventstartDate",
    required: true,
  },
  {
    id: "eventenddate",
    label: "Event End Date",
    type: "date",
    name: "eventenddate",
    required: true,
  },
  {
    id: "startTime",
    label: "Start Time",
    type: "time",
    name: "startTime",
    required: true,
  },
  // Add more fields as needed
];

export default EventDetailsForm;
