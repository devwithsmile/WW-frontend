// MapSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CurrentLocationMapSkeleton = () => {
  return (
    <div
      className='w-auto p-4 shadow-lg md:p-8'
    >
      <Skeleton
        height={320} 
        baseColor='#171717'
        highlightColor='#2e2727'
        className='w-full'
      />
    </div>
  );
};

export default CurrentLocationMapSkeleton;