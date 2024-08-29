import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CarouselSkeleton = () => {
  return (
    <div className='p-4 md:px-8 bg-[#2e2727]]'>
      {/* Main Image Skeleton */}
      <div className='h-56 md:h-96 '>
        <Skeleton height='100%' baseColor="#171717" highlightColor="#2e2727"/>
      </div>

      {/* Thumbnail Navigation Skeleton */}
      <div className='justify-between hidden mt-4 space-x-4 overflow-x-auto sm:flex bg-[#2e2727]'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className='w-1/5'
          >
            <Skeleton height={112} baseColor="#171717" highlightColor="#2e2727"/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarouselSkeleton