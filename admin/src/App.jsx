import React, { useContext } from 'react'
import Login from './pages/login'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/adminContext'
import Navbar from './components/Navbar'

const App = () => {

const {aToken}=useContext(AdminContext)



  return aToken ? (
    <div >

    <ToastContainer/>
    <Navbar/>
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
