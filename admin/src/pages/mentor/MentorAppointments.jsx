import React, { useContext, useEffect } from 'react'
import { MentorContext } from '../../context/MentorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const MentorAppointments = () => {
  const {mToken,appointments,getAppointments,completeAppointment,cancelAppointment}=useContext(MentorContext)


  const {calculateAge,slotDateFormat}=useContext(AppContext)

  useEffect(()=>{
    if(mToken){
      getAppointments()
    }
  },[mToken])
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
  <p className="text-2xl font-semibold text-gray-800 mb-4">All Appointments</p>

  <div className="overflow-x-auto">
    {/* Table Header */}
    <div className="min-w-[800px] grid grid-cols-7 gap-4 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg px-4 py-3">
      <p className="col-span-1">#</p>
      <p className="col-span-1">Name</p>
      <p className="col-span-1">Payment</p>
      <p className="col-span-1">Age</p>
      <p className="col-span-1">Date & Time</p>
      <p className="col-span-1">Fees</p>
      <p className="col-span-1">Action</p>
    </div>

    {/* Table Body */}
    <div className="min-w-[800px]">
      {appointments.reverse().map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-7 gap-4 items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 text-sm text-gray-700"
        >
          <p className="col-span-1">{index + 1}</p>

          {/* Name and Avatar */}
          <div className="col-span-1 flex items-center gap-2">
            <img
              src={item.userData.image}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="font-medium">{item.userData.name}</p>
          </div>

          {/* Payment Mode */}
          <p className="col-span-1">
            {item.payment ? "Online" : "Cash"}
          </p>

          {/* Age */}
          <p className="col-span-1">{calculateAge(item.userData.dob)}</p>

          {/* Slot */}
          <p className="col-span-1">
            {slotDateFormat(item.slotDate)}, {item.slotTime}
          </p>

          {/* Fees */}
          <p className="col-span-1 font-semibold text-gray-800">
            ₹{item.amount}
          </p>

          {/* Action */}

          {
            item.cancelled 
            ?<p className='font-semibold border-2 border-red-600 text-red-600 text-center rounded-2xl w-fit px-2 py-1'>Cancelled</p>
            :item.isCompleted
            ?<p className='font-semibold border-2 border-green-600 text-green-600 text-center rounded-2xl w-fit px-2 py-1'>Completed</p>
            :<div className="flex">
            <img onClick={(()=>cancelAppointment(item._id))} src={assets.cancel_icon} alt="" />
            <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" />
          </div>
          }
          
        </div>
      ))}
    </div>
  </div>
</div>


  )
}

export default MentorAppointments
