"use client"

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RiDiscountPercentFill } from "react-icons/ri";
import { useCartContext } from "@/context/CartContext";

const StickyCart = () => {
    
  const { items } = useCartContext();
  const [savings, setSavings] = useState<number>(0);
    useEffect(() => {
        const original = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
        );
        const discounted = items.reduce(
        (acc, item) =>
            acc + (item.discountedPrice ?? item.price) * item.quantity,
        0
        );
        setSavings(original - discounted);
        console.log(items)
        console.log(original)
        console.log(discounted)
    }, [items]);
  const scrollToCart = () => {
    const cartSection = document.getElementById("cart_section");
    if (cartSection) {
      cartSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky bottom-0 left-0 w-full bg-white text-center p-6 z-50 block lg:hidden border-2 border-[#141f29] rounded-t-lg ">
      <Button
        variant="tertiary"
        onClick={scrollToCart}
        size="xs"
        className="w-full px-4 py-8 text-2xl font-medium border-2 border-[#141f29]"
      >
        View Cart
      </Button>
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
  );
};

export default StickyCart;
