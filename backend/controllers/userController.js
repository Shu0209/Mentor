import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import mentorModel from '../models/mentorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

//API to register user

const registerUser=async(req,res)=>{

try {
    
const {name,email,password}=req.body

if(!name || !password || !email){
    return res.json({success:false,message:"Missing Details"})
}


//For Email
if(!validator.isEmail(email)){
return res.json({success:false,message:"Enter a valid Email"})
}

//For Strong password
if(password.length<8){
    return res.json({success:false,message:"Enter a Strong password"})
}

//hashing user password
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)

const userData={
name,
email,
password:hashedPassword
}

const newUser=new userModel(userData)
const user=await newUser.save()

const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

res.json({success:true,token})

} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}

}


//API for user login
const loginUser=async(req,res)=>{
    try {
        
        const {email,password}=req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:'User does not exit'})
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
    res.json({success:false,message:error.message})
    }
}


// API to get User Profile data
const getProfile=async(req,res)=>{

try {
    
const {userId}=req.body
const userData=await userModel.findById(userId).select('-password')

res.json({success:true,userData})

} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}

}

// API to Update User Profile data

const updateProfile=async(req,res)=>{
try {
    const {userId,name,phone,address,dob,gender}=req.body
    const imageFile=req.file

    if(!name || !phone || !dob || !gender){
        return res.json({success:false,message:"Data missing"})
    }
    await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

    if(imageFile){
//upload to cloudinary
const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
const imageURL=imageUpload.secure_url

await userModel.findByIdAndUpdate(userId,{image:imageURL})
    }
    res.json({success:true,message:"Profile Updated"})
    
} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}
}




//API to book Appointment
const bookAppointment=async(req,res)=>{
    try {
        const {userId,menId,slotDate,slotTime}=req.body

    const menData=await mentorModel.findById(menId).select('-password')

    if(!menData.available){
        return res.json({success:false,message:'Mentor Not Available'})
    }

    let slots_booked=menData.slots_booked

    //Check for Slot Avilability
    if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slotTime)){
            return res.json({success:false,message:'Slot Not Available'})
        }
        else{
            slots_booked[slotDate].push(slotTime)
        }
    }
    else{
        slots_booked[slotDate]=[]
        slots_booked[slotDate].push(slotTime)
    }

    const userData=await userModel.findById(userId).select('-password')

    delete menData.slots_booked

    const appointmentData={
        userId,
        menId,
        userData,
        menData,
        amount:menData.fees,
        slotTime,
        slotDate,
        date:Date.now()
    }

    const newAppointment=new appointmentModel(appointmentData)
    await newAppointment.save()

    //save new slots data in menData
    await mentorModel.findByIdAndUpdate(menId,{slots_booked})

    res.json({success:true,message:"Appointment Booked"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for my appointment page forntend
const listAppointment=async(req,res)=>{
try {
    
const {userId}=req.body
const appointments=await appointmentModel.find({userId})

res.json({success:true,appointments})

} catch (error) {
    console.log(error)
        res.json({success:false,message:error.message})
}
}


//Api to cancel appointment
const cancelAppointment=async(req,res)=>{
    try {
        
        const {userId,appointmentId}=req.body

        const appointmentData=await appointmentModel.findById(appointmentId)

        //verify appointment user
        if(appointmentData.userId!==userId){
            return res.json({
                success:false,message:"Unauthorized action"
            })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //releasing mentor slot

        const {menId,slotDate,slotTime}=appointmentData
        
        const mentorData=await mentorModel.findById(menId)
         
        let slots_booked=mentorData.slots_booked

        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)

        await mentorModel.findByIdAndUpdate(menId,{slots_booked})

        res.json({success:true,message:"Appointment Canceled"})



    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API for payment using razor pay
 const rasorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
 })
const paymentRazorpay=async(req,res)=>{
    
try {
    const {appointmentId}=req.body
const appointmentData=await appointmentModel.findById(appointmentId)

if(!appointmentData || appointmentData.cancelled){
    return res.json({success:false,message:"Appointment Cancelled or not found"})
}

//crating options for razor payment
const options={
    amount:appointmentData.amount*100,
    currency:process.env.CURRENCY,
    receipt:appointmentId
}

//creation of an order
const order=await razorpayInstance.orders.create(options)

res.json({success:true,order})
} catch (error) {
    console.log(error)
        res.json({success:false,message:error.message})
}



}

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay}
