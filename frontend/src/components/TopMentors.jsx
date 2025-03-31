import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


const TopMentors = () => {
  const navigate = useNavigate();
  const {mentors}=useContext(AppContext)

  return (
    <>
      <div className="flex justify-center m-2 p-2">
        <div className="m-2 p-2 w-full max-w-[1200px]">
          
          <div className="text-center">
            <p className="text-3xl md:text-4xl lg:text-6xl font-bold p-2 m-2">
              Top Mentors to Book
            </p>
            <p className="text-lg md:text-2xl p-2 m-2">
              Simply browse through our extensive list of trusted mentors.
            </p>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 m-2">
            {mentors.slice(0, 10).map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="bg-blue-100 border border-primary rounded-3xl cursor-pointer relative transition-transform hover:scale-105 duration-300"
              >
                <img
                  className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-t-3xl"
                  src={item.image}
                  alt={item.name}
                />
                <div className="bg-white rounded-b-3xl p-4 text-center">
                  <p className="font-bold text-green-800">Available</p>
                  <p className="font-bold text-xl md:text-2xl">{item.name}</p>
                  <p className="text-gray-600 text-sm md:text-lg">
                    {item.speciality}
                  </p>
                </div>
              </div>
            ))}
          </div>

          
          <div className="flex justify-center">
            <button
              onClick={() => {navigate(`/mentors`); scrollTo(0,0)}}
              className="font-bold text-lg md:text-2xl m-2 p-2 bg-gray-200 text-black w-full sm:w-[150px] h-[50px] rounded-3xl hover:scale-105 transition-transform duration-300"
            >
              More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMentors;
