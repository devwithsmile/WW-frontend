import React from 'react';

function BookingCard() {
    return (
        <div className='flex p-4 bg-white border border-gray-300 rounded-md shadow-md'>
            <div className='flex items-center justify-center w-1/4 overflow-hidden bg-gray-200 rounded-md'>
                <div>Image</div>
            </div>
            <div className='flex flex-col justify-between w-1/2 px-4'>
                <div>Info</div>
            </div>
            <div className='flex flex-col items-end justify-between w-1/4'>
                <div className='text-gray-600'>Date and Time</div>
                <div className='flex space-x-2'>
                    <button className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600'>Button 1</button>
                    <button className='px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600'>Button 2</button>
                </div>
            </div>
        </div>
    );
}

export default BookingCard;