import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { IoCloseSharp } from 'react-icons/io5'
import useAuth from '../../hooks/useAuth'
import config from '../../config.js'
import signin_img from '../../assets/images/signin.jpg'
import { deleteCookie } from '../../utils/auth.jsx'
import { IntervalTimer } from '../../utils/intervalTimer'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { isAuthenticated, refreshAuthState, updateUserState } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/home' // Get redirect location or provide fallback

  const notify = () =>
    toast.error(
      "You're currently logged in. To use a different account, please logout and try again."
    )

  useEffect(() => {
    if (isAuthenticated) {
      notify()

      const interval = IntervalTimer(() => {
        navigate('/home')
      }, 1)

      return () => clearInterval(interval)
    }
  })

  const onSubmit = async (data) => {
    deleteCookie()
    try {
      const response = await axios.post(
        `${config.BASE_BACKEND_URL}/api/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      // Handle successful login
      if (response.status === 200) {
        toast.success(response.data.message)

        updateUserState({
          message: response.data.message,
          profileImage:
            'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
        })

        console.log('Logged In data : ', response.data)

        // Redirect the user to the home page or dashboard
        // After successful login, refresh authentication state
        refreshAuthState()
        navigate(from, { replace: true })
      }
    } catch (error) {
      console.error('Error during login:', error)

      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data

        if (errors.global) {
          toast.error(errors.global)
        }
      }
    }
  }

  return (
    <div className='flex flex-col justify-center relative lg:flex-row h-screen'>
      <button
        onClick={() => navigate(-1)}
        className='absolute top-4 left-4 text-red-500'
      >
        <IoCloseSharp size={24} />
      </button>

      {/* Left side with form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12'>
        <div className='w-full max-w-md wwbg text-white flex flex-col justify-center p-6 md:p-12 shadow-lg'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-center mb-4'>
            <h2 className='text-2xl md:text-3xl font-semibold text-center md:text-left mb-2 md:mb-0'>
              Welcome back
              <span className='mx-1 font-bold text-red-700'>,</span>
            </h2>
            <h2 className='text-2xl md:text-3xl font-semibold text-center md:text-left'>
              Gym Geor
            </h2>
          </div>
          <p className='text-sm text-gray-300 mb-8 text-center md:text-start'>
            Don’t have an account?{' '}
            <Link to='/register' className='text-red-500 underline'>
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label
                className='block text-sm font-medium mb-1 wwred'
                htmlFor='email'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                placeholder='abc@example.com'
                {...register('email', { required: 'Email is required' })}
                className={`w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                }  bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
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
              <div>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    autoComplete='new-password'
                    placeholder='**************'
                    {...register('password', {
                      required: 'Password is required',
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
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type='submit'
              className='w-full bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign In
            </button>
          </form>

          <div className='flex items-center my-6'>
            <div className='flex-grow border-t border-red-600'></div>
            <span className='mx-4 text-white-400'>Or</span>
            <div className='flex-grow border-t border-red-600'></div>
          </div>

          <button className='w-full flex items-center justify-center bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full mb-2 text-center border border-wwred'>
            <FcGoogle className='w-6 h-6 mr-2' alt='Google Logo' />
            Continue with Google
          </button>
        </div>
      </div>

      {/* Right side with image, hidden on mobile */}
      <div className='hidden lg:block lg:w-1/2 bg-cover bg-center'>
        <img
          src={signin_img}
          alt='Workout'
          className='object-cover w-full h-full grayscale'
        />
      </div>
    </div>
  )
}

export default Login
