import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const MyAppointments = () => {

const {backendUrl,token}=useContext(AppContext)

const [appointments,setAppointments]=useState([])

const getUserAppointments=async()=>{
  try {
    
const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})

if(data.success){
  setAppointments(data.appointments.reverse())
  console.log(data.appointments)
}

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

useEffect(()=>{
  if(token){
    getUserAppointments()
  }
},[token])


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold mb-4 text-center">My Appointments</h2>

  <div className="flex flex-col gap-4">
    {appointments.map((item, index) => (
      <div
        key={index}
        className="border border-gray-300 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4"
      >
        {/* Profile Image */}
        <img
          src={item.menData.image}
          alt=""
          className="w-20 h-20 object-cover rounded-full border-2 border-gray-400"
        />

        {/* Mentor Details */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-lg font-semibold">{item.menData.name}</p>
          <p className="text-sm text-gray-600">{item.menData.speciality}</p>
          <div className="mt-2">
            <p className="text-xs font-medium text-gray-500">Date & Time:</p>
            <p className="text-sm text-gray-700">{item.slotDate} | {item.slotTime}</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-col gap-2 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-4 py-2 rounded-md shadow-md  hover:bg-green-600 hover:text-white transition-all">
            Pay Online
          </button>

          <button className="w-full sm:w-auto px-4 py-2 rounded-md shadow-md hover:text-white hover:bg-red-600 transition-all">
            Cancel Appointment
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default MyAppointments
