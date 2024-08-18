import React, { useEffect, useState } from 'react'
import axios from 'axios'
import imageforPage from '../../assets/images/signin.jpg'

function TodaysBookingSection({ todayBookings = [] }) {
  const [gymImage, setGymImage] = useState(null)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    if (todayBookings.length > 0) {
      const booking = todayBookings[0]
      const bookingDate = booking.date.replace(/\//g, '-') // Replace '/' with '-' for the API call

      axios
        .get(`http://localhost:3000/users/bookings/images?date=${bookingDate}`)
        .then((response) => {
          setGymImage(response.data.imageUrl)
        })
        .catch((error) => {
          console.error('Error fetching gym image:', error)
          setGymImage(
            'https://workoutwingsbucket.s3.ap-south-1.amazonaws.com/owner/undefined/1723725094241_5am-fitness-namakkal-gyms-7fdsqtemq4.avif'
          ) // Fallback if image fetching fails
        })
    }
  }, [todayBookings])

  if (todayBookings.length === 0) {
    return <p className='text-center text-gray-500'>No bookings for today.</p>
  }

  function formatDate(inputDate) {
    const [day, month, year] = inputDate.split('/').map(Number)
    const date = new Date(year, month - 1, day) // Months are 0-based in JavaScript Date object
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const booking = todayBookings[0]
  const gymName = booking.gym_name || 'Gym Name'
  const bookingDate = formatDate(booking.date) || 'Booking Date'
  const bookingSlot = `${booking.from} - ${booking.to}` || 'Booking Slot'
  const welcomeMessage = `Welcome to ${gymName}!`

  // Extend request goes here
  const handleExtend = () => {}
  // Cancel request goes here
  const handleCancel = () => {}

  return (
    <>
      <h3 className='mb-4 text-lg font-bold'>Today{"'"}s Bookings</h3>
      <div className='w-full flex justify-center items-center flex-col shadow-lg lg:flex-row mb-6'>
        {/* Gym Image */}
        <div className='flex-none w-full lg:w-[30rem] h-[15rem] overflow-hidden relative'>
          <img
            src={gymImage || imageforPage}
            alt='Gym Image'
            className='w-full h-full object-cover'
          />
        </div>

        <div className='w-full my-3 px-3 md:px-6'>
          {/* Gym Content */}
          <div className='flex flex-col items-center justify-between md:flex-row md:items-start'>
            <div className='w-full'>
              <h2 className='text-xl font-bold'>{gymName}</h2>
              <p className='text-sm text-gray-400'>{welcomeMessage}</p>
            </div>
            <div className='w-full flex flex-row justify-between mt-2 md:flex-col md:text-right md:mt-0'>
              <p className='text-sm'>{bookingDate}</p>
              <p className='text-sm'>{bookingSlot}</p>
            </div>
          </div>

          {/* Review */}
          <div className='flex items-center mt-4'>
            <p className='mr-4'>How was your experience?</p>
            <div className='flex'>
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (star) => (
                  <span
                    key={star}
                    className={`text-2xl cursor-pointer ${
                      (hover || rating) >= star
                        ? 'text-red-500'
                        : 'text-gray-600'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                )
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className='flex flex-col space-y-4 items-center justify-center mt-6 sm:flex-row sm:space-y-0 sm:space-x-4 md:justify-end'>
            <button
              type='button'
              onClick={handleExtend}
              className='w-full md:w-40 px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Extend Session
            </button>
            <button
              type='button'
              onClick={handleCancel}
              className='w-full md:w-40 px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodaysBookingSection
