import { useState, useEffect } from 'react';
import authAPI from '../../Services/auth';

const SellerOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const sellerId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const response = await authAPI.getSellerOrders(sellerId);
        setOrders(response.products);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchSellerOrders();
  }, [sellerId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

    const handleStatusChange = async (orderId, productId, id_buyer, newStatus) => {
        try {
        console.log(orderId, productId, newStatus, id_buyer);
        await authAPI.updateProductStatus(orderId, productId, newStatus, id_buyer);
        setOrders((prevOrders) =>
            prevOrders.map((product) =>
            product._id === productId && product.order_id === orderId ? { ...product, status: newStatus } : product
            )
        );
        } catch (error) {
        console.error(error.response.data);
        }
    };

  return (
    <div className="md:mt-[50px] mx-auto w-full max-w-screen-lg">
      <div className="bg-white shadow-lg p-4 col-span-2">
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Orders List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((product) => (
                  <tr key={product.createdAt} className="hover:bg-gray-50">
                    <td className="md:px-6 md:py-4 whitespace-nowrap">
                      <div className='flex m-4 items-center'>
                        <img src={`http://localhost:8001/uploads/${product.image_name}`} alt="product" className="w-12 h-12 object-cover rounded-md mr-2 lg:mr-4" />
                        <p className='text-gray-600 w-full lg:w-auto ml-2 lg:ml-3'>
                          {product.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {product.quantity}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {product.buyerInfo.lname + ' ' + product.buyerInfo.fname}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {product.price * product.quantity}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        {console.log("product id: ",product._id)}
                      <select
                        value={product.status}
                        onChange={(e) => handleStatusChange(product.order_id, product._id, product.id_buyer, e.target.value)}
                        className="border border-gray-300 rounded-md"
                      >
                        <option value="pending">Pending</option>
                        <option value="delivred">Delivred</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrdersList;
