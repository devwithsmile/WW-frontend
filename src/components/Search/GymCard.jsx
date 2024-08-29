import React from "react";
import { Link } from "react-router-dom";

const GymCard = ({ gymName, imageSrc, rating, gymId }) => {
  const checkRating = (rate) => {
    if (rate) {
      return Number(rating).toFixed(1);
    }
    return 0;
  };

  return (
    <div className="relative overflow-hidden text-white bg-black shadow-lg">
      {/* Image */}
      <Link to={`/gym/${gymId}`}>
        <img
          src={imageSrc}
          alt={gymName}
          className="object-cover w-full h-64"
        />
      </Link>
      {/* Rating */}
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
                {/* <FiStar className="mr-1" /> */}
                <span className="text-base font-semibold text-white md:font-bold md:text-xl">
                  {checkRating(rating)}
                </span>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
      {/* Gym & Button */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-between p-2 space-y-2 bg-opacity-50 bg-wwbg backdrop-blur sm:p-4 sm:flex-row sm:space-y-0">
        <span className="text-lg font-semibold text-center sm:text-start">
          {gymName}
        </span>
        <Link to={`/gym/${gymId}`}>
          <button
            type="button"
            className="w-full bg-wwbg px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred"
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GymCard;
