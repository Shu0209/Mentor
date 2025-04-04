import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

const backendUrl=import.meta.env.VITE_BACKEND_URL
const [mentors,setMentors]=useState([])
const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
const [userData,setUserData]=useState(false)

  

const getMentorsData=async()=>{
  try {
    const {data}=await axios.get(backendUrl + '/api/mentor/list')
    if(data.success){
setMentors(data.mentors)
    }
    else{
      toast.error(data.message)
    }


  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

const loadUserProfileData=async()=>{
  try {
    const {data}=await axios.get(backendUrl+'/api/user/get-profile',{header:{token}})
    if(data.success){
      setUserData(data.userData)
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

const value={
  mentors,
  token,setToken,backendUrl,userData,setUserData,loadUserProfileData
}


useEffect(()=>{
  getMentorsData()
},[])


useEffect(()=>{
  if(token){
    loadUserProfileData()
  }
  else{
    setUserData(false)
  }
},[token])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
