const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-gray-700 mb-4">Are you sure you want to delete this annonce?</p>
        <div className="flex justify-end">
          <button className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
