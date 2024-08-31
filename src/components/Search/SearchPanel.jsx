import React, { useEffect, useState } from "react";
import { FaLocationArrow, FaRegStar } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";
import { IoPricetagOutline } from "react-icons/io5";
import { RiPinDistanceLine } from "react-icons/ri";
import api from "../../api/axios";

const SearchPanel = ({
  onLocationChange,
  onSearchChange,
  onFilterChange,
  onSortChange,
}) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get("/gyms/cities"); // Adjust the endpoint as needed
        setCities(response.data); // Assuming response.data is the array of cities

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleSortClick = (criteria) => {
    onSortChange(criteria);
  };

  return (
    <div className="flex flex-col items-center justify-between my-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:px-36">
      {/* Location Detector */}
      <div className="flex items-center justify-center">
        <FaLocationArrow className="text-red-500" size={12} />
        <select
          className="px-5 text-white rounded-none appearance-none bg-wwbg focus:outline-none"
          onChange={(e) => onLocationChange(e.target.value)}
        >
          <option value="">Location</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full sm:w-2/3 md:w-1/3">
        <input
          type="search"
          placeholder="Search for your gym..."
          className="flex items-center w-full py-2 pl-10 pr-4 text-white border border-gray-600 bg-wwbg focus:outline-none focus:border-red-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <FiSearch className="absolute ml-3 text-gray-500" />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
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
