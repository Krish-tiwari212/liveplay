"use client"

import Cart from '@/components/Cart';
import ChooseCategoryregister from '@/components/ChooseCategoryregister';
import HeroChangingTagLine from '@/components/HeroChangingTagLine';
import StickyCart from '@/components/StickyCart';
import React, { useEffect } from 'react'

const page = ({ params }: any) => {
  const {id}=params
  
  return (
    <>
      {/* <HeroChangingTagLine tagline="" /> */}
      <div className="mx-auto pt-6 md:pb-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <ChooseCategoryregister eventid={id} />
          <Cart />
          <StickyCart />
        </div>
      </div>
    </>
  );  
};

export default page
