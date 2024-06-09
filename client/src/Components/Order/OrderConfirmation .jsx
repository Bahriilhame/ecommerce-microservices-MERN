import React from 'react';

const OrderConfirmation = ({ cart, totalPrice, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white max-w-md w-full mx-4 rounded-md shadow-lg">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold">Order Confirmation</h2>
          <ul className="mt-4">
            {cart.annonces.map((item) => (
              <li key={item._id} className="flex justify-between items-center border-b border-gray-200 py-2">
                <div>
                  <h3 className="font-semibold">{item.annonce.title}</h3>
                  <p className="text-gray-600">Price: {item.annonce.price} $</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                  <img src={`http://localhost:8001/uploads/${item.annonce.image_name}`} alt="" className="w-16 h-16 object-cover rounded-md mr-4"/>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-semibold">Total: {totalPrice} $</p>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
            onClick={onConfirm}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
