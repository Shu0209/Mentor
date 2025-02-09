import React from 'react'
import {specialityData} from '../assets/assets'
const SpecialityMenu = () => {
  return (
    <div className='flex justify-center p-10 m-10 w-auto'>
    <div className=''>
      <p className='text-center text-5xl font-bold m-2 p-2'>Find by Speciality</p>
      <p className='m-4 p-4 text-2xl text-center'>Browse through our extensive list of trusted mentors and schedule your free session.</p>
      <div className='flex m-5 p-5 gap-10 w-auto'>
        <div className='hover:text-2xl'>
<img className='w-30 h-30 rounded-full hover:w-35 hover:h-35 duration-500' src={specialityData[0].image} alt="" />
<p className='text-[20px] text-center'>{specialityData[0].speciality}</p>
</div>
<div>
<img className='w-30 h-30 rounded-full hover:w-35 hover:h-35 duration-500' src={specialityData[1].image} alt=""/>
<p className='text-[20px] text-center'>{specialityData[1].speciality}</p>
</div>
<div>
<img className='w-30 h-30 rounded-full hover:w-35 hover:h-35 duration-500' src={specialityData[2].image} alt=""/>
<p className='text-[20px] text-center'>{specialityData[2].speciality}</p>
</div>
<div>
<img className='w-30 h-30 rounded-full hover:w-35 hover:h-35 duration-500' src={specialityData[3].image} alt=""/>
<p className='text-[20px] text-center'>{specialityData[3].speciality}</p>
</div>
<div>
<img className='w-30 h-30 rounded-full hover:w-35 hover:h-35 duration-500' src={specialityData[4].image} alt=""/>
<p className='text-[20px] text-center'>{specialityData[4].speciality}</p>
</div>
<div>
<img className='w-30 h-30 rounded-full hover:w-35 hover:h-35 duration-500' src={specialityData[5].image} alt=""/>
<p className='text-[20px] text-center'>{specialityData[5].speciality}</p>
</div>
      </div>
    </div>
    </div>
  )
}

export default SpecialityMenu
