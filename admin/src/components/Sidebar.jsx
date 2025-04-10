import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
const {aToken}=useContext(AdminContext)


  return (
<>
    


<div className="sm:w-fit lg:w-64 px-2 whitespace-nowrap">
  {aToken && (
    <ul className="space-y-4">
      {/* Dashboard */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <img src={assets.home_icon} alt="Dashboard" className="h-6 w-6" />
        <p className="font-medium hidden lg:block">Dashboard</p>
      </NavLink>

      {/* Appointments */}
      <NavLink
        to="/all-appointments"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <img src={assets.appointments_icon} alt="Appointments" className="h-6 w-6" />
        <p className="font-medium hidden lg:block">Appointments</p>
      </NavLink>

      {/* Add Mentor */}
      <NavLink
        to="/add-mentor"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <img src={assets.add_icon} alt="Add Mentor" className="h-6 w-6" />
        <p className="font-medium hidden lg:block">Add Mentor</p>
      </NavLink>

      {/* Mentors List */}
      <NavLink
        to="/mentors-list"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <img src={assets.people_icon} alt="Mentors List" className="h-6 w-6" />
        <p className="font-medium hidden lg:block">Mentors List</p>
      </NavLink>
    </ul>
  )}
</div>



    </>
)
}

export default Sidebar
