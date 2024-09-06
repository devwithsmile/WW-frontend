import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

import api from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAboutLoadingFalse, setAboutLoadingTrue } from '../../redux/aboutSectionSlice'
import { setBookNowLoadingFalse, setBookNowLoadingTrue } from '../../redux/bookNowSlice'
import { setCarouselLoadingFalse, setCarouselLoadingTrue } from '../../redux/CarouselSlice'
import { setContactGymLoadingFalse, setContactGymLoadingTrue } from '../../redux/contactGymSlice'
import { setCurrentLocationLoadingFalse, setCurrentLocationLoadingTrue } from '../../redux/currentLocationSlice'
import { setFacilitiesLoadingFalse, setFacilitiesLoadingTrue } from '../../redux/facilitiesSlice'


const Carousel = lazy(() => import('../../components/GymDetails/Carousel'));
const BookNow = lazy(() => import('../../components/GymDetails/BookNow'));
const Facilities = lazy(() => import('../../components/GymDetails/Facilites')); // Ensure correct component name
const CurrentLocationMap = lazy(() => import('../../components/GymDetails/CurrentLocationMap'));
const AboutSection = lazy(() => import('../../components/GymDetails/AboutSection'));
const ContactGYM = lazy(() => import('../../components/GymDetails/ContactGYM'));
const GymDetailsSkeleton = lazy(() => import('../../components/Skeletons/GymDetailsSkeleton'));


function GymDetailsPage() {
  const { id } = useParams() // Here we have the GymID
  const [gymDetails, setGymDetails] = useState(null)
  const [error, setError] = useState(null)

  // Select loading states from Redux
  const aboutSectionLoading = useSelector((state) => state.isGymDetailsLoading.aboutSection.loading);
  const bookNowLoading = useSelector((state) => state.isGymDetailsLoading.bookNow.loading);
  const carouselLoading = useSelector((state) => state.isGymDetailsLoading.carousel.loading);
  const contactGymLoading = useSelector((state) => state.isGymDetailsLoading.contactGym.loading);
  const currentLocationLoading = useSelector((state) => state.isGymDetailsLoading.currentLocation.loading);
  const facilitiesLoading = useSelector((state) => state.isGymDetailsLoading.aboutSection.loading);

  // Check if any component is still loading
  const isLoading = carouselLoading || aboutSectionLoading || bookNowLoading || facilitiesLoading || contactGymLoading || currentLocationLoading;
  const dispatch = useDispatch();
  

  function dispatchToFalse() {
    dispatch(setAboutLoadingFalse());
    dispatch(setBookNowLoadingFalse())
    dispatch(setCarouselLoadingFalse())
    dispatch(setContactGymLoadingFalse())
    dispatch(setCurrentLocationLoadingFalse())
    dispatch(setFacilitiesLoadingFalse())
  }

  function dispatchToTrue() {
    dispatch(setAboutLoadingTrue());
    dispatch(setBookNowLoadingTrue())
    dispatch(setCarouselLoadingTrue())
    dispatch(setContactGymLoadingTrue())
    dispatch(setCurrentLocationLoadingTrue())
    dispatch(setFacilitiesLoadingTrue())
  }

  useEffect(() => {
    const fetchGymDetails = async () => {
      dispatchToTrue()
      try {
        const response = await api.get(`/gyms/${id}`);

        setGymDetails(response.data);
        dispatchToFalse()

      } catch (error) {
        setError('Error fetching gym details');
      }
    };

    fetchGymDetails();
  }, [id]); // Dependency on gymid to refetch if it changes

  if (isLoading || !gymDetails) { // Check overall loading state
    return <div><GymDetailsSkeleton /></div>; // Show loading until all components are ready
  }


  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='py-6 md:p-6'>
      <div className='mx-10 md:mx-16'>
        <div className='flex flex-col items-center justify-center md:items-start'>
          <h1 className='text-xl font-bold text-white md:text-2xl'>
            {gymDetails.gym_name ?? "GYM NAME"}
          </h1>
          <div className='flex items-center mt-2 space-x-2 text-gray-300 md:space-x-2 md:mt-0'>
            <span className='text-xs md:text-sm'>
              {gymDetails.address.city ?? "CITY"}, {gymDetails.address.state ?? "STATE"}
            </span>
            <div className='flex items-center space-x-1'>
              <FaStar className='text-red-500' />
              <span className='text-xs md:text-sm'>
                {(gymDetails.average_rating ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row'>
        {/* section 1 */}
        <section className='px-6 lg:w-2/3'>
          <Carousel images={gymDetails.images ?? []} />
          <AboutSection desc={gymDetails.description ?? "DESCRIPTION HERE..."} />
        </section>
        {/* section 2 */}
        <section className='px-6 space-y-4 lg:w-1/3'>
          <BookNow
            price={gymDetails.price ?? 19}
            gym_id={id ?? "66c9a765d76ca5af637c223b"}
            schedule={gymDetails.schedule ?? []}
          />
          <Facilities facilities={gymDetails.facilities ?? []} />
          <CurrentLocationMap
            location={{
              lat: gymDetails.map_detail.coordinates[1],
              lng: gymDetails.map_detail.coordinates[0],
            }}
          />
          <ContactGYM
            email={gymDetails.owner_id.email ?? "email@email.com"}
            phone={gymDetails.owner_id.phone_number ?? "790*******"}
          />
        </section>
      </div>
    </div>
  )
}

export default GymDetailsPage
