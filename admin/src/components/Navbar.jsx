import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/adminContext'
import {  useNavigate } from 'react-router-dom'
import { MentorContext } from '../context/MentorContext'

const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext)
    const {mToken,setMToken}=useContext(MentorContext)
    const navigate=useNavigate()

    const logout=()=>{
        navigate('/')
         aToken && setAToken('')
         aToken && localStorage.removeItem('aToken')
         mToken && setMToken('')
         mToken && localStorage.removeItem('mToken')
    }


  return (
    <nav className="bg-white shadow-md py-3 px-4 sm:py-4 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center">
  {/* Left Side: Logo & Role */}
  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
    <img 
      src={assets.admin_logo} 
      alt="Admin Logo" 
      className="h-8 w-auto sm:h-10 md:h-12 object-contain"
    />
    <p className="text-[10px] xs:text-xs p-1 px-2 text-center font-semibold text-gray-800 border-2 border-gray-400 rounded-xl">
      {aToken ? "Admin" : "Mentor"}
    </p>
  </div>

  {/* Right Side: Logout Button */}
  <button 
    onClick={logout} 
    className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 md:px-5 rounded-md sm:rounded-lg text-sm sm:text-base md:text-lg font-medium 
              hover:bg-red-600 transition duration-300 shadow-md"
  >
    Logout
  </button>
</nav>
  )
}

export default Navbar
