import express from 'express'
import { mentorList,loginMentor, appointmentsMentor } from '../controllers/mentorController.js'
import authMentor from '../middlewares/authMentor.js'

const mentorRouter=express.Router()

mentorRouter.get('/list',mentorList)
mentorRouter.post('/login',loginMentor)
mentorRouter.get('/appointments',authMentor,appointmentsMentor)

export default mentorRouter