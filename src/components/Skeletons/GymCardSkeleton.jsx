import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GymCardSkeleton() {
  return (
    <div className="relative overflow-hidden text-white shadow-lg">
      {/* Image Skeleton */}
      <Skeleton height={256} className="object-cover w-full h-64" baseColor="#171717" highlightColor="#2e2727" />

      {/* Rating Skeleton */}
      <div className="absolute top-0 right-0 m-2">
        <div className="relative inline-block">
          <svg
            width="45"
            height="45"
            viewBox="0 0 50 70"
            fill="bg-wwbg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5,0 H45 Q50,0 50,5 V60 L25,45 L0,60 V5 Q0,0 5,0 Z"
              fill="#212121"
              stroke="#c13838"
              strokeWidth="1"
            />
            <foreignObject x="0" y="0" width="50" height="40">
              <div className="flex items-center justify-center h-full">
                <Skeleton width={30} height={20} baseColor="#171717" highlightColor="#2e2727" />
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>

      {/* Gym Name & Button Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-between p-2 space-y-2 bg-opacity-50 bg-wwbg backdrop-blur sm:p-4 sm:flex-row sm:space-y-0">
        <Skeleton width={120} height={20} baseColor="#171717" highlightColor="#2e2727" />
        <Skeleton width={100} height={40} baseColor="#171717" highlightColor="#2e2727" />
      </div>
    </div>
  );
}

export default GymCardSkeleton;