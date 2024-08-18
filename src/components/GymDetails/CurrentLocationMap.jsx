import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import config from '../../config.js'
import customPin from '../../assets/GmapPin.png' // Import the image

const mapContainerStyle = {
  height: '100%',
  width: '100%',
}

const defaultCenter = {
  lat: 40.7128, // Default latitude (New York City)
  lng: -74.006, // Default longitude (New York City)
}

const CurrentLocationMap = ({ location }) => {
  return (
    <div className='w-auto p-4 md:p-8 shadow-lg'>
      <div className='font-bold text-white mb-4'>Location</div>
      <div className='w-full h-64 md:h-80'>
        <LoadScript googleMapsApiKey={config.GMAP_API}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location || defaultCenter}
            zoom={15}
          >
            {location && (
              <Marker
                position={location}
                icon={{
                  url: customPin, // Use the imported image as the icon
                  // Assuming the image is already sized appropriately
                  scaledSize: { width: 40, height: 40 }, // Adjust the size as needed
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  )
}

export default CurrentLocationMap
