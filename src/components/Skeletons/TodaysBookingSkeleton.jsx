import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TodaysBookingSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-6 shadow-lg lg:flex-row">
      {/* Gym Image Skeleton */}
      <div className="flex-none w-full lg:w-[30rem] h-[15rem] overflow-hidden relative">
        <Skeleton
          baseColor="#171717"
          highlightColor="#2e2727"
          width="100%"
          height="100%"
        />
      </div>

      <div className="w-full px-3 my-3 md:px-6">
        {/* Gym Content Skeleton */}
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start">
          <div className="w-full">
            <Skeleton baseColor="#171717" highlightColor="#2e2727" width={200} height={24} />
            <Skeleton baseColor="#171717" highlightColor="#2e2727" width={150} height={20} className="mt-2" />
            <Skeleton baseColor="#171717" highlightColor="#2e2727" width={350} height={20} className="mt-12" />
          </div>
          <div className="flex flex-row justify-between w-full mt-2 md:flex-col md:text-right md:mt-0">
            <Skeleton baseColor="#171717" highlightColor="#2e2727" width={100} height={20} />
            <Skeleton baseColor="#171717" highlightColor="#2e2727" width={100} height={20} />
          </div>
        </div>


        {/* Buttons Skeleton */}
        <div className="flex flex-col items-center justify-center mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:justify-end">
          <div className="w-full md:w-auto">
            <Skeleton baseColor="#171717" highlightColor="#2e2727" width={150} height={40} />
          </div>
          <Skeleton baseColor="#171717" highlightColor="#2e2727" width={150} height={40} />
        </div>
      </div>
    </div>
  );
};

export default TodaysBookingSkeleton;