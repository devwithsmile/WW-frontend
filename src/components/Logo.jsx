import React from 'react'
import { GiLibertyWing } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function Logo({ size }) {
    // Map size prop to Tailwind CSS text size classes
    const sizeClasses = {
        s: 'text-xl',   // Small size
        m: 'text-2xl', // Medium size
        l: 'text-3xl',   // Large size
        xl: 'text-4xl',  // Extra large size
    }

    // Get the class for the current size, default to 'text-base' if size is invalid
    const textSizeClass = sizeClasses[size] || 'text-base'
    
    return (
        <div className='inline'>
            <Link to="/" className={`logo flex items-center ${textSizeClass}`}>
                <span className={`text-red-700 raleway ${textSizeClass}`}>Workout</span>
                <GiLibertyWing className={`text-slate-50 inline pl-1 ${textSizeClass}`} />
            </Link>
        </div>
    )
}

export default Logo