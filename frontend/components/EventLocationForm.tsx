import { Checkbox } from "@/components/ui/checkbox";

const EventLocationForm: React.FC = () => {
  return (
    <form className="bg-white p-5 rounded-lg shadow-2xl">
      <div className="flex flex-wrap w-full">
        <div className="w-full md:w-[47%] m-2 flex flex-col">
          <label className="" htmlFor="venueName">
            Venue Name
          </label>
          <input
            id="venueName"
            type="text"
            name="venueName"
            required
            placeholder="Enter Venue"
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="w-full md:w-[47%] m-2 flex flex-col">
          <label className="" htmlFor="eventstreet">
            Street
          </label>
          <input
            id="eventstreet"
            type="text"
            name="eventstreet"
            required
            placeholder="Enter Venue"
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="w-full m-2 flex flex-col">
          <label className="" htmlFor="eventaddress">
            Address
          </label>
          <input
            id="eventaddress"
            type="text"
            name="eventaddress"
            required
            placeholder="Enter address"
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="w-full  md:w-[47%] m-2 flex flex-col">
          <label className="" htmlFor="eventpincode">
            Pincode
          </label>
          <input
            id="eventpincode"
            type="text"
            name="eventpincode"
            required
            placeholder="Enter pincode"
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="mt-2 mx-2 items-top flex justify-start space-x-2">
          <Checkbox
            id="venue"
          />
          <div className="flex flex-col leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Venue Not Decided Yet
            </label>
            <p className="text-[0.8rem] text-muted-foreground">
              once checked, the form limits input to only the city field. This
              ensures the user can continue the process even if they don't have
              the final venue details yet.
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800  text-white p-2 mx-2 rounded-md mt-4"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default EventLocationForm;
