import mentorModel from "../models/mentorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"



const changeAvailablity=async(req,res)=>{
    try {
        const {menId}=req.body
        const menData=await mentorModel.findById(menId)

        await mentorModel.findByIdAndUpdate(menId,{available:!menData.available})
         res.json({success:true,message:'Availablity Change'});


    } 
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
  

const mentorList=async(req,res)=>{
    try {
        const mentors=await mentorModel.find({}).select(['-password','-email'])
            res.json({success:true,mentors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//Api for Mentor Login
const loginMentor=async(req,res)=>{
    try {
        const {email,password}=req.body
        const mentor=await mentorModel.findOne({email})

        if(!mentor){
            return res.json({success:false,message:"Tnvalid Credentials"})
        }

        const isMatch=await bcrypt.compare(password,mentor.password)

        if(isMatch){
            const token=jwt.sign({id:mentor._id},process.env.JWT_SECRET)

            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid Credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get all appointment of a mentor for mentor panel
const appointmentsMentor=async (req,res)=>{
    try {
        const {menId}=req.body
        const appointments=await appointmentModel.find({menId})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}



export {changeAvailablity,mentorList,loginMentor,appointmentsMentor}