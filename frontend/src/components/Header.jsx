import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className='flex justify-center px-4'>
      <div className='bg-gradient-to-r from-primary to-pink-800 flex flex-col md:flex-row justify-between items-center w-full max-w-[90vw] m-5 rounded-2xl p-6'>

        {/* Left Content */}
        <div className='text-center md:text-left flex flex-col items-center md:items-start'>
          <div className='text-white text-3xl sm:text-4xl md:text-5xl font-bold p-2 m-2'>
            <p>Book Free Session <br /> With Our Trusted Mentors</p>
          </div>

          <div className='flex flex-col md:flex-row items-center w-full md:w-[700px] p-5 m-5'>
            <div className='p-2 m-2'>
              <img className='w-32 sm:w-40 md:w-48 lg:w-[200px]' src={assets.group_profiles} alt="Group Profiles" />
            </div>
            <div className='text-white text-lg sm:text-xl text-center md:text-left'>
              <p>Browse through our extensive list of trusted mentors and schedule your free session.</p>
            </div>
          </div>

          <div className='mx-10 flex justify-center md:justify-start'>
            <button className='flex items-center bg-white rounded-3xl px-4 py-3 sm:px-6 sm:py-4 w-[140px] sm:w-[160px] text-[14px] sm:text-[16px] text-gray-800 font-medium hover:w-[145px] sm:hover:w-[165px] hover:text-[15px] sm:hover:text-[18px] hover:font-bold duration-500 ease-in-out'>
              Book Session <img className="ml-2 w-5 sm:w-6" src={assets.arrow_icon} alt="Arrow Icon" />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className='mt-6 md:mt-0'>
          <img className='w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px]' src={assets.header_img2} alt="Header Image" />
        </div>
        
      </div>
    </div>
  );
};

export default Header;
