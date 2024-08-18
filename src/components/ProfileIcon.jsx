import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'

const ProfileIcon = ({ imageUrl, onClick }) => {
  return (
    <div className='rounded-full overflow-hidden flex items-center justify-center'>
      {imageUrl ? (
        <div className='w-9 h-9'>
          <img
            src={imageUrl}
            alt='Profile'
            className='cursor-pointer'
            onClick={onClick}
          />
        </div>
      ) : (
        <FaUserCircle
          size={30}
          className='text-red-700 cursor-pointer'
          onClick={onClick}
        />
      )}
    </div>
  )
}

ProfileIcon.propTypes = {
  imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClick: PropTypes.func.isRequired,
}

export default ProfileIcon
