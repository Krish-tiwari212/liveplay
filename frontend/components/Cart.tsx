"use client"

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { useCartContext } from '@/context/CartContext';
import { loadScript } from '@/utils/razorpay';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client';

interface BillingSummaryProps {
  gstrate:string
  gstcompliance:boolean
  gstIncExc:string
}

const BillingSummary = ({
  gstrate="0",
  gstcompliance=false,
  gstIncExc="",
}: BillingSummaryProps) => {
  const { items, clearCart, total } = useCartContext();
  const [withdrawalFee, setWithdrawalFee] = useState<boolean>(true);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [gst, setGst] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      setSession(currentSession);
    };

    checkSession();
  }, []);

  const handleLogin = () => {
    // Save current cart state to localStorage before redirecting
    localStorage.setItem("pendingCart", JSON.stringify(items));
    router.push("/auth/login?redirect=/cart");
  };

  const handlePayment = async () => {
    try {
      if (!session) {
        toast({
          title: "Please Login",
          description: "You need to be logged in to make a payment",
          variant: "destructive",
        });
        router.push("/login");
        return;
      }

      // Convert amount to paise and ensure it's an integer
      const amountInPaise = Math.round(totalPayable);

      // Create order
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise, // Send amount in paise
          categories: items,
          eventId: items[0]?.event_id,
        }),
      });

      const data = await response.json();
      if (!data.orderId) throw new Error("Failed to create order");

      const options = {
        key: data.key,
        amount: amountInPaise,
        currency: data.currency,
        name: "Liveplay Sports",
        description: "Event Registration Payment",
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            console.log("Payment response:", response);
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              clearCart();
              router.push("/paymentsuccesfull");
            } else {
              router.push("/paymentfailed");
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            router.push("/paymentfailed");
          }
        },
        prefill: {
          name:
            session?.user?.user_metadata?.full_name ||
            session?.user?.email?.split("@")[0],
          email: session?.user?.email,
          contact: session?.user?.phone || "",
        },
        theme: {
          color: "#141F29",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize payment",
      });
    }
  };

  useEffect(() => {
    const original = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discounted = items.reduce(
      (acc, item) => acc + (item.discount_value ?? item.price) * item.quantity,
      0
    );
    setSavings(original - discounted);

    const fee = withdrawalFee ? 0.05 * discounted : 0;
    setFeeAmount(fee);

    const gstAmount = (Number(gstrate)/100) * discounted;
    setGst(gstAmount);
    setTotalPayable(
      gstIncExc === "inclusive"
        ? discounted + fee + gstAmount
        : discounted + fee
    );
  }, [items, withdrawalFee]);

  const handleRemoveFee = () => {
    setWithdrawalFee(false);
  };
  const handleAddFee = () => {
    setWithdrawalFee(true);
  };
  const handlePay = () => {
    clearCart();
    setWithdrawalFee(true);
  };

  return (
    <div
      id="cart_section"
      className="w-full lg:w-1/2 flex flex-col gap-4 bg-white px-5 sm:px-12"
    >
      <h1 className="text-2xl text-gray-800 font-semibold">Cart Summary</h1>
      <div className="border-2 border-gray-800 p-5 rounded-lg">
        <div className="flex flex-col gap-2 mb-2">
          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between sm:items-center rounded-md gap-2 sm:gap-0"
              >
                <div className="flex gap-1 sm:items-center">
                  <p className="font-medium">
                    {item.category_name}
                    <span className="text-sm text-gray-600 ml-1">
                      x{item.quantity}
                    </span>
                  </p>
                </div>
                <div className="text-right flex flex-col sm:flex-row sm:gap-2 items-center">
                  {item.discount_value ? (
                    <>
                      <p className="text-sm line-through text-gray-500">
                        ₹{( item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-green-600 font-semibold">
                        ₹
                        {(
                          (item.discount_value ?? item.price) * item.quantity
                        ).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-green-600 font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center rounded-md mb-2">
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
            {gstcompliance && (
              <div className="flex justify-between items-center rounded-md mb-2">
                <p className="font-medium">GST ({gstrate}%)</p>
                <p className="text-gray-700">₹{gst.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}

        {items.length > 0 && (
          <>
            {!session ? (
              <Button
                variant="tertiary"
                className="flex justify-center items-center py-8 w-full border-2 border-gray-800"
                onClick={handleLogin}
              >
                Login to Continue
              </Button>
            ) : (
              <Button
                variant="tertiary"
                className="flex justify-center items-center py-8 w-full border-2 border-gray-800"
                onClick={handlePayment}
              >
                <p className="font-semibold text-2xl">Pay</p>
                <p className="font-bold text-2xl">₹{totalPayable.toFixed(2)}</p>
              </Button>
            )}
          </>
        )}

        {items.length > 0 && (
          <div className="py-2 rounded-md flex justify-center items-center">
            <p className="flex justify-center items-center gap-2">
              <RiDiscountPercentFill className="text-2xl" />
              Wohooo! You’ve saved
              <span className="font-semibold">₹{savings.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingSummary;
