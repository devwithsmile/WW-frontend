import React from 'react';
import { FaLocationArrow, FaRegStar } from 'react-icons/fa'; // Icon for location
import { FiSearch } from 'react-icons/fi'; // Icon for search
import { IoIosTimer } from 'react-icons/io';
import { IoPricetagOutline } from 'react-icons/io5';
import { RiFilterFill, RiPinDistanceLine } from 'react-icons/ri'; // Icon for filters

const SearchPageNavbar = ({ onLocationChange, onSearchChange, onFilterChange, onSortChange }) => {
  const handleSortClick = (criteria) => {
    onSortChange(criteria);
  };

  return (
    <nav className="py-4 bg-white shadow-lg">
      <div className="container flex items-center justify-between px-4 mx-auto">
        
        {/* Location Detector */}
        <div className="flex items-center space-x-2">
          <FaLocationArrow className="text-blue-500" />
          <span className="font-medium text-gray-700">Detecting Location...</span>
        </div>
        
        {/* Search Bar */}
        <div className="relative flex items-center w-1/2 max-w-lg">
          <input
            type="text"
            placeholder="Search gyms by name..."
            className="w-full py-2 pl-10 pr-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FiSearch className="absolute ml-3 text-gray-500" />
        </div>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">

          <button
            onClick={() => handleSortClick('distance')}
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <RiPinDistanceLine className="mr-2" /> Distance
          </button>
          
          <button
            onClick={() => handleSortClick('time')}
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <IoIosTimer className="mr-2" /> Time
          </button>

          <button
            onClick={() => handleSortClick('price')}
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <IoPricetagOutline className="mr-2" /> Price
          </button>

          <button
            onClick={() => handleSortClick('rating')}
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <FaRegStar className="mr-2" /> Rating
          </button>

        </div>
      </div>
    </nav>
  );
};

export default SearchPageNavbar;