import mentorModel from "../models/mentorModel.js"



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

export {changeAvailablity,mentorList}