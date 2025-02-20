import React from "react"
import Header from "../components/Header"
import SpecialityMenu from "../components/SpecialityMenu"
import TopMentors from "../components/TopMentors"
import Banner from "../components/Banner"
import Footer from "../components/Footer"

const Home=()=>{
    return(
      <>
      <Header/>
      <SpecialityMenu/>
      <TopMentors/>
      <Banner/>
      <Footer/>
      </>
    )
}
export default Home