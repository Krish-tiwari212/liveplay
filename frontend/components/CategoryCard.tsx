"use client"

import React, { useEffect, useState } from 'react';
import SearchDialog, { Participant } from './SearchDialog';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { IoIosDoneAll } from 'react-icons/io';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';
import { RiCheckDoubleFill, RiCheckDoubleLine, RiDiscountPercentFill } from 'react-icons/ri';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


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

interface CategoryCardProps {
  category: Category;
  participantsData: Participant[];
  isAdded: boolean;
  onAdd: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, participantsData, isAdded, onAdd }) => {
  const {setIsCheckboxChecked}=useCartContext()
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [teamCode, setTeamCode] = useState('');
  const [teamName, setTeamName] = useState('');
  const [partner, setPartner] = useState('');
  const [disablecheckbox,setdisablecheckbox]=useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCheckboxCheck, setIsCheckboxCheck] = useState(false);

  const { addItem, items, addMultipleItem, totalQuantity, reduceItem } = useCartContext();

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
    if (!teamName.trim()) {
      setIsAlertOpen(true);
      return;
    }

    if (!teamCode) {
      const code = generateTeamCode();
      setTeamCode(code);
    }

    setIsDialogOpen(true);
  };

  const handleGeneratePartnerCode = () => {
    if (!partner.trim()) {
      setIsAlertOpen(true);
      return;
    }

    if (!teamCode) {
      const code = generateTeamCode();
      setTeamCode(code);
    }

    setIsDialogOpen(true);
  };

  const handleAddToCart = () => {
    if (
      category.category_type === "Doubles" &&
      !partner.trim()
    ) {
      setIsAlertOpen(true);
      return;
    }

    if (category.category_type === "Team" && !teamName.trim()) {
      setIsAlertOpen(true);
      return
    }

    
    setdisablecheckbox(true);
    const finalPrice =
      isCheckboxCheck && category.discount_value
        ? category.discount_value
        : category.price;

    let finalCategory: Category = {
      ...category,
      price: category.price,
      teamName: teamName,
      pairname: partner,
    };
    if (!isCheckboxCheck) {
      const { discount_code, ...rest } = finalCategory;
      finalCategory = rest;
    }
    onAdd();
    addItem(finalCategory);
    // category.sport === "marathon"
    //   ? addMultipleItem(finalCategory)
    //   : addItem(finalCategory);
  };

  const handleRemoveFromCart = () => {
    reduceItem(category.id);
    onAdd();
  };


  const handleAddQuantity = () => {
    addMultipleItem(category);
  };

  const handleSelectParticipant = (participant: Participant | null) => {
    if (participant) {
      setSelectedParticipant(participant);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Link copied to clipboard!",
          variant: "default",
        });
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        toast({
          title: "Failed to copy link. Please try again.",
          variant: "destructive",
        });
      });
  };
  return (
    <div className="border-2 border-[#141f29] p-4 rounded-lg shadow-lg w-full">
      <div
        className={`flex justify-between cursor-pointer relative ${
          category.category_type === "Team"
            ? "flex-col items-start"
            : "flex-row items-center"
        }`}
      >
        <div className="">
          <h2 className="text-xl font-semibold">{category.category_name}</h2>
          <p className="text-gray-600">{category.ticket_description}</p>
          <div className="mt-2">
            <div className="my-2 text-sm font-semibold">
              Category Type:
              <span className="font-normal ml-1">{category.category_type}</span>
            </div>
            {category.discount_code ? (
              <>
                <div className="flex gap-2 items-center text-2xl mb-2">
                  <RiDiscountPercentFill />
                  <div className="text-sm md:text-lg flex gap-2 justify-center items-center">
                    <span className="text-[#141f29] font-semibold">
                      Apply
                      <span className="text-blue-500 mx-1">
                        {category.discount_code}
                      </span>
                      Discount
                    </span>
                    <h1 className="text-gray-800">
                      {currentQuantity > 0 ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Checkbox
                                disabled={currentQuantity > 0}
                                id="terms2"
                                checked={isCheckboxCheck}
                                onCheckedChange={() =>{
                                  setIsCheckboxCheck(!isCheckboxCheck)
                                  setIsCheckboxChecked(!isCheckboxCheck)
                                }}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#141f29] text-[#ccdb28]">
                              <p>Remove Category From Cart to access this</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <Checkbox
                          disabled={currentQuantity > 0}
                          id="terms2"
                          checked={isCheckboxCheck}
                          onCheckedChange={() =>{
                            setIsCheckboxCheck(!isCheckboxCheck)
                            setIsCheckboxChecked(!isCheckboxCheck)}
                          }
                        />
                      )}
                    </h1>
                  </div>
                </div>
                <div className="flex gap-2 items-center text-2xl">
                  <div>
                    {isCheckboxCheck ? (
                      <>
                        <span className="text-[#141f29] font-semibold">
                          ₹{category.discount_value}
                        </span>
                        <span className="line-through text-gray-500 ml-2">
                          ₹{category.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#141f29] font-semibold">
                        ₹{category.price}
                      </span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex gap-2 items-center text-2xl">
                <div>
                  <span className="text-[#141f29] font-semibold">
                    ₹{category.price}
                  </span>
                </div>
              </div>
            )}
          </div>
          {category.sport === "marathon" ? (
            currentQuantity === 0 ? (
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
              <Button
                variant="tertiary"
                className="mt-4 flex justify-between px-0 rounded absolute bottom-0 right-0 border-2 border-[#141f29]"
              >
                <div
                  className="flex justify-center items-center px-2 border-r border-[#141f29]"
                  onClick={handleRemoveFromCart}
                >
                  <FaMinus />
                </div>
                <div className="flex justify-center items-center px-1">
                  <h1 className="text-lg font-bold text-center ">
                    {currentQuantity}
                  </h1>
                </div>
                <div
                  className="flex justify-center items-center px-2 border-l border-[#141f29]"
                  onClick={handleAddToCart}
                >
                  <FaPlus />
                </div>
              </Button>
            )
          ) : (
            <div className="mt-4 flex items-center absolute -bottom-2 right-0">
              {currentQuantity === 0 ? (
                <Button
                  variant="tertiary"
                  className="ml-4 rounded text-lg font-bold flex gap-2 border-2 border-[#141f29]"
                  onClick={handleAddToCart}
                >
                  <div className="flex justify-center items-center gap-2">
                    <FaPlus />
                    <h1>Add</h1>
                  </div>
                </Button>
              ) : (
                <Button
                  variant="tertiary"
                  className="ml-4 rounded text-lg font-bold flex gap-2 border-2 border-[#141f29]"
                  onClick={handleRemoveFromCart}
                >
                  <div className="flex justify-center items-center gap-2">
                    <h1>Remove</h1>
                  </div>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={`w-full pt-4 ${
          category.category_type !== "Singles" &&
          "border-t-2 border-gray-300 mt-4"
        }`}
      >
        {/* {category.type === "Doubles" && (
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
        )} */}

        {category.category_type === "Team" ? (
          <div className="flex flex-col">
            <h1 className="text-sm md:text-lg font-semibold">
              Enter Team Name
            </h1>
            <div className="my-4 flex items-center relative bg-[#ccdb28] rounded">
              <label className="block pl-2 text-nowrap">Team Name:</label>
              <Input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="py-2  border-none rounded relative w-full bg-[#ccdb28] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                placeholder="Enter Team Name"
              />
              {/* <Button
                size="sm"
                className="ml-2 hidden sm:block h-full text-white absolute right-0"
                onClick={handleGenerateTeamCode}
                title={
                  !teamName.trim() ? "Enter Team Name to generate code" : ""
                }
              >
                {teamCode ? "View Team Code" : "Generate Team Code"}
              </Button>
              <Button
                size="sm"
                className="ml-2 sm:hidden h-full text-white absolute right-0"
                onClick={handleGenerateTeamCode}
                title={
                  !teamName.trim() ? "Enter Team Name to generate code" : ""
                }
              >
                {teamCode ? "Code" : "Code"}
              </Button> */}
            </div>
          </div>
        ) : (
          category.category_type === "Doubles" && (
            <div className="flex flex-col">
              <h1 className="text-sm md:text-lg font-semibold">
                Enter Partner Name
              </h1>
              <div className="my-4 flex items-center relative bg-[#ccdb28] rounded">
                <label className="block pl-2 text-nowrap">Partner Name:</label>
                <Input
                  type="text"
                  value={partner}
                  onChange={(e) => setPartner(e.target.value)}
                  className="py-2 border-none rounded relative w-full bg-[#ccdb28] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                  placeholder="Enter Partner Name"
                />
                {/* <Button
                  size="sm"
                  className="ml-2 hidden sm:block h-full text-white absolute right-0"
                  onClick={handleGeneratePartnerCode}
                  title={
                    !partner.trim() ? "Enter Team Name to generate code" : ""
                  }
                >
                  {teamCode ? "View Pair Code" : "Generate Pair Code"}
                </Button>
                <Button
                  size="sm"
                  className="ml-2 sm:hidden h-full text-white absolute right-0"
                  onClick={handleGeneratePartnerCode}
                  title={
                    !partner.trim() ? "Enter Team Name to generate code" : ""
                  }
                >
                  {teamCode ? "Code" : "Code"}
                </Button> */}
              </div>
            </div>
          )
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md h-auto">
          <AlertDialogHeader>
            <DialogTitle>Share Code</DialogTitle>
            <DialogDescription>
              {category.category_type === "Team" ? (
                <div className="fle flex-col">
                  <h1>1. Share code with your Team Members.</h1>
                  <h1>
                    2. Members need to sign up / login and access player
                    dashboard.
                  </h1>
                  <h1>
                    3. Enter pair code within "Enter Pair / Team Code" field.
                  </h1>
                </div>
              ) : (
                <div className="fle flex-col">
                  <h1>1. Share code with your Partner.</h1>
                  <h1>
                    2. Partner needs to sign up / login and access player
                    dashboard.
                  </h1>
                  <h1>
                    3. Enter pair code within "Enter Pair / Team Code" field.
                  </h1>
                </div>
              )}
            </DialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Code
              </Label>
              <Input id="link" value={teamCode} readOnly />
            </div>
            <Button
              type="button"
              size="sm"
              className="px-3"
              onClick={() => handleCopy(teamCode)}
            >
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={participantsData}
        onSelect={handleSelectParticipant}
      />
      {isAlertOpen && (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent className="w-[90%] rounded">
            <AlertDialogHeader>
              <AlertDialogTitle>Incomplete Information</AlertDialogTitle>
              <AlertDialogDescription>
                {category.category_type === "Team"
                  ? "Enter team name & generate team code before adding category to cart"
                  : "Enter partner name & generate partner code before adding category to cart"}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsAlertOpen(false)}>
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default CategoryCard; 