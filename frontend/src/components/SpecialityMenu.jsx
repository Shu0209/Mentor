import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className='flex justify-center px-4'>
      <div className='max-w-[90vw] text-center'>
        <p className='text-3xl sm:text-4xl md:text-5xl font-bold m-2 p-2'>Find by Speciality</p>
        <p className='m-4 p-4 text-lg sm:text-xl md:text-2xl'>
          Browse through our extensive list of trusted mentors and schedule your free session.
        </p>

        {/* Speciality Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10 p-5 w-full'>
          {specialityData.map((item, index) => (
            <Link key={index} to={`/mentors/${item.speciality}`} className='flex flex-col items-center hover:scale-110 duration-300'>
              <img
                className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full transition-all duration-300'
                src={item.image}
                alt={item.speciality}
              />
              <p className='text-lg sm:text-xl md:text-2xl mt-2'>{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
