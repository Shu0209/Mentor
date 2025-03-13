import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Mentors = () => {

  const {speciality}=useParams()
 const [filterMen,setFilterMen]=useState([])

 const {mentors}=useContext(AppContext)

const applyFilter=()=>{
  if(speciality){
    setFilterMen(mentors.filter(men=>men.speciality===speciality))
  }else{
    setFilterMen(mentors)
  }
}

useEffect(()=>{
  applyFilter()
},mentors,speciality)
  return (
    <div>
      <div>
        <p>General physician</p>
        <p>Gynecologist</p>
        <p>Dermatologist</p>
        <p>Pediatricians</p>
        <p>Neurologist</p>
        <p>Gastroenterologist</p>
      </div>
      <div>
        {
          filterMen.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appoinment/${item._id}`)}
              className="bg-blue-100 border border-primary rounded-3xl cursor-pointer relative transition-transform hover:scale-105 duration-300"
            >
              <img
                className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-t-3xl"
                src={item.image}
                alt={item.name}
              />
              <div className="bg-white rounded-b-3xl p-4 text-center">
                <p className="font-bold text-green-800">Available</p>
                <p className="font-bold text-xl md:text-2xl">{item.name}</p>
                <p className="text-gray-600 text-sm md:text-lg">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Mentors
