import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'


const MyAppointments = () => {

const {mentors}=useContext(AppContext)

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold mb-4 text-center">My Appointments</h2>

  <div className="flex flex-col gap-4">
    {mentors.slice(0, 3).map((item, index) => (
      <div
        key={index}
        className="border border-gray-300 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4"
      >
        {/* Profile Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-full border-2 border-gray-400"
        />

        {/* Mentor Details */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="text-sm text-gray-600">{item.speciality}</p>
          <div className="mt-2">
            <p className="text-xs font-medium text-gray-500">Date & Time:</p>
            <p className="text-sm text-gray-700">16 Apr 2025 | 03:00 PM</p>
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
