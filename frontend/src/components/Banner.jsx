import React from "react"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom"



const Banner=()=>{
    const navigate=useNavigate()
    return(
        <div className="flex justify-center m-2 p-2">
            <div className="flex justify-around items-center bg-gradient-to-r from-primary to-pink-800 w-[90vw] m-2 p-2 rounded-3xl">
           <div className="text-white p-2 m-2">
            <p className="text-5xl m-2 p-2 font-bold">Book Appointment</p> 
            <p className="text-5xl m-2 p-2 font-bold">With 100+ Trusted Mentors</p>
            <button onClick={()=>navigate(`/login`)} className="bg-white text-gray-800 m-2 p-2 w-36 h-13 rounded-2xl text-[18px] hover:w-40 hover:h-15 hover:text-[20px] hover:text-black hover:font-bold duration-500" >Create account</button>
           </div>
           <div>
            <img className="w-2xl" src={assets.appointment_img} alt="" />
           </div>
            </div>
        </div>
    )
}
export default Banner