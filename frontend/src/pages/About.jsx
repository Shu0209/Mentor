import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="mx-10 md:mx-20 p-4">
    
    <p className="text-4xl text-center text-gray-400 font-bold">
      ABOUT <span className="text-black">US</span>
    </p>
  
   
    <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
     
      <img 
        src={assets.about_image} 
        alt="About Mentor" 
        className="w-full md:w-1/2 rounded-lg shadow-md p-4"
      />
  
      
      <div className="flex flex-col gap-5 p-4 text-gray-700">
        <p className="text-sm leading-relaxed">
          Welcome to <span className="font-semibold text-blue-600">Mentor</span>, your trusted companion in guiding and supporting your personal and professional growth.
        </p>
        <p className="text-sm leading-relaxed">
          At Mentor, we understand the challenges individuals face in navigating their careers, developing new skills, and achieving their goals. Our platform is designed to connect you with expert guidance, valuable resources, and personalized support to help you succeed.
        </p>
  
        <div className="text-sm leading-relaxed">
          <p className="text-lg font-bold text-gray-900 py-4">Our Vision</p>
          <p>
            Our vision at <span className="font-semibold text-blue-600">Mentor</span> is to create a seamless learning and growth experience for every individual. We aim to bridge the gap between aspiring learners and experienced mentors, making it easier for you to access the guidance and support you need, whenever you need it.
          </p>
          <p className="mt-4 italic text-gray-500">
            Would you like to emphasize any specific aspect, such as career development, skill-building, or community engagement?
          </p>
        </div>
      </div>
    </div>
    <p className='text-2xl py-10 m-2'><span className='text-gray-600'>Why</span> CHOOSE US</p>
  
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

  <div className="group border border-gray-400 p-6 md:p-10 rounded-lg text-center hover:bg-primary transition-all duration-700">
    <p className="my-2 font-bold text-lg group-hover:text-white">EFFICIENCY:</p>
    <p className="text-gray-600 group-hover:text-white">Seamless mentorship connections that fit into your busy lifestyle.</p>
  </div>


  <div className="group border border-gray-400 p-6 md:p-10 rounded-lg text-center hover:bg-primary transition-all duration-700">
    <p className="my-2 font-bold text-lg group-hover:text-white">CONVENIENCE:</p>
    <p className="text-gray-600 group-hover:text-white">Access to a network of trusted mentors and industry experts to guide your growth.</p>
  </div>

 
  <div className="group border border-gray-400 p-6 md:p-10 rounded-lg text-center hover:bg-primary transition-all duration-700">
    <p className="my-2 font-bold text-lg group-hover:text-white">PERSONALIZATION:</p>
    <p className="text-gray-600 group-hover:text-white">Personalized mentorship recommendations and reminders to keep you on track with your growth.</p>
  </div>
</div>


  
  </div>
  
  )
}

export default About
