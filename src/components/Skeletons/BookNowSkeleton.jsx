import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BookNowSkeleton = () => {
  return (
    <form className="p-4 space-y-6 shadow-lg bg-[#171717] md:p-8 space-y-6">
      {/* Date */}
      <div className="flex flex-col items-start space-y-2">
        <Skeleton height={36} baseColor="#171717" highlightColor="#2e2727" width="100%" />
      </div>

      {/* Slots */}
      <div className="flex flex-col space-y-2">
        <Skeleton height={40} baseColor="#171717" highlightColor="#2e2727" width="100%" />
      </div>

      {/* Time */}
      <div className="flex flex-col space-y-2">
        <Skeleton height={40} baseColor="#171717" highlightColor="#2e2727" width="100%" />
      </div>

      {/* Price */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton width={100} height={20} baseColor="#171717" highlightColor="#2e2727" />
          <Skeleton width={80} height={20} baseColor="#171717" highlightColor="#2e2727" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton width={100} height={20} baseColor="#171717" highlightColor="#2e2727" />
          <Skeleton width={80} height={20} baseColor="#171717" highlightColor="#2e2727" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center w-full">
        <Skeleton width={300} height={40} baseColor="#171717" highlightColor="#2e2727" />
      </div>
    </form>
  );
};

export default BookNowSkeleton;
