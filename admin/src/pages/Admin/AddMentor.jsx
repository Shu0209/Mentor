import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AdminContext } from '../../context/adminContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const AddMentor = () => {
const [menImg,setMenImg]=useState(false);
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [experience,setExperience]=useState('2 Years');
const [fees,setFees]=useState('');
const [about,setAbout]=useState('');
const [speciality,setSpeciality]=useState('Data Science');
const [degree,setDegree]=useState('');


const {backendUrl,aToken}=useContext(AdminContext);

const onSubmitHandler=async(event)=>{
  event.preventDefault()
  try {
    if(!menImg){

      return toast.error("Image Not Selected")

    }
      const formData = new FormData()
      
      formData.append('image',menImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)

      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`);
      })

const {data} =await axios.post(backendUrl +'/api/admin/add-mentor',formData,{headers : { aToken }})

if(data.success){
  toast.success(data.message)
  setMenImg(false)
  setName('')
  setPassword('')
  setEmail('')
  setDegree('')
  setAbout('')
  setFees('')
}
else{
  toast.error(data.message)
}

  } catch (error) {
    toast.error(error.message)
    console.log(message)
  }
}

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 ">
  <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-6">
    <p className="text-2xl font-semibold text-center text-gray-800">Add Mentor</p>

    {/* Image Upload */}
    <div className="flex flex-col items-center space-y-2">
      <label htmlFor="men-img" className="cursor-pointer">
        <img src={menImg ? URL.createObjectURL(menImg) : assets.upload_area} alt="Upload" className="w-20 h-20 object-cover rounded-md shadow-md" />
      </label>
      <input onChange={(e)=>setMenImg(e.target.files[0])} type="file" id="men-img" hidden />
      <p className="text-gray-600 text-sm">Upload Mentor <br /> Picture</p>
    </div>

    {/* Mentor Details */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-gray-700 font-medium">Mentor Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <p className="text-gray-700 font-medium">Mentor Email</p>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email" required className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500" />
      </div>

{/* Password Field */}


<div className="relative">
      <p className="text-gray-700 font-medium">Mentor Password</p>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 pr-10"
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      </div>
    </div>




      <div>
        <p className="text-gray-700 font-medium">Experience</p>
        <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500">
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i} value={`${i + 2} Years`}>{i + 2} Years</option>
          ))}
          <option value="10+ Years">10+ Years</option>
        </select>
      </div>

      <div>
        <p className="text-gray-700 font-medium">Fees per session</p>
        <input type="number" onChange={(e)=>setFees(e.target.value)} value={fees} placeholder="Fees" required className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <p className="text-gray-700 font-medium">Speciality</p>
        <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500">
          {["Data Science", "Spring Boot", "Machine Learning", "MERN Stack", "Cyber Security", "Blockchain"].map((spec, i) => (
            <option key={i} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-gray-700 font-medium">Education</p>
        <input type="text" onChange={(e)=>setDegree(e.target.value)} value={degree} placeholder="Education" required className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>

    {/* About Me */}
    <div>
      <p className="text-gray-700 font-medium">About Me</p>
      <textarea onChange={(e)=>setAbout(e.target.value)} value={about} placeholder="Write about Mentor" rows={4} required className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"></textarea>
    </div>

    {/* Submit Button */}
    <button type='submit' className="w-full bg-blue-600 font-bold text-white py-2 rounded-md hover:bg-primary transition duration-300">
      Add Mentor
    </button>
  </form>
</div>

  )
}

export default AddMentor
