import React, { useState, useEffect, useRef } from 'react';
import { FiMapPin, FiSearch, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import WWButton from '../../components/WWButton';
import GymCard from '../../components/GymCard';
import config from '../../config';
import api from '../../api/axios';

const SearchPage = () => {
  const [gyms, setGyms] = useState([]);
  const [filteredGyms, setFilteredGyms] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [citiesLoaded, setCitiesLoaded] = useState(false); // New state variable
  const [selectedPosition, setSelectedPosition] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (citiesLoaded) {
      getCurrentLocation();
    }
  }, [citiesLoaded]);


  useEffect(() => {
    if(selectedCity)
    fetchGymsInTheCity();
  }, [selectedCity]);

  useEffect(() => {
    if(selectedPosition) {
      setFilteredGyms(sortGymsByDistance(gyms, selectedPosition.latitude, selectedPosition.longitude));
    }
  }, [selectedPosition]);

  //to handle the dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const searchGymsByName = (e) => {
    const name = e.target.value;
    if (name) {
      const filtered = gyms.filter(gym => gym.gym_name.toLowerCase().includes(name.toLowerCase()));
      setFilteredGyms(filtered);
    } else setFilteredGyms(gyms);
  };

  const fetchGymsInTheCity = async (city) => {
    try {
      const res = await api.get(`/gyms/search`, {
        params: { city: selectedCity.name }
      });
      setGyms(res.data);
      setFilteredGyms(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCities = async () => {
    try {
      const res = await api.get(`/cities`);
      setCities(res.data);
      setCitiesLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedPosition({ latitude: city.latitude, longitude: city.longitude });
    setDropdownOpen(false);
    // Add any additional logic for when a city is selected
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        findNearestCity(latitude, longitude);
        setSelectedPosition({ latitude, longitude });
      }, error => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const findNearestCity = (latitude, longitude) => {
    const nearestCity = cities.reduce((prev, curr) => {
      const prevDistance = haversineDistance(latitude, longitude, prev.latitude, prev.longitude);
      const currDistance = haversineDistance(latitude, longitude, curr.latitude, curr.longitude);
      return (prevDistance < currDistance) ? prev : curr;
    });

    setSelectedCity(nearestCity);
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => x * Math.PI / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const sortGymsByDistance = (gyms, userLatitude, userLongitude) => {
    return gyms.map(gym => {
      const { latitude, longitude } = gym.map_detail;
      const distance = haversineDistance(userLatitude, userLongitude, latitude, longitude);
      return { ...gym, distance };
    }).sort((a, b) => a.distance - b.distance);
  };

  const sortByNearestTime = () => {
    // Sort gyms by nearest available time slot
    const sortedGyms = gyms.sort((a, b) => {
      const getEarliestTime = (slots) => {
        const times = slots.flatMap(slot => slot.slots.map(s => s.from));
        return new Date(`1970-01-01T${Math.min(...times.map(time => new Date(`1970-01-01T${time}:00Z`).getTime()))}Z`);
      };

      const nearestTimeA = getEarliestTime(a.slots);
      const nearestTimeB = getEarliestTime(b.slots);
      return nearestTimeA - nearestTimeB;
    });

    setGyms(sortedGyms);
  };

  const sortByDistance = () => setFilteredGyms(sortGymsByDistance(filteredGyms, selectedPosition.latitude, selectedPosition.longitude));
  const sortByPrice = () => setFilteredGyms([...filteredGyms].sort((a, b) => a.price - b.price));
  const sortByRating = () => setFilteredGyms([...filteredGyms].sort((a, b) => b.average_rating - a.average_rating));
  const sortByTime = () => sortByNearestTime(filteredGyms);


  //set the height of the dropdown
  const divRef = useRef(null);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = `${window.innerHeight-150}px`;
    }
  }, [dropdownOpen]);

  return (
    <div className="searchPage bg-black mx-auto px-4" style={{ minHeight: "calc(100vh - 220px)" }}>
      <div className="flex items-center justify-between space-x-2 p-3 bg-black">
        <div className="flex items-center justify-between space-x-2 p-3" style={{ flexBasis: '50%' }}>
          <div className="relative" ref={dropdownRef}>
            <button style={{ minWidth: '15rem' }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-red-600 text-white py-2 px-4 flex justify-center items-center"
            >
              <FiMapPin className="w-5 h-5 mr-2" />
              <span>{selectedCity.name}</span>
              <FiChevronDown className="w-5 h-5 ml-2" />
            </button>
            {dropdownOpen && (
              <div ref={divRef} className="absolute mt-2 w-full bg-red-600 shadow-lg z-10 overflow-auto">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    onClick={() => handleCityChange(city)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white"
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-full">
            <input type="text" id="gymName" name="gymName" placeholder="Search GYM"
              className="w-full px-3 py-2 pr-10 border bg-wwbg text-white focus:outline-none focus:border-red-500"
              onChange={searchGymsByName} />
            <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
          </div>
        </div>
        <div className="sort-by flex items-center space-x-3 p-3" style={{ flexBasis: '30%' }}>
          <WWButton variant="v1" minWidth="8rem" text="Sort By" />
          <WWButton variant="v3" minWidth="6rem" text="Distance" className="rounded-full" onClick={sortByDistance} />
          <WWButton variant="v3" minWidth="6rem" text="Time" className="rounded-full" onClick={sortByTime} />
          <WWButton variant="v3" minWidth="6rem" text="Price" className="rounded-full" onClick={sortByPrice} />
          <WWButton variant="v3" minWidth="6rem" text="Rating" className="rounded-full" onClick={sortByRating} />
          {/* <button className="bg-red-600  text-white py-2 px-2 rounded-md min-w-[10rem]">Sort By</button>
          <button className="bg-gray-900 text-white py-2 px-2 rounded-md min-w-[10rem]">Distance</button>
          <button className="bg-gray-900 text-white py-2 px-2 rounded-md min-w-[10rem]">Time</button>
          <button className="bg-gray-900 text-white py-2 px-2 rounded-md min-w-[10rem]">Price</button>
          <button className="bg-gray-900 text-white py-2 px-2 rounded-md min-w-[10rem]">Rating</button> */}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 px-6">
        {filteredGyms.map((gym, index) => (
          <GymCard
            key={index}
            gymName={gym.gym_name}
            imageSrc={gym.images[0]}
            rating={gym.average_rating}
            gymId={gym._id}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchPage
