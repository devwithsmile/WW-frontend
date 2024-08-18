import React, { useState } from 'react'

function AboutSection({ desc = 'description here' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxLength = 500 // Number of characters to truncate at

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  // Determine whether to show the "Read More" button
  const shouldShowButton = desc.length > maxLength

  return (
    <div className='w-full min-h-1/2 shadow-lg mt-4 p-4 md:p-8'>
      <div className='pb-2 text-xl border-b border-red-600'>About</div>
      <p className='text-gray-300 mt-3'>
        {isExpanded ? desc : `${desc.slice(0, maxLength)}`}{' '}
        {shouldShowButton && (
          <button
            onClick={toggleReadMore}
            className='text-red-500 hover:underline'
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>
    </div>
  )
}

export default AboutSection

