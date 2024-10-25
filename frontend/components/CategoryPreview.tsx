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
import { DialogDescription } from "@radix-ui/react-dialog";


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
  handleNext?: () => void;
  EventData: any;
  setEventData: React.Dispatch<React.SetStateAction<any>>;
}

const CategoryPreview = ({
  handleNext=()=>{},
  EventData,
  setEventData,
}: CategoryPreviewProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]); // Change to store entire category objects
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); 
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [nextId, setNextId] = useState(1); 

  const handleClick = () => {
    if (selectedCategories.length === 0) {
      toast({
        title: "Please select at least one category.",
      });
    } else {
      localStorage.setItem('categories', JSON.stringify(categories));
      
      setEventData((prevEventData: any) => ({
        ...prevEventData,
        selectedCategories, 
      }));
      handleNext();
    }
  };

  useEffect(() => {
    // Fetch categories from local storage on component mount
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
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
    console.log(updatedCategory)
    setCategories((prevCategories) => 
      prevCategories.map((category) => 
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setIsEditDialogOpen(false);
  };


  const deleteCategory = (category: Category) => {
    setCategories((prevCategories) => 
      prevCategories.filter(category => category !== category)
    );
    setSelectedCategories((prevSelected) =>
      prevSelected.filter((name) => name !== category)
    );
  };

  const duplicateCategory = (category: Category) => {
    const duplicatedCategory = { ...category, id: nextId, categoryName: `${category.categoryName} (Copy)` }; 
    setCategories((prevCategories) => [...prevCategories, duplicatedCategory]);
    setNextId((prevId) => prevId + 1); 
  };

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category); 
    setIsEditDialogOpen(true);
  };

  // useEffect(() => {
  //   console.log(currentCategory);
  // }, [openEditDialog]);
  return (
    <div className="flex flex-col m-3">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-3 py-2 px-4 rounded-lg">
              <span>Add Category</span>
              <FaPlus size={15} />
            </Button>
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
                selectedCategories.includes(category)
                  ? "bg-[#17202A] text-white"
                  : "bg-white"
              }`}
              onClick={() => {
                setSelectedCategories((prevSelected) => {
                  const isSelected = prevSelected.some(
                    (cat) => cat.categoryName === category.categoryName
                  );
                  if (isSelected) {
                    return prevSelected.filter(
                      (cat) => cat.categoryName !== category.categoryName
                    );
                  } else {
                    return [...prevSelected, category];
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CiEdit
                          className={`hover:text-gray-500 ${
                            selectedCategories.includes(category)
                              ? "text-white "
                              : "text-[#17202A]"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditDialog(category);
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MdDelete
                          className={`hover:text-gray-500 ${
                            selectedCategories.includes(category)
                              ? "text-white "
                              : "text-[#17202A]"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCategory(category);
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
                            selectedCategories.includes(category)
                              ? "text-white "
                              : "text-[#17202A]"
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
            <h1 className="text-3xl text-[#17202A] font-bold">
              Add Category to Preview
            </h1>
          </div>
        )}
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
          <EditCategory
            setCategoryData={editCategory}
            selectedCategory={currentCategory} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryPreview;
