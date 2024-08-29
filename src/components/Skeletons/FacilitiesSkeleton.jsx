import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

function FacilitiesSkeleton({ count = 4 }) {
  return (
    <div className='w-auto p-4 shadow-lg md:p-8'>
      <div className='grid text-gray-300 sm:grid-cols-2 gap-y-2'>
        {[...Array(count)].map((_, index) => (
          <div key={index} className='flex items-center'>
            <Skeleton
              width={24}
              height={24}
              baseColor='#171717'
              highlightColor='#2e2727'
              className='mr-2'
            />
            <Skeleton
              width={100}
              baseColor='#171717'
              highlightColor='#2e2727'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Define prop types for the component
FacilitiesSkeleton.propTypes = {
  count: PropTypes.number,
};

export default FacilitiesSkeleton;