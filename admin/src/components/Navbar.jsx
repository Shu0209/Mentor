import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/adminContext'
import {  useNavigate } from 'react-router-dom'

const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext)
    const navigate=useNavigate()

    const logout=()=>{
        navigate('/')
         aToken && setAToken('')
         aToken && localStorage.removeItem('aToken')
    }


  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-12 flex justify-between items-center">
      {/* Left Side: Logo & Role */}
      <div className="flex items-center gap-4">
        <img 
          src={assets.admin_logo} 
          alt="Admin Logo" 
          className="h-12 w-45 object-contain"
        />
        <p className="text-xs p-1 w-15 text-center font-semibold text-gray-800 border-2 border-gray-400 rounded-xl">
          {aToken ? "Admin" : "Mentor"}
        </p>
      </div>

      {/* Right Side: Logout Button */}
      <button onClick={logout} className="bg-red-500 text-white px-5 py-2 rounded-lg text-lg font-medium 
                         hover:bg-red-600 transition duration-300 shadow-md">
        Logout
      </button>
    </nav>
  )
}

export default Navbar
