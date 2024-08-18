import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import Carousel from '../../components/GymDetails/Carousel'
import BookNow from '../../components/GymDetails/BookNow'
import Facilities from '../../components/GymDetails/Facilites' // Ensure correct component name
import CurrentLocationMap from '../../components/GymDetails/CurrentLocationMap'
import AboutSection from '../../components/GymDetails/AboutSection'
import ContactGYM from '../../components/GymDetails/ContactGYM'
import api from '../../api/axios'

function GymDetailsPage() {
  const { id } = useParams() // Here we have the GymID
  const [gymDetails, setGymDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await api.get(`/gyms/${id}`)
        setGymDetails(response.data)
      } catch (error) {
        setError('Error fetching gym details')
      } finally {
        setLoading(false)
      }
    }

    fetchGymDetails()
  }, [id]) // Dependency on gymid to refetch if it changes

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='py-6 md:p-6'>
      <div className='mx-10 md:mx-16'>
        <div className='flex flex-col items-center justify-center md:items-start'>
          <h1 className='text-xl font-bold text-white md:text-2xl'>
            {gymDetails.gym_name}
          </h1>
          <div className='flex items-center mt-2 space-x-2 text-gray-300 md:space-x-2 md:mt-0'>
            <span className='text-xs md:text-sm'>
              {gymDetails.address.city}, {gymDetails.address.state}
            </span>
            <div className='flex items-center space-x-1'>
              <FaStar className='text-red-500' />
              <span className='text-xs md:text-sm'>
                {gymDetails.average_rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row'>
        {/* section 1 */}
        <section className='px-6 lg:w-2/3'>
          <Carousel images={gymDetails.images} />
          <AboutSection desc={gymDetails.description} />
        </section>
        {/* section 2 */}
        <section className='px-6 space-y-4 lg:w-1/3'>
          <BookNow
            price={gymDetails.price}
            gym_id={gymDetails.gym_id}
            schedule={gymDetails.schedule}
          />
          <Facilities facilities={gymDetails.facilities} />
          <CurrentLocationMap
            location={{
              lat: gymDetails.map_detail.latitude,
              lng: gymDetails.map_detail.longitude,
            }}
          />
          <ContactGYM
            email={gymDetails.owner_id.email}
            phone={gymDetails.owner_id.phone_number}
          />
        </section>
      </div>
    </div>
  )
}

export default GymDetailsPage
