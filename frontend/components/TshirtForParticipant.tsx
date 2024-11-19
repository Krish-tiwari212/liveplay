import { useEventContext } from '@/context/EventDataContext';
import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface TshirtForParticipantProps{
  setFeatureData: React.Dispatch<React.SetStateAction<any>>;
}

const TshirtForParticipant = ({
  setFeatureData,
}: TshirtForParticipantProps) => {
  const [quantity, setQuantity] = useState(10);
  const [oquantity, setoQuantity] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { EventData, setEventData ,EventEditData,setEventEditData,editPage } = useEventContext();
  const [showTShirt,setShowTshirt]=useState(false)

  const handleSubmitRequest = () => {
    if (quantity >= 10) {
      setRequestSubmitted(true);
      setShowPopup(false);
    } else {
      alert("Minimum order quantity is 10.");
    }
  };

   const handleTshirts=()=>{
    setShowTshirt((prev) => !prev);
    if (editPage === "manageEvent") {
      setEventEditData((prevData: any) => ({
        ...prevData,
        want_Tshirts: !showTShirt,
      }));
    } else {
      setEventData((prevData: any) => ({
        ...prevData,
        want_Tshirts: !showTShirt,
      }));
    }
   }

   useEffect(() => {
     if (editPage === "manageEvent" && EventEditData) {
       setShowTshirt(EventEditData.want_Tshirts || false);
     } else if (editPage === "createEvent" && EventData) {
       setShowTshirt(EventData.want_Tshirts || false);
     }
   }, [EventData, EventEditData]);

  return (
    <div className="bg-white shadow-2xl p-6 rounded-lg">
      <div className="flex items-center m-2 space-x-2 relative">
        <Label htmlFor="airplane-mode" className="text-sm md:text-lg">
          Order T-Shirts
        </Label>
        <Switch
          id="enable-countdown"
          onCheckedChange={handleTshirts}
          checked={showTShirt}
        />
      </div>
      {showTShirt && (
        <>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Enter Quantity Of T Shirts
            </h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(10, Number(e.target.value)))
              }
              min="10"
              className="h-12 p-2 border rounded-md w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmitRequest}
            className="mt-2 w-full bg-[#17202A] text-white p-2 rounded-md"
          >
            Request T-Shirts
          </button>
          {requestSubmitted && (
            <div className="mt-4 ml-4 text-green-600">
              <p>Our team will get in touch within 24 hours.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TshirtForParticipant;
