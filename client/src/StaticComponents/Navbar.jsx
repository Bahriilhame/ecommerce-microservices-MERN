import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, HeartIcon } from '@heroicons/react/outline';
import authAPI from '../Services/auth';

const Navbar = ({ setIsCartOpen, cart, wishlist, setIsWishlistOpen, fetchCart, fetchWishlist }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [annonces, setAnnonces] = useState([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);
  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    const handleClickOutside = (event) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) ||
        event.target.closest('.dropdown-item')
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    handleResize();

    fetchCart();
    fetchWishlist();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    document.title = "Home";
    const fetchAnnonces = async () => {
      try {
        const response = await authAPI.getAnnonces();
        const activeAnnonces = response.data.filter(annonce => annonce.status === 'active' && annonce.id_vendeur !== user._id);
        setAnnonces(activeAnnonces);
        setFilteredAnnonces(activeAnnonces); // Initialize filtered annonces
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchAnnonces();
  }, [user._id]);

  useEffect(() => {
    const results = annonces.filter(annonce =>
      annonce.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAnnonces(results);
  }, [searchTerm, annonces]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const totalAnnouncementsInCart = cart ? cart.annonces.length : 0;
  const totalAnnouncementsInWishlist = wishlist ? wishlist.annonces.length : 0;

  const handleProfileClick = () => {
    localStorage.getItem('user')
      ? setIsDropdownOpen(!isDropdownOpen)
      : window.location = 'http://127.0.0.1:5173/login';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location = 'http://127.0.0.1:5173/login';
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link aria-current="page" className="flex items-center" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
            </Link>
          </div>
          {isLargeScreen && (
            <form className="max-w-[480px] w-full px-4">
              <div className="relative">
                <input
                  type="text"
                  name="q"
                  className="w-full border h-12 p-4 rounded-full"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              {searchTerm && (
                <div className="absolute left-0 right-0 top-full bg-white border mt-2 rounded shadow-lg">
                  {filteredAnnonces.map((annonce) => (
                    <Link
                      key={annonce._id}
                      to={`/annonces/${annonce._id}`}
                      className="block p-2 hover:bg-gray-200 flex items-center"
                      onClick={() => setIsDropdownOpen(false)} // Fermer le dropdown au clic
                    >
                      <img src={`http://localhost:8001/uploads/${annonce.image_name}`} alt={annonce.title} className="w-8 h-8 mr-2 rounded" />
                      <span>{annonce.title}</span>
                    </Link>
                  ))}
            </div>
          )}

              </div>
            </form>
          )}
          <div className="flex items-center justify-end gap-3">
            <Link className="items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 inline-flex" to="/">Buy</Link>
            <Link className="inline-flex items-center justify-center rounded-xl bg-[#14b8a6] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:[#0d9488] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" to="/annonces/create">Publish an annonce</Link>
            <button className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCartIcon className="h-8 w-8 text-gray-900" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 bg-red-500 rounded-full text-xs text-white">{totalAnnouncementsInCart}</span>
            </button>
            <button className="relative" onClick={() => setIsWishlistOpen(true)}>
              <HeartIcon className="h-8 w-8 text-gray-900" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 bg-red-500 rounded-full text-xs text-white">{totalAnnouncementsInWishlist}</span>
            </button>
            <div className="relative">
              <button onClick={handleProfileClick} className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50">
                <UserIcon className="h-6 w-6 text-gray-900" />
              </button>
              {localStorage.getItem('user') && isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

