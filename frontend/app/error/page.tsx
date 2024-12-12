import Image from 'next/image';
import React from 'react'

const page = () => {
  return (
    <div className=' flex w-full h-[30rem] justify-center items-center flex-col'>
      <div>
        <Image src="/images/logo black.svg" alt='public/images/logo black.svg' width={100} height={100} priority className='mb-4'/>
      </div>
      <h1 className='text-4xl font-semibold ml-1'>🏏Score - 404<span className='font-light'>/0</span></h1>
      <h1 className='text-xl'>We’ll get you back on the pitch soon</h1>
    </div>
  );
}

export default page
