import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/solid';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authAPI from '../../Services/auth';
import Toast from '../../Services/Toast';

const AnnoncesPage = ({fetchCart,updateWishlistTotal}) => {
  const [annonces, setAnnonces] = useState([]);
  const slidersRef = useRef({});
  const [loadingCart, setLoadingCart] = useState({});
  const [loadingWishlist, setLoadingWishlist] = useState({});
  const [showNotif, setShowNotif] = useState(false);
  const [showNotifwishlist, setShowNotifwishlist] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    document.title = "Home";
    const fetchAnnonces = async () => {
      try {
        const response = await authAPI.getAnnonces();
        setAnnonces(response.data.filter(annonce => annonce.status === 'active' && annonce.id_vendeur !== user._id));
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchAnnonces();
  }, [user._id]);

  const annoncesParCategorie = annonces.reduce((acc, annonce) => {
    const categorie = annonce.id_categorie.name;
    if (!acc[categorie]) {
      acc[categorie] = [];
    }
    acc[categorie].push(annonce);
    return acc;
  }, {});

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const goToNext = (categorie) => {
    slidersRef.current[categorie].slickNext();
  };

  const goToPrev = (categorie) => {
    slidersRef.current[categorie].slickPrev();
  };

  const addToCart = async (event, annonceId) => {
    event.preventDefault();
    setLoadingCart((prevStates) => ({ ...prevStates, [annonceId]: true }));
    try {
      await authAPI.addToCart(annonceId, 1);
      setShowNotif(true);
      fetchCart();
    } catch (error) {
      console.error(error.response.data);
      alert('Une erreur s\'est produite lors de l\'ajout au panier.');
    }
    setLoadingCart((prevStates) => ({ ...prevStates, [annonceId]: false }));
  };

  const addToWishlist = async (event, annonceId) => {
    event.preventDefault();
    setLoadingWishlist((prevStates) => ({ ...prevStates, [annonceId]: true }));
    try {
      await authAPI.addToWishlist(annonceId, 1);
      setShowNotifwishlist(true);
      updateWishlistTotal();
    } catch (error) {
      console.error(error.response.data);
      alert('Annonce déjà existante dans le wishlist');
    }
    setLoadingWishlist((prevStates) => ({ ...prevStates, [annonceId]: false }));
  };

  return (
    <div className='mt-36 mx-auto w-full max-w-screen-lg'>
      {showNotif && <Toast message='Added to the cart successfully' />}
      {showNotifwishlist && <Toast message='Added to the wishlist successfully' />}
      {Object.entries(annoncesParCategorie).map(([categorie, annoncesCategorie], index, categories) => (
        <div key={categorie} className={index !== categories.length - 1 ? 'mb-8' : ''}>
          <h1>Nouvelles annonces des {categorie}</h1>
          <div className="relative">
            <Slider ref={(c) => slidersRef.current[categorie] = c} {...settings}>
              {annoncesCategorie.map((annonce) => (
                <div key={annonce._id} className="max-w-md mx-auto shadow-md rounded-md overflow-hidden m-2 p-3 duration-500 hover:scale-100 hover:shadow-xl" style={{ margin: '0 8px' }}>
                  <Link to={`/annonces/${annonce._id}`}>
                    <div className="relative">
                      <img className="w-full h-[250px]" src={`http://localhost:8001/uploads/${annonce.image_name}`} alt="Product Image" />
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE</div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-2">{annonce.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${annonce.price}</span>
                        <div className="flex justify-end space-x-2">
                          <button onClick={(e) => addToWishlist(e, annonce._id)} disabled={loadingWishlist[annonce._id]} className='flex items-center bg-[#f9a8d4] hover:bg-[#ec4899] text-white font-semibold py-2 px-4 rounded'>
                            <HeartIcon className="h-5 w-5 mr-1 ml-1" />
                            {loadingWishlist[annonce._id] ? 'Loading...' : ''}
                          </button>
                          <button onClick={(e) => addToCart(e, annonce._id)} disabled={loadingCart[annonce._id]} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded flex items-center">
                            <ShoppingCartIcon className="h-5 w-5 mr-1 ml-1" />
                            {loadingCart[annonce._id] ? 'Loading...' : ''}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
            <ChevronLeftIcon className="absolute left-0 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 cursor-pointer" onClick={() => goToPrev(categorie)} />
            <ChevronRightIcon className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 cursor-pointer" onClick={() => goToNext(categorie)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnoncesPage;
