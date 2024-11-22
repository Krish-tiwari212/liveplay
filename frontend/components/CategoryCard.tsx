"use client"

import React, { useState } from 'react';
import SearchDialog, { Participant } from './SearchDialog';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RxCross2 } from "react-icons/rx";
import { IoIosDoneAll } from 'react-icons/io';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';

interface Category {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  type: string;
  isTeamGame: boolean;
  details: string;
  sport?:string
}

interface CategoryCardProps {
  category: Category;
  participantsData: Participant[];
  isAdded: boolean;
  onAdd: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, participantsData, isAdded, onAdd }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
  const [teamCode, setTeamCode] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const { addItem, reduceItem, items } = useCartContext();

  const cartItem = items.find(item => item.id === category.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const generateTeamCode = (): string => {
    const segments = [
      Math.random().toString(36).substring(2, 5).toUpperCase(),
      Math.random().toString(36).substring(2, 6).toUpperCase(),
      Math.random().toString(36).substring(2, 5).toUpperCase(),
    ];
    return segments.join("-");
  };

  const handleGenerateTeamCode = () => {
    const code = generateTeamCode();
    setTeamCode(code);
  };

  const handleBuyTickets = () => {
    console.log('Purchased tickets:', category, ticketQuantity);
    onAdd();
    addItem(category);
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', category, selectedParticipants, teamCode);
    onAdd();
    addItem(category);
  };

  const handleAddQuantity = () => {
    addItem(category);
  };

  const handleReduceQuantity = () => {
    reduceItem(category.id);
  };

  return (
    <div className="border-2 border-[#141f29] p-4 rounded-lg shadow-lg w-full">
      <div
        className={`flex justify-between cursor-pointer relative ${
          category.isTeamGame ? "flex-col items-start" : "flex-row items-center"
        }`}
      >
        <div className="">
          <h2 className="text-xl font-semibold">{category.name}</h2>
          <p className="text-gray-600">{category.details}</p>
          <div className="mt-2">
            <div className="my-2 text-sm font-semibold">
              Category Type:{" "}
              <span className="font-normal ml-1">{category.type}</span>
            </div>
            {category.discountedPrice ? (
              <div className="flex gap-2 items-center text-2xl">
                <HiCurrencyRupee />
                <div>
                  <span className="text-[#141f29] font-semibold">
                    ${category.discountedPrice}
                  </span>
                  <span className="line-through text-gray-500 ml-2">
                    ${category.price}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 items-center text-2xl">
                <HiCurrencyRupee />
                <div>
                  <span className="text-[#141f29] font-semibold">
                    ${category.price}
                  </span>
                </div>
              </div>
            )}
          </div>
          {!category.isTeamGame && (
            <div className="mt-4 flex items-center absolute bottom-0 right-0">
              {currentQuantity > 0 ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="tertiary"
                    className="rounded text-lg font-bold flex items-center gap-2 border-2 border-[#141f29]"
                    onClick={handleReduceQuantity}
                  >
                    <FaMinus />
                  </Button>
                  <span className="text-lg font-semibold">{currentQuantity}</span>
                  <Button
                    variant="tertiary"
                    className="rounded text-lg font-bold flex items-center gap-2 border-2 border-[#141f29]"
                    onClick={handleAddQuantity}
                  >
                    <FaPlus />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="tertiary"
                  className="ml-4 rounded text-lg font-bold flex gap-2 border-2 border-[#141f29]"
                  onClick={handleAddToCart}
                >
                  <FaPlus />
                  Add
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {category.isTeamGame && (
        <div className="mt-4 w-full pt-4 border-t-2 border-gray-300">
          <div className="mb-4 rounded">
            <label className="block mb-2 text-nowrap">
              Search your partner or share the Pair Code
            </label>
            <div className="flex items-center relative bg-[#ccdb28] rounded">
              <div className="w-full p-2 relative bg-[#ccdb28] rounded space-y-1 text-md border-none">
                {selectedParticipants.length > 0 ? (
                  selectedParticipants.map((participant, index) => (
                    <div
                      key={index}
                      className="flex gap-1 items-center text-md"
                    >
                      <span>{participant.name}</span>
                      <span>({participant.contact})</span>
                    </div>
                  ))
                ) : (
                  <span className="">No participants selected.</span>
                )}
              </div>
              <Button
                onClick={() => setSearchOpen(true)}
                size="sm"
                className={`ml-2 ${
                  selectedParticipants.length > 0 ? "" : "h-full"
                } bg-[#141f29] text-white rounded absolute top-0 right-0`}
              >
                {selectedParticipants.length > 0 ? "Remove" : "Search"}
              </Button>
            </div>
          </div>

          <div className="my-4 flex items-center relative bg-[#ccdb28] rounded">
            <label className="block pl-2 text-nowrap">Team Code:</label>
            <Input
              type="text"
              readOnly
              value={teamCode}
              className="py-2 border-none rounded relative w-full bg-[#ccdb28] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 font-bold text-lg"
              placeholder=""
            />
            <Button
              size="sm"
              className="ml-2 h-full text-white absolute right-0"
              onClick={handleGenerateTeamCode}
            >
              Generate Team Code
            </Button>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="tertiary"
              className="rounded text-lg font-bold flex gap-2 border-2 border-[#141f29]"
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {!isAdded ? <FaPlus /> : <IoIosDoneAll />}
              {isAdded ? "Added" : "Add"}
            </Button>
          </div>
        </div>
      )}

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={participantsData}
        onSelect={(selected) => setSelectedParticipants(selected)}
      />
    </div>
  );
};

export default CategoryCard; 