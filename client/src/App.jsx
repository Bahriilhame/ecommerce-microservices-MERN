import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components//Auth/Login';
import Register from './Components/Auth/Register';
import UserProfile from './Components/User/UserProfile';
import UpdateProfile from './Components/User/UpdateProfile';
import AnnoncesPage from './Components/Annonce/AnnoncesPage';
import CreateAnnonce from './Components/Annonce/CreateAnnonce';
import Navbar from './StaticComponents/Navbar';
import AnnonceDetails from './Components/Annonce/AnnonceDetails';

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes className="mt-40">
        <Route path="/" element={<AnnoncesPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/profile/update" element={<UpdateProfile/>} />
        <Route path="/annonces/create" element={<CreateAnnonce/>} />
        <Route path="/annonces/:id" element={<AnnonceDetails/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
