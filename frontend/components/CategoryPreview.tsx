"use client";

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiDocumentDuplicate } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import AddCategory from "./AddCategory";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditCategory from "./EditCategory";


interface Category {
  id:number
  categoryName: string;
  totalQuantity: string;
  maxTicketQuantity: string;
  price: string;
  ticketDescription: string;
  discountCode: string;
  categoryType: string;
}

interface CategoryPreviewProps {
  handleNext: () => void;
  EventData: any;
  setEventData: React.Dispatch<React.SetStateAction<any>>;
}

const CategoryPreview = ({
  handleNext,
  EventData,
  setEventData,
}: CategoryPreviewProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); 
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [nextId, setNextId] = useState(1); // State to keep track of the next ID

  const handleClick = () => {
    if (selectedCategories.length === 0) {
      toast({
        title: "Please select at least one category.",
      });
    } else {
      setEventData((prevEventData: any) => ({
        ...prevEventData,
        categories,
      }));
      handleNext();
    }
  };

  useEffect(() => {
    console.log(EventData);
  }, [EventData]);


  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const addCategory = (newCategory: Omit<Category, 'id'>) => { 
    const categoryWithId = { ...newCategory, id: nextId };
    setCategories((prevCategories) => [...prevCategories, categoryWithId]);
    setNextId((prevId) => prevId + 1); 
    setIsDialogOpen(false);
  };

  const editCategory = (updatedCategory: Category) => {
    setIsEditDialogOpen(false);
  };


  const deleteCategory = (categoryName: string) => {
    setCategories((prevCategories) => 
      prevCategories.filter(category => category.categoryName !== categoryName)
    );
    setSelectedCategories((prevSelected) => 
      prevSelected.filter(name => name !== categoryName)
    );
  };

  const duplicateCategory = (category: Category) => {
    const duplicatedCategory = { ...category, id: nextId, categoryName: `${category.categoryName} (Copy)` }; 
    setCategories((prevCategories) => [...prevCategories, duplicatedCategory]);
    setNextId((prevId) => prevId + 1); 
  };

  // useEffect(() => {
  //   console.log(categories);
  // }, [duplicateCategory, deleteCategory, editCategory, addCategory]);

  return (
    <div className="flex flex-col m-3">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 bg-gray-800 py-2 px-4 text-white rounded-lg">
              <span>Add Category</span>
              <FaPlus size={15} />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add category</DialogTitle>
            <AddCategory setCategoryData={addCategory} />
          </DialogContent>
        </Dialog>
      </div>

      <section className="mt-4 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Category Preview</h2>
        {categories.length !== 0 ? (
          categories.map((category, index) => (
            <div
              key={index}
              className={`relative border shadow-lg rounded-lg p-4 mb-4 cursor-pointer ${
                selectedCategories.includes(category.categoryName)
                  ? "bg-gray-800 text-white"
                  : "bg-white"
              }`}
              onClick={() => {
                setSelectedCategories((prevSelected) => {
                  if (prevSelected.includes(category.categoryName)) {
                    return prevSelected.filter(
                      (categoryName) => categoryName !== category.categoryName
                    );
                  } else {
                    return [...prevSelected, category.categoryName];
                  }
                });
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{category.categoryName}</p>
                  <p>Price: {category.price}</p>
                </div>
                <div className="flex space-x-2">
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <CiEdit
                              className={`hover:text-gray-500 ${
                                selectedCategories.includes(
                                  category.categoryName
                                )
                                  ? "text-white "
                                  : "text-gray-800"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsEditDialogOpen(true);
                                setCurrentCategory(category);
                                setSelectedCategories([category.categoryName]);
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Edit Category</DialogTitle>
                      <EditCategory
                        setCategoryData={editCategory}
                        selectedCategory={currentCategory}
                      />
                    </DialogContent>
                  </Dialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MdDelete
                          className={`hover:text-gray-500 ${
                            selectedCategories.includes(category.categoryName)
                              ? "text-white "
                              : "text-gray-800"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCategory(category.categoryName);
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HiDocumentDuplicate
                          className={`hover:text-gray-500 ${
                            selectedCategories.includes(category.categoryName)
                              ? "text-white "
                              : "text-gray-800"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateCategory(category);
                          }}
                        />
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
            <h1 className="text-3xl text-gray-800 font-bold">
              Add Category to Preview
            </h1>
          </div>
        )}
      </section>

      <Button className="mt-4" onClick={handleClick}>
        Next
      </Button>
    </div>
  );
};

export default CategoryPreview;
