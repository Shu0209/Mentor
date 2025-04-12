import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllApointments = () => {

const {aToken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext)
const {calculateAge,slotDateFormat}=useContext(AppContext)

useEffect(()=>{
  if(aToken){
    getAllAppointments()
  }
},[aToken])

  return (
    <div className="p-4 sm:p-6">
  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
    All Appointments
  </h2>

  <div className="w-full overflow-x-auto rounded-lg shadow-md">
    <table className="min-w-[800px] w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">#</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Name</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Age</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Date & Time</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Mentor</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Fees</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {appointments.map((item, index) => (
          <tr key={item._id || index} className="hover:bg-gray-50">
            <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
            <td className="px-4 py-3 flex items-center gap-2 whitespace-nowrap">
              <img
                src={item.userData.image}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm">{item.userData.name}</span>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">{calculateAge(item.userData.dob)}</td>
            <td className="px-4 py-3 whitespace-nowrap">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </td>
            <td className="px-4 py-3 flex items-center gap-2 whitespace-nowrap">
              <img
                src={item.menData.image}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm">{item.menData.name}</span>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">₹{item.amount}</td>
            <td className="px-4 py-3 whitespace-nowrap">
              {
                (item.cancelled) ?<p className='border-2 border-red-600 text-red-500 rounded-lg p-1 text-center'>
                  Cancelled
                </p> : item.isCompleted ?<p className='border-2 border-green-600 text-green-600 rounded-lg p-1 text-center'>Completed</p> :<button onClick={()=>cancelAppointment(item._id)} className="bg-red-500 text-white px-6 py-1 rounded hover:bg-red-600 text-xs sm:text-sm">
                Cancel
              </button>
              }
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {appointments.length === 0 && (
    <p className="text-center py-6 text-gray-500">No appointments available.</p>
  )}
</div>



  )
}

export default AllApointments
