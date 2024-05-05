import { useState } from 'react';
import authAPI from '../../Services/auth';
import {useNavigate } from 'react-router-dom';

const CreateAnnonce = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    adresse: '',
    status: '',
    id_categorie: '',
    image: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const data = new FormData();
    //   data.append('title', formData.title);
    //   data.append('description', formData.description);
    //   data.append('price', formData.price);
    //   data.append('quantity', formData.quantity);
    //   data.append('adresse', formData.adresse);
    //   data.append('status', formData.status);
    //   data.append('id_categorie', formData.id_categorie);
    //   data.append('image', formData.imageFile);

      console.log(formData);

      const response = await authAPI.createAnnonce(formData);
      navigate('/annonces')
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }

    
  };

  return (
    <div>
      <h2>Create Announcement</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" />
        <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
        <input type="text" name="id_categorie" value={formData.id_categorie} onChange={handleChange} placeholder="Category ID" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAnnonce;
