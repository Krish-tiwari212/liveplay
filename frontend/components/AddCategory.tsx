"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { useEventContext } from "@/context/EventDataContext";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface AddCategoryProps {
  setCategoryData: (newCategory: any) => void; // Change to accept a new category
}

const inputFields = [
  {
    id: "categoryName",
    label: "Category Name",
    type: "text",
    placeholder: "Enter Category Name",
    required: true,
  },
  {
    id: "ticketDescription",
    label: "Ticket Description",
    type: "textarea",
    placeholder: "Includes participation, e-certificate, refreshments",
    maxLength: 100,
  },
  {
    id: "price",
    label: "Price (INR)",
    type: "number",
    placeholder: "Enter Price",
    required: true,
  },
  {
    id: "totalQuantity",
    label: "Total Quantity",
    type: "number",
    placeholder: "Enter Total Quantity",
  },
  {
    id: "maxTicketQuantity",
    label: "Maximum Ticket Quantity",
    type: "number",
    placeholder: "Enter Max Ticket Quantity",
  },
];

const discountFields = {
  percentage: [
    {
      id: "discountcode",
      label: "Discount Code",
      type: "text",
      placeholder: "Enter Discount Code",
      required: true,
    },
    {
      id: "numberOfDiscounts",
      label: "Number Of Discounts",
      type: "number",
      placeholder: "Enter Number of Discounts",
      required: true,
    },
    {
      id: "percentageInput",
      label: "Percentage",
      type: "number",
      placeholder: "Enter Percentage",
      required: true,
    },
    {
      id: "fromDate",
      label: "From Date",
      type: "date",
      placeholder: "Enter From Date",
      required: true,
    },
    {
      id: "tillDate",
      label: "Till Date",
      type: "date",
      placeholder: "Enter Till Date",
      required: true,
    },
  ],
  amount: [
    {
      id: "discountcode",
      label: "Discount Code",
      type: "text",
      placeholder: "Enter Discount Code",
      required: true,
    },
    {
      id: "numberOfDiscounts",
      label: "Number Of Discounts",
      type: "number",
      placeholder: "Enter Number of Discounts",
      required: true,
    },
    {
      id: "amountInput",
      label: "Amount",
      type: "number",
      placeholder: "Enter Amount",
      required: true,
    },
    {
      id: "fromDate",
      label: "From Date",
      type: "date",
      placeholder: "Enter From Date",
      required: true,
    },
    {
      id: "tillDate",
      label: "Till Date",
      type: "date",
      placeholder: "Enter Till Date",
      required: true,
    },
  ],
};

