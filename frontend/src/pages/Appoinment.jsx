import React, { useContext, useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appoinment = () => {

  const {menId}=useParams()
  const {mentors}=useContext(AppContext)

  const [menInfo,setMenInfo]=useState(null)

  const fetchMenInfo=async()=>{
    const menInfo=mentors.find(men=>men._id===menId)
    setMenInfo(menInfo)
    console.log(menInfo)
  }
  useEffect(()=>{
    fetchMenInfo()
  },[mentors,menId])
  return menInfo && (
    <div className='px-36'>
      <div className='flex p-2 m-2 gap-14'>
      <div className=''>
        <img 
          className="bg-gray-300 p-2 rounded-xl w-xl h-full object-cover" 
          src={menInfo.image} 
          alt={menInfo.name} 
        />
      </div>

        <div className="p-4 flex flex-col gap-4 border-1 border-gray-400 rounded-2xl ">
        <p className="text-xl font-bold">{menInfo.name}</p>
        <p className="text-gray-600">{menInfo.degree}-{menInfo.speciality} <spam>{menInfo.experience}</spam></p>
        <div>
        <h3 className="text-lg font-semibold mt-2">About</h3>
        <p className="text-gray-600">{menInfo.about}</p>
        </div>
        <p className="text-indigo-700 font-semibold mt-2">
          Fee: ₹{menInfo.fees} Per Month
        </p>
      </div>
      </div>
    </div>
  )
}

export default Appoinment
