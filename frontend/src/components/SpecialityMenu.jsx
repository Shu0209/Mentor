import React from 'react'
import {specialityData} from '../assets/assets'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div className='flex justify-center p-10 m-10 w-auto'>
    <div className=''>
      <p className='text-center text-5xl font-bold m-2 p-2'>Find by Speciality</p>
      <p className='m-4 p-4 text-2xl text-center'>Browse through our extensive list of trusted mentors and schedule your free session.</p>
      <div className='flex m-5 p-5 gap-10 w-auto'>
       
        {specialityData.map((item,index)=>(
          <div className='hover:text-2xl'>
          <Link key={index} to={`/mentors/${item.speciality}`}>
          <img className='w-30 h-30 rounded-full hover:w-35 hover:h-35 duration-500' src={item.image} alt="" />
          <p className='text-[20px] text-center'>{item.speciality}</p>
          </Link>
          </div>
        ))}
       
      </div>
    </div>
    </div>
  )
}

export default SpecialityMenu
