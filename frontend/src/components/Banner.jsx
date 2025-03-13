import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-r from-primary to-pink-800 w-[90vw] p-6 rounded-3xl">
        
        
        <div className="text-white text-center lg:text-left p-4 flex flex-col gap-4">
          <p className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
            Book Appointment
          </p>
          <p className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
            With 100+ Trusted Mentors
          </p>
          <button 
            onClick={() => navigate(`/login`)} 
            className="bg-white text-gray-800 mt-4 px-6 py-3 rounded-2xl text-lg sm:text-xl font-medium hover:scale-105 transition-all duration-300"
          >
            Create Account
          </button>
        </div>

        
        <div className="mt-6 lg:mt-0 w-full flex justify-center">
          <img 
            className="w-[80%] max-w-[350px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] object-cover"
            src={assets.appointment_img} 
            alt="Appointment"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
