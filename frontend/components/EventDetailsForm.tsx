import { Checkbox } from "@/components/ui/checkbox";

const EventDetailsForm: React.FC = () => {
  return (
    <form className="bg-white shadow-2xl p-5 rounded-lg">
      <div className="flex flex-wrap w-full">
        <div className="lg:w-[47%] w-full m-2 flex flex-col">
          <label className="" htmlFor="eventTitle">
            Event Name
          </label>
          <input
            id="eventTitle"
            type="text"
            name="eventTitle"
            placeholder="Enter Event Title"
            required
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="lg:w-[47%] w-full m-2 flex flex-col">
          <label className="" htmlFor="eventDate">
            Last Registration Date
          </label>
          <input
            id="LastRegistrationDate"
            type="date"
            name="LastRegistrationDate"
            required
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="lg:w-[47%] w-full m-2 flex flex-col">
          <label className="" htmlFor="eventDate">
            Last Withdrawal Date
          </label>
          <input
            id="LastWithdrawalDate"
            type="date"
            name="LastWithdrawalDate"
            required
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="lg:w-[47%] w-full m-2 flex flex-col">
          <label className="" htmlFor="startTime">
            Start Time
          </label>
          <input
            id="startTime"
            type="time"
            name="startTime"
            required
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
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
        <button
          type="submit"
          className="w-full bg-gray-800  text-white p-2 mx-2 rounded-md"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default EventDetailsForm;
