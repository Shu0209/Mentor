import { useNavigate } from "react-router-dom"
import { mentors } from "../assets/assets"

const TopMentors=()=>{
    const navigate=useNavigate()
return(
    <>
    <div className="flex justify-center m-2 p-2">
        <div className="m-2 p-2 w-[90vw]">
<div className="text-center">
    <p className="text-6xl font-bold p-2 m-2">Top Mentors to Book</p>
    <p className="text-2xl p-2 m-2">Simply browse through our extensive list of trusted mentors.</p>
</div>
<div className="grid grid-cols-4 auto-cols-auto gap-10 p-2 m-2">
    {mentors.slice(0,10).map((item,index)=>(
        <div onClick={()=>navigate(`/appoinment/${item._id}`)} className="w-sm bg-blue-100 border-1 border-primary   m-2 rounded-4xl   cursor-pointer relative transition-all  hover:-translate-y-7 duration-500">
            <img className="" src={item.image} alt=""  />
            <div className="bg-white rounded-b-4xl ">
            <div className="">
                <p></p>
                <p className="font-bold text-green-800 p-1 m-1">Available</p>
            </div>
            <p className="p-1  m-1 font-bold text-2xl ">{item.name}</p>
            <p className="p-2 text-gray-600 text-xl">{item.speciality}</p>
            </div>
        </div>
    ))}
</div>
<div className="flex justify-center">
<button onClick={()=>navigate(`/Mentors`)} className="font-bold text-2xl m-2 p-2  bg-primary text-white w-[120px] h-[50px] rounded-4xl hover:w-[140px] hover:h-[65px] hover:text-3xl duration-500">More</button>
</div>
    </div>
   
    </div>
    </>
)
}
export default TopMentors