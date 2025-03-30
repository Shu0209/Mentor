import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/adminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Sidebar = () => {
const {aToken}=useContext(AdminContext)


  return (
<>
    


    <div className='w-fit lg:w-xs px-2 whitespace-nowrap'>
      {
        aToken &&<ul className="space-y-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.home_icon} alt="" className="h-6 w-6" />
          <p className="font-medium hidden lg:block ">Dashboard</p>
        </NavLink>
      
        <NavLink 
          to="/appointments" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.appointments_icon} alt="" className="h-6 w-6" />
          <p className="font-medium hidden lg:block">Appointments</p>
        </NavLink>
      
        <NavLink 
          to="/add-mentor" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.add_icon} alt="" className="h-6 w-6" />
          <p className="font-medium hidden lg:block">Add Mentor</p>
        </NavLink>
      
        <NavLink 
          to="/mentors-list" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-red-800 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.people_icon} alt="" className="h-6 w-6" />
          <p className="font-medium hidden lg:block">Mentors List</p>
        </NavLink>
      </ul>
      
      
      }
    </div>
    </>
)
}

export default Sidebar
