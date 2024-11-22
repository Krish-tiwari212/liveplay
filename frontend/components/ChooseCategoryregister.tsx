"use client";

import React from 'react';
import CategoryCard from './CategoryCard';
import { Participant } from './SearchDialog';
import { useCartContext } from '@/context/CartContext';

interface Category {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  type: string;
  details: string;
  sport?: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Mens Singles (Open)",
    price: 699,
    type: "Singles",
    details: "Includes participation, e-certificate, refreshments",
  },
  {
    id: "2",
    name: "Mens Doubles (30+)",
    price: 599,
    discountedPrice: 559,
    type: "Doubles",
    details: "Includes participation, e-certificate, refreshments",
  },
  {
    id: "3",
    name: "Couple 100m Race - Team Event",
    price: 699,
    type: "Team",
    details: "Each team of 2 married couples only. Certificate included.",
  },
  {
    id: "4",
    name: "Womens Marathon 10KM (30+)",
    price: 1099,
    discountedPrice: 999,
    type: "Singles",
    details: "Includes participation, e-certificate, refreshments",
    sport: "marathon",
  },
];

const participantsData: Participant[] = [
  { id: "1", name: "Mohit", contact: "900-000-5001" },
  { id: "2", name: "Mehul", contact: "900-000-4949" },
  { id: "3", name: "Team Alpha", contact: "alpha@team.com" },
];

const ChooseCategoryRegister: React.FC = () => {
  const { addItem, items } = useCartContext();

  const handleAddToCart = (category: Category) => {
    addItem(category);
    console.log(`Category with ID ${category.id} added to cart.`);
  };

  return (
    <div className="w-full lg:w-1/2 relative h-full space-y-4">
      <h1 className='text-2xl text-gray-800 font-semibold'>Choose Category</h1>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          participantsData={participantsData}
          isAdded={items.some(item => item.id === category.id)}
          onAdd={() => handleAddToCart(category)}
        />
      ))}
    </div>
  );
};

export default ChooseCategoryRegister;
