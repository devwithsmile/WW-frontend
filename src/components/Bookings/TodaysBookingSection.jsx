import React, { useEffect, useState } from 'react'
import imageforPage from '../../assets/images/signin.jpg'
import api from '../../api/axios'
import moment from 'moment'
import { toast } from 'react-toastify'
import { data } from 'autoprefixer'

function TodaysBookingSection({ todayBookings = [] }) {
  const [gymImage, setGymImage] = useState(null)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [duration, setDuration] = useState(1); // needs to change dyanamically later. currently not setting to 0 bcuz backend will send error  

  useEffect(() => {
    if (todayBookings.length > 0) {
      const todayDate = moment().format('DD/MM/YYYY'); // Replace '/' with '-' for the API call

      api
        .get(`users/bookings/images?date=${todayDate}`)
        .then((response) => {
          setGymImage(response.data[0].image_urls[0])
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

  const booking = todayBookings[0];

  const gymName = booking.gym_name || 'Gym Name'
  const bookingDate = formatDate(booking.date) || 'Booking Date'
  const bookingSlot = `${booking.from} - ${booking.to}` || 'Booking Slot'
  const welcomeMessage = `Welcome to ${gymName}!`

  // Extend request goes here
  const handleExtend = async () => {

    const response = await api.post(`/bookings/extends`, {
      "bookingId": booking._id,
      "duration": duration
    })

    if (response.status == 201) {
      toast.success("Extension requested. Please wait for Gym's response")
    }

  }
  // Cancel request goes here
  const handleCancel = async () => {
    const response = await api.patch('/bookings/cancel', {
      "bookingId": booking._id
    })

    if (response.status == 200) {
      toast.success("your booking has been cancelled.")
    }
  }

  return (
    <>
      <h3 className='mb-4 text-lg font-bold'>Today{"'"}s Bookings</h3>
      <div className='flex flex-col items-center justify-center w-full mb-6 shadow-lg lg:flex-row'>
        {/* Gym Image */}
        <div className='flex-none w-full lg:w-[30rem] h-[15rem] overflow-hidden relative'>
          <img
            src={gymImage || imageforPage}
            alt='Gym Image'
            className='object-cover w-full h-full'
          />
        </div>

        <div className='w-full px-3 my-3 md:px-6'>
          {/* Gym Content */}
          <div className='flex flex-col items-center justify-between md:flex-row md:items-start'>
            <div className='w-full'>
              <h2 className='text-xl font-bold'>{gymName}</h2>
              <p className='text-sm text-gray-400'>{welcomeMessage}</p>
            </div>
            <div className='flex flex-row justify-between w-full mt-2 md:flex-col md:text-right md:mt-0'>
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
                    className={`text-2xl cursor-pointer ${(hover || rating) >= star
                      ? 'text-red-500'
                      : 'text-gray-600'
                      }`}
                    onClick={async () => setRating(
                      star,
                      await api.patch('/bookings/ratings', {
                        "booking_id": booking._id,
                        "rating": rating
                      })

                    )}
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
          <div className='flex flex-col items-center justify-center mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:justify-end'>
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
