import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate=useNavigate();
  const [showMenu,setShowMenu]=useState(false);
  const [token,setToken]=useState(true);
  return (
    <div className='flex justify-between py-2 px-20 shadow-2xl h-32'>
      <div className='w-1/6 p-2 m-2'>
        <img className='' src={assets.Logo} alt="" />
      </div>
      <div className='p-2 m-2 w-3/6 text-2xl cursor-pointer'>
        <ul className='flex justify-between'>
          <NavLink to='/'>
            <li className='p-2 m-2 hover:underline hover:text-primary hover:text-[25px] hover:font-bold duration-300 ease-in'>HOME</li>
            </NavLink>
            <NavLink to='/mentors'>
            <li className='p-2 m-2 hover:underline hover:text-primary hover:text-[25px] hover:font-bold duration-300 ease-in'>ALL MENTOR</li>
            </NavLink>
            <NavLink to='/about'>
            <li className='p-2 m-2 hover:underline hover:text-primary  hover:text-[25px] hover:font-bold duration-300 ease-in'>ABOUT</li>
            </NavLink>
            <NavLink to='/contact'>
            <li className='p-2 m-2 hover:underline hover:text-primary  hover:text-[25px] hover:font-bold duration-300 ease-in'>CONTACT</li>
            </NavLink>
        </ul>
      </div>
      <div className='w-1/6 p-2 m-2 flex justify-end'>
        {
          token ? <div className='flex cursor-pointer items-center group relative'>
             <img className="w-10 rounded-4xl" src={assets.profile_pic} alt="" />
             <img className='w-3' src={assets.dropdown_icon} alt="" />
             <div className='absolute top-0 right-5 pt-20 hidden group-hover:block w-max '>
              <div className='bg-gray-500 text-white rounded-2xl p-4 m-2 text-xl '>
                <p onClick={()=>navigate('my-profile')} className='p-1 m-1 cursor-pointer hover:underline'>My Profile</p>
                <p onClick={()=>navigate('my-appointments')} className='p-1 m-1 cursor-pointer hover:underline'>My Appointments</p>
                <p onClick={()=>setToken(false)} className='p-1 m-1 cursor-pointer hover:underline'>Logout</p>
              </div>
             </div>
          </div>:
          <button onClick={()=>navigate('signup')} className='text-white text-[15px] w-40 p-2 m-2 h-12 rounded-2xl bg-primary hover:w-41 hover:h-14 hover:text-[17px] hover:font-bold duration-500 ease-in-out'>Create Account</button>
        }
      </div>
    </div>
  )
}

export default Navbar
