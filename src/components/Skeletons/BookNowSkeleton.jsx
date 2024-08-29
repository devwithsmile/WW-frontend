import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BookNowSkeleton = () => {
    return (
        <form className="p-4 space-y-6 shadow-lg bg-wwbg md:p-8">
            {/* Date */}
            <div className="flex flex-col items-start space-y-4">
                <Skeleton height={36} baseColor='#171717' highlightColor='#2e2727' className="w-full" width={350} />
            </div>



            <div >

                <div className="flex items-center justify-between ">
                    <Skeleton width={350} height={20} baseColor='#171717' highlightColor='#2e2727' />

                </div>


                <div className="flex items-center justify-between mt-8 ">
                    <Skeleton width={350} height={30} baseColor='#171717' highlightColor='#2e2727' />

                </div>

                <div className="flex items-center justify-between mt-2 bg-[#2e2727">
                    <Skeleton width={350} height={20} baseColor='#171717' highlightColor='#2e2727' />
                </div>
            </div>


            <div className="flex justify-center w-full">
                <Skeleton width={354} height={40} baseColor='#171717' highlightColor='#2e2727' />
            </div>
        </form>
    );
}

export default BookNowSkeleton;