'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link'; // Importer le composant Link de Next.js
import { Button } from '@mui/material';

const ListeEtudiantsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [students, setStudents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api2/commercial/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setStudents(data.commercial.clients); // Utilisez la bonne propriété
        } else {
          setError('Erreur lors de la récupération des étudiants.');
        }
      } catch (err) {
        setError('Impossible de récupérer les étudiants. Veuillez vérifier votre connexion Internet.');
      }
    };

    fetchStudents();
  }, [params.id, router]);

  const handleDelete = async (etudiantId: number) => {
    try {
      const res = await fetch(`/api2/deleteEtudiant/${params.id}/${etudiantId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setStudents(students.filter(student => student.id !== etudiantId));
      } else {
        setError('Erreur lors de la suppression de l\'étudiant.');
      }
    } catch (err) {
      setError('Impossible de supprimer l\'étudiant. Veuillez vérifier votre connexion Internet.');
    }
  };

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto my-16 shadow-lg rounded-lg">
        <CardContent className="p-6">
          <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
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
                      <th className="py-3 px-4 text-left text-sm font-semibold hidden xl:table-cell">Auto-école</th>
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
                        <td className="py-4 px-4 text-gray-800 hidden xl:table-cell">{etudiant.ecole?.name || 'Non spécifiée'}</td>
                        <td className="py-4 px-4 text-gray-800 hidden xl:table-cell">{etudiant.drivingLicenseType}</td>
                        <td className="py-4 px-4 text-gray-800">
                        <Menu as="div" className="relative inline-block text-left">
                          <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              Actions
                              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                          </div>
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="p-1">
                              {(!etudiant.ecole?.name || etudiant.ecole?.name === 'Non spécifiée') && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      href={`/fr/commercial/${params.id}/attribuer-ecole/${etudiant.id}`}
                                      className={`${
                                        active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                                      } group flex rounded-md items-center px-2 py-2 text-sm`}
                                    >
                                      Attribuer une école
                                    </Link>
                                  )}
                                </Menu.Item>
                              )}
                              <Menu.Item>
                              {({ active }) => (
                                      <button
                                        onClick={() => handleDelete(etudiant.id)} // Fonction de suppression
                                        className={`${
                                          active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                                        } group flex rounded-md items-center px-2 py-2 text-sm`}
                                      >
                                        Supprimer
                                      </button>
                                    )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
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

export default ListeEtudiantsPage;
