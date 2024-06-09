import { useState, useEffect } from 'react';
import authAPI from '../../Services/auth';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import UpdateForm from '../../StaticComponents/UpdateForm ';
import DeleteConfirmationModal from '../../StaticComponents/DeleteConfirmationModal ';

const AnnoncesBySeller = () => {
  const [annonces, setAnnonces] = useState([]);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAnnoncesBySeller = async () => {
      try {
        const response = await authAPI.getAnnoncesBySeller(user._id);
        setAnnonces(response.data);
      } catch (error) {
        console.error('Error fetching annonces:', error);
      }
    };

    fetchAnnoncesBySeller();
  }, [user._id]);

  const handleUpdate = (annonce) => {
    setSelectedAnnonce(annonce);
    setIsUpdateOpen(true);
  };

  const handleDelete = (annonce) => {
    setSelectedAnnonce(annonce);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await authAPI.deleteAnnonceById(selectedAnnonce._id);
      setAnnonces(annonces.filter(a => a._id !== selectedAnnonce._id));
      setIsDeleteOpen(false);
    } catch (error) {
      console.error('Error deleting annonce:', error);
    }
  };

  return (
    <div className="md:mt-[50px] mx-auto w-full max-w-screen-lg">
      <div className="bg-white shadow-lg p-4 col-span-2">
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Annonces du vendeur</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categorie</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {annonces.map((annonce) => (
                  <tr key={annonce._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-4 whitespace-nowrap">
                      <div className='flex m-4 items-center'>
                        <img src={`http://localhost:8001/uploads/${annonce.image_name}`} alt="product" className="w-12 h-12 object-cover rounded-md mr-2 lg:mr-4" />
                        <p className='text-gray-600 w-full lg:w-auto ml-2 lg:ml-3'>
                          {annonce.title}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-4 whitespace-nowrap">{annonce.quantity}</td>
                    <td className="px-3 sm:px-4 py-4 whitespace-nowrap">{annonce.price}</td>
                    <td className="px-3 sm:px-4 py-4 whitespace-nowrap">{annonce.id_categorie.name}</td>
                    <td className="px-3 sm:px-4 py-4 whitespace-nowrap">
                      <button onClick={() => handleUpdate(annonce)} className="mr-2">
                        <PencilIcon className="h-5 w-5 text-gray-500" />
                      </button>
                      <button onClick={() => handleDelete(annonce)}>
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedAnnonce && (
        <UpdateForm
          annonce={selectedAnnonce}
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
        />
      )}

      {selectedAnnonce && (
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default AnnoncesBySeller;
