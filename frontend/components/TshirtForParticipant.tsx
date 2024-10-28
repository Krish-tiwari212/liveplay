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
  const { EventData, setEventData,setEventEditData,editPage } = useEventContext();
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
        showTshirts: !showTShirt,
      }));
    } else {
      setEventData((prevData: any) => ({
        ...prevData,
        showTshirts: !showTShirt,
      }));
    }
   }

  return (
    <div className="bg-white shadow-2xl p-6 rounded-lg">
      <div className="flex items-center m-2 space-x-2 relative">
        <Switch
          id="enable-countdown"
          onCheckedChange={handleTshirts}
          checked={showTShirt}
        />
        <Label htmlFor="airplane-mode">Order T-Shirts</Label>
      </div>
      {showTShirt && (
        <>
          <h2 className="text-lg font-bold mb-4">Order T-Shirts</h2>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Enter Quantity Of Organizer T Shirts
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
          {requestSubmitted ? (
            <div className="mt-4 ml-4 text-green-600">
              <p>Our team will get in touch within 24 hours.</p>
            </div>
          ) : (
            <div className="mt-4 ml-4 text-red-600">
              <p>Minimum 10 T-shirts for order</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TshirtForParticipant;
