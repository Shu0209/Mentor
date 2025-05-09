import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import RelatedMentor from '../components/RelatedMentors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appoinment = () => {

  const {menId}=useParams()
  const {mentors,backendUrl,token,getMentorsData}=useContext(AppContext)
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']

  const navigate =useNavigate()

  const [menInfo,setMenInfo]=useState(null)
  const [menSlots,setMenSlots]=useState([])
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime]=useState('')

  const fetchMenInfo=async()=>{
    const menInfo=mentors.find(men=>men._id===menId)
    setMenInfo(menInfo)
    console.log(menInfo)
  }

const getAvailableSlots=async()=>{
 setMenSlots([])

 let today=new Date()

 for(let i=1;i<7;i++){

  let currentDate=new Date(today)
  currentDate.setDate(today.getDate()+i)

let endTime=new Date()
endTime.setDate(today.getDate()+i)
endTime.setHours(21,0,0,0)

//setting Hours

if(today.getDate()===currentDate.getDate()){
  currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
  currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
}
else{
  currentDate.setHours(10)
  currentDate.setMinutes(0)
}

let timeSlots=[]
while(currentDate<endTime){
let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

let day=currentDate.getDate()
let month=currentDate.getMonth()+1
let year=currentDate.getFullYear()

const slotDate=day+"_"+month+"_"+year
const slotTime=formattedTime

const isSlotAvailable=menInfo.slots_booked[slotDate] && menInfo.slots_booked[slotDate].includes(slotTime) ? false :true

if(isSlotAvailable){
//add slot to array
timeSlots.push({
  datetime:new Date(currentDate),
  time:formattedTime
})
}



currentDate.setMinutes(currentDate.getMinutes()+150)
}

setMenSlots(prev=>([...prev,timeSlots]))
 }
}


const bookAppointment=async()=>{
  if(!token){
    toast.warn('Login to book Appointment')
    return navigate('/login')
  }
  try {
    
const date=menSlots[slotIndex][0].datetime

let day=date.getDate()
let month=date.getMonth()+1
let year =date.getFullYear()

const slotDate=day+"_"+month+"_"+year
console.log(slotDate)

const {data}=await axios.post(backendUrl + '/api/user/book-appointment',{menId,slotDate,slotTime},{headers:{token}})

if(data.success){
  toast.success(data.message)
  getMentorsData()
  navigate('/my-appointments')
}
else{
  toast.error(data.message)
}
  } catch (error) {
 console.log(error)
 toast.error(error.message)
  }
}


  useEffect(()=>{
    fetchMenInfo()
  },[mentors,menId])

  useEffect(()=>{
    getAvailableSlots()
  },[menInfo])

  useEffect(()=>{
    console.log(menSlots)
  },[menSlots])

  return menInfo && (
    <div className='px-36'>
      <div className='flex p-2 m-2 gap-14'>
      <div className=''>
        <img 
          className="bg-gray-300 p-2 rounded-xl w-xl h-68 object-cover" 
          src={menInfo.image} 
          alt={menInfo.name} 
        />
      </div>
<div>
        <div className="p-4 flex flex-col gap-4 border-1 border-gray-400 rounded-2xl ">
        <p className="text-xl font-bold">{menInfo.name}</p>
        <p className="text-gray-600">{menInfo.degree}-{menInfo.speciality} <span>{menInfo.experience}</span></p>
        <div>
        <h3 className="text-lg font-semibold mt-2">About</h3>
        <p className="text-gray-600">{menInfo.about}</p>
        </div>
        <p className="text-primary font-semibold mt-2">
          Fee: ₹{menInfo.fees} Per Month
        </p>
      </div>
    {/* Booking Slot */}
      <div>
        <p>Appointment slots</p>
        <div className='flex gap-10'>
          {
            menSlots.length && menSlots.map((item,index)=>(
              <div key={index} onClick={()=>setSlotIndex(index)} className={` px-4 py-7 m-2 text-center rounded-4xl cursor-pointer ${slotIndex===index ? ' bg-primary text-white ': ' border border-gray-400 '} `}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            )
            )
          }
        </div>
        <div className="flex overflow-x-auto space-x-4 p-2 scrollbar-hide w-[60vw]">
  {menSlots.length > 0 &&
    menSlots[slotIndex]?.map((item, index) => (
      <p key={index} onClick={()=>setSlotTime(item.time)} className={`flex-shrink-0 border border-gray-400 px-4 py-2 rounded-4xl cursor-pointer hover:bg-gray-300 ${item.time===slotTime?'bg-primary text-white':' text-gray-600 border border-gray-400'}`}>
        {item.time.toLowerCase()}
      </p>
    ))}
</div>
<button onClick={bookAppointment} className='bg-primary text-white m-4 p-3 rounded-2xl hover:p-4 duration-500'>Book Appointment</button>
      </div>
      </div>
      </div>


{/* Related Mentors */}
<div>
<RelatedMentor menId={menId} speciality={menInfo.speciality}/>
</div>


    </div>
  )
}

export default Appoinment
