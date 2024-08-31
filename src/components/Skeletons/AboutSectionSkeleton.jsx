import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AboutSectionSkeleton = () => {
  return (
    <div className='w-full p-4 mt-4 shadow-lg min-h-1/2 md:p-8'>
      {/* Title Skeleton */}
      <div className='pb-2 text-xl border-b border-red-600 bg-[#2e2727]'>
        <Skeleton width={100} height={24} baseColor="#171717" highlightColor="#2e2727"/>
      </div>
      
      {/* Description Skeleton */}
      <div className='mt-3'>
        <Skeleton count={5} height={20} baseColor="#171717" highlightColor="#2e2727"/>
      </div>
    </div>
  )
}

export default AboutSectionSkeleton