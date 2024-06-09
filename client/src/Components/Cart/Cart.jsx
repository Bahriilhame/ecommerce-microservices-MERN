import { useEffect, useState } from 'react';
import authAPI from '../../Services/auth';
import { Link } from 'react-router-dom';
import OrderConfirmation from '../Order/OrderConfirmation ';

const Cart = ({ setIsCartOpen, setCart, cart }) => {
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await authAPI.getCart();
        const updatedCart = response.cart.annonces.map(item => ({
          ...item,
          id_seller: item.annonce.id_vendeur,
        }));
        setCart({ ...response.cart, annonces: updatedCart });
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

  const handleRemove = async (annonceId) => {
    try {
      await authAPI.removeFromCart(annonceId);
      const updatedCart = cart.annonces.filter(item => item.annonce._id !== annonceId);
      setCart({ ...cart, annonces: updatedCart });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const id_buyer = user ? user._id : null;

      if (!id_buyer) {
        alert('Utilisateur non identifié.');
        return;
      }

      const order = {
        id_buyer,
        products: cart.annonces.map(item => ({
          _id: item.annonce._id,
          id_seller: item.id_seller,
          name: item.annonce.title,
          price: item.annonce.price,
          image_name: item.annonce.image_name,
        })),
        total: totalPrice,
      };

      console.log('Commande à envoyer:', order);

      const response = await authAPI.createOrder(order);

      if (response) {
        await authAPI.clearCart(id_buyer);
        setShowConfirmation(false);
        setIsCartOpen(false);
        setCart({ annonces: [] });
        alert('Commande passée avec succès !');
      } else {
        alert('Erreur lors de la création de la commande.');
      }
    } catch (error) {
      console.error('Erreur lors de la confirmation de la commande:', error);
      alert('Erreur lors de la création de la commande.');
    }
  };
  const handleCancelOrder = () => {
    setShowConfirmation(false);
  };

  const handleQuantityChange = async (annonceId, newQuantity) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const id_buyer = user ? user._id : null;

      if (!id_buyer) {
        alert('Utilisateur non identifié.');
        return;
      }

      await authAPI.updateQuantity(annonceId, newQuantity,id_buyer);
      const updatedCart = cart.annonces.map(item => {
        if (item.annonce._id === annonceId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCart({ ...cart, annonces: updatedCart });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité dans le panier:', error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart || cart.annonces.length === 0) {
    return (
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setIsCartOpen(false)}>
        <div className="bg-white max-w-md w-full h-1/6 overflow-auto mx-4 rounded-md shadow-lg" onClick={(e) => e.stopPropagation()}>
          <div className="px-6 py-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <button className="flex justify-end text-gray-500 hover:text-gray-700 focus:outline-none" onClick={() => setIsCartOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className='flex justify-between'>
              <h4 className='mt-3'>Cart is empty! <Link to='/'><button className='bg-green-400 r-0 px-2 py-1 rounded-sm hover:bg-green-500 ml-56' onClick={() => setIsCartOpen(false)}>Shop</button></Link></h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setIsCartOpen(false)}>
        <div className="bg-white max-w-md w-full h-4/6 overflow-auto mx-4 rounded-md shadow-lg sm:h-3/6 md:h-1/2" onClick={(e) => e.stopPropagation()}>
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
                      <p className="text-gray-600">Quantity: 
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.annonce._id, e.target.value)}
                          className="border border-gray-300 w-20 rounded-md px-2 py-1"
                        />
                      </p>

                      <p className="text-gray-600">Seller ID: {item.id_seller}</p>
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
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-lg font-semibold">Total: {totalPrice} $</p>
            <button
              className="bg-[#14b8a6] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0d9488] focus:outline-none focus:ring focus:ring-[#14b8a6]"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <OrderConfirmation
          cart={cart}
          totalPrice={totalPrice}
          onConfirm={handleConfirmOrder}
          onCancel={handleCancelOrder}
        />
      )}
    </>
  );
};

export default Cart;
