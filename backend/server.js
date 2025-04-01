//npm install express mongoose multer bcrypt cloudinary cors dotenv jsonwebtoken nodemon validator


import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import mentorRouter from './routes/mentorRoute.js';
import userRouter from './routes/userRoute.js';


//App config
const app=express();
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints

app.use('/api/admin',adminRouter)
app.use('/api/mentor',mentorRouter)
app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send("API WORKING WELL");
})

app.listen(port, () => {
    console.log(`Server started on port `,port);
});
