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
  setCategoryData: (newCategory: any) => void; 
  type:string;
  category?:any;
}

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
  gender?:string;
  age_from?: string;
  age_to?: string;
}

const inputFields = [
  {
    id: "category_name",
    label: "Category Name",
    type: "text",
    placeholder: "Enter Category Name",
    required: true,
  },
  {
    id: "ticket_description",
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
    id: "total_quantity",
    label: "Total Quantity",
    type: "number",
    placeholder: "Enter Total Quantity",
  },
  {
    id: "max_ticket_quantity",
    label: "Maximum Ticket Quantity",
    type: "number",
    placeholder: "Enter Max Ticket Quantity",
  },
];

const discountFields = {
  percentage: [
    {
      id: "discount_code",
      label: "Discount Code",
      type: "text",
      placeholder: "Enter Discount Code",
      required: true,
    },
    {
      id: "number_of_discounts",
      label: "Number Of Discounts",
      type: "number",
      placeholder: "Enter Number of Discounts",
      required: true,
    },
    {
      id: "percentage_input",
      label: "Percentage",
      type: "number",
      placeholder: "Enter Percentage",
      required: true,
    },
    {
      id: "from_date",
      label: "From Date",
      type: "date",
      placeholder: "Enter From Date",
      required: true,
    },
    {
      id: "till_date",
      label: "Till Date",
      type: "date",
      placeholder: "Enter Till Date",
      required: true,
    },
  ],
  amount: [
    {
      id: "discount_code",
      label: "Discount Code",
      type: "text",
      placeholder: "Enter Discount Code",
      required: true,
    },
    {
      id: "number_of_discounts",
      label: "Number Of Discounts",
      type: "number",
      placeholder: "Enter Number of Discounts",
      required: true,
    },
    {
      id: "amount_input",
      label: "Amount",
      type: "number",
      placeholder: "Enter Amount",
      required: true,
    },
    {
      id: "from_date",
      label: "From Date",
      type: "date",
      placeholder: "Enter From Date",
      required: true,
    },
    {
      id: "till_date",
      label: "Till Date",
      type: "date",
      placeholder: "Enter Till Date",
      required: true,
    },
  ],
};

const AddCategory = ({ setCategoryData ,type,category}: AddCategoryProps) => {
  const [categoryData, setLocalCategoryData] = useState<Category>({
    category_name: "",
    ticket_description: "",
    price: "",
    total_quantity: "",
    max_ticket_quantity: "",
    category_type: "",
    discount: false,
    discount_code: "",
    discountType: "",
    number_of_discounts: "",
    from_date: "",
    till_date: "",
    discountValue: "",
    percentage_input: "",
    amount_input: "",
    gender:"",
    age_from: "",
    age_to: "",
  });
  const {EventData}=useEventContext()
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [showPercentageInput, setShowPercentageInput] = useState(false);
  const [isDiscount, setisDiscount] = useState(false); 

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
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    const discountDetails = isDiscount
      ? {
          discount: true,
          discount_code: categoryData.discount_code,
          discountType: showPercentageInput ? "percentage" : "amount",
          numberOfDiscounts: categoryData.number_of_discounts,
          fromDate: categoryData.from_date,
          tillDate: categoryData.till_date,
          discountValue: showPercentageInput
            ? categoryData.percentage_input
            : categoryData.amount_input,
        }
      : {};

    setCategoryData({ ...categoryData, ...discountDetails }); 
    setLocalCategoryData({
      category_name: "",
      category_type: "",
      ticket_description: "",
      price: "",
      total_quantity: "",
      max_ticket_quantity: "",
      discount: false,
      discount_code: "",
      discountType: "",
      number_of_discounts: "",
      from_date: "",
      till_date: "",
      discountValue: "",
      percentage_input: "",
      amount_input: "",
      gender:"",
      age_from: "",
      age_to: "",
    });
  };
  const fields =
    EventData.sport === "Marathon"
      ? inputFields
      : inputFields.filter(
          ({ id }) => id !== "total_quantity" && id !== "max_ticket_quantity"
        );

  const areRequiredFieldsFilled = () => {
    return fields.every((field) => {
      if (field.required) {
        return categoryData[field.id as keyof typeof categoryData];
      }
      return true;
    });
  };

  useEffect(() => {
    if (type === "edit" && category) {
      setLocalCategoryData(category);
    }
  }, [type, category]);

  return (
    <form className="bg-white shadow-2xl py-2 sm:py-5 rounded-lg  overflow-y-auto">
      <div className="flex flex-wrap w-full">
        <div className=" w-full m-2 flex flex-col">
          <label htmlFor="category_type">
            Category Type<span className="text-red-500">*</span>
          </label>
          <Select
            onValueChange={(value) =>
              setLocalCategoryData({ ...categoryData, category_type: value })
            }
          >
            <SelectTrigger className="w-full h-10 shadow-2xl focus:border-[#17202A] focus:outline-none focus:shadow-lg">
              <SelectValue
                placeholder={categoryData.category_type || "Category Type"}
              />
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
        <div className=" w-full m-2 flex flex-col">
          <label htmlFor="category_type">
            Category Gender<span className="text-red-500">*</span>
          </label>
          <Select
            onValueChange={(value) =>
              setLocalCategoryData({ ...categoryData, gender: value })
            }
          >
            <SelectTrigger className="w-full h-10 shadow-2xl focus:border-[#17202A] focus:outline-none focus:shadow-lg">
              <SelectValue placeholder={categoryData.gender || "Gender"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="femake">Female</SelectItem>
              <SelectItem value="others">Not Applicable</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className=" w-full m-2 flex flex-col">
          <label>
            Age Range<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="age_from"
              placeholder="From Age"
              value={categoryData.age_from}
              onChange={(e) => {
                setLocalCategoryData({
                  ...categoryData,
                  age_from: e.target.value.toString(),
                });
              }}
              max="100"
              className="h-10 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg w-1/2"
            />
            <span className="text-lg">to</span>
            <input
              type="number"
              name="age_to"
              placeholder="To Age"
              value={categoryData.age_to}
              onChange={(e) => {
                setLocalCategoryData({
                  ...categoryData,
                  age_to: e.target.value.toString(),
                });
              }}
              max="100"
              className="h-10 p-2 bg-white border rounded-md text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg w-1/2"
            />
          </div>
        </div>

        {fields.map((field) => (
          <div
            key={field.id}
            className={` ${
              field.type === "textarea" ? "" : "lg:w-[46%]"
            } w-full m-2 flex flex-col`}
          >
            <label htmlFor={field.id}>
              {field.label}
              <span className="text-red-500">*</span>
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                value={
                  categoryData[field.id as keyof typeof categoryData] || ""
                }
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
                value={
                  categoryData[field.id as keyof typeof categoryData] || ""
                }
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
                ? "max-h-[40rem] transition-max-height duration-200 ease-in-out"
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
                        maxLength={field.id === "discount_code" ? 10 : undefined}
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
                        maxLength={field.id === "discount_code" ? 10 : undefined}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className={`w-full p-2 mx-2 rounded-md ${
            areRequiredFieldsFilled()
              ? "bg-[#17202A] text-white cursor-pointer"
              : "bg-gray-600 text-white cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!areRequiredFieldsFilled()}
        >
          {type === "edit" ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
