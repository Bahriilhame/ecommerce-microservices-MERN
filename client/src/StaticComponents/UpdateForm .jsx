import { useState, useEffect } from 'react';
import authAPI from '../Services/auth';

const UpdateForm = ({ annonce, onClose, isOpen }) => {
  const [updatedTitle, setUpdatedTitle] = useState(annonce.title);
  const [updatedDescription, setUpdatedDescription] = useState(annonce.description);
  const [updatedQuantity, setUpdatedQuantity] = useState(annonce.quantity);
  const [updatedPrice, setUpdatedPrice] = useState(annonce.price);
  const [updatedAdresse, setUpdatedAdresse] = useState(annonce.adresse);
  const [updatedStatus, setUpdatedStatus] = useState(annonce.status);
  const [updatedCategory, setUpdatedCategory] = useState(annonce.id_categorie._id);
  const [updatedImage, setUpdatedImage] = useState(annonce.image_name);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await authAPI.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedAnnonceData = new FormData();
      updatedAnnonceData.append('title', updatedTitle);
      updatedAnnonceData.append('description', updatedDescription);
      updatedAnnonceData.append('quantity', updatedQuantity);
      updatedAnnonceData.append('price', updatedPrice);
      updatedAnnonceData.append('adresse', updatedAdresse);
      updatedAnnonceData.append('status', updatedStatus);
      updatedAnnonceData.append('id_categorie', updatedCategory);
      if (updatedImage) {
        updatedAnnonceData.append('image', updatedImage);
      }

      await authAPI.updateAnnonceById(annonce._id, updatedAnnonceData);

      onClose();
    } catch (error) {
      console.error('Error updating annonce:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 lg:mt-[44px]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Update Annonce</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input type="number" id="quantity" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={updatedQuantity} onChange={(e) => setUpdatedQuantity(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" id="price" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
            <input type="text" id="adresse" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={updatedAdresse} onChange={(e) => setUpdatedAdresse(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select id="status" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select id="category" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)}>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input type="file" id="image" className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" onChange={(e) => setUpdatedImage(e.target.files[0])} />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="mr-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" onClick={handleUpdate}>Update</button>
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
