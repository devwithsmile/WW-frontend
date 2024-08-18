import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import api from '../../api/axios.js'

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const [token, setToken] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Watch password field to use for validation
  const password = watch('password')

  // Get the token from the url
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const tokenFromQuery = queryParams.get('token')

    console.log('Token Params', tokenFromQuery)

    if (tokenFromQuery) {
      setToken(tokenFromQuery)
    } else {
      toast.error('Invalid reset link')
    }
  }, [location.search])

  const onSubmit = async (data) => {
    try {
      const response = await api.post(`/api/auth/resetpassword/${token}`, {
        password: data.password,
      })

      if (response.status === 200) {
        toast.success('Password reset successful')
        navigate('/login') // Redirect to login or another page
      }
    } catch (error) {
      console.error('Error while saving user details:', error)

      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data

        if (errors.global) {
          toast.error(errors.global)
        }
      }
    }
  }

  return (
    <div className='flex items-center justify-center h-[35rem] bg-wwbg text-white mt-4 md:my-12'>
      <div className='w-full max-w-md bg-wwbg shadow-lg p-8 rounded-lg'>
        <h2 className='text-3xl text-center font-semibold mb-8'>
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='mb-4'>
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
          </div>

          <div className='mb-6'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='confirm-password'
            >
              Confirm Password
            </label>
            <div>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirm-password'
                  placeholder='**************'
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password ||
                      'Ensure both passwords are the same',
                  })}
                  className={`w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? 'border-red-500'
                      : 'border-gray-600'
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
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
