import React, { useContext, useEffect, useState } from 'react'
import { MentorContext } from '../../context/MentorContext'

import axios from 'axios'
import { toast } from 'react-toastify'

const MentorProfile = () => {
  const { mToken, profileData, setProfileData, getProfileData,backendUrl } = useContext(MentorContext)
  

  const [isEdit, setIsEdit] = useState(false)
  
  const updateProfile= async () => {
    try {
        
      const updateData={
        fees:profileData.fees,
        available:profileData.available,
        about:profileData.about
      }

      const { data } = await axios.post(
        backendUrl+'/api/mentor/update-profile',
        updateData,
        {
          headers: { mToken }
        }
      )
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (mToken) {
      getProfileData()
    }
  }, [mToken])

  

 

  return profileData &&(
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mt-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {/* Profile Image */}
        <div className="w-80 h-80 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
          <label htmlFor="profileImageInput" className="cursor-pointer">
            <img
              src={profileData.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </label>
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-4">
           
            <p className="text-2xl font-bold text-gray-800">{profileData.name}</p>
          

          <div className="flex flex-wrap items-center gap-2">
            
              <p className="text-gray-600 font-medium">
                {profileData.degree} - {profileData.speciality}
              </p>
            
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
              {profileData.experience}
            </span>
          </div>

          <div>
            <p className="font-semibold text-gray-700">About</p>
            {isEdit ? (
              <textarea
              name='about'
                className="w-full sm:w-xl h-30 border border-gray-300 rounded-md p-2"
                value={profileData.about}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    about: e.target.value
                  }))
                }
              />
            ) : (
              <p className="text-gray-600">{profileData.about}</p>
            )}
          </div>

          <p className="text-gray-800 font-medium flex items-center gap-2">
            Appointment Fee:
            <span className="text-primary font-bold">
              ₹{" "}
              {isEdit ? (
                <input
                  type="number"
                  name='fees'
                  className="border border-gray-300 rounded-md px-2 py-1 w-24"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value
                    }))
                  }
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          <div className="flex items-center gap-2">
  <input
    checked={profileData.available}
    type="checkbox"
    name="available"
    id="available"
    className="w-5 h-5 accent-blue-500"
    disabled={!isEdit}
    onChange={(e) =>
      setProfileData((prev) => ({
        ...prev,
        available: e.target.checked
      }))
    }
  />
  <label htmlFor="available" className="text-gray-700">Available</label>
</div>


          {isEdit ? (
            <div className="flex gap-4">
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="mt-2 px-8 py-2 border border-gray-600 rounded-lg hover:bg-primary hover:text-white transition duration-500"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MentorProfile
