import { useState, useEffect } from 'react';
import authAPI from '../../Services/auth';
import { UserCircleIcon } from '@heroicons/react/solid';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authAPI.getUserProfile();
        setUserProfile(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchUserProfile();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-lg p-4">
          {userProfile && (
            <div className="flex items-center">
              <div className="mr-4">
              <UserCircleIcon className="w-24 h-24 text-gray-500" />
              </div>
              <div>
                <h5 className="text-xl font-semibold mb-2">{userProfile.lname +" "+userProfile.fname}</h5>
                <p className="text-sm text-gray-600">Joined {formatDate(userProfile.createdAt)}</p>
              </div>
            </div>
          )}
          <div className="mt-4">
            <div className="flex items-center border-b border-gray-200 py-2">
              <button className="text-lg font-semibold py-2 mr-4 text-gray-500 border-b-2 border-gray-500">Profile Settings</button>
            </div>
            <div className="flex items-center border-b border-gray-200 py-2">
              <button className="text-lg font-semibold py-2 mr-4 text-gray-500 border-b-2 border-gray-500">Orders List <span className="bg-red-500 text-white rounded-full px-2 ml-2">3</span></button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4">
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-lg font-semibold">Name</label>
              <input type="text" id="username" value={userProfile && userProfile.lname +" "+userProfile.fname} className="px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-semibold">Email Address</label>
              <input type="email" id="email" value={userProfile && userProfile.email} className="px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg font-semibold">New Password</label>
              <input type="password" id="password" className="px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm Password</label>
              <input type="password" id="confirmPassword" className="px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
