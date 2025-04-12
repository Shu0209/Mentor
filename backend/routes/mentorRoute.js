import express from 'express'
import { mentorList,loginMentor, appointmentsMentor, appointmentCancel, appointmentComplete, mentorDashboard } from '../controllers/mentorController.js'
import authMentor from '../middlewares/authMentor.js'

const mentorRouter=express.Router()

mentorRouter.get('/list',mentorList)
mentorRouter.post('/login',loginMentor)
mentorRouter.get('/appointments',authMentor,appointmentsMentor)
mentorRouter.post('/cancel-appointment',authMentor,appointmentCancel)
mentorRouter.post('/completed-appointment',authMentor,appointmentComplete)
mentorRouter.get('/dashboard',authMentor,mentorDashboard)

export default mentorRouter