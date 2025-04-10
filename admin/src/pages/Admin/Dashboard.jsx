import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

const {aToken,getDashData,cancelAppointment,dashData}=useContext(AdminContext)
const {slotDateFormat}=useContext(AppContext)

useEffect(()=>{
  if(aToken){
getDashData()
  }
},[aToken])

  return dashData &&(
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {/* Mentors Card */}
  <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
    <img src={assets.doctor_icon} alt="Mentors" className="w-12 h-12 mr-4" />
    <div>
      <p className="text-2xl font-bold text-gray-800">{dashData.mentors}</p>
      <p className="text-gray-500 text-sm">Mentors</p>
    </div>
  </div>

  {/* Appointments Card */}
  <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
    <img src={assets.appointment_icon} alt="Appointments" className="w-12 h-12 mr-4" />
    <div>
      <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
      <p className="text-gray-500 text-sm">Appointments</p>
    </div>
  </div>

  {/* Students Card */}
  <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
    <img src={assets.patients_icon} alt="Students" className="w-12 h-12 mr-4" />
    <div>
      <p className="text-2xl font-bold text-gray-800">{dashData.students}</p>
      <p className="text-gray-500 text-sm">Students</p>
    </div>
  </div>
</div>

<div className="bg-white mx-4 my-6 p-6 rounded-lg shadow-md">
  <div className="flex items-center gap-2 mb-4 border-b pb-2">
    <img src={assets.list_icon} alt="Appointments" className="w-6 h-6" />
    <h2 className="text-lg font-semibold text-gray-800">Latest Appointments</h2>
  </div>

  <div className="space-y-4 w-full">
    {dashData.latestAppointments.map((item, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition"
      >
        {/* Mentor Info */}
        <div className="flex items-center gap-4">
          <img
            src={item.menData.image}
            alt={item.menData.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-base font-medium text-gray-800">{item.menData.name}</p>
            <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
          </div>
        </div>

        {/* Status / Action */}
        <div>
          {item.cancelled ? (
            <span className="text-red-500 border border-red-500 px-3 py-1 rounded-md text-sm">
              Cancelled
            </span>
          ) : (
            <button
              onClick={() => cancelAppointment(item._id)}
              className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
  )
}

export default Dashboard
