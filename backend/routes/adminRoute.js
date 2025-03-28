import express from 'express'
import { addMentor } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'

const adminRouter=express.Router()

adminRouter.post('/add-mentor',upload.single('image'),addMentor)

export default adminRouter