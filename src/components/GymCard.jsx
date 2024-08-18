import React from 'react';
import WWButton from './WWButton';
// import { FiStar } from 'react-icons/fi';

const GymCard = ({ gymName, imageSrc, rating, gymId }) => {
    return (
        <div className="relative bg-black text-white rounded-lg overflow-hidden shadow-lg">
            <img src={imageSrc} alt={gymName} className="w-full h-64 object-cover" />
            <div className="absolute top-0 right-0 m-2">
                <div className="relative inline-block">
                    <svg width="45" height="55" viewBox="0 0 50 70" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5,0 H45 Q50,0 50,5 V60 L25,45 L0,60 V5 Q0,0 5,0 Z"
                            fill="black"
                            stroke="red"
                            strokeWidth="2"
                        />
                        <foreignObject x="0" y="0" width="50" height="40">
                            <div className="flex justify-center items-center h-full">
                                {/* <FiStar className="mr-1" /> */}
                                <span className='text-red-600 font-bold'>{rating}</span>
                            </div>
                        </foreignObject>
                    </svg>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur p-4 flex justify-between items-center">
                <span className="text-lg font-semibold">{gymName}</span>
                <WWButton variant="v4" to={`/gymDetails/${gymId}`} minWidth="6rem" text="View Details" className="rounded-full" />
            </div>
        </div>
    );
};

export default GymCard;