import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <div className="w-[90vw]">
        
       
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
          
        
          <div className="md:w-1/3 p-4">
            <img onClick={()=>navigate('/')} src={assets.Logo} alt="Logo" className="mx-auto md:mx-0 w-32" />
            <p className="text-lg sm:text-xl text-gray-700 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quos corrupti voluptatibus nostrum ea aperiam exercitationem ipsam.
            </p>
          </div>

         
          <div className="mt-6 md:mt-0">
            <p className="text-2xl font-bold mb-4">Company</p>
            <ul className="text-lg text-gray-800">
              <li className="cursor-pointer hover:underline py-1">Home</li>
              <li className="cursor-pointer hover:underline py-1">About Us</li>
              <li className="cursor-pointer hover:underline py-1">Privacy Policy</li>
            </ul>
          </div>

         
          <div className="mt-6 md:mt-0">
            <p className="text-2xl font-bold mb-4">Get in Touch</p>
            <p className="text-lg">+0-000-000-000</p>
            <p className="text-lg">myproject@gmail.com</p>
          </div>
        </div>

        
        <div className="text-center mt-6 border-t border-gray-300 pt-4">
          <p className="text-lg text-gray-600">Copyright 2024 @ myproject - All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
