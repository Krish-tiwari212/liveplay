"use client"

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { useCartContext } from '@/context/CartContext';

const BillingSummary: React.FC = () => {
  const { items, clearCart, total } = useCartContext(); // Access cart items and total
  const [withdrawalFee, setWithdrawalFee] = useState<boolean>(true);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [gst, setGst] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);

  // Calculate totals whenever items or fees change
  useEffect(() => {
    const original = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discounted = items.reduce(
      (acc, item) => acc + (item.discountedPrice ?? item.price) * item.quantity,
      0
    );
    setSavings(original - discounted);

    const fee = withdrawalFee ? 0.05 * discounted : 0;
    setFeeAmount(fee);

    const gstAmount = 0.18 * (discounted + fee);
    setGst(gstAmount);

    setTotalPayable(discounted + fee + gstAmount);
  }, [items, withdrawalFee]);

  // Handler to remove withdrawal fee
  const handleRemoveFee = () => {
    setWithdrawalFee(false);
  };
  const handleAddFee = () => {
    setWithdrawalFee(true);
  };

  // Handler to clear cart after payment
  const handlePay = () => {
    clearCart();
    setWithdrawalFee(true);
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4 bg-white">
      <h1 className="text-2xl text-gray-800 font-semibold">Cart Summary</h1>
      <div className="border-2 border-gray-800 p-5 rounded-lg">
        <div className="flex flex-col gap-2 mb-2">
          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center rounded-md"
              >
                <div className="flex gap-1 items-center">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: x{item.quantity}
                  </p>
                </div>
                <div className="text-right flex gap-2 items-center">
                  <p className="text-sm line-through text-gray-500">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-green-600 font-semibold">
                    ₹
                    {(
                      (item.discountedPrice ?? item.price) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center rounded-md">
              <div className="flex flex-col">
                <div className="flex">
                  <p className="font-medium">Withdrawal Fee (5%)</p>
                  {withdrawalFee ? (
                    <button
                      onClick={handleRemoveFee}
                      className="ml-2 text-red-500 underline"
                    >
                      Remove
                    </button>
                  ) : (
                    <button onClick={handleAddFee} className="ml-2 underline ">
                      Add
                    </button>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {withdrawalFee
                    ? `Withdraw anytime and get an instant refund ⚡`
                    : `Withdrawals not allowed without fee 😭`}
                </span>
              </div>
              <div className="flex items-center">
                <p className="text-gray-700">₹{feeAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* GST */}
            <div className="flex justify-between items-center rounded-md mb-2">
              <p className="font-medium">GST (18%)</p>
              <p className="text-gray-700">₹{gst.toFixed(2)}</p>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <Button
            disabled={withdrawalFee}
            variant="tertiary"
            className="flex justify-center items-center py-8 w-full border-2 border-gray-800"
            onClick={handlePay}
          >
            <p className="font-semibold text-2xl">Pay</p>
            <p className="font-bold text-2xl">₹{totalPayable.toFixed(2)}</p>
          </Button>
        )}

        {items.length > 0 && (
          <div className="py-2 rounded-md flex justify-center items-center">
            <p className="flex justify-center items-center gap-2">
              <RiDiscountPercentFill className="text-2xl" />
              Wohooo! You’ve saved{" "}
              <span className="font-semibold">₹{savings.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingSummary;
