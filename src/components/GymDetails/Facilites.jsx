import React from 'react'
import { FaShower } from 'react-icons/fa'
import { GiPunchingBag, GiSteam, GiWeightLiftingUp } from 'react-icons/gi'
import { GrYoga } from 'react-icons/gr'
import { MdLocalParking } from 'react-icons/md'
import { PiLockers } from 'react-icons/pi'
import { TbAirConditioning, TbTreadmill } from 'react-icons/tb'

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
  if (!facilities || facilities.length === 0) {
    return <p>Facilities not mentioned</p>
  }

  return (
    <div className='w-auto p-4 md:p-8 shadow-lg'>
      <div className='font-bold text-white mb-4'>Facilities</div>
      <div className='grid sm:grid-cols-2 gap-y-2 text-gray-300'>
        {facilities.map((facility) => {
          const facilityData = availableFacilities[facility.toLowerCase()]
          if (!facilityData) return null

          const IconComponent = facilityData.icon
          return (
            <div key={facility} className='flex items-center'>
              <IconComponent
                className={`mr-2 ${
                  facility === 'air_condition' || facility === 'treadmill'
                    ? 'text-gray-300'
                    : 'text-red-500'
                }`}
              />
              <span className='text-gray-300'>{facilityData.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Facilities
