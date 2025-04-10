import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary } from "cloudinary"
import mentorModel from "../models/mentorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"


//API for adding mentor

const addMentor=async(req,res)=>{
    try{
       const {name,email,password,speciality,degree,experience,about,fees}=req.body
       const imageFile=req.file


//Checking all data to add mentor
if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees){
    return  res.json({success:false,message:"Missing Details"});
}


//validation
if(!validator.isEmail(email)){
    return  res.json({success:false,message:"Envalid Email"});
}
if(password.length<8){
    return  res.json({success:false,message:"Enter strong password"});
}


const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)


//upload image to cloud
const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
const imageUrl=imageUpload.secure_url

const mentorData={
    name,
    email,
    image:imageUrl,
    password:hashedPassword,
    speciality,
    degree,
    experience,
    about,
    fees,
    date:Date.now()
}

const newMentor=new mentorModel(mentorData)
await newMentor.save()

res.json({success:true,message:"Mentor Added"})
    }
    catch(error){
console.log(error)
res.json({success:false,message:error.message})
    }
}


//admin Login API
const loginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body

        if(email===process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD){
const token=jwt.sign(email+password,process.env.JWT_SECRET)
res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
res.json({success:false,message:error.message})
    }
}




//API to get all mentor list for admin panel

const allMentors=async (req,res)=>{
    try {
        
const mentors=await mentorModel.find({}).select('-password')
res.json({success:true,mentors})

    } catch (error) {
        console.log(error)
res.json({success:false,message:error.message})
    }
}


//API to get all appointment list
const appointmentAdmin=async (req,res)=>{
    try {
        const appointments=await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
res.json({success:false,message:error.message})
    }
}


//API for appointment cancellation

const appointmentCancel=async(req,res)=>{
    try {
        
        const {appointmentId}=req.body

        const appointmentData=await appointmentModel.findById(appointmentId)

       

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


//API to get Dashboard Data
const adminDashboard=async(req,res)=>{
    try {
        const mentors=await mentorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})

        const dashData={
            mentors:mentors.length,
            appointments:appointments.length,
            students:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
       res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addMentor,loginAdmin,allMentors,appointmentAdmin,appointmentCancel,adminDashboard}