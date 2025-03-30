import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AdminContext=createContext()

const AdminContextProvider=(props)=>{

const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
const [mentors,setMentors]=useState([])

const backendUrl=import.meta.env.VITE_BACKEND_URL

const getAllMentors=async()=>{
    try {
        
const {data}=await axios.post(backendUrl + '/api/admin/all-mentors', {} ,{headers:{aToken}})
if(data.success){
    setMentors(data.mentors)
    console.log(data.mentors)
}
else{
    toast.error(error.message)
}

    } catch (error) {
          
toast.error(error.message)

    }
}

const changeAvailability=async (menId)=>{
 
try {
    const { data }=await axios.post(backendUrl + '/api/admin/change-availability', {menId},{headers:{aToken}})
    if(data.success){
        toast.success(data.message)
        getAllMentors()
    }
    else{
        toast.error(error.message)
    }
} catch (error) {
    toast.error(error.message)
}
}

    const value={
aToken,setAToken,backendUrl,mentors,getAllMentors,changeAvailability
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider