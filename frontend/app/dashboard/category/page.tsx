"use client"

import React, { useState } from 'react'; 
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiDocumentDuplicate } from "react-icons/hi";
import { Button } from '@/components/ui/button';
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';

const page = () => {
  const initialCategories = [
    { name: 'Category 1', price: 100 },
    { name: 'Category 2', price: 200 },
    { name: 'Category 3', price: 300 },
  ];

  const [categories, setCategories] = useState(initialCategories); 
  const [error, setError] = useState(''); 

  const handleDelete = (name:string) => {
    const isEventLive = false; 
    if (isEventLive) {
      setError('Cannot delete category once event is live.');
      return;
    }
    setCategories(categories.filter(category => category.name !== name));
  };

  return (
    <div className="flex flex-col m-3">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
        <Link href={`/dashboard/category_setup`}>
          <Button>
            <div className="flex justify-center items-center gap-3">
              <h1>Add Category</h1>
              <FaPlus size={20} />
            </div>
          </Button>
        </Link>
      </div>

      <section className="mt-4 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Category Preview</h2>
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col relative border bg-white shadow-lg rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{category.name}</p>
                <p>Price: {category.price}</p>
              </div>
              <div className="flex space-x-2 absolute top-2 right-2">
                <button className=" text-white p-1 rounded">
                  <CiEdit className="text-gray-800" />
                </button>
                <button
                  className=" text-white p-1 rounded"
                  onClick={() => handleDelete(category.name)}
                >
                  <MdDelete className="text-gray-800" />
                </button>
                <button className=" text-white p-1 rounded">
                  <HiDocumentDuplicate className="text-gray-800" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default page;
