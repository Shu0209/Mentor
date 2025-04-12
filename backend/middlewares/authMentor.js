import jwt from 'jsonwebtoken'

//Mentor authentication middleware
const authMentor=async(req,res,next)=>{
    try {
        
        const {mtoken}=req.headers
        if(!mtoken){
            return res.json({success:false,message:'Not Authorized Login Again'})
        }
        const token_decode=jwt.verify(mtoken,process.env.JWT_SECRET)

        req.body.menId=token_decode.id

        next()

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authMentor