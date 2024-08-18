import React, { useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenModal')
    if (!hasSeenModal) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('hasSeenModal', 'true')
  }

  // Disable Scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
      <div className='bg-wwbg text-white p-12 text-sm md:text-base  rounded-lg shadow-lg relative h-3xl max-w-3xl w-full'>
        <h2 className='text-sm md:text-2xl font-bold mb-4'>
          Welcome to WorkoutWings!
        </h2>
        <p className='mb-4'>
          To get started, please fill in your gym details. This information will
          help potential gym users find and book sessions at your gym.
        </p>
        <p className='mb-4'>
          By filling in the gym details, you will provide the following
          information to potential users:
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li>Gym name</li>
          <li>Address</li>
          <li>Contact information</li>
          <li>Available facilities</li>
          <li>Opening hours</li>
          <li>Booking policies</li>
        </ul>
        <p className='mb-4'>
          This will make it easier for users to find and choose your gym for
          their workouts.
        </p>
        {/* Submit Button */}
        <div className='mt-6 text-center w-full'>
          <button
            type='button'
            onClick={handleClose}
            className='px-4 py-2 bg-red-600 text-white hover:bg-red-700'
          >
            Next
          </button>
        </div>
        <button
          onClick={handleClose}
          className='absolute top-3 right-3 text-red-500'
        >
          <IoCloseSharp size={24} />
        </button>
      </div>
    </div>
  )
}

export default WelcomeModal
