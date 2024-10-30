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
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleClick = () => {
    handleNext();
  };

  const openDialog = () => {
    setIsDialogOpen(true);
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
    const duplicatedCategory = { ...category, id: nextId, category_name: `${category.category_name} (Copy)` }; 
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

  return (
    <div className="flex flex-col mx-6 mt-20">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Category Setup</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-3 py-2 px-4 rounded-lg">
              <span>Add Category</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                className={`relative border shadow-lg rounded-lg p-4 mb-4 w-[46%] xl:w-[48%] cursor-pointer bg-[#17202A]`}
              >
                <div className="flex justify-between items-start bg-gray-100 p-4 rounded-lg shadow-sm w-full">
                  <div className="flex justify-between items-start bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-lg p-4 mr-4 w-[80%]">
                    <div className="flex flex-col w-full">
                      <h2 className="font-bold text-xl text-[#17202A] flex items-center">
                        {category.category_name}
                      </h2>
                      <p className="text-gray-600 font-medium mb-2 overflow-hidden max-h-12 line-clamp-2">
                        {category.ticket_description}
                      </p>
                      <div className="border-t border-gray-300 my-2"></div>
                      <p className="text-gray-700 flex items-center">
                        <MdOutlineCurrencyRupee className="mr-2 text-gray-800" />
                        Price:
                        <span className="text-[#17202A]">{category.price}</span>
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <FaTicketAlt className="mr-2 text-gray-800" />
                        Type:
                        <span className="text-[#17202A]">
                          {category.category_type}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={`bg-gray-300 hover:bg-gray-200 rounded-lg text-5xl shadow-xl`}
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
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={`bg-gray-300 hover:bg-gray-200 rounded-lg text-5xl shadow-xl`}
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
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={`bg-gray-300 hover:bg-gray-200 rounded-lg text-5xl shadow-xl`}
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
                </div>
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
              />
              <h1 className="text-3xl text-[#17202A] font-bold">
                Add Category to Preview
              </h1>
            </div>
          )}
        </div>
      </section>

      <Button className="mt-4" onClick={handleClick}>
        Next
      </Button>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent aria-describedby={undefined}>
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
    </div>
  );
};

export default CategoryPreview;
