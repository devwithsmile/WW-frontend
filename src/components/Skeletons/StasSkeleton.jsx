// StatsSkeleton.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaChartBar, FaDollarSign, FaClock, FaUser } from "react-icons/fa";

// Base color and highlight color
const baseColor = "#171717";
const highlightColor = "#2e2727";

const StatsSkeleton = () => {
  return (
    <section>
      <h3 className="mb-4 text-lg font-bold">
        Stats
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Bookings */}
        <div className="flex items-center px-6 py-4 space-x-6 shadow-lg bg-wwpopdiv">
          <div className="flex-shrink-0 p-3">
            <FaChartBar size={24} className="text-red-500" />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-base font-semibold md:text-xl text-wwsecondarytext">
              <Skeleton width={220} baseColor={baseColor} highlightColor={highlightColor} />
            </h2>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xl font-semibold md:text-2xl text-wwtext">
                <Skeleton width={90} baseColor={baseColor} highlightColor={highlightColor} />
              </p>
              <span className="ml-4 text-sm font-semibold text-red-500 md:text-base">
                <Skeleton width={30} height={20} baseColor={baseColor} highlightColor={highlightColor} />
              </span>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="flex items-center px-6 py-4 space-x-6 shadow-lg bg-wwpopdiv">
          <div className="flex-shrink-0 p-3">
            <FaDollarSign size={24} className="text-red-500" />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-base font-semibold md:text-xl text-wwsecondarytext">
              <Skeleton width={220} baseColor={baseColor} highlightColor={highlightColor} />
            </h2>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xl font-semibold md:text-2xl text-wwtext">
                <Skeleton width={90} baseColor={baseColor} highlightColor={highlightColor} />
              </p>
              <span className="ml-4 text-sm font-semibold text-red-500 md:text-base">
                <Skeleton width={30} height={20} baseColor={baseColor} highlightColor={highlightColor} />
              </span>
            </div>
          </div>
        </div>

        {/* Total Hours */}
        <div className="flex items-center px-6 py-4 space-x-6 shadow-lg bg-wwpopdiv">
          <div className="flex-shrink-0 p-3">
            <FaClock size={24} className="text-red-500" />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-base font-semibold md:text-xl text-wwsecondarytext">
              <Skeleton width={220} baseColor={baseColor} highlightColor={highlightColor} />
            </h2>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xl font-semibold md:text-2xl text-wwtext">
                <Skeleton width={90} baseColor={baseColor} highlightColor={highlightColor} />
              </p>
              <span className="ml-4 text-sm font-semibold text-red-500 md:text-base">
                <Skeleton width={30} height={20} baseColor={baseColor} highlightColor={highlightColor} />
              </span>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="flex items-center px-6 py-4 space-x-6 shadow-lg bg-wwpopdiv">
          <div className="flex-shrink-0 p-3">
            <FaUser size={24} className="text-red-500" />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-base font-semibold md:text-xl text-wwsecondarytext">
              <Skeleton width={220} baseColor={baseColor} highlightColor={highlightColor} />
            </h2>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xl font-semibold md:text-2xl text-wwtext">
                <Skeleton width={90} baseColor={baseColor} highlightColor={highlightColor} />
              </p>
              <span className="ml-4 text-sm font-semibold text-red-500 md:text-base">
                <Skeleton width={30} height={20} baseColor={baseColor} highlightColor={highlightColor} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSkeleton;