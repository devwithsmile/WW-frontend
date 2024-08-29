import React, { useRef, useState, useEffect } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import CarouselSkeleton from '../Skeletons/CarouselSkeleton'

function Carousel({ images }) {
  const sliderRef = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate image loading delay
    const loadImages = () => {
      setTimeout(() => setLoading(false), 4000) // Adjust the delay as needed
    }

    loadImages()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  }

  const handleThumbnailClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index)
    }
  }

  if (loading) {
    return <CarouselSkeleton /> // Render the skeleton while loading
  }

  return (
    <div className='p-4 md:px-8'>
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index} className='h-56 md:h-96'>
            <img
              src={image}
              className='object-cover w-full h-full'
              alt={`carousel-${index}`}
            />
          </div>
        ))}
      </Slider>

      {/* Thumbnail Navigation */}
      <div className='justify-between hidden mt-4 space-x-4 overflow-x-auto sm:flex'>
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className='w-1/5 cursor-pointer'
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              className='object-cover w-full h-full'
              alt={`thumbnail-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Carousel