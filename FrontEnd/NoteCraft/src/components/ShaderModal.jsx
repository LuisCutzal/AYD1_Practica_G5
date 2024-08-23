import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ShareModal = ({ isOpen, onClose, onShare }) => {
    const [selectedUser, setSelectedUser] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedUser) {
        onShare(selectedUser);
        onClose();
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Compartir Nota</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
                Seleccionar Usuario
              </label>
              <select
                id="user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Seleccione un usuario...</option>
                <option value="usuario1">Usuario 1</option>
                <option value="usuario2">Usuario 2</option>
                <option value="usuario3">Usuario 3</option>
                {/* Agrega más usuarios según sea necesario */}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-gray-700 focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                Compartir
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default ShareModal;