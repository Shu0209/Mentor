import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"


const RelatedMentor=({menId,speciality})=>{
const {mentors}=useContext(AppContext)
const navigate=useNavigate()

const [relMen,setRelMens]=useState([])

useEffect(()=>{
    if(mentors.length>0 && speciality){
        const mentorData=mentors.filter((men)=>men.speciality===speciality && men._id!=menId)
        setRelMens(mentorData)
    }
},[mentors,speciality,menId])


    return(
        <>
        <div>
            <div className="flex flex-col items-center">
            <p className="text-4xl font-bold p-2 m-2">Related Mentors</p>
            <p className="p-2 m-2">Simply browse through our extensive list of trusted mentors.</p>
            </div>



              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 m-2">
                        {relMen.slice(0, 2).map((item) => (
                          <div
                            key={item._id}
                            onClick={() => {navigate(`/appointment/${item._id}`);scrollTo(0,0)}}
                            className="bg-blue-100 border border-primary rounded-3xl cursor-pointer relative transition-transform hover:scale-105 duration-300"
                          >
                            <img
                              className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-t-3xl"
                              src={item.image}
                              alt={item.name}
                            />
                            <div className="bg-white rounded-b-3xl p-4 text-center">
                              <p className="font-bold text-green-800">Available</p>
                              <p className="font-bold text-xl md:text-2xl">{item.name}</p>
                              <p className="text-gray-600 text-sm md:text-lg">
                                {item.speciality}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>



        </div>
        </>
    )
}
export default RelatedMentor