import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './StaticComponents/Navbar';
import Cart from './Components/Cart/Cart';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import UserProfile from './Components/User/UserProfile';
import UpdateProfile from './Components/User/UpdateProfile';
import AnnoncesPage from './Components/Annonce/AnnoncesPage';
import CreateAnnonce from './Components/Annonce/CreateAnnonce';
import AnnonceDetails from './Components/Annonce/AnnonceDetails';
import Wishlist from './Components/Wishlist/Wishlist';
import authAPI from './Services/auth'; // Make sure the path is correct

const RoutesComponent = () => {
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchCart = async () => {
    try {
      const response = await authAPI.getCart();
      const updatedCart = response.cart.annonces.map(item => ({
        ...item,
        id_seller: item.annonce.id_vendeur,
      }));
      setCart({ ...response.cart, annonces: updatedCart });
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await authAPI.getWishlist();
      setWishlist({ ...response.wishlist });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  return (
    <BrowserRouter>
      <Navbar 
        setIsCartOpen={setIsCartOpen} 
        cart={cart} 
        setIsWishlistOpen={setIsWishlistOpen} 
        wishlist={wishlist} 
        fetchCart={fetchCart} 
        fetchWishlist={fetchWishlist} 
      />
      {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} setCart={setCart} cart={cart} />}
      {isWishlistOpen && <Wishlist setIsWishlistOpen={setIsWishlistOpen} setWishlist={setWishlist} wishlist={wishlist} />}
      <Routes className="mt-40">
        <Route path="/" element={<AnnoncesPage fetchCart={fetchCart} fetchWishlist={fetchWishlist} />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile" element={!isAuthenticated ? <Navigate to="/login" /> : <UserProfile />} />
        <Route path="/profile/update" element={!isAuthenticated ? <Navigate to="/login" /> : <UpdateProfile />} />
        <Route
          path="/annonces/create"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" />
            ) : user.role === 'vendeur' ? (
              <CreateAnnonce />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/annonces/:id" element={<AnnonceDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
