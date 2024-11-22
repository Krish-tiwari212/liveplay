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
  details: string;
  sport?: string;
  quantity?: number;
}

interface CategoryCardProps {
  category: Category;
  participantsData: Participant[];
  isAdded: boolean;
  onAdd: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, participantsData, isAdded, onAdd }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [teamCode, setTeamCode] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const { addItem, items } = useCartContext();

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
    if (category.type==="t" && !selectedParticipant) {
      alert("Please select a participant before adding to cart.");
      return;
    }
    console.log('Added to cart:', category, selectedParticipant, teamCode);
    onAdd();
    addItem(category);
  };

  const handleAddQuantity = () => {
    addItem(category);
  };


  const handleSelectParticipant = (participant: Participant | null) => {
    if (participant) {
      setSelectedParticipant(participant);
    }
  };

  return (
    <div className="border-2 border-[#141f29] p-4 rounded-lg shadow-lg w-full">
      <div
        className={`flex justify-between cursor-pointer relative ${
          category.type === "Team"
            ? "flex-col items-start"
            : "flex-row items-center"
        }`}
      >
        <div className="">
          <h2 className="text-xl font-semibold">{category.name}</h2>
          <p className="text-gray-600">{category.details}</p>
          <div className="mt-2">
            <div className="my-2 text-sm font-semibold">
              Category Type:
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
          {category.sport === "marathon" ? (
             <div className="mt-4 flex items-center absolute bottom-0 right-0">
              <Button
                variant="tertiary"
                className="ml-4 rounded text-lg font-bold flex gap-2 border-2 border-[#141f29]"
                onClick={handleAddToCart}
              >
                <FaPlus />
                Add
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex items-center absolute bottom-0 right-0">
              <Button
                variant="tertiary"
                className="ml-4 rounded text-lg font-bold flex gap-2 border-2 border-[#141f29]"
                onClick={handleAddToCart}
              >
                <FaPlus />
                Add
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        className={` w-full pt-4  ${
          category.type !== "Singles" && "border-t-2 border-gray-300 mt-4"
        }`}
      >
        {category.type === "Doubles" && (
          <div className="mb-4 rounded">
            <label className="block mb-2 text-nowrap">
              Search your partner or share the Pair Code
            </label>
            <div className="flex items-center relative bg-[#ccdb28] rounded">
              <div className="w-full p-2 relative bg-[#ccdb28] rounded space-y-1 text-md border-none">
                {selectedParticipant ? (
                  <div className="flex gap-1 items-center text-md">
                    <span>{selectedParticipant.name}</span>
                    <span>({selectedParticipant.contact})</span>
                  </div>
                ) : (
                  <span className="">No participant selected.</span>
                )}
              </div>
              <Button
                onClick={() => setSearchOpen(true)}
                size="sm"
                className={`ml-2 h-full bg-[#141f29] text-white rounded absolute right-0`}
              >
                {selectedParticipant ? "Change" : "Search"}
              </Button>
            </div>
          </div>
        )}

        {category.type === "Team" ? (
          <>
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
          </>
        ) : (
          category.type === "Doubles" && (
            <div className="my-4 flex items-center relative bg-[#ccdb28] rounded">
              <label className="block pl-2 text-nowrap">Pair Code:</label>
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
                Generate Pair Code
              </Button>
            </div>
          )
        )}

        {/* <div className="mt-4 flex justify-end">
            <Button
              variant="tertiary"
              className="rounded text-lg font-bold flex gap-2 border-2 border-[#141f29]"
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {!isAdded ? <FaPlus /> : <IoIosDoneAll />}
              {isAdded ? "Added" : "Add"}
            </Button>
          </div> */}
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={participantsData}
        onSelect={handleSelectParticipant}
      />
    </div>
  );
};

export default CategoryCard; 