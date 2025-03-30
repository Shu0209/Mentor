import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary } from "cloudinary"
import mentorModel from "../models/mentorModel.js"
import jwt from 'jsonwebtoken'


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


export {addMentor,loginAdmin,allMentors}