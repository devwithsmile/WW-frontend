import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import config from '../../config.js';
import customPin from '../../assets/GmapPin.png'; // Import the image

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const defaultCenter = {
  lat: 73.7936168, // Default latitude (New York City)
  lng: 18.6300906, // Default longitude (New York City)
};

const CurrentLocationMap = ({ location }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.GMAP_API,
  });

  if (loadError) {
    return <div>Error loading map</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div className='w-auto p-4 shadow-lg md:p-8'>
      <div className='mb-4 font-bold text-white'>Location</div>
      <div className='w-full h-64 md:h-80'>
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
                scaledSize: { width: 40, height: 40 }, // Adjust the size as needed
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default CurrentLocationMap;