import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import TaxInvoice from "@/components/TaxInvoice"; 

const GSTCompliance = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [isInclusive, setIsInclusive] = useState(false);

  return (
    <form className="bg-white shadow-2xl p-5 rounded-lg">
      <div className="flex flex-wrap w-full">
        <div className="w-full m-2 flex flex-col">
          <label htmlFor="gstRegistered">
            Are you a registered GST person?
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setIsRegistered(true)}
              className={`p-2 ${
                isRegistered ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setIsRegistered(false)}
              className={`p-2 ${
                !isRegistered ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              No
            </button>
          </div>
        </div>
        {isRegistered && (
          <>
            <div className="w-full m-2 flex flex-col">
              <label htmlFor="gstNumber">GST Number</label>
              <input
                id="gstNumber"
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                placeholder="Enter GST Number..."
                className="h-12 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
              />
            </div>
            <div className="w-full m-2 flex flex-col">
              <label htmlFor="gstRate">Select GST Rate</label>
              <select
                id="gstRate"
                value={gstRate}
                onChange={(e) => setGstRate(e.target.value)}
                className="h-12 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
              >
                <option value="">Select Rate</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>
            <div className="w-full m-2 flex flex-col">
              <label>Pricing Type</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsInclusive(false)}
                  className={`p-2 ${
                    !isInclusive ? "bg-gray-800 text-white" : "bg-gray-200"
                  }`}
                >
                  Exclusive
                </button>
                <button
                  type="button"
                  onClick={() => setIsInclusive(true)}
                  className={`p-2 ${
                    isInclusive ? "bg-gray-800 text-white" : "bg-gray-200"
                  }`}
                >
                  Inclusive
                </button>
              </div>
            </div>
            <div className="w-full ">
              <div className="mt-4 text-red-600">
                <p>Once live, GST settings cannot be changed.</p>
              </div>
              <TaxInvoice />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-2 mx-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default GSTCompliance;
