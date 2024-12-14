"use client";

import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiDiscountPercentFill } from "react-icons/ri";

const Page = () => {
  const { items } = useCartContext();
  const [withdrawalFee, setWithdrawalFee] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [savedAmount, setSavedAmount] = useState(0);

  useEffect(() => {
    // Fetch the data from an API or state management
    fetch("/api/payment-details")
      .then((response) => response.json())
      .then((data) => {
        setWithdrawalFee(data.withdrawalFee);
        setGst(data.gst);
        setTotalAmount(data.totalAmount);
        setSavedAmount(data.savedAmount);
      });
  }, []);

  return (
    <div className="flex justify-center items-center flex-col py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Image
            src="/images/wrong.svg"
            alt="Payment Failed"
            width={100}
            height={100}
            className="w-24 h-24 sm:w-32 sm:h-32"
          />
        </div>
        <div className="text-center my-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">Payment Failed</h1>
          <p className="text-sm sm:text-base">
            Oh no! Your payment has failed. Please try again.
          </p>
        </div>
        <div className="my-4 w-full">
          <div className="border-2 border-gray-800 p-2 md:p-5 rounded-lg">
            <div className="flex flex-col mb-1">
              {items.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center rounded-md mb-2"
                  >
                    <div className="flex flex-1 gap-1 items-center">
                      <p className="font-medium">{item.name}</p>
                      <p className="md:text-sm text-gray-600">
                        Quantity: x{item.quantity}
                      </p>
                    </div>
                    <div className="text-right flex-1 flex justify-end gap-2 items-end sm:items-center">
                      <p className="text-sm line-through text-gray-500">
                        ₹{item.originalPrice}
                      </p>
                      <p className="text-green-600 font-semibold">
                        ₹{item.discountedPrice}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="flex flex-col mb-2">
                <div className="flex justify-between items-center rounded-md mb-1">
                  <div className="flex flex-col">
                    <div className="flex">
                      <p className="font-medium">Withdrawal Fee (5%)</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      Withdraw anytime and get an instant refund ⚡
                    </span>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-700">₹{withdrawalFee}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center rounded-md mb-2">
                  <p className="font-medium">GST (18%)</p>
                  <p className="text-gray-700">₹{gst}</p>
                </div>
                <div className="flex justify-between items-center rounded-md">
                  <p className="font-medium">Total Amount:</p>
                  <p className="text-gray-700">₹{totalAmount}</p>
                </div>
              </div>
            )}
            {items.length > 0 && (
              <div className="rounded-md flex justify-center items-center">
                <p className="flex justify-center items-center gap-2 text-sm sm:text-base">
                  <RiDiscountPercentFill className="text-xl sm:text-2xl" />
                  Wohoo! You’ve saved{" "}
                  <span className="font-semibold">₹{savedAmount}</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <Button
            variant="tertiary"
            className="flex justify-center items-center py-6 border-2 border-gray-800 mb-2  w-full sm:w-[60%] mx-auto"
          >
            <p className="font-semibold text-lg sm:text-xl">Try Again</p>
          </Button>
          <Button className="flex justify-center items-center py-6 border-2 border-gray-800 mb-2 w-full sm:w-[60%] mx-auto">
            <p className="font-semibold text-lg sm:text-xl">
              Return To Homepage
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;