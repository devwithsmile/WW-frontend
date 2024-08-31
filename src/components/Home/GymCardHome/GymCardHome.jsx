import React from 'react';
import './GymCardHome.css';
import { getFirstFewSentences } from '../../../utils/helperFunctions.js';

function GymCardHome({ gym }) {
    const image1 = gym.images[0];
    const image2 = gym.images[1] || image1; // Use image2 if available, otherwise use image1

    return (
        <div className="relative mb-16 w-72 h-96 card group md:mb-0"> {/* Add 'group' class here */}
            <div
                className="first-content"
                style={{
                    backgroundImage: `url(${image1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.9,
                    position: 'relative',
                    transition: 'opacity 0.9s', // Add transition for smooth effect
                }}
            >
                <span className="w-full text-center group-hover:mb-10"> {/* Use 'group-hover:hidden' */}
                    {gym.gym_name}
                </span>
            </div>

            <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 opacity-0 second-content group-hover:opacity-100" // Set to hidden by default
                style={{
                    backgroundImage: `url(${image2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <span className='text-white'>{getFirstFewSentences(gym.description, 1)}</span>
            </div>
        </div>
    );
}

export default GymCardHome;