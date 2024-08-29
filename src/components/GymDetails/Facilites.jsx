import React, { useEffect, useState } from 'react'
import { FaShower } from 'react-icons/fa'
import { GiPunchingBag, GiSteam, GiWeightLiftingUp } from 'react-icons/gi'
import { GrYoga } from 'react-icons/gr'
import { MdLocalParking } from 'react-icons/md'
import { PiLockers } from 'react-icons/pi'
import { TbAirConditioning, TbTreadmill } from 'react-icons/tb'
import FacilitiesSkeleton from '../Skeletons/FacilitiesSkeleton'


const availableFacilities = {
  shower: { icon: FaShower, label: 'Shower' },
  locker: { icon: PiLockers, label: 'Lockers' },
  air_condition: { icon: TbAirConditioning, label: 'Air Condition' },
  parking: { icon: MdLocalParking, label: 'Parking' },
  cardio: { icon: TbTreadmill, label: 'Treadmill' },
  yoga: { icon: GrYoga, label: 'Yoga' },
  weightlifting: { icon: GiWeightLiftingUp, label: 'Weight Lifting' },
  punching_bag: { icon: GiPunchingBag, label: 'Punching Bag' },
  steam: { icon: GiSteam, label: 'Steam' },
}

function Facilities({ facilities }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate 4 seconds network delay
      setLoading(false);
    };

    fetchData();
  }, []);

  if (!facilities || facilities.length === 0) {
    return <p>No facilities mentioned.</p>
  }

  return (
    <>
      {loading ? (<FacilitiesSkeleton count={facilities.length} />) : (<div className='w-auto p-4 shadow-lg md:p-8'>
        <div className='mb-4 font-bold text-white'>Facilities</div >
        <div className='grid text-gray-300 sm:grid-cols-2 gap-y-2'>
          {facilities.map((facility) => {
            const facilityData = availableFacilities[facility.toLowerCase()]
            if (!facilityData) return null

            const IconComponent = facilityData.icon
            return (
              <div key={facility} className='flex items-center'>
                <IconComponent
                  className={`mr-2 ${facility === 'air_condition' || facility === 'treadmill'
                    ? 'text-gray-300'
                    : 'text-red-500'
                    }`}
                />
                <span className='text-gray-300'>{facilityData.label}</span>
              </div>
            )
          })}
        </div>
      </div >)
      }
    </>

  )
}

export default Facilities
