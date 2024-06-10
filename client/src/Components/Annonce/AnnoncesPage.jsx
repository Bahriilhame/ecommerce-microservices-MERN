import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authAPI from '../../Services/auth';
import Toast from '../../Services/Toast';

const AnnoncesPage = () => {
  const [annonces, setAnnonces] = useState([]);
  const slidersRef = useRef({});
  const [loadingStates, setLoadingStates] = useState({});
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    document.title = "Home";
    const fetchAnnonces = async () => {
      try {
        const response = await authAPI.getAnnonces();
        setAnnonces(response.data.filter(annonce => annonce.status === 'active'));
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchAnnonces();
  }, []);

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
    setLoadingStates((prevStates) => ({ ...prevStates, [annonceId]: true }));
    try {
      await authAPI.addToCart(annonceId, 1);
      setShowNotif(true);
    } catch (error) {
      console.error(error.response.data);
      alert('Une erreur s\'est produite lors de l\'ajout au panier.');
    }
    setLoadingStates((prevStates) => ({ ...prevStates, [annonceId]: false }));
  };

  return (
    <div className='mt-36 mx-auto w-full max-w-screen-lg'>
      {showNotif && <Toast message='Added to the cart successfully' />}
      {Object.entries(annoncesParCategorie).map(([categorie, annoncesCategorie], index, categories) => (
        <div key={categorie} className={index !== categories.length - 1 ? 'mb-8' : ''}>
          <h1>Nouvelles annonces des {categorie}</h1>
          <div className="relative">
            <Slider ref={(c) => slidersRef.current[categorie] = c} {...settings}>
              {annoncesCategorie.map((annonce) => (
                <div key={annonce._id} className="max-w-md mx-auto shadow-md rounded-md overflow-hidden m-2 p-3 duration-500 hover:scale-100 hover:shadow-xl" style={{ margin: '0 8px' }}> {/* Ajout de la marge */}
                  <Link to={`/annonces/${annonce._id}`}>
                    <div className="relative">
                      <img className="w-full h-[250px]" src={`http://localhost:8001/uploads/${annonce.image_name}`} alt="Product Image" />
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE</div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-2">{annonce.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${annonce.price}</span>
                        <button onClick={(e) => addToCart(e, annonce._id)} disabled={loadingStates[annonce._id]} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded flex items-center">
                          <ShoppingCartIcon className="h-5 w-5 mr-1" />
                          {loadingStates[annonce._id] ? 'Loading...' : 'Add to cart'}
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
            <ChevronLeftIcon className="absolute left-0 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 cursor-pointer" onClick={() => goToPrev(categorie)} /> {/* Ajout d'un gestionnaire de clic pour aller à la diapositive précédente */}
            <ChevronRightIcon className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 cursor-pointer" onClick={() => goToNext(categorie)} /> {/* Ajout d'un gestionnaire de clic pour aller à la diapositive suivante */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnoncesPage;
