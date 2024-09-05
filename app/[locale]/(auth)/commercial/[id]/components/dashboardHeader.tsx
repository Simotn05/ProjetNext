import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa'; // Icônes pour la recherche, notifications et utilisateur

const DashboardHeader: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord</h1>
        
        {/* Barre de recherche */}
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
        
        {/* Icônes de notifications et profil */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-800">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <FaUserCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
