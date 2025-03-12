import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className='flex justify-between items-center py-4 px-6 md:px-20 shadow-2xl h-20 md:h-24 relative bg-white'>
      
      {/* Logo */}
      <div className='w-1/3 md:w-1/6 p-2'>
        <img onClick={() => navigate('/')} className='w-32 md:w-40 cursor-pointer' src={assets.Logo} alt="Logo" />
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className='md:hidden flex items-center'>
        <button onClick={() => setShowMenu(!showMenu)}>
          <img src={assets.menu_icon} alt="Menu" className="w-8" />
        </button>
      </div>

      {/* Navigation Links (Hidden on Mobile) */}
      <div className={`absolute md:static top-16 left-0 w-full md:w-3/6 bg-white md:bg-transparent md:flex ${showMenu ? 'block' : 'hidden'} text-center md:text-left`}>
        <ul className='flex flex-col md:flex-row md:justify-between w-full text-lg md:text-2xl cursor-pointer'>
          <NavLink to='/' className="p-3 md:p-2 md:m-2 hover:underline hover:text-primary duration-300 ease-in">
            HOME
          </NavLink>
          <NavLink to='/mentors' className="p-3 md:p-2 md:m-2 hover:underline hover:text-primary duration-300 ease-in">
            ALL MENTORS
          </NavLink>
          <NavLink to='/about' className="p-3 md:p-2 md:m-2 hover:underline hover:text-primary duration-300 ease-in">
            ABOUT
          </NavLink>
          <NavLink to='/contact' className="p-3 md:p-2 md:m-2 hover:underline hover:text-primary duration-300 ease-in">
            CONTACT
          </NavLink>
        </ul>
      </div>

      {/* Profile or Signup */}
      <div className='w-1/3 md:w-1/6 p-2 flex justify-end'>
        {token ? (
          <div className='flex cursor-pointer items-center group relative'>
            <img className="w-10 rounded-full" src={assets.profile_pic} alt="Profile" />
            <img className='w-3 ml-2' src={assets.dropdown_icon} alt="Dropdown" />
            <div className='absolute top-12 right-0 hidden group-hover:block w-max z-50'>
              <div className='bg-gray-500 text-white rounded-2xl p-4 text-lg'>
                <p onClick={() => navigate('my-profile')} className='p-1 cursor-pointer hover:underline'>My Profile</p>
                <p onClick={() => navigate('my-appointments')} className='p-1 cursor-pointer hover:underline'>My Appointments</p>
                <p onClick={() => setToken(false)} className='p-1 cursor-pointer hover:underline'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('signup')} 
            className='text-white text-lg md:text-[15px] w-32 md:w-40 p-2 h-10 md:h-12 rounded-2xl bg-primary hover:w-36 md:hover:w-44 hover:h-12 md:hover:h-14 hover:text-[17px] hover:font-bold duration-500 ease-in-out'
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
