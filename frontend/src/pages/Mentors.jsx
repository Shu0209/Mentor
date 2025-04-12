import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Mentors = () => {
  const { speciality } = useParams();
  const [filterMen, setFilterMen] = useState([]);
  const { mentors } = useContext(AppContext);
  const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState(false); // Controls filter visibility

  const applyFilter = () => {
    if (speciality) {
      setFilterMen(mentors.filter((men) => men.speciality === speciality));
    } else {
      setFilterMen(mentors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [mentors, speciality]);

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-16 lg:px-28 gap-6">
      
      {/* Filter Button for Small Screens */}
      <div className="md:hidden p-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-blue-200 text-black px-4 py-2 rounded-lg w-full text-center"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sidebar (Dropdown on Small Screens) */}
        {showFilters && (
          <div className="bg-gray-100 mt-2 p-4 rounded-lg shadow-md">
            {["Data Science", "Spring Boot", "Machine Learning", "MERN Stack", "Cyber Security", "Blockchain"].map(
              (category, index) => (
                <p
                  key={index}
                  onClick={() => speciality === category ? navigate('/mentors') : navigate(`/mentors/${category}`)}
                  className={`p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200 transition {speciality===category ?"bg-indigo-100 text-black":""}`}
                >
                  {category}
                </p>
              )
            )}
          </div>
        )}
      </div>

      {/* Sidebar for Medium & Large Screens */}
      <div className="hidden md:block md:w-1/4 lg:w-1/5">
        <div className="p-2 text-gray-600">
          {["Data Science", "Spring Boot", "Machine Learning", "MERN Stack", "Cyber Security", "Blockchain"].map(
            (category, index) => (
              <p
                key={index}
                onClick={() => speciality === category ? navigate('/mentors') : navigate(`/mentors/${category}`)}
                className={`m-1 p-2 border-[1px] border-gray-400 rounded-xl text-sm md:text-base cursor-pointer hover:bg-gray-200 transition ${speciality===category ?"bg-indigo-100 text-black":""}`}
              >
                {category}
              </p>
            )
          )}
        </div>
      </div>

      {/* Mentor Cards (Responsive Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 m-2 w-full">
        {filterMen.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="bg-blue-100 border border-primary rounded-3xl cursor-pointer transition-transform hover:scale-105 duration-300"
          >
            <img
              className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-t-3xl"
              src={item.image}
              alt={item.name}
            />
            <div className="bg-white rounded-b-3xl p-4 text-center">
            <p className={`font-bold ${item.available ? 'text-green-500':'text-red-500'} `}>{item.available ? 'Available':'Not Available'}</p>
              <p className="font-bold text-xl md:text-2xl">{item.name}</p>
              <p className="text-gray-600 text-sm md:text-lg">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
