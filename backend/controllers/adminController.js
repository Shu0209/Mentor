


//API for adding mentor

const addMentor=async(req,res)=>{
    try{
       const {name,email,password,speciality,degree,experience,about,fees}=req.body
       const imageFile=req.file

       console.log({name,email,password,speciality,degree,experience,about,fees},imageFile)
    }
    catch(error){

    }
}

export {addMentor}