import React, { useContext } from 'react'
import Login from './pages/login'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/adminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllApointments from './pages/Admin/AllApointments'
import AddMentor from './pages/Admin/AddMentor'
import MentorsList from './pages/Admin/MentorsList'
import { MentorContext } from './context/MentorContext'
import MentorAppointments from './pages/mentor/mentorAppointments'
import MentorDashboard from './pages/mentor/mentorDashboard'
import MentorProfile from './pages/mentor/mentorProfile'

const App = () => {

const {aToken}=useContext(AdminContext)
const {mToken}=useContext(MentorContext)


  return aToken || mToken ?(
    <div >

    <ToastContainer/>
    <Navbar/>
    <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        {/* Admin Routes */}
        <Route path='/' element={<Dashboard/>} />
        <Route path='/all-appointments' element={<AllApointments/>} />
        <Route path='/add-mentor' element={<AddMentor/>} />
        <Route path='/mentors-list' element={<MentorsList/>} />

        {/* Mentor Route */}
        <Route path='/mentor-dashboard' element={<MentorDashboard/>} />
        <Route path='/mentor-appointments' element={<MentorAppointments/>} />
        <Route path='/mentor-profile' element={<MentorProfile/>} />
      </Routes>
    </div>
  </div>
  )
    :(
      <>
    <div>
      <Login/>
      <ToastContainer/>
    </div>
  </>
  )
}

export default App
