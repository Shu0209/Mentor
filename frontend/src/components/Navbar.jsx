import React, { useContext, useRef, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 md:px-20 shadow-md h-20 md:h-24 bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="w-1/3 md:w-1/6">
        <img 
          onClick={() => navigate("/")} 
          className="w-28 md:w-36 cursor-pointer hover:opacity-90 transition-opacity" 
          src={assets.Logo} 
          alt="Logo" 
        />
      </div>

      {/* Navigation Menu */}
      <div className={`absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex 
          ${showMenu ? "block" : "hidden"} shadow-md md:shadow-none z-40`}>
        <ul className="flex flex-col md:flex-row md:justify-between w-full text-lg md:text-xl">
          {["/", "/mentors", "/about", "/contact"].map((path, index) => (
            <li key={index}>
              <NavLink 
                to={path}
                className={({ isActive }) => 
                  `block p-4 md:p-2 md:m-2 hover:text-primary transition-colors
                  ${isActive ? 'text-primary font-medium' : 'text-gray-700'}`
                }
                onClick={() => setShowMenu(false)}
              >
                {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="w-1/3 md:w-1/6 flex justify-end items-center gap-4">
        {token ? (
          <>
            {/* Profile Dropdown */}
            <div ref={dropdownRef} className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img className="w-10 h-10 rounded-full object-cover" src={assets.profile_pic} alt="Profile" />
                <img 
                  className={`w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                  src={assets.dropdown_icon} 
                  alt="Dropdown" 
                />
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200">
                  {[
                    { path: 'my-profile', label: 'My Profile' },
                    { path: 'my-appointments', label: 'My Appointments' }
                  ].map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMenu(!showMenu)} 
              className="md:hidden p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <img 
                src={showMenu ? assets.cross_icon : assets.menu_icon} 
                alt="Menu" 
                className="w-6" 
              />
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 md:px-6 rounded-full transition-colors shadow-sm hover:shadow-md"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;