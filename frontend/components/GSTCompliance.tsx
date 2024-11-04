import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import TaxInvoice from "@/components/TaxInvoice"; 
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { title } from "process";
import { toast } from "@/hooks/use-toast";
import { useEventContext } from "@/context/EventDataContext";

interface GSTComplianceProps {
  handleNext: () => void;
  FeatureData: any;
}

const GSTCompliance = ({
  handleNext,
  FeatureData,
}: GSTComplianceProps) => {
  const { EventData, setEventData,editPage,EventEditData,setEventEditData } = useEventContext();
  const [isRegistered, setIsRegistered] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [isGSTVerified,setIsGSTVerified]=useState(false)
  const [isInclusive, setIsInclusive] = useState(false);
  const handleChange = (value: string) => {
    setIsRegistered(value === "Yes"); 
    if(editPage==="manageEvent"){
      setEventEditData((prevData: any) => ({
        ...prevData,
        Gst_Compliance: value === "Yes",
      }));
    }else{
      setEventData((prevData: any) => ({
        ...prevData,
        Gst_Compliance: value === "Yes",
      }));
    }
  };

  const handleVerify = () => {
    const gstFormat = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[A-Z0-9]{1}$/; 
    if (gstFormat.test(gstNumber)) {
      setIsGSTVerified(true);
    } else {
      toast({ title: "Error", description: "Wrong GST number format", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (editPage === "manageEvent" && EventEditData) {
      setIsRegistered(EventEditData.Gst_Compliance || false);
      setIsGSTVerified(EventEditData.Gst_Compliance || false);
    } else if (editPage === "createEvent" && EventData) {
      setIsRegistered(EventData.Gst_Compliance || false);
      setIsGSTVerified(EventData.Gst_Compliance || false);
    }
  }, [EventData, EventEditData]);

  const isDisabled = editPage === "manageEvent";

  return (
    <div className="bg-white shadow-2xl p-5 rounded-lg w-full h-full">
      <div className={`flex flex-wrap w-full ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="w-full m-2 flex flex-col">
          <label htmlFor="gstRegistered">
            Are you a registered GST person?
          </label>
          <RadioGroup
            defaultValue={EventData.GstCompliance ? "Yes" : "default"}
            disabled={isDisabled}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Yes"
                id="yes"
                onClick={() => handleChange("Yes")}
              />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="default"
                id="no"
                onClick={() => handleChange("No")}
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
                  disabled={isDisabled}
                />
                <Button onClick={handleVerify} className="w-[20%]" disabled={isDisabled}>
                  Verify
                </Button>
              </div>
            </div>
            {isGSTVerified && (
              <>
                <div className="w-full m-2 flex flex-col">
                  <label htmlFor="gstRate">Select GST Rate</label>
                  <select
                    id="gstRate"
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    className="h-12 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
                    disabled={isDisabled}
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
                  <RadioGroup defaultValue="exclusive" disabled={isDisabled}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default GSTCompliance;
