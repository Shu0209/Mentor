import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const MentorContext=createContext()

const MentorContextProvider=(props)=>{
 const backendUrl =import.meta.env.VITE_BACKEND_URL

 const [mToken,setMToken]=useState(localStorage.getItem('mToken')?localStorage.getItem('mToken'):'')
 const [appointments,setAppointments]=useState([])
 const getAppointments=async()=>{
    try {
        
       const {data}=await axios.get(backendUrl+'/api/mentor/appointments',{headers:{mToken}})
       if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments.reverse())
       } else {
        toast.error(data.message)
       }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
 }


    const value={
       mToken,setMToken,backendUrl,appointments,setAppointments,getAppointments
    }
    return(
        <MentorContext.Provider value={value}>
            {props.children}
        </MentorContext.Provider>
    )
}

export default MentorContextProvider