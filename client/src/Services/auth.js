// auth.js

import axios from 'axios';

const API_URL_auth = 'http://localhost:8002/auth';
const API_URL_profile = 'http://localhost:8003/api';
const API_URL_annonce = 'http://localhost:8001';
const API_URL_cart = 'http://localhost:8004/api';


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

  createAnnonce: async (formData) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
      const response = await axios.post(`${API_URL_annonce}/annonces/create`, formData, config);
      return response;
    } catch (error) {
      console.error('Error creating annonce:', error);
      throw error;
    }
  },

  updateUserProfile: async (formData) => {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL_profile}/profile/update`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response;
  },

  getAllCategories: async () => {
    try {
      const response = await axios.get(`${API_URL_annonce}/categories`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw error;
    }
  },

  addToCart: async (annonceId,quantity) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(`${API_URL_cart}/cart/add`, { annonceId,quantity }, config);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      throw error;
    }
  },

  async getCart() {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`${API_URL_cart}/cart`, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  addToWishlist: async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(`${API_URL_annonce}/wishlist/add`, { itemId }, config);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout à la liste de souhaits:', error);
      throw error;
    }
  },
};

export default authAPI;
