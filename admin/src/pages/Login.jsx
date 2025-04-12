import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../context/adminContext.jsx'
import axios from'axios'
import { toast } from 'react-toastify'
import { MentorContext } from '../context/MentorContext.jsx'


const Login=()=> {
    const [state,setState]=useState('Admin')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {setAToken,backendUrl}=useContext(AdminContext)
    
     const {setMToken}=useContext(MentorContext)

    const onSubmitHandler=async (event)=>{
         event.preventDefault()

         try {
          if(state==='Admin'){
            const {data}=await axios.post(backendUrl + '/api/admin/login',{email,password})

            if(data.success){
              localStorage.setItem('aToken',data.token)
              setAToken(data.token)
              
            }
            else{
              toast.error(data.message)
            }
          }
          else{
            const {data}=await axios.post(backendUrl + '/api/mentor/login',{email,password})
 
            if(data.success){
              localStorage.setItem('mToken',data.token)
              setMToken(data.token)
              console.log(data.token)
              
            }
            else{
              toast.error(data.message)
            }

          }
          
         } catch (error) {
          
         }
    }

  return (
    <form onSubmit={onSubmitHandler} className="flex justify-center items-center h-screen bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg p-8 w-96">
    <p className="text-xl font-semibold text-center mb-4">
      <span className="text-blue-600">{state}</span> Login
    </p>

    <div className="mb-4">
      <p className="text-gray-700 font-medium">Email</p>
      <input onChange={(e)=>setEmail(e.target.value)} value={email}
        type="email"
        required
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mb-4">
      <p className="text-gray-700 font-medium">Password</p>
      <input onChange={(e)=>setPassword(e.target.value)} value={password}
        type="password"
        required
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
    >
      Login
    </button>

    <p className="mt-4 text-center text-gray-700">
      {state === "Admin" ? (
        <>
          Mentor Login?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setState("Mentor")}
          >
            Click here
          </span>
        </>
      ) : (
        <>
          Admin Login?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setState("Admin")}
          >
            Click here
          </span>
        </>
      )}
    </p>
  </div>
</form>
  )
}

export default Login
