import React, { useEffect, useState } from 'react'
import { FaPhone, FaEnvelope } from 'react-icons/fa'


function ContactGYM({ phone, email }) {

  return (
    <>
      <div className='w-auto p-4 shadow-lg md:p-8'>
        <div className='mb-4 font-bold text-white'>Contact Information</div>
        <div className='flex items-center mb-4 ml-4'>
          <FaPhone className='mr-2 text-red-500' />
          <span className='font-medium text-gray-300'>Phone:</span>
          <a href={`tel:${phone}`} className='ml-2 text-gray-300 hover:underline'>
            {phone}
          </a>
        </div>
        <div className='flex items-center ml-4'>
          <FaEnvelope className='mr-2 text-red-500' />
          <span className='font-medium text-gray-300'>Email:</span>
          <a
            href={`mailto:${email}`}
            className='ml-2 text-gray-300 hover:underline'
          >
            {email}
          </a>
        </div>
      </div>
    </>

  )
}

export default ContactGYM
