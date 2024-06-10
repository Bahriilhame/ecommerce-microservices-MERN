import { useEffect, useState } from 'react';
import authAPI from '../../Services/auth';
import { Link } from 'react-router-dom';

const Wishlist = ({ setIsWishlistOpen, setWishlist, wishlist }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = await authAPI.getWishlist();
        setWishlist({ ...response.wishlist });
      } catch (error) {
        console.error(error.response.data);
      }
      setLoading(false);
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (annonceId) => {
    try {
      await authAPI.removeFromWishlist(annonceId);
      const updatedWishlist = wishlist.annonces.filter(item => item.annonce._id !== annonceId);
      setWishlist({ ...wishlist, annonces: updatedWishlist });
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!wishlist || wishlist.annonces.length === 0) {
    return (
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setIsWishlistOpen(false)}>
        <div className="bg-white max-w-md w-full h-1/6 overflow-auto mx-4 rounded-md shadow-lg" onClick={(e) => e.stopPropagation()}>
          <div className="px-6 py-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Wishlist</h2>
              <button className="flex justify-end text-gray-500 hover:text-gray-700 focus:outline-none" onClick={() => setIsWishlistOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className='flex justify-between'>
              <h4 className='mt-3'>Wishlist is empty! <Link to='/'><button className='bg-green-400 r-0 px-2 py-1 rounded-sm hover:bg-green-500 ml-56' onClick={() => setIsWishlistOpen(false)}>Shop</button></Link></h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setIsWishlistOpen(false)}>
        <div className="bg-white max-w-md w-full h-[55%] mx-4 rounded-md shadow-lg sm:h-[55%] md:h-[55%]" onClick={(e) => e.stopPropagation()}>
          <div className="px-6 py-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Wishlist</h2>
              <button className="flex justify-end text-gray-500 hover:text-gray-700 focus:outline-none" onClick={() => setIsWishlistOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="mt-4 h-80 overflow-y-auto">
              {wishlist.annonces.map((item) => (
                <li key={item._id} className="flex justify-between items-center border-b border-gray-200 py-2">
                  <div className="flex items-center">
                    <img src={`http://localhost:8001/uploads/${item.annonce.image_name}`} alt="Product" className="w-12 h-12 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.annonce.title}</h3>
                      <p className="text-gray-600">Price: {item.annonce.price} $</p>
                    </div>
                  </div>
                  <button className="text-red-500 hover:text-red-600 focus:outline-none" onClick={() => handleRemove(item.annonce._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;

