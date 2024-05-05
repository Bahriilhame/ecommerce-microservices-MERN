// UpdateProfile.js

import { useState } from 'react';
import authAPI from '../../Services/auth';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    lname: '',
    fname: '',
    email:"",
    phone: '',
    role:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.updateUserProfile(formData);
      console.log(response.data); // Handle successful profile update response
    } catch (error) {
      console.error(error.response.data); // Handle profile update error
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" />
        <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <select name="role" value={formData.role}  onChange={handleChange}>
            <option value="acheteur">acheteur</option>
            <option value="vendeur">vendeur</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
