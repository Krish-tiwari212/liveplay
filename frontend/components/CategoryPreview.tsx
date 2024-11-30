"use client";

import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineCurrencyRupee } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiDocumentDuplicate } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { FaBox, FaClipboardList, FaDollarSign, FaInfoCircle, FaPlus, FaTag, FaTicketAlt } from "react-icons/fa";
import Image from "next/image";
import AddCategory from "./AddCategory";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEventContext } from "@/context/EventDataContext";
import { HiCurrencyRupee } from "react-icons/hi2";
import { RiTicket2Fill } from "react-icons/ri";


interface Category {
  id?: number;
  category_name?: string;
  total_quantity?: string;
  max_ticket_quantity?: string;
  price?: string;
  ticket_description?: string;
  discount_code?: string;
  discount?: boolean;
  category_type?: string;
  discountType?: string;
  number_of_discounts?: string;
  from_date?: string;
  till_date?: string;
  discountValue?: string;
  percentage_input?: string;
  amount_input?: string;
}

interface CategoryPreviewProps {
  handleNext?: () => void;
}

const CategoryPreview = ({
  handleNext=()=>{},
}: CategoryPreviewProps) => {
  const { EventData, setEventData,editPage,EventEditData,setEventEditData,nextId,setNextId } = useEventContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); 
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleClick = () => {
    handleNext();
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const openDetailsDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsDetailsDialogOpen(true);
  };

  const addCategory = (newCategory: Omit<Category, 'id'>) => { 
    const categoryWithId = { ...newCategory, id: nextId };
    setCategories((prevCategories) => [...prevCategories, categoryWithId]);
    setNextId((prevId) => prevId + 1);
    setIsDialogOpen(false);
    if (editPage==="manageEvent"){
      setEventEditData((prevEventData: any) => ({
        ...prevEventData,
        categories: [...categories, categoryWithId],
      }));
    }else{
      setEventData((prevEventData: any) => ({
        ...prevEventData,
        categories: [...categories, categoryWithId],
      }));
    }
      
  };

  useEffect(()=>{
    console.log(nextId)
  },[])

  const handleEdit = (updatedCategory: Category) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === updatedCategory.id ? updatedCategory : cat
    );

    setCategories(updatedCategories);

    if (editPage === "manageEvent") {
      setEventEditData({ ...EventEditData, categories: updatedCategories });
    } else {
      setEventData({ ...EventData, categories: updatedCategories });
    }

    setIsEditDialogOpen(false); 
  };


  const deleteCategory = (categoryToDelete: Category) => { 
    setCategories((prevCategories) => 
      prevCategories.filter(category => category.id !== categoryToDelete.id) 
    );
    if (editPage==="manageEvent"){
      setEventEditData((prevEventData: any) => ({
        ...prevEventData,
        categories: categories.filter(
          (category) => category.id !== categoryToDelete.id
        ),
      }));
    }else{
      setEventData((prevEventData: any) => ({
        ...prevEventData,
        categories: categories.filter(
          (category) => category.id !== categoryToDelete.id
        ),
      }));
    }
    
  };

  const duplicateCategory = (category: Category) => {
    const duplicatedCategory = { ...category, id: nextId, category_name: `${category.category_name}` }; 
    setCategories((prevCategories) => [...prevCategories, duplicatedCategory]);
    setNextId((prevId) => prevId + 1);
    if (editPage==="manageEvent"){
      setEventEditData((prevEventData: any) => ({
        ...prevEventData,
        categories: [...categories, duplicatedCategory],
      }));
    } else{
      setEventData((prevEventData: any) => ({
        ...prevEventData,
        categories: [...categories, duplicatedCategory],
      }));
    }
    
  };

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category); 
    setIsEditDialogOpen(true);
  };

  useEffect(() => {
    if (editPage === "manageEvent" && EventEditData) {
      setCategories(EventEditData.categories || []);
    } else if (editPage === "createEvent" && EventData) {
      setCategories(EventData.categories || []);
    }
  }, [EventData, EventEditData]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
  };

  return (
    <div className="flex flex-col mx-2 sm:mx-6">
      <div className="flex flex-col sm:flex-row justify-between">
        <h1 className="text-3xl font-bold mb-4">Category Setup</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-3 py-2 px-4 rounded-lg">
              <span>Add Category</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] sm:max-w-2xl h-[90%]">
            <DialogTitle>Add category</DialogTitle>
            <AddCategory type="add" setCategoryData={addCategory} />
          </DialogContent>
        </Dialog>
      </div>

      <section className="mt-4 bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-wrap gap-5 lg:gap-10">
          {categories.length !== 0 ? (
            categories.map((category, index) => (
              <div
                key={index}
                className={`relative border shadow-lg rounded-lg p-4 bg-[#17202A] flex ${
                  editPage === "manageEvent"
                    ? "w-full sm:w-1/2 lg:w-[30%]"
                    : "w-full sm:w-1/2 lg:w-[46%] xl:w-[48%] 2xl:w-[30%]"
                } cursor-pointer`}
                onClick={() => openDetailsDialog(category)}
              >
                <div
                  className={`flex justify-between items-start  rounded-lg shadow-lg   ${
                    editPage === "manageEvent" ? "w-full" : "mr-4 w-[90%]"
                  } h-full`}
                >
                  <div className="flex flex-col w-full">
                    <h2 className="font-bold text-xl text-[#cddc29] flex items-center">
                      {category.category_name}
                    </h2>
                    <p className="text-white font-medium mb-2 overflow-hidden max-h-12 line-clamp-2">
                      {category.ticket_description}
                    </p>
                    {/* <div className="border-t border-gray-300 my-2"></div> */}
                    <p className="text-gray-600 flex items-center mt-5">
                      <RiTicket2Fill className="mr-1 text-[#cddc29]" />
                      <h1 className="text-white mr-2">Type:</h1>
                      <span className="text-[#cddc29]">
                        {category.category_type}
                      </span>
                    </p>
                    <p className="text-gray-700 flex items-center">
                      <HiCurrencyRupee className="mr-1 text-[#cddc29]" />
                      <h1 className="text-white mr-2">Price:</h1>
                      <span className="text-[#cddc29]">{category.price}</span>
                    </p>
                  </div>
                </div>
                {editPage !== "manageEvent" && (
                  <div className="flex flex-col gap-4 p">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={`bg-[#cddc29] text-[#17202a] rounded-md text-3xl shadow-xl`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditDialog(category);
                            }}
                          >
                            <CiEdit />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={`bg-[#cddc29] text-[#17202a] rounded-md text-3xl shadow-xl`}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCategory(category);
                            }}
                          >
                            <MdDelete />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={`bg-[#cddc29] text-[#17202a] rounded-md text-3xl shadow-xl`}
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateCategory(category);
                            }}
                          >
                            <HiDocumentDuplicate />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Duplicate</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div
              className="flex flex-col w-full justify-center items-center cursor-pointer"
              onClick={openDialog}
            >
              <Image
                src="/icons/addCategory.svg"
                alt="Add Category"
                width={200}
                height={200}
                className="grayscale"
              />
              <h1 className="text-lg sm:text-3xl text-[#17202A] font-bold">
                Add Category to Preview
              </h1>
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-center items-center">
        <Button
          variant="tertiary"
          size="none"
          className="mt-4 text-lg px-16 py-1"
          onClick={handleClick}
        >
          {editPage === "manageEvent" ? "Save and Next" : "Next"}
        </Button>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="w-[90%] sm:max-w-2xl h-[90%] "
        >
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            This is where you can edit your category details.
          </DialogDescription>
          <AddCategory
            type="edit"
            category={currentCategory}
            setCategoryData={handleEdit}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="bg-white shadow-lg rounded-lg p-6 w-[90%] sm:max-w-2xl h-[90%] overflow-y-auto">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Category Details
          </DialogTitle>
          <DialogDescription className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-gray-800">
                  {currentCategory?.category_name}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Description:
                </span>
                <span className="text-gray-800">
                  {currentCategory?.ticket_description}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">Type:</span>
                <span className="text-gray-800">
                  {currentCategory?.category_type}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">Price:</span>
                <span className="text-gray-800">{currentCategory?.price}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Total Quantity:
                </span>
                <span className="text-gray-800">
                  {currentCategory?.total_quantity}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Max Ticket Quantity:
                </span>
                <span className="text-gray-800">
                  {currentCategory?.max_ticket_quantity}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Discount Code:
                </span>
                <span className="text-gray-800">
                  {currentCategory?.discount_code}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Number of Discounts:
                </span>
                <span className="text-gray-800">
                  {currentCategory?.number_of_discounts}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Percentage Input:
                </span>
                <span className="text-gray-800">
                  {currentCategory?.percentage_input}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Amount Input:
                </span>
                <span className="text-gray-800">
                  {currentCategory?.amount_input}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Discount Value:
                </span>
                <span className="text-gray-800">
                  {currentCategory?.discountValue}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">From Date:</span>
                <span className="text-gray-800">
                  {formatDate(currentCategory?.from_date)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Till Date:</span>
                <span className="text-gray-800">
                  {formatDate(currentCategory?.till_date)}
                </span>
              </div>
            </div>
          </DialogDescription>
          <div className="flex justify-end mt-6">
            <Button onClick={() => setIsDetailsDialogOpen(false)} className="">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryPreview;
