import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Icônes pour la recherche
import Dropdown from './dropdown'; // Assurez-vous que le chemin est correct

const DashboardHeader: React.FC = () => {
  return (
    <header className="relative w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center">
        {/* Barre de recherche */}
        <div className="relative flex-1 min-w-[250px] max-w-xs">
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
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
          <Dropdown />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
