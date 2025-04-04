import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Login = () => {

const {backendUrl,token,setToken}=useContext(AppContext)
const navigate =useNavigate()

  const [state,setState]=useState('Sign Up')

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')




  const onSubmitHandler =async (event)=>{
    event.preventDefault()

    try {
      
if(state==='Sign Up'){
  const {data}=await axios.post(backendUrl +'/api/user/register',{name,password,email})
  if(data.success){
    localStorage.setItem('token',data.token)
    setToken(data.token)
  }
  else{
    toast.error(data.message)
    
  }
}
else{

  const {data}=await axios.post(backendUrl +'/api/user/login',{password,email})
  if(data.success){
    localStorage.setItem('token',data.token)
    setToken(data.token)
  }
  else{
    toast.error(data.message)
    
  }

}

    } catch (error) {
      toast.error(error.message)
    }

  }



  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    
    <form onSubmit={onSubmitHandler} className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-15">
    <div className="flex flex-col items-center gap-4">
      {/* Form Title */}
      <p className="text-2xl font-bold text-gray-800">
        {state === "Sign Up" ? "Create Account" : "Login"}
      </p>
      <p className="text-gray-600 text-sm">
        Please {state === "Sign Up" ? "sign up" : "login"} to book an appointment.
      </p>
  
{
  state==="Sign Up" &&  
  <div className="w-full">
    <p className="text-gray-700 font-medium mb-1">Full Name</p>
    <input 
      type="text" 
      onChange={(e) => setName(e.target.value)} 
      value={name} 
      required 
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
}




     
  
      {/* Email Input */}
      <div className="w-full">
        <p className="text-gray-700 font-medium mb-1">Email</p>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          required 
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
  
      {/* Password Input */}
      <div className="w-full">
        <p className="text-gray-700 font-medium mb-1">Password</p>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          required 
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
  
      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full bg-primary text-white p-2 rounded-lg mt-4 hover:bg-opacity-80 transition-all"
      >
        {state === "Sign Up" ? "Create Account" : "Login"}
      </button>



      {state === "Sign Up" ? (
  <p className="text-gray-600 text-sm mt-2">
    Already have an account?  
    <a 
      onClick={(e) => { e.preventDefault(); setState("Login"); }} 
      className="text-blue-600 hover:text-blue-800 font-medium ml-1 cursor-pointer"
    >
      Login here
    </a>
  </p>
) : (
  <p className="text-gray-600 text-sm mt-2">
    Create a new account  
    <a 
      onClick={(e) => { e.preventDefault(); setState("Sign Up"); }} 
      className="text-blue-600 hover:text-blue-800 font-medium ml-1 cursor-pointer"
    >
      Click here
    </a>
  </p>
)}


     
    </div>
  </form>
  
    
  )
}

export default Login
