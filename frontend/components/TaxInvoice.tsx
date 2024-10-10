import React, { useState } from 'react';

const TaxInvoice = () => {
  const [showFullFormat, setShowFullFormat] = useState(false);

  return (
    <div className="bg-white shadow-2xl p-5 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Tax Invoice Preview</h2>
      <div className="border p-4 rounded-md mb-4">
        <p>
          Invoice Number: 12345<br />
          Date: 2023-10-01<br />
          Organizer: Sample Organizer<br />
          Amount: $100.00<br />
          GST: $18.00 (18%)<br />
          Total: $118.00
        </p>
      </div>

      <button
        onClick={(e) => {setShowFullFormat(!showFullFormat),e.preventDefault() }}
        className="w-full bg-gray-800 text-white p-2 rounded-md"
      >
        {showFullFormat ? 'Hide Full Format' : 'View Full Format'}
      </button>

      {showFullFormat && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="font-bold">Full Tax Invoice Format</h3>
          <p>
            Invoice Number: 12345<br />
            Date: 2023-10-01<br />
            Organizer: Sample Organizer<br />
            Address: 123 Event St, City, Country<br />
            Description: Entry Fee for Event<br />
            Amount: $100.00<br />
            GST: $18.00 (18%)<br />
            Total: $118.00<br />
            Payment Method: Credit Card<br />
            Transaction ID: ABC123XYZ
          </p>
        </div>
      )}
    </div>
  );
};

export default TaxInvoice;
