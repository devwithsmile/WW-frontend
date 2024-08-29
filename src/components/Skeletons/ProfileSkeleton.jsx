// ProfileSkeleton.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Base color and highlight color
const baseColor = "#171717";
const highlightColor = "#2e2727";

const ProfileSkeleton = () => {
  return (
    <div className="flex items-center justify-center mt-4 text-white bg-wwbg md:my-12">
      <div className="w-full max-w-2xl p-8 shadow-lg bg-wwbg">
        <h2 className="mb-8 text-3xl font-semibold text-center">
          <Skeleton width={400} baseColor={baseColor} highlightColor={highlightColor} />
        </h2>

        <div className="flex items-center justify-center mb-4 space-x-6">
          <div className="flex justify-center">
            <div className="relative">
              <Skeleton circle={true} height={96} width={96} baseColor={baseColor} highlightColor={highlightColor} />
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Skeleton width={120} height={40} baseColor={baseColor} highlightColor={highlightColor} />
            <Skeleton width={120} height={40} baseColor={baseColor} highlightColor={highlightColor} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mb-4">
          
            <Skeleton height={40} baseColor={baseColor} highlightColor={highlightColor} />
          </div>

          <div className="mb-4">
            
            <Skeleton height={40} baseColor={baseColor} highlightColor={highlightColor} />
          </div>

          <div className="mb-4">
          
            <Skeleton height={40} baseColor={baseColor} highlightColor={highlightColor} />
          </div>

          <div className="mb-4">
           
            <Skeleton height={40} baseColor={baseColor} highlightColor={highlightColor} />
          </div>
        </div>

        <div className="hidden text-right">
          <Skeleton width={120} height={20} baseColor={baseColor} highlightColor={highlightColor} />
        </div>
       
        <div className="flex flex-wrap gap-2">
          <Skeleton width={140} height={40} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton width={140} height={40} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton width={140} height={40} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton width={140} height={40} baseColor={baseColor} highlightColor={highlightColor} />
        </div>

        <div className="mt-6 text-center">
          <Skeleton width={150} height={40} baseColor={baseColor} highlightColor={highlightColor} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;