import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth.jsx'
import { toast } from 'react-toastify'
import api from '../api/axios.js'

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm()
  const modalRef = useRef(null)
  const { isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showExistingPassword, setShowExistingPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const password = watch('password')

  // Outside Click will close the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

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

  const closeModal = () => {
    reset() // Clear the form fields
    onClose()
  }

  const onSubmit = async (data) => {
    try {
      console.log('Inside reset password modal')

      const response = await api.post( `/user`,
        {
          existingPassword: data.existingPassword,
          password: data.password,
        }
      );

      // console.log(response)

      // Handle successful login
      if (response.status === 200) {
        // Redirect the user to the home page or dashboard
        // After successful login, refresh authentication state
        toast.success('Your password has been reset')
        closeModal()
      }
    } catch (error) {
      console.error('Error while reseting the password :', error)

      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data

        if (errors.global) {
          toast.error(errors.global)
        }
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-wwbg bg-opacity-70 z-50'>
      <div
        ref={modalRef}
        className='bg-wwbg p-6 rounded-lg shadow-lg w-full max-w-md mx-4'
      >
        <h2 className='text-lg font-semibold mb-4 text-center'>
          Reset Password
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='border-t-2 border-t-red-700 space-y-6'
        >
          <div className='mt-2 mb-6'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='existing_password'
            >
              Existing Password
            </label>
            <div className='relative'>
              <input
                type={showExistingPassword ? 'text' : 'password'}
                id='existing-password'
                placeholder='**************'
                {...register('existingPassword', {
                  required: 'Existing Password is required',
                })}
                className={`w-full px-3 py-2 border ${
                  errors.existingPassword ? 'border-red-500' : 'border-gray-600'
                } bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              <button
                type='button'
                onClick={() => setShowExistingPassword(!showExistingPassword)}
                className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500'
              >
                {showExistingPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </button>
            </div>
            {errors.existingPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.existingPassword.message}
              </p>
            )}
          </div>

          <div className='mb-6'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='password'
            >
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='**************'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  validate: {
                    hasUppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      'Password must include at least one uppercase letter',
                    hasLowercase: (value) =>
                      /[a-z]/.test(value) ||
                      'Password must include at least one lowercase letter',
                    hasNumber: (value) =>
                      /[0-9]/.test(value) ||
                      'Password must include at least one number',
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      'Password must include at least one special character',
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                } bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500'
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className='mb-6'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='confirm-password'
            >
              Confirm Password
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirm-password'
                placeholder='**************'
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Ensure both passwords are the same',
                })}
                className={`w-full px-3 py-2 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                } bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500'
              >
                {showConfirmPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className='flex justify-end gap-4'>
            <button
              type='button'
              onClick={closeModal}
              className='px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default ChangePasswordModal

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Ensures children is a valid React node
  onClose: PropTypes.func.isRequired, // Ensures children is a valid React node
}
