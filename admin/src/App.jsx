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

const App = () => {

const {aToken}=useContext(AdminContext)



  return aToken ? (
    <div >

    <ToastContainer/>
    <Navbar/>
    <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/all-appointments' element={<AllApointments/>} />
        <Route path='/add-mentor' element={<AddMentor/>} />
        <Route path='/mentors-list' element={<MentorsList/>} />

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
