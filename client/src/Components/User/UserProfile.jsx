import { useState, useEffect } from 'react';
import authAPI from '../../Services/auth';
import { UserCircleIcon } from '@heroicons/react/solid';
import Toast from '../../Services/Toast';
import SellerOrdersList from '../Order/SellerOrdersList';
import AnnoncesBySeller from '../Annonce/AnnoncesBySeller';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    lname: '',
    fname: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showProfileSettings, setShowProfileSettings] = useState(true);
  const [showOrdersList, setShowOrdersList] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showSellerOrdersList, setShowSellerOrdersList] = useState(false);
  const [showSellerAnnonce, setShowSellerAnnonce] = useState(false);

  useEffect(() => {
    document.title = "User Profile";
    const fetchUserProfile = async () => {
      try {
        const response = await authAPI.getUserProfile();
        setUserProfile(response.data);
        setFormData({
          lname: response.data.lname,
          fname: response.data.fname,
          email: response.data.email,
          phone: response.data.phone,
          role: response.data.role,
          password: '',
          confirmPassword: ''
        });
        setUserId(response.data._id);

        // if (response.data.role === 'vendeur') {
        //   setShowOrdersList(false);
        //   setShowSellerOrdersList(true);
        // } else {
        //   setShowSellerOrdersList(false);
        // }
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const ordersResponse = await authAPI.getOrders(userId);
          setOrders(ordersResponse.orders);
        } catch (error) {
          console.error(error.response.data);
        }
      };

      fetchOrders();
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await authAPI.updateUserProfile(formData);
      console.log(response.data);
      setUserProfile(response.data);
      setShowNotif(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error.response.data);
      alert('Failed to update profile');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mt-[60px] sm:mt-[120px] mx-auto w-full max-w-screen-lg">
      {showNotif && <Toast message='Updated successfully' />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg p-4 col-span-1">
          {userProfile && (
            <div className="flex items-center">
              <div className="mr-4">
                <UserCircleIcon className="w-24 h-24 text-gray-500" />
              </div>
              <div>
                <h5 className="text-xl font-semibold mb-2">{userProfile.lname} {userProfile.fname}</h5>
                <p className="text-sm text-gray-600">Joined on {formatDate(userProfile.createdAt)}</p>
              </div>
            </div>
          )}
          <div className="mt-2 flex flex-row lg:flex-col lg:justify-between">
            <div className="flex items-center border-b border-gray-200 py-2">
              <button className={`text-lg font-semibold py-2 mr-4 ${showProfileSettings ? 'border-b-2 border-gray-500' : ''}`} onClick={() => { setShowProfileSettings(true); setShowOrdersList(false); setShowSellerOrdersList(false); setShowSellerAnnonce(false)}}>Profile Settings</button>
            </div>
            <div className="flex items-center border-b border-gray-200 py-2">
              <button className={`text-lg font-semibold py-2 mr-4 ${showOrdersList ? 'border-b-2 border-gray-500' : ''}`} onClick={() => { setShowOrdersList(true); setShowProfileSettings(false); setShowSellerOrdersList(false); setShowSellerAnnonce(false)}}>Orders List <span className="bg-red-500 text-white rounded-full px-2 ml-2">{orders.length}</span></button>
            </div>
            {userProfile && userProfile.role === 'vendeur' && (
              <>
                <div className="flex items-center border-b border-gray-200 py-2">
                  <button className={`text-lg font-semibold py-2 mr-4 ${showSellerOrdersList ? 'border-b-2 border-gray-500' : ''}`} onClick={() => { setShowSellerOrdersList(true); setShowProfileSettings(false); setShowOrdersList(false);setShowSellerAnnonce(false) }}>Seller Orders</button>
                </div>
                <div className="flex items-center border-b border-gray-200 py-2">
                  <button className={`text-lg font-semibold py-2 mr-4 ${showSellerAnnonce ? 'border-b-2 border-gray-500' : ''}`} onClick={() => { setShowSellerAnnonce(true); setShowProfileSettings(false); setShowOrdersList(false); setShowSellerOrdersList(false)}}>Annonces</button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 col-span-2">
          {showProfileSettings && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="lname" className="text-lg font-semibold">Last Name</label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="fname" className="text-lg font-semibold">First Name</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg font-semibold">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-lg font-semibold">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="role" className="text-lg font-semibold">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="acheteur">acheteur</option>
                  <option value="vendeur">vendeur</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-lg font-semibold">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button type="submit" className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600">Update Profile</button>
            </form>
          )}
          {showOrdersList && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Orders List</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="md:px-6 md:py-4 whitespace-nowrap text-center">
                          <ul className="text-center">
                            {order.products.map((product) => (
                              <div key={product._id} className='flex m-4 items-center'>
                                <img src={`http://localhost:8001/uploads/${product.image_name}`} alt="product" className="w-12 h-12 object-cover rounded-md mr-2 lg:mr-4" />
                                <p className='text-gray-600 w-full lg:w-auto ml-2 lg:ml-3 overflow-auto'>
                                  {product.name}
                                </p>
                              </div>
                            ))}
                          </ul>
                        </td>
                        <td className="md:px-6 md:py-4 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {order.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {showSellerOrdersList && (
            <div className="mt-8">
              <SellerOrdersList />
            </div>
          )}
          {showSellerAnnonce && (
            <div className="mt-8">
              <AnnoncesBySeller />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
