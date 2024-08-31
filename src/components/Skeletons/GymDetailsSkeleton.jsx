// GymDetailsSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the CSS for styling
import CarouselSkeleton from './CarouselSkeleton';
import AboutSectionSkeleton from './AboutSectionSkeleton';
import BookNowSkeleton from './BookNowSkeleton';
import FacilitiesSkeleton from './FacilitiesSkeleton';
import CurrentLocationMapSkeleton from './CurrentLocationMapSkeleton';
import ContactGYMSkeleton from './ContactGymSkeleton';

const GymDetailsSkeleton = () => {
    const baseColor = "#171717";
    const highlightColor = "#2e2727";
    return (
        <div className='py-6 md:p-6'>
            <div className='mx-10 md:mx-16'>
                <div className='flex flex-col items-center justify-center md:items-start'>
                    <Skeleton height={30} width={200} baseColor={baseColor} highlightColor={highlightColor} />
                    <div className='flex items-center mt-2 space-x-2 text-gray-300 md:space-x-2 md:mt-0'>
                        <span className='text-xs md:text-sm'>
                            <Skeleton width={100} baseColor={baseColor} highlightColor={highlightColor} />
                        </span>
                        <div className='flex items-center space-x-1'>

                            <span className='text-xs md:text-sm'>
                                <Skeleton width={30} baseColor={baseColor} highlightColor={highlightColor} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row'>
                {/* section 1 */}
                <section className='px-6 lg:w-2/3'>
                    <CarouselSkeleton />
                    <AboutSectionSkeleton />
                </section>
                {/* section 2 */}
                <section className='px-6 space-y-4 lg:w-1/3'>
                    <BookNowSkeleton />
                    <FacilitiesSkeleton />
                    <CurrentLocationMapSkeleton />
                    <ContactGYMSkeleton />
                </section>
            </div>
        </div>
    );
};

export default GymDetailsSkeleton;