import React, { useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="flex justify-between items-center py-4 px-6 md:px-20 shadow-2xl h-20 md:h-24 bg-white relative">
      {/* Logo */}
      <div className="w-1/3 md:w-1/6">
        <img 
          onClick={() => navigate("/")} 
          className="w-28 md:w-36 cursor-pointer" 
          src={assets.Logo} 
          alt="Logo" 
        />
      </div>

      {/* Navigation Menu */}
      <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex 
          ${showMenu ? "block" : "hidden"} text-center md:text-left transition-all duration-300`}>
        <ul className="flex flex-col md:flex-row md:justify-between w-full text-lg md:text-xl cursor-pointer">
          {["/", "/mentors", "/about", "/contact"].map((path, index) => (
            <NavLink 
              key={index}
              to={path}
              className="p-4 md:p-2 md:m-2 hover:underline hover:text-primary transition duration-300 ease-in"
              onClick={() => setShowMenu(false)}
            >
              {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Right Section - Profile & Toggle Button */}
      <div className="w-1/3 md:w-1/6 flex justify-end items-center">
        {token ? (
          <div className="flex items-center gap-4">
            {/* Profile Dropdown */}
            <div ref={dropdownRef} className="relative">
              {/* Profile Button */}
              <div 
                className="flex cursor-pointer items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img className="w-10 rounded-full" src={assets.profile_pic} alt="Profile" />
                <img className="w-3 ml-2" src={assets.dropdown_icon} alt="Dropdown" />
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-12 right-0 w-max z-50 bg-gray-500 text-white rounded-2xl p-4 text-lg shadow-lg">
                  {["my-profile", "my-appointments"].map((route, index) => (
                    <p 
                      key={index} 
                      onClick={() => {
                        navigate(route);
                        setIsOpen(false);
                      }} 
                      className="p-1 cursor-pointer hover:underline"
                    >
                      {route.replace("-", " ").toUpperCase()}
                    </p>
                  ))}
                  <p 
                    onClick={() => {
                      setToken(false);
                      setIsOpen(false);
                    }} 
                    className="p-1 cursor-pointer hover:underline"
                  >
                    LOGOUT
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Toggle Button (Moved to Right) */}
            <button onClick={() => setShowMenu(!showMenu)} className="md:hidden">
              <img src={assets.menu_icon} alt="Menu" className="w-8" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate("login")}
            className="text-white text-lg w-28 md:w-40 p-2 h-10 md:h-12 rounded-2xl bg-primary 
              hover:scale-105 transition duration-300 ease-in-out"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
