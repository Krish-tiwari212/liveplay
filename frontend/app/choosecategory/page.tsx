import Cart from '@/components/Cart';
import ChooseCategoryregister from '@/components/ChooseCategoryregister';
import StickyCart from '@/components/StickyCart';
import React from 'react'

const page = () => {
  return (
    <div className="mx-auto pt-6 md:pb-6">
      <div className="flex flex-col lg:flex-row gap-10">
        <ChooseCategoryregister/>
        <Cart/>
        <StickyCart />
      </div>
    </div>
  );
}

export default page
