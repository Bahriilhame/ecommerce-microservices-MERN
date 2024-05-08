import { useEffect, useState } from 'react';
import authAPI from '../../Services/auth';

const Cart = ({ setIsCartOpen, setCart, cart }) => {
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await authAPI.getCart();
        setCart(response.cart);
      } catch (error) {
        console.error(error.response.data);
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  useEffect(() => {
    if (cart && cart.annonces.length > 0) {
      const total = cart.annonces.reduce((acc, item) => acc + (item.annonce.price * item.quantity), 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart || cart.annonces.length === 0) {
    return <div>Cart is empty.</div>;
  }

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setIsCartOpen(false)}>
      <div className="bg-white max-w-md w-full h-4/6 overflow-auto mx-4 rounded-md shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4">
          <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button className="flex justify-end text-gray-500 hover:text-gray-700 focus:outline-none" onClick={() => setIsCartOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="mt-4">
            {cart.annonces.map((item) => (
              <li key={item._id} className="flex justify-between items-center border-b border-gray-200 py-2">
                <div className="flex items-center">
                  <img src={`http://localhost:8001/uploads/${item.annonce.image_name}`} alt="Product" className="w-12 h-12 object-cover rounded-md mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.annonce.title}</h3>
                    <p className="text-gray-600">Price: {item.annonce.price} $</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-600 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <p className="text-lg font-semibold">Total: {totalPrice} $</p>
          <button className="bg-[#14b8a6] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0d9488] focus:outline-none focus:ring focus:ring-[#14b8a6]">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
