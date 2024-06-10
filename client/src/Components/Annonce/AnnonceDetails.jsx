import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authAPI from '../../Services/auth';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline';

const AnnonceDetails = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

    useEffect(() => {
      document.title = "Annonce Details";
      const fetchAnnonceDetails = async () => {
        try {
          const response = await authAPI.getAnnonceByID(id);
          setAnnonce(response.data);
        } catch (error) {
          console.error(error.response.data);
        }
      };
      fetchAnnonceDetails();
    }, [id]);

    if (!annonce) {
      return <div>Loading...</div>;
    }

  const addToCart = async () => {
    setLoading(true);
    try {
      await authAPI.addToCart(annonce._id, quantity);
      alert('Annonce ajoutée au panier avec succès !');
    } catch (error) {
      console.error(error.response.data);
      alert('Une erreur s\'est produite lors de l\'ajout au panier.');
    }
    setLoading(false);
  };

    const addToWishlist = async () => {
      setLoading(true);
      try {
        await authAPI.addToWishlist(annonce._id);
        alert('Annonce ajoutée à la liste de souhaits avec succès !');
      } catch (error) {
        console.error(error.response.data);
        alert('Annonce already exists in wishlist');
      }
      setLoading(false);
    };

  return (
    <div className="max-w-4xl mx-auto mt-36 bg-white shadow-md rounded-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <img className="object-cover w-full h-full" src={`http://localhost:8001/uploads/${annonce.image_name}`} alt="Product Image" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{annonce.title}</h3>
          <p className="text-gray-600 mb-4">{annonce.description}</p>
          <p className="text-gray-600 mb-4">Price: {annonce.price} $</p>
          <p className="text-gray-600 mb-4">Quantity: {annonce.quantity}</p>
          <p className="text-gray-600 mb-4">Adresse: {annonce.adresse}</p>
          <p className="text-gray-600 mb-4">Category: {annonce.id_categorie.name}</p>
          <div className="flex items-center justify-end">
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mr-2 w-16" min="1" /> {/* Input field for quantity */}
            <button onClick={addToCart} disabled={loading} className={`flex items-center bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              {loading ? 'Loading...' : `Add to cart`}
            </button>
            <button onClick={addToWishlist} disabled={loading} className={`flex items-center bg-[#f9a8d4] hover:bg-[#ec4899] text-white font-semibold py-2 px-6 rounded ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <HeartIcon className="h-5 w-5 mr-2" />
              {loading ? 'Loading...' : 'Add to wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnonceDetails;
