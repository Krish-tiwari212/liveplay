import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import TaxInvoice from "@/components/TaxInvoice"; 
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { title } from "process";
import { toast } from "@/hooks/use-toast";

interface GSTComplianceProps {
  handleNext: () => void;
  EventData: any;
  setEventData: React.Dispatch<React.SetStateAction<any>>;
  FeatureData: any;
}

const GSTCompliance = ({
  handleNext,
  EventData,
  setEventData,
  FeatureData,
}: GSTComplianceProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [isInclusive, setIsInclusive] = useState(false);
  const handleClick = () => {
    setEventData((prevData: any) => ({
      ...prevData,
      GstCompliance: !isRegistered || false,
      countdown: FeatureData.countdown || false,
      enableFixtures: FeatureData.enableFixtures || false,
    }));
    handleNext();
  };
  return (
    <div className="bg-white shadow-2xl p-5 rounded-lg">
      <div className="flex flex-wrap w-full">
        <div className="w-full m-2 flex flex-col">
          <label htmlFor="gstRegistered">
            Are you a registered GST person?
          </label>
          <RadioGroup defaultValue="default">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Yes"
                id="yes"
                onClick={() => setIsRegistered(true)}
              />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="default"
                id="no"
                onClick={() => setIsRegistered(false)}
              />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>
        {isRegistered && (
          <>
            <div className="w-full m-2 flex flex-col">
              <label htmlFor="gstNumber">GST Number</label>
              <div className="flex gap-5 items-center">
                <input
                  id="gstNumber"
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="Enter GST Number"
                  className="h-12 p-2 bg-white w-[85%] border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
                />
                <Button
                  onClick={() =>
                    toast({
                      title: "Adhar Verified",
                    })
                  }
                >
                  Verify Adhar
                </Button>
              </div>
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
              <RadioGroup defaultValue="exclusive">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="default"
                    id="inclusive"
                    onClick={() => setIsRegistered(true)}
                  />
                  <Label htmlFor="inclusive">Inclusive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="exclusive"
                    id="exclusive"
                    onClick={() => setIsRegistered(false)}
                  />
                  <Label htmlFor="exclusive">Exclusive</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="w-full ">
              <div className="mt-4 text-red-600">
                <p>Once live, GST settings cannot be changed.</p>
              </div>
              <TaxInvoice />
            </div>
          </>
        )}

        <Button
          className="flex justify-center items-center gap-3 mt-4 w-full"
          onClick={handleClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default GSTCompliance;
