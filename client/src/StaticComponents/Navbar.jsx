import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, HeartIcon } from '@heroicons/react/outline';
import authAPI from '../Services/auth';

const Navbar = ({ setIsCartOpen, cart, wishlist, setIsWishlistOpen, fetchCart, fetchWishlist }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [annonces, setAnnonces] = useState([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);
  const profileDropdownRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const change=JSON.parse(localStorage.getItem('user')) ? user._id : '' ;

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileDropdownOpen(false);
        setIsSearchDropdownOpen(false);
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
        if (response && response.data) {
          const annoncesData = response.data;
          if (user) {
            setAnnonces(annoncesData.filter(annonce => annonce.status === 'active' && annonce.id_vendeur !== user._id));
          } else {
            setAnnonces(annoncesData.filter(annonce => annonce.status === 'active'));
          }
        } else {
          console.error('Invalid response:', response);
        }
        const activeAnnonces = response.data.filter(annonce => annonce.status === 'active' && annonce.id_vendeur !== user._id);
        user ? setFilteredAnnonces(activeAnnonces) : setFilteredAnnonces(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchAnnonces();
  }, [change]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== '') {
      const results = annonces.filter(annonce =>
        annonce.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredAnnonces(results);
      setIsSearchDropdownOpen(!!results.length);
    } else {
      setFilteredAnnonces([]);
      setIsSearchDropdownOpen(false);
    }
  };

  const totalAnnouncementsInCart = cart ? cart.annonces.length : 0;
  const totalAnnouncementsInWishlist = wishlist ? wishlist.annonces.length : 0;

  const handleProfileClick = () => {
    localStorage.getItem('user')
      ? setIsProfileDropdownOpen(!isProfileDropdownOpen)
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
              <img src="./logo.png" alt="" className="w-10 h-10" />
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
                  onFocus={() => setIsSearchDropdownOpen(!!filteredAnnonces.length)}
                />
                {isSearchDropdownOpen && (
                  <div ref={searchDropdownRef} className="absolute left-0 right-0 top-full bg-white border mt-2 rounded shadow-lg">
                    {filteredAnnonces.map((annonce) => (
                      <Link
                        key={annonce._id}
                        to={`/annonces/${annonce._id}`}
                        className="block p-2 hover:bg-gray-200 flex items-center"
                        onClick={() => setIsSearchDropdownOpen(false)}
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
              {localStorage.getItem('user') && isProfileDropdownOpen && (
                <div ref={profileDropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsProfileDropdownOpen(false)}>Profile</Link>
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
