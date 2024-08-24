import React from "react";
import { FaLocationArrow, FaRegStar } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";
import { IoPricetagOutline } from "react-icons/io5";
import { RiPinDistanceLine } from "react-icons/ri";

const SearchPanel = ({
  onLocationChange,
  onSearchChange,
  onFilterChange,
  onSortChange,
}) => {
  
  const handleSortClick = (criteria) => {
    onSortChange(criteria);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 my-6 md:px-36">
      {/* Location Detector */}
      <div className="flex items-center justify-center">
        <FaLocationArrow className="text-red-500" size={12} />
        <select
          className="text-center appearance-none text-white rounded-none bg-wwbg focus:outline-none ml-2"
          onChange={(e) => onLocationChange(e.target.value)}
        >
          <option>Location</option>
          <option>Delhi</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full sm:w-2/3 md:w-1/3">
        <input
          type="search"
          placeholder="Search for your gym..."
          className="w-full py-2 pl-10 pr-4 flex items-center border border-gray-600 bg-wwbg text-white focus:outline-none focus:border-red-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <FiSearch className="absolute ml-3 text-gray-500" />
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex space-x-4">
          <button
            onClick={() => handleSortClick("distance")}
            className="flex justify-center items-center w-[7.5rem] md:w-full bg-wwbg px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred"
          >
            <RiPinDistanceLine className="mr-2" /> Distance
          </button>

          <button
            onClick={() => handleSortClick("time")}
            className="flex justify-center items-center w-[7.5rem] md:w-full bg-wwbg px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred"
          >
            <IoIosTimer className="mr-2" /> Time
          </button>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleSortClick("price")}
            className="flex justify-center items-center w-[7.5rem] md:w-full bg-wwbg px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred"
          >
            <IoPricetagOutline className="mr-2" /> Price
          </button>

          <button
            onClick={() => handleSortClick("rating")}
            className="flex justify-center items-center w-[7.5rem] md:w-full bg-wwbg px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred"
          >
            <FaRegStar className="mr-2" /> Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
