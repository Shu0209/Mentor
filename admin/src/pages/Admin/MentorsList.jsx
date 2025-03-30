import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/adminContext'
import { useEffect } from 'react'

const MentorsList = () => {

  const {mentors,aToken,getAllMentors,changeAvailability}=useContext(AdminContext)

  useEffect(()=>{
    if(aToken){
      getAllMentors()
      
    }
  },[aToken])

  return (
    <div className="p-6 max-w-6xl mx-auto">
  <p className="text-2xl font-bold text-gray-800 mb-6">All Mentors</p>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {mentors.map((item, index) => (
      <div 
        key={index} 
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        
        <div className="p-4">
          <p className="text-lg font-semibold text-gray-800 truncate">{item.name}</p>
          <p className="text-blue-600 text-sm mb-3">{item.speciality}</p>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id={`available-${index}`}
              onChange={()=>changeAvailability(item._id)}
              checked={item.available}
              readOnly
              className="w-4 h-4 text-green-500 rounded focus:ring-green-400"
            />
            <label 
              htmlFor={`available-${index}`} 
              className="ml-2 text-sm text-gray-600"
            >
              Available
            </label>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default MentorsList
