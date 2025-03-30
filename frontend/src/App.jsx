import Mentors from "./pages/Mentors.jsx"
import Home from "./pages/Home.jsx"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import About from "./pages/About"
import Contect from "./pages/Contect"
import Myprofile from "./pages/Myprofile"
import MyAppointments from "./pages/MyAppointments"
import Appoinment from "./pages/Appoinment"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import { ToastContainer, toast } from 'react-toastify';


function App() {
 

  return (
    <>
     <div className="">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/mentors' element={<Mentors/>}/>
        <Route path='/mentors/:speciality' element={<Mentors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contect/>}/>
        <Route path='/my-profile' element={<Myprofile/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/appointment/:menId' element={<Appoinment/>}/>
      </Routes>
      <Footer/>
     </div>
    </>
  )
}

export default App
