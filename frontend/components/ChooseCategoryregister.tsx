"use client";

import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { Participant } from './SearchDialog';
import { useCartContext } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface Category {
  id?: number;
  category_name?: string;
  total_quantity?: string;
  max_ticket_quantity?: string;
  price?: number;
  ticket_description?: string;
  discount_code?: string;
  discount?: boolean;
  category_type?: string;
  discountType?: string;
  number_of_discounts?: string;
  from_date?: string;
  till_date?: string;
  discount_value: number;
  percentage_input?: string;
  amount_input?: string;
  gender?: string;
  age_from?: string;
  age_to?: string;
  ageRangeOption?: string;
  max_teams_size?: number;
  sport?: string;
  teamName?: string;
  pairname?: string;
}

const participantsData: Participant[] = [
  { id: "1", name: "Mohit", contact: "900-000-5001" },
  { id: "2", name: "Mehul", contact: "900-000-4949" },
  { id: "3", name: "Team Alpha", contact: "alpha@team.com" },
];

interface ChooseCategoryRegisterprops {
  eventid: string | null;
  isCheckboxChecked: Boolean;
  setIsCheckboxChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChooseCategoryRegister = ({
  eventid,
  isCheckboxChecked,
  setIsCheckboxChecked
}:ChooseCategoryRegisterprops ) => {
  const { addItem, items } = useCartContext();
  const [registeredCategories, setRegisteredCategories] = useState<Category[]>(
    []
  );

  const handleAddToCart = (category: Category) => {
    if (!items.some((item) => item.id === category.id)) {
      addItem(category);
      console.log(`Category with ID ${category.id} added to cart.`);
    } else {
      console.log(`Category with ID ${category.id} is already in the cart.`);
    }
  };

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const response = await fetch(`/api/event/categories/${eventid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.categories);
        setRegisteredCategories(data.categories);
      } catch (error) {
        console.error("Error fetching registered categories:", error);
        toast({
          title:
            "Failed to fetch registered categories. Please check your network connection.",
          variant: "destructive",
        });
      }
    };
    fetchcategory();
  }, []);
  useEffect(() => {
    console.log(eventid);
  }, []);
  return (
    <div className="w-full lg:w-1/2 relative h-full space-y-4 px-5 sm:px-12">
      <h1 className="text-2xl text-gray-800 font-semibold">Choose Category</h1>
      {registeredCategories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          participantsData={participantsData}
          isAdded={items.some((item) => item.id === category.id)}
          onAdd={() => handleAddToCart(category)}
          isCheckboxChecked={isCheckboxChecked}
          setIsCheckboxChecked={setIsCheckboxChecked}
        />
      ))}
    </div>
  );
};

export default ChooseCategoryRegister;
