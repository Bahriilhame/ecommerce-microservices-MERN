// auth.js

import axios from 'axios';

const API_URL_auth = 'http://localhost:8002/auth';
const API_URL_profile = 'http://localhost:8003/api';
const API_URL_annonce = 'http://localhost:8001';


const authAPI = {
  register: (formData) => axios.post(`${API_URL_auth}/register`, formData),
  
  login: async (formData) => {
      const response = await axios.post(`${API_URL_auth}/login`, formData);
      localStorage.setItem('token', response.data.token);
      return response;
  },
  
  getUserProfile: async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get(`${API_URL_profile}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
      return response;
  },

  getAnnonces: async () => {
    const response = await axios.get(`${API_URL_annonce}/annonces`);
    console.log(response);
    return response;
},

getAnnonceByID: async (id) => {
  const response = await axios.get(`${API_URL_annonce}/annonces/${id}`);
  console.log(response);
  return response;
},

  createAnnonce: async (data) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL_annonce}/annonces/create`,data,{
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response);
    return response;
  },

  updateUserProfile: async (formData) => {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL_profile}/profile/update`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response;
  }
};

export default authAPI;
