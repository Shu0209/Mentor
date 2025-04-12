import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const MentorContext=createContext()

const MentorContextProvider=(props)=>{
 const backendUrl =import.meta.env.VITE_BACKEND_URL

 const [mToken,setMToken]=useState(localStorage.getItem('mToken')?localStorage.getItem('mToken'):'')
 const [appointments,setAppointments]=useState([])
 const [dashData,setDashData]=useState(false)
 const getAppointments=async()=>{
    try {
        
       const {data}=await axios.get(backendUrl+'/api/mentor/appointments',{headers:{mToken}})
       if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments)
       } else {
        toast.error(data.message)
       }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
 }

 const completeAppointment=async (appointmentId)=>{
    try {
        const {data}=await axios.post(backendUrl+'/api/mentor/completed-appointment',{appointmentId},{headers:{mToken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
 }


 const cancelAppointment=async (appointmentId)=>{
    try {
        const {data}=await axios.post(backendUrl+'/api/mentor/cancel-appointment',{appointmentId},{headers:{mToken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
 }

 const getDashData=async()=>{
try {
    const {data}=await axios.get(backendUrl+'/api/mentor/dashboard',{headers:{mToken}})

    if(data.success){
        setDashData(data.dashData)
        console.log(data.dashData)
    }
    else{
        toast.error(data.message)
        console.log(data.dashData)
    }
    
} catch (error) {
    console.log(error)
        toast.error(error.message)
}
 }

    const value={
       mToken,setMToken,backendUrl,appointments,setAppointments,getAppointments,completeAppointment,cancelAppointment,dashData,setDashData,getDashData
    }
    return(
        <MentorContext.Provider value={value}>
            {props.children}
        </MentorContext.Provider>
    )
}

export default MentorContextProvider