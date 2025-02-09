import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex justify-center'>
      <div className='bg-gradient-to-r from-primary to-pink-800 flex justify-between items-center w-[90vw] m-5 rounded-2xl'>
        <div className=''>
          <div className='text-white text-5xl text-center p-2 m-2 font-bold'>
            <p>Book Free Session <br /> With Our Trusted Mentors</p>
          </div>
          <div className='flex items-center w-[700px] p-5 m-5'>
            <div className='p-2 m-2'>
              <img className='w-[200px]' src={assets.group_profiles} alt="" />
            </div>
            <div className='text-white text-xl'>
              <p>
                Browse through our extensive list of trusted mentors and schedule your free session.
              </p>
            </div>
          </div>
          <div className='mx-10 '>
            <button className='flex items-center bg-white rounded-3xl p-2 m-2 w-[160px] h-[60px] gap-1.5 text-[16px] text-gray-800 font-medium hover:w-[165px] hover:h-[65px] hover:text-[18px] hover:font-bold  duration-500 ease-in-out'>Book Session <img src={assets.arrow_icon} alt="" /></button>
          </div>

        </div>


        <div>

          <img className='w-2xl' src={assets.header_img2} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header