const AddCategory = ({ setCategoryData }: AddCategoryProps) => {
  const [categoryData, setLocalCategoryData] = useState({
    categoryName: "",
    totalQuantity: "",
    maxTicketQuantity: "",
    price: "",
    ticketDescription: "",
    categoryType: "",
    discount:"",
    discountcode:"",
    discountType:"",
    numberOfDiscounts:"",
    fromDate:"",
    tillDate:"",
    discountValue:"",
    percentageInput:"",
    amountInput:"",
  });
  const {EventData}=useEventContext()
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [showPercentageInput, setShowPercentageInput] = useState(false);
  const [isDiscount, setisDiscount] = useState(false); // State to control dropdown visibility

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setLocalCategoryData({ ...categoryData, [name]: value });
  };

  const handleCheckboxChange = (type: "amount" | "percentage") => {
    if (type === "amount") {
      setShowAmountInput(!showAmountInput);
      if (showPercentageInput) setShowPercentageInput(false);
    } else {
      setShowPercentageInput(!showPercentageInput);
      if (showAmountInput) setShowAmountInput(false);
    }
  };
  const fields =
    EventData.selectsport === "Marathon"
      ? inputFields
      : inputFields.filter(
          ({ id }) => id !== "totalQuantity" && id !== "maxTicketQuantity"
        );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    // Add discount details if discounts are enabled
    const discountDetails = isDiscount
      ? {
          discount: true,
          discountcode: categoryData.discountcode,
          discountType: showPercentageInput ? "percentage" : "amount",
          numberOfDiscounts: categoryData.numberOfDiscounts,
          fromDate: categoryData.fromDate,
          tillDate: categoryData.tillDate,
          discountValue: showPercentageInput
            ? categoryData.percentageInput
            : categoryData.amountInput,
        }
      : {};

    setCategoryData({ ...categoryData, ...discountDetails }); 
    setLocalCategoryData({
      categoryName: "",
      totalQuantity: "",
      maxTicketQuantity: "",
      price: "",
      ticketDescription: "",
      categoryType: "",
      discount: "",
      discountcode: "",
      discountType: "",
      numberOfDiscounts: "",
      fromDate: "",
      tillDate: "",
      discountValue: "",
      percentageInput: "",
      amountInput: "",
    });
  };

  return (
    <form
      className="bg-white shadow-2xl p-5 rounded-lg m-3"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <div className="lg:w-[46%] w-full m-2 flex flex-col">
          <label htmlFor="categoryType">Category Type</label>
          <Select
            onValueChange={(value) =>
              setLocalCategoryData({ ...categoryData, categoryType: value })
            }
          >
            <SelectTrigger className="w-full h-16 shadow-2xl focus:border-[#17202A] focus:outline-none focus:shadow-lg">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Singles">Singles</SelectItem>
              <SelectItem value="Doubles">Double</SelectItem>
              <SelectItem value="Team">Team</SelectItem>
            </SelectContent>
            <p className="text-sm text-gray-800">
              Partner selection only for Doubles categories.
            </p>
          </Select>
        </div>
        {fields.map((field) => (
          <div
            key={field.id}
            className={` ${
              field.type === "textarea" ? "" : "lg:w-[46%]"
            } w-full m-2 flex flex-col`}
          >
            <label htmlFor={field.id}>{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                value={categoryData[field.id as keyof typeof categoryData]}
                onChange={handleChange}
                className="h-20 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
              />
            ) : (
              <input
                id={field.id}
                type={field.type}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                value={categoryData[field.id as keyof typeof categoryData]}
                onChange={handleChange}
                className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
              />
            )}
          </div>
        ))}
        <div className="flex flex-col w-full m-2">
          <h1
            onClick={() => setisDiscount(!isDiscount)}
            className="cursor-pointer flex justify-between items-center bg-gray-300 rounded-md p-2 shadow-lg"
          >
            Discounts
            {isDiscount ? (
              <MdKeyboardArrowUp className="text-xl" />
            ) : (
              <MdKeyboardArrowDown className="text-xl" />
            )}
          </h1>
          <div
            className={`${
              isDiscount
                ? "max-h-[30rem] transition-max-height duration-200 ease-in-out"
                : "max-h-0 transition-max-height duration-200 ease-in-out overflow-hidden"
            }`}
          >

            <div className="mt-2">
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="percentage"
                    id="percentage"
                    onClick={() => handleCheckboxChange("percentage")}
                  />
                  <Label htmlFor="percentage">Percentage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="amount"
                    id="amount"
                    onClick={() => handleCheckboxChange("amount")}
                  />
                  <Label htmlFor="amount">Amount</Label>
                </div>
              </RadioGroup>

              {showPercentageInput && (
                <div className="flex flex-wrap">
                  {discountFields.percentage.map((field) => (
                    <div
                      key={field.id}
                      className={` ${
                        field.type === "textarea" ? "" : "lg:w-[45%]"
                      } w-full m-2 flex flex-col`}
                    >
                      <label htmlFor={field.id}>{field.label}</label>
                      <input
                        id={field.id}
                        type={field.type}
                        name={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={
                          categoryData[field.id as keyof typeof categoryData]
                        }
                        onChange={handleChange}
                        className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
              {showAmountInput && (
                <div className="flex flex-wrap">
                  {discountFields.amount.map((field) => (
                    <div
                      key={field.id}
                      className={`lg:w-[45%] w-full m-2 flex flex-col`}
                    >
                      <label htmlFor={field.id}>{field.label}</label>
                      <input
                        id={field.id}
                        type={field.type}
                        name={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={
                          categoryData[field.id as keyof typeof categoryData]
                        }
                        onChange={handleChange}
                        className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#17202A] text-white p-2 mx-2 rounded-md"
        >
          Add Category
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
