import { useState, useEffect } from 'react';
import authAPI from '../../Services/auth';
import { UserCircleIcon } from '@heroicons/react/solid';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    lname: '',
    fname: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authAPI.getUserProfile();
        setUserProfile(response.data);
        setFormData({
          lname: response.data.lname,
          fname: response.data.fname,
          email: response.data.email,
          phone: response.data.phone,
          role: response.data.role,
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await authAPI.updateUserProfile(formData);
      console.log(response.data);
      setUserProfile(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error.response.data);
      alert('Failed to update profile');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mt-[60px] sm:mt-[120px] ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-lg p-4">
          {userProfile && (
            <div className="flex items-center">
              <div className="mr-4">
                <UserCircleIcon className="w-24 h-24 text-gray-500" />
              </div>
              <div>
                <h5 className="text-xl font-semibold mb-2">{userProfile.lname} {userProfile.fname}</h5>
                <p className="text-sm text-gray-600">Joined {formatDate(userProfile.createdAt)}</p>
              </div>
            </div>
          )}
          <div className="mt-2 flex flex-row lg:flex-col lg:justify-between">
            <div className="flex items-center border-b border-gray-200 py-2">
              <button className="text-lg font-semibold py-2 mr-4 text-gray-500 border-b-2 border-gray-500">Profile Settings</button>
            </div>
            <div className="flex items-center border-b border-gray-200 py-2">
              <button className="text-lg font-semibold py-2 mr-4 text-gray-500 border-b-2 border-gray-500">Orders List <span className="bg-red-500 text-white rounded-full px-2 ml-2">3</span></button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="lname" className="text-lg font-semibold">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fname" className="text-lg font-semibold">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-semibold">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-lg font-semibold">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="role" className="text-lg font-semibold">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="acheteur">acheteur</option>
                <option value="vendeur">vendeur</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg font-semibold">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
