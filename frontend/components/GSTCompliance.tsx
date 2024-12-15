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
    const isGstRegistered = value === "Yes";
    setIsRegistered(isGstRegistered);

    if (!isGstRegistered) {
      
      setGstNumber("");
      setGstRate("");
      setIsGSTVerified(false);
      setIsInclusive(false);

      if (editPage === "manageEvent") {
        setEventEditData((prevData: any) => ({
          ...prevData,
          Gst_Compliance: false,
          Gst_Number: "",
          Gst_verified: false,
          Gst_Rate: "",
          Gst_Incexc: "",
        }));
      } else {
        setEventData((prevData: any) => ({
          ...prevData,
          Gst_Compliance: false,
          Gst_Number: "",
          Gst_verified: false,
          Gst_Rate: "",
          Gst_Incexc: "",
        }));
      }
    } else {
      if (editPage === "manageEvent") {
        setEventEditData((prevData: any) => ({
          ...prevData,
          Gst_Compliance: true,
        }));
      } else {
        setEventData((prevData: any) => ({
          ...prevData,
          Gst_Compliance: true,
        }));
      }
    }
  };


  const handleChangeincexc=(value:string)=>{
    if (editPage === "manageEvent") {
      setEventEditData((prevData: any) => ({
        ...prevData,
        Gst_Incexc: value || "exclusive",
      }));
    } else {
      setEventData((prevData: any) => ({
        ...prevData,
        Gst_Incexc: value || "exclusive",
      }));
    }
  }

  const handlegstrate=(value:string)=>{
    setGstRate(value)
    if (editPage === "manageEvent") {
      setEventEditData((prevData: any) => ({
        ...prevData,
        Gst_Rate: value,
      }));
    } else {
      setEventData((prevData: any) => ({
        ...prevData,
        Gst_Rate: value,
      }));
    }
  }

  const handleVerify = () => {
    const gstFormat = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[A-Z0-9]{1}$/; 
    if (gstFormat.test(gstNumber)) {
      if (editPage === "manageEvent") {
        setEventEditData((prevData: any) => ({
          ...prevData,
          Gst_Number: gstNumber,
          Gst_verified:true,
        }));
      } else {
        setEventData((prevData: any) => ({
          ...prevData,
          Gst_Number: gstNumber,
          Gst_verified: true,
        }));
      }
    } else {
      toast({ title: "Error", description: "Wrong GST number format", variant: "destructive" });
    }
    setIsGSTVerified(true);
  };

  useEffect(() => {
    if (editPage === "manageEvent" && EventEditData) {
      setIsRegistered(EventEditData.Gst_Compliance);
      setIsGSTVerified(EventEditData.Gst_verified);
      setGstRate(EventEditData.Gst_Rate);
      setIsInclusive(EventEditData.Gst_Incexc);
      setGstNumber(EventEditData.Gst_Number);
    } else if (editPage === "createEvent" && EventData) {
      setIsRegistered(EventData.Gst_Compliance );
      setIsGSTVerified(EventData.Gst_verified);
      setGstRate(EventData.Gst_Rate);
      setIsInclusive(EventData.Gst_Incexc);
      setGstNumber(EventData.Gst_Number);
    }
  }, [EventData, EventEditData]);

  const isDisabled = editPage === "manageEvent";

  useEffect(()=>{
    console.log(EventData.Gst_Compliance);
  },[])
  return (
    <div className="bg-white shadow-2xl p-5 rounded-lg w-full h-full">
      <div
        className={`flex flex-wrap w-full ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div className="w-full m-2 flex flex-col">
          <Label htmlFor="gstRegistered" className="text-sm md:text-lg mb-2">
            Are you a registered GST person?
          </Label>
          <RadioGroup
            defaultValue={isRegistered ? "default" : "no"}
            disabled={isDisabled}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="default"
                id="yes"
                onClick={() => handleChange("Yes")}
              />
              <Label htmlFor="inclusive">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="no"
                onClick={() => handleChange("No")}
              />
              <Label htmlFor="exclusive">No</Label>
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
                <Button
                  onClick={handleVerify}
                  className="w-[20%]"
                  disabled={isDisabled}
                >
                  Verify
                </Button>
              </div>
            </div>
          </>
        )}
        {isGSTVerified ? (
          <>
            <div className="w-full m-2 flex flex-col">
              <label htmlFor="gstRate">Select GST Rate</label>
              <select
                id="gstRate"
                value={gstRate}
                onChange={(e) => handlegstrate(e.target.value)}
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
              <RadioGroup
                defaultValue={isInclusive ? "exclusive" : "default"}
                disabled={isDisabled}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="default"
                    id="inclusive"
                    onClick={() => handleChangeincexc("inclusive")}
                  />
                  <Label htmlFor="inclusive">Inclusive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="exclusive"
                    id="exclusive"
                    onClick={() => handleChangeincexc("exclusive")}
                  />
                  <Label htmlFor="exclusive">Exclusive</Label>
                </div>
              </RadioGroup>
            </div>
            {/* <div className="w-full ">
                  <div className="mt-4 text-red-600">
                    <p>Once live, GST settings cannot be changed.</p>
                  </div>
                  <TaxInvoice />
                </div> */}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default GSTCompliance;
