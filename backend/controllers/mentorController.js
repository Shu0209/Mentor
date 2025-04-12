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


//API to mark appointment completed for mentor panel

const appointmentComplete=async(req,res)=>{
    try {
const {menId,appointmentId}=req.body
const appointmentData=await appointmentModel.findById(appointmentId)
if(appointmentData && appointmentData.menId===menId){
    await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
    return res.json({success:true,message:'Appointment Completed'})
}
else{
    return res.json({success:false,message:'Marked Failed'})
}

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API to mark appointment cancel for mentor panel

const appointmentCancel=async(req,res)=>{
    try {
const {menId,appointmentId}=req.body
const appointmentData=await appointmentModel.findById(appointmentId)
if(appointmentData && appointmentData.menId===menId){
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    return res.json({success:true,message:'Appointment Cancelled'})
}
else{
    return res.json({success:false,message:'Cancellation Failed'})
}

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Api to get dashboard data for mentor panel
const mentorDashboard = async (req, res) => {
    try {
      const { menId } = req.body;
      const appointments = await appointmentModel.find({ menId });
  
      let earnings = 0;
  
      // Calculate total earnings
      appointments.forEach((item) => {
        if (item.isCompleted || item.payment) {
          earnings += item.amount;
        }
      });
  
      // Collect unique student IDs
      const students = [];
      appointments.forEach((item) => {
        if (!students.includes(item.userId.toString())) {
          students.push(item.userId.toString());
        }
      });
  
      // Filter and get the latest active appointments
      const latestAppointments = appointments
        .filter(item => !item.cancelled && !item.isCompleted)
        .reverse()
        .slice(0, 5);

        const totalAppointments=appointments
        .filter(item => !item.cancelled && !item.isCompleted)
  
      const dashData = {
        earnings,
        totalAppointments:totalAppointments.length,
        students: students.length,
        latestAppointments
      };
  
      res.json({ success: true, dashData });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  //API to get mentor progile for Mentor panel

  const mentorProfile=async(req,res)=>{
    try {
        const {menId}=req.body
        const profileData=await mentorModel.findById(menId).select('-password')

        res.json({success:true,profileData})
    } catch (error) {
        console.log(error);
      res.json({ success: false, message: error.message });
    }
    
  }

  //Api to get update mentor profile data from Mentor panel

  const updateMentorProfile=async(req,res)=>{
    try {
        const {menId,fees,available,about}=req.body
        await mentorModel.findByIdAndUpdate(menId,{fees,available,about})
        res.json({success:true,message:"Profile Updated"})
    } catch (error) {
        console.log(error);
      res.json({ success: false, message: error.message });
    }
  }


export {changeAvailablity,mentorList,loginMentor,appointmentsMentor,appointmentCancel,appointmentComplete,mentorDashboard,mentorProfile,updateMentorProfile}