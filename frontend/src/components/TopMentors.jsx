import { mentors } from "../assets/assets"

const TopMentors=()=>{
return(
    <>
    <div className="flex justify-center ">
        <div className="border-black-100 border-2 w-[90vw]">
<div className="text-center">
    <p className="text-6xl font-bold p-2 m-2">Top Mentors to Book</p>
    <p className="text-2xl p-2 m-2">Simply browse through our extensive list of trusted mentors.</p>
</div>
<div className=" ">
    {mentors.slice(0,10).map((item,index)=>(
        <div className="grid-cols-5 border-2 border-primary w-1/6">
            <img src={item.image} alt="" />
            <div className="">
                <p></p>
                <p>Available</p>
            </div>
            <p>{item.name}</p>
            <p>{item.speciality}</p>
        </div>
    ))}
</div>
<button className="">More</button>
    </div>
   
    </div>
    </>
)
}
export default TopMentors