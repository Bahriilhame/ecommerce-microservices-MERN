import { useState, useEffect } from 'react';
import authAPI from '../../Services/auth'; // Assurez-vous d'importer votre fichier auth.js ici
import {useNavigate  } from 'react-router-dom';

const CreateAnnonceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    adresse: '',
    status: '',
    id_categorie: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await authAPI.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await authAPI.createAnnonce(formDataToSend);
      if (response.status === 201) {
        console.log('Annonce créée avec succès:', response.data);
        navigate('/')
      } else {
        console.error('Erreur lors de la création de l\'annonce');
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-36 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Créer une annonce</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 focus:ring-[#14b8a6] focus:border-[#14b8a6] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 focus:ring-[#14b8a6] focus:border-[#14b8a6] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Prix
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 focus:ring-[#14b8a6] focus:border-[#14b8a6] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantité
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 focus:ring-[#14b8a6] focus:border-[#14b8a6] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
            Adresse
          </label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="mt-1 focus:ring-[#14b8a6] focus:border-[#14b8a6] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#14b8a6] focus:border-[#14b8a6] sm:text-sm"
            required
          >
            <option value="">Sélectionner le statut</option>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="id_categorie" className="block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <select
            id="id_categorie"
            name="id_categorie"
            value={formData.id_categorie}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#14b8a6] focus:border-[#14b8a6] sm:text-sm"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 focus:ring-cyan-500 focus:border-[#14b8a6] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-400 hover:bg-green-500'} inline-flex justify-center py-2 px-4 border w-full border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14b8a6]`}
          >
            {submitting ? 'En cours...' : 'Créer l\'annonce'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnonceForm;
