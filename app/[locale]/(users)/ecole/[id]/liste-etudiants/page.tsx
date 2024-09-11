'use client'; // Directive pour rendre cette page côté client

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Utilisation de useParams pour récupérer les paramètres d'URL dynamiques
import axios from 'axios';
import { Card, CardContent } from '@mui/material';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

type Ville = {
  name: string;
};
type Ecole = {
  name: string;
};
type Etudiant = {
  id: number;
  username: string;
  email: string;
  number: string;
  birthdate: string;
  drivingLicenseType: string;
  ville?: Ville;
  ecole?: Ecole;
  createdAt: string;
};

const ListeEtudiantsPage = () => {
  const { id } = useParams(); // Récupérer l'ID de l'école directement à partir de l'URL avec useParams
  const [students, setStudents] = useState<Etudiant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Si l'ID n'est pas encore disponible, on attend

    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api2/dashboard_ecole/etudiants', {
          headers: {
            'school-id': id, // Envoyer l'ID de l'école dans les headers
          },
        });
        console.log('Données des étudiants:', response.data.students); // Vérifiez les données dans la console
        setStudents(response.data.students);
      } catch (err) {
        console.log(err);
        setError('Erreur lors de la récupération des étudiants');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [id]); // Utiliser 'id' comme dépendance pour appeler l'API dès qu'il est disponible

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-white-100">
      <main className="flex-1 p-6">
        <Card className="w-full bg-white shadow-xl rounded-lg flex flex-col">
          <CardContent className="p-6 flex-1">
            <h2 className="text-3xl font-bold text-center text-black mb-6">Liste des Étudiants</h2>
            {students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold">Nom</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold hidden md:table-cell">Email</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold hidden lg:table-cell">Numéro</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold hidden xl:table-cell">Date de naissance</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold hidden xl:table-cell">Ville</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold hidden xl:table-cell">Permis</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold sticky right-0 bg-gray-100">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((etudiant) => (
                      <tr key={etudiant.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                        <td className="py-4 px-4 text-gray-800">{etudiant.username}</td>
                        <td className="py-4 px-4 text-gray-800 hidden md:table-cell">{etudiant.email}</td>
                        <td className="py-4 px-4 text-gray-800 hidden lg:table-cell">{etudiant.number}</td>
                        <td className="py-4 px-4 text-gray-800 hidden xl:table-cell">{new Date(etudiant.birthdate).toLocaleDateString()}</td>
                        <td className="py-4 px-4 text-gray-800 hidden xl:table-cell">{etudiant.ville?.name || 'Non spécifié'}</td>
                        <td className="py-4 px-4 text-gray-800 hidden xl:table-cell">{etudiant.drivingLicenseType}</td>
                        <td className="py-4 px-4 text-gray-800">
                          <Menu as="div" className="relative">
                          <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              Actions
                              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                          </div>
                            <MenuItems className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    className={`block w-full px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                    onClick={() => handleEdit(etudiant.id)}
                                  >
                                    Modifier
                                  </button>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    className={`block w-full px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                    onClick={() => handleDelete(etudiant.id)}
                                  >
                                    Supprimer
                                  </button>
                                )}
                              </MenuItem>
                            </MenuItems>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-xl font-medium text-gray-600">Aucun étudiant trouvé.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const handleEdit = (id: number) => {
  // Logique pour éditer l'étudiant, comme rediriger vers une page d'édition
  console.log('Modifier l\'étudiant avec ID:', id);
};

const handleDelete = (id: number) => {
  // Logique pour supprimer l'étudiant, comme envoyer une requête API
  console.log('Supprimer l\'étudiant avec ID:', id);
};

export default ListeEtudiantsPage;
