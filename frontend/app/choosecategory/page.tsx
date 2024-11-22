import Cart from '@/components/Cart';
import ChooseCategoryregister from '@/components/ChooseCategoryregister';
import React from 'react'

const page = () => {
  return (
    <div className="mx-auto p-5 sm:p-12">
      <div className="flex flex-col lg:flex-row gap-10">
        <ChooseCategoryregister/>
        <Cart/>
      </div>
    </div>
  );
}

export default page
