// ContactGYMSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ContactGYMSkeleton = () => {
  return (
    <div
      className='w-auto p-4 overflow-hidden shadow-lg md:p-8'
    >
      <div className='flex items-center mb-4 ml-4'>
        <Skeleton
         
          height={24}
          width={24}
          baseColor='#171717'
          highlightColor='#2e2727'
          className='mr-2'
        />
        <Skeleton
          width={250}
          baseColor='#171717'
          highlightColor='#2e2727'
          className='font-medium text-gray-300'
        />
    
      </div>
      <div className='flex items-center ml-4'>
        <Skeleton
          height={24}
          width={24}
          baseColor='#171717'
          highlightColor='#2e2727'
          className='mr-2'
        />
        <Skeleton
          width={250}
          baseColor='#171717'
          highlightColor='#2e2727'
          className='font-medium text-gray-300'
        />
       
      </div>
    </div>
  );
};

export default ContactGYMSkeleton;