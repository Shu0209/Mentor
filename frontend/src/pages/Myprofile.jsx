import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
 
  const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);

  const [image,setImage]=useState(false)

  const updateUserProfileData=async()=>{
try {
  const formData=new FormData()
   
  formData.append('name',userData.name)
  formData.append('phone',userData.phone)
  formData.append('address',JSON.stringify(userData.address))
  formData.append('gender',userData.gender)
  formData.append('dob',userData.dob)
  
  image && formData.append('image',image)

  const {data}=await axios.post(backendUrl +'/api/user/update-profile',formData,{headers:{token}})

  if(data.success){
    toast.success(data.message)
    await loadUserProfileData()
    setIsEdit(false)
    setImage(false)
  }
  else{
    toast.error(data.message)
  }
} catch (error) {
  console.log(error)
  toast.error(error.message)
}
  }

  // Handle input changes for text fields
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, image: imageUrl });
    }
  };

  return userData && (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="relative">
          <label htmlFor="profile-pic" className="cursor-pointer">
            <img
              src={userData.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-gray-300 shadow-md hover:opacity-80 transition"
            />
          </label>
          {isEdit && (
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          )}
          <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        {/* Editable Name */}
        {isEdit ? (
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="text-xl font-semibold mt-4 text-gray-800 border border-gray-300 rounded-md px-2 py-1 text-center"
          />
        ) : (
          <p className="text-2xl font-semibold mt-4 text-gray-800">{userData.name}</p>
        )}

        <p className="text-sm text-gray-500">{userData.email}</p>

        {/* Contact Information */}
        <p className="mt-6 text-lg font-medium text-gray-600 border-b pb-2 w-full uppercase">
          Contact Information
        </p>

        <div className="w-full mt-3 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <p className="font-semibold">Email:</p>
            {isEdit ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-1"
              />
            ) : (
              <p className="text-gray-600">{userData.email}</p>
            )}
          </div>

          <div className="flex justify-between">
            <p className="font-semibold">Phone:</p>
            {isEdit ? (
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-1"
              />
            ) : (
              <p className="text-gray-600">{userData.phone}</p>
            )}
          </div>

          <div>
            <p className="font-semibold">Address:</p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  name="line1"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData({ ...userData, address: { ...userData.address, line1: e.target.value } })
                  }
                  className="border border-gray-300 rounded-md px-2 py-1 w-full"
                />
                <input
                  type="text"
                  name="line2"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData({ ...userData, address: { ...userData.address, line2: e.target.value } })
                  }
                  className="border border-gray-300 rounded-md px-2 py-1 w-full mt-1"
                />
              </>
            ) : (
              <p className="text-gray-600">{userData.address.line1}, {userData.address.line2}</p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <p className="mt-6 text-lg font-medium text-gray-600 border-b pb-2 w-full uppercase">
          Basic Information
        </p>

        <div className="w-full mt-3 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <p className="font-semibold">Gender:</p>
            {isEdit ? (
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}
          </div>

          <div className="flex justify-between">
            <p className="font-semibold">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-1"
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Edit/Save Button */}
        <button
            onClick={() => {
              if (isEdit) {
                updateUserProfileData();
              }
              setIsEdit(!isEdit);
            }}
            className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg text-lg font-medium shadow-md hover:scale-105 transition-all duration-300"
          >
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>
      </div>
    </div>
  );
};

export default MyProfile;
