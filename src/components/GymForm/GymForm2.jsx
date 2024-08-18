import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { PiCurrencyInrLight } from 'react-icons/pi'
import PropTypes from 'prop-types'
import dataStates from '../../data/states.json'

const GAP_FROM_TOP = 150 // When submitting focusing on input will give 150 gap on top
// Price-related constants
const PRICE = {
  DEFAULT: 150,
  MAX: 500,
  MIN: 1,
}
// Facilities constants
const FACILITIES = [
  'Shower',
  'Locker',
  'Air Conditioning',
  'Parking',
  'Cardio',
  'Calisthenics',
  'Steam Room',
  'Yoga Studio',
]

const states = dataStates // data for states (address)
const GymForm2 = ({ onSubmit, initialData, onPrevious }) => {
  const {
    handleSubmit,
    control,
    watch,
    setFocus,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: PRICE.DEFAULT,
      ...initialData,
    },
  })

  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0]
    if (firstErrorField) {
      setFocus(firstErrorField)
      setTimeout(() => {
        const element = document.getElementById(firstErrorField)
        if (element) {
          // Calculate the desired scroll position
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top: elementPosition - GAP_FROM_TOP,
            behavior: 'smooth',
          })
        }
      }, 100) // Timeout to ensure focus has been set
    }
  }, [errors, setFocus])

  useEffect(() => {
    const values = getValues()

    if (values.googleMapsLink) {
      setDisplayValue(values.googleMapsLink.replace(/^https:\/\//, ''))
    }
  }, [getValues])

  const fileInputRef = useRef(null)
  const [displayValue, setDisplayValue] = useState('')

  // Watch fields
  const watchFacilities = watch('facilities', [])
  const watchImages = watch('images')
  const price = watch('price')

  // setting the price
  const handleSliderChange = (event) => {
    setValue('price', event.target.value)
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click()
  }

  const handleRemoveImage = (index, onChange, value) => {
    const updatedImages = value.filter((_, idx) => idx !== index)
    onChange(updatedImages)
  }

  return (
    <div className='flex items-center justify-center bg-wwbg text-white mt-4 md:my-12'>
      <div className='w-full max-w-2xl bg-wwbg shadow-lg p-8'>
        <p className='mt-2 mb-8'>
          To ensure we present your gym in the best light and provide essential
          information to our members, please complete the onboarding form below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Description */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold mb-4 text-wwred'>
              Description
            </h3>
            <p className='mb-2'>Add a short description about your gym</p>
            <Controller
              name='description'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder='Description'
                  className='w-full px-3 py-2 h-28 border border-gray-600 bg-wwbg text-white focus:outline-none focus:border-red-500'
                />
              )}
            />
          </div>

          {/* Address */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold mb-4 text-wwred'>Address</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Address Line 1 */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 text-white'
                  htmlFor='addressLine1'
                >
                  Address Line 1<span className='text-red-500'>*</span>
                </label>
                <Controller
                  name='addressLine1'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Address Line 1 is required',
                    minLength: {
                      value: 3,
                      message:
                        'Address Line 1 must be at least 3 characters long',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder='Address 1'
                      className={`w-full px-3 py-2 border ${
                        errors.addressLine1
                          ? 'border-red-500'
                          : 'border-gray-600'
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                {errors.addressLine1 && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.addressLine1.message}
                  </p>
                )}
              </div>
              {/* Address Line 2 */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 text-white'
                  htmlFor='addressLine2'
                >
                  Address Line 2
                </label>
                <Controller
                  name='addressLine2'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder='Address 2'
                      className='w-full px-3 py-2 border border-gray-600 bg-wwbg text-white focus:outline-none focus:border-red-500'
                    />
                  )}
                />
              </div>
              {/* City */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 text-white'
                  htmlFor='city'
                >
                  City<span className='text-red-500'>*</span>
                </label>
                <Controller
                  name='city'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'City is required',
                    minLength: {
                      value: 2,
                      message: 'City must be at least 2 characters long',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder='City'
                      className={`w-full px-3 py-2 border ${
                        errors.city ? 'border-red-500' : 'border-gray-600'
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                {errors.city && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.city.message}
                  </p>
                )}
              </div>
              {/* State Dropdown */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 text-white'
                  htmlFor='state'
                >
                  State<span className='text-red-500'>*</span>
                </label>
                <Controller
                  name='state'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'State is required' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full px-3 py-2 border ${
                        errors.state ? 'border-red-500' : 'border-gray-600'
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    >
                      <option className='text-muted' value=''>
                        Select State
                      </option>
                      {states.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.state && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.state.message}
                  </p>
                )}
              </div>
              {/* Pincode Dropdown */}
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium mb-1 text-white'
                  htmlFor='pincode'
                >
                  PIN Code<span className='text-red-500'>*</span>
                </label>
                <Controller
                  name='pincode'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'PIN Code is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'PIN Code must be exactly 6 digits',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder='PIN'
                      className={`w-full px-3 py-2 border ${
                        errors.pincode ? 'border-red-500' : 'border-gray-600'
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                {errors.pincode && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing and Location */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold mb-4 text-wwred'>
              Pricing and Location
            </h3>
            {/* Google Maps Link */}
            <div className='mb-4'>
              <label
                className='block text-sm font-medium mb-1 text-white'
                htmlFor='googleMapsLink'
              >
                Google Maps Link
              </label>
              <div className='relative'>
                <Controller
                  name='googleMapsLink'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <input
                      {...field}
                      value={displayValue}
                      onChange={(e) => {
                        const val = e.target.value
                        setDisplayValue(val.replace(/^https:\/\//, ''))
                        field.onChange(e)
                      }}
                      onBlur={() => {
                        if (displayValue) {
                          // Make sure the value in the form is updated to include `https://`
                          setValue('googleMapsLink', `https://${displayValue}`)
                        }
                      }}
                      className={`w-full pl-16 px-3 py-2 border ${
                        errors.googleMapsLink
                          ? 'border-red-500'
                          : 'border-gray-600'
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                <span className='absolute top-0 left-0 pl-3 py-2 text-gray-500 bg-transparent'>
                  https://
                </span>
              </div>
              {errors.googleMapsLink && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.googleMapsLink.message}
                </p>
              )}
            </div>
            {/* Max Occupants */}
            <div className='mb-4 w-full md:w-1/2'>
              <label
                className='block text-sm font-medium mb-1 text-white'
                htmlFor='maxOccupants'
              >
                Max Customers<span className='text-red-500'>*</span>
              </label>
              <Controller
                name='maxOccupants'
                control={control}
                defaultValue=''
                rules={{
                  required: 'Maximum number of customers is required',
                  min: {
                    value: 1,
                    message: 'Number of customers must be at least 1',
                  },
                  max: {
                    value: 100,
                    message: 'Number of customers must be below 100',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Please enter a valid number',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter maximum number'
                    type='number'
                    min='1'
                    className={`w-full px-3 py-2 border ${
                      errors.maxOccupants ? 'border-red-500' : 'border-gray-600'
                    } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                  />
                )}
              />
              {errors.maxOccupants && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.maxOccupants.message}
                </p>
              )}
            </div>
            {/* Price */}
            <div className='mb-4'>
              <label
                className='block text-sm font-medium mb-1 text-white'
                htmlFor='price'
              >
                Price (per hour)<span className='text-red-500'>*</span>
              </label>
              <Controller
                name='price'
                control={control}
                defaultValue={PRICE.DEFAULT}
                rules={{
                  min: {
                    value: 1,
                    message: 'Price must be at least 1',
                  },
                  max: {
                    value: 1000,
                    message: 'Price cannot exceed 1000',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <div className='flex flex-col items-center'>
                    <input
                      type='range'
                      min={PRICE.MIN}
                      max={PRICE.MAX}
                      step='1'
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value)
                        handleSliderChange(e)
                      }}
                      className='w-full accent-red-600'
                    />
                    <div className='flex items-center text-red-600 font-semibold mt-2'>
                      <PiCurrencyInrLight size={16} />
                      {value}
                    </div>
                  </div>
                )}
              />
              {errors.price && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Upload Images */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold mb-4 text-wwred'>
              Upload Images
            </h3>
            <p className='mb-2'>
              Add a minimum of four well-lit photographs of your gym.
            </p>
            <Controller
              name='images'
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <div className='flex flex-wrap items-center justify-start gap-3 '>
                  {value &&
                    value.length > 0 &&
                    value.map((img, idx) => (
                      <div
                        key={idx}
                        className='relative w-28 h-28 bg-wwbg border border-gray-600'
                      >
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Gym Photo ${idx + 1}`}
                          className='h-full w-full object-cover'
                        />
                        <button
                          type='button'
                          className='absolute top-0 right-2 bg-transparent'
                          onClick={() =>
                            handleRemoveImage(idx, onChange, value)
                          }
                        >
                          <span className='text-red-500 font-medium text-lg'>
                            x
                          </span>
                        </button>
                      </div>
                    ))}
                  <div
                    className='relative w-28 h-28 bg-wwbg flex items-center justify-center border border-gray-600 cursor-pointer'
                    onClick={handleFileInputClick}
                  >
                    <span className='text-red-500 text-3xl'>+</span>
                  </div>
                  <input
                    type='file'
                    multiple
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={(e) => {
                      const files = Array.from(e.target.files)
                      onChange([...value, ...files])
                    }}
                    className='hidden'
                  />
                </div>
              )}
            />
          </div>

          {/* Facilities */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold mb-4 text-wwred'>
              Facilities
            </h3>
            <p className='mb-2'>
              Select all of the facilities available at your gym
            </p>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {FACILITIES.map((facility) => (
                <label
                  key={facility}
                  className='flex items-center cursor-pointer'
                >
                  <Controller
                    name='facilities'
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <div
                          className='relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-wwbg border cursor-pointer transition-all duration-300 ease-in-out border-gray-600'
                          onClick={() => {
                            const updatedFacilities = value.includes(facility)
                              ? value.filter((f) => f !== facility)
                              : [...value, facility]
                            onChange(updatedFacilities)
                          }}
                        >
                          {value.includes(facility) && (
                            <span className='text-2xl absolute text-red-500'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                        <span className='text-base ml-2 font-base text-white'>
                          {facility}
                        </span>
                      </>
                    )}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Agreement */}
          <div className='space-y-2'>
            <div className='flex items-center space-x-4 mt-12'>
              <Controller
                name='agreement'
                control={control}
                defaultValue={false}
                rules={{
                  required: 'You must agree to the terms and conditions',
                }}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <div
                      className='relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-wwbg border cursor-pointer transition-all duration-300 ease-in-out border-gray-600'
                      onClick={() => onChange(!value)}
                    >
                      {value && (
                        <span className='text-red-500 absolute text-2xl'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              />
              <span className='ml-2'>
                I certify that all information provided is accurate and agree to
                the Terms and Conditions of WorkoutWings
              </span>
            </div>
            {errors.agreement && (
              <p className='text-red-500'>{errors.agreement.message}</p> // Add this line to display error message
            )}
          </div>

          {/* Buttons */}
          <div className='flex space-x-2 mt-6 text-center'>
            <button
              type='button'
              onClick={() => onPrevious(getValues())}
              className='w-full px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred'
            >
              Previous
            </button>
            <button
              type='submit'
              className='w-full px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

GymForm2.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    description: PropTypes.string,
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    pincode: PropTypes.string,
    googleMapsLink: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    images: PropTypes.arrayOf(PropTypes.instanceOf(File)),
    facilities: PropTypes.arrayOf(PropTypes.string),
    agreement: PropTypes.bool,
  }),
  onPrevious: PropTypes.func.isRequired,
}

export default GymForm2
