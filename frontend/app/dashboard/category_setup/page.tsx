import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const page = () => {
  return (
    <form className="bg-white shadow-2xl p-5 rounded-lg m-3">
      <div className="flex flex-wrap w-full">
        <div className="lg:w-[48%] w-full m-2 flex flex-col">
          <label htmlFor="categoryName">Category Name</label>
          <input
            id="categoryName"
            type="text"
            name="categoryName"
            placeholder="Enter Category Name..."
            required
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
          />
        </div>

        <div className="lg:w-[48%] w-full m-2 flex flex-col">
          <label htmlFor="categoryType">Category Type</label>
          <Select>
            <SelectTrigger className="w-full h-16 shadow-2xl">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Singles</SelectItem>
              <SelectItem value="dark">Double</SelectItem>
              <SelectItem value="system">Team</SelectItem>
            </SelectContent>
            <p className="text-sm text-gray-500">
              Partner selection will only be available for Doubles categories.
            </p>
          </Select>
        </div>

        <div className="lg:w-[48%] w-full m-2 flex flex-col">
          <label htmlFor="price">Price (INR)</label>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="Enter Price..."
            required
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
          />
        </div>

        <div
          className="lg:w-[48%] w-full m-2 flex flex-col"
          id="totalQuantityContainer"
        >
          <label htmlFor="totalQuantity">Total Quantity</label>
          <input
            id="totalQuantity"
            type="number"
            name="totalQuantity"
            placeholder="Enter Total Quantity..."
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
          />
        </div>

        <div className="lg:w-[48%] w-full m-2 flex flex-col">
          <label htmlFor="ticketDescription">Ticket Description</label>
          <textarea
            id="ticketDescription"
            name="ticketDescription"
            placeholder="Includes participation, e-certificate, refreshments..."
            maxLength={100}
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
          />
        </div>

        <div className="lg:w-[48%] w-full m-2 flex flex-col">
          <label htmlFor="maxTicketQuantity">Maximum Ticket Quantity</label>
          <input
            id="maxTicketQuantity"
            type="number"
            name="maxTicketQuantity"
            placeholder="Enter Max Ticket Quantity..."
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
          />
        </div>

        <Tabs
          defaultValue="Percentage"
          className="w-full lg:w-[48%] my-4 mx-2 border rounded-lg pb-2"
        >
          <TabsList className="w-full">
            <TabsTrigger value="Percentage" className="w-1/2">
              Percentage
            </TabsTrigger>
            <TabsTrigger value="Amount" className="w-1/2">
              Amount
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Percentage" className="mx-2">
            <div className="w-full flex flex-col">
              <label htmlFor="percentageInput">Enter Percentage</label>
              <input
                id="percentageInput"
                type="number"
                name="percentageInput"
                placeholder="Enter Percentage..."
                className="h-10 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
              />
              <label htmlFor="promoCodePercentage">Promo Code</label>
              <input
                id="promoCodePercentage"
                type="text"
                name="promoCodePercentage"
                placeholder="Enter Promo Code..."
                className="h-10 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
              />
            </div>
          </TabsContent>
          <TabsContent value="Amount" className="mx-2">
            <div className="w-full flex flex-col">
              <label htmlFor="amountInput">Enter Amount</label>
              <input
                id="amountInput"
                type="number"
                name="amountInput"
                placeholder="Enter Amount..."
                className="h-10 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
              />
              <label htmlFor="promoCodeAmount">Promo Code</label>
              <input
                id="promoCodeAmount"
                type="text"
                name="promoCodeAmount"
                placeholder="Enter Promo Code..."
                className="h-10 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* <div className="lg:w-[47%] w-full m-2 flex flex-col">
          <label htmlFor="discountCode">Discount Code</label>
          <input
            id="discountCode"
            type="text"
            name="discountCode"
            placeholder="Enter Discount Code..."
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
          />
          <div className="flex space-x-2">
            <label>
              <input type="radio" name="discountType" value="percentage" /> %
            </label>
            <label>
              <input type="radio" name="discountType" value="amount" /> Amount
            </label>
          </div>
          <input
            type="number"
            name="discountValue"
            placeholder="Value..."
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
          />
          <input
            type="number"
            name="numberOfDiscounts"
            placeholder="Number of Discounts..."
            className="h-16 p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800 focus:outline-none focus:shadow-lg"
          />
          <div className="flex space-x-2">
            <input type="date" name="discountStartDate" />
            <input type="date" name="discountEndDate" />
          </div>
        </div> */}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-2 mx-2 rounded-md"
        >
          Add Category
        </button>
      </div>
    </form>
  );
}

export default page
