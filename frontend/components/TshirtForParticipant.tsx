import React, { useState } from 'react';

const TshirtForParticipant = () => {
  const [orderTshirts, setOrderTshirts] = useState(false);
  const [forParticipants, setForParticipants] = useState(false);
  const [forOrganizingTeam, setForOrganizingTeam] = useState(false);
  const [quantity, setQuantity] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSubmitRequest = () => {
    if (quantity >= 10) {
      setRequestSubmitted(true);
      setShowPopup(false);
      // Here you can add the logic to submit the request
    } else {
      alert("Minimum order quantity is 10.");
    }
  };

  return (
    <div className="bg-white shadow-2xl p-5 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Order T-Shirts</h2>

      <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={forParticipants}
            onChange={() => setForParticipants(!forParticipants)}
            className="mr-2"
          />
          T-Shirts for Participants
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={forOrganizingTeam}
            onChange={() => setForOrganizingTeam(!forOrganizingTeam)}
            className="mr-2"
          />
          T-Shirts for Organizing Team
        </label>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">Enter Quantity</h3>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(10, Number(e.target.value)))}
          min="10"
          className="h-12 p-2 border rounded-md w-full"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowPopup(true)}
        className="mt-2 w-full bg-gray-800 text-white p-2 rounded-md"
      >
        Request T-Shirts
      </button>
      {requestSubmitted && (
        <div className="mt-4 text-green-600">
          <p>Our team will get in touch within 24 hours.</p>
        </div>
      )}
    </div>
  );
};

export default TshirtForParticipant;
