"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

const ListeEcolesPage: React.FC = () => {
  const params = useParams();
  const [ecoles, setEcoles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEcoles = async () => {
      try {
        const res = await fetch(`/api2/ecoles/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.ecoles)) {
            setEcoles(data.ecoles);
          } else {
            setError('Format de réponse invalide.');
          }
        } else {
          setError('Erreur lors de la récupération des auto-écoles.');
        }
      } catch (err) {
        setError('Impossible de récupérer les auto-écoles. Veuillez vérifier votre connexion Internet.');
      }
    };

    fetchEcoles();
  }, [params.id]);

  return (
    <main className="flex-1 p-6">
      <Card className="bg-white shadow-xl rounded-lg">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center text-black mb-6">Auto-École de votre Région(s)</h2>
          {ecoles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm border border-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Nom de l'école</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold hidden md:table-cell">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold hidden lg:table-cell">Téléphone</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold hidden xl:table-cell">Ville</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold hidden xl:table-cell">Nombre d'étudiants</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold sticky right-0 bg-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ecoles.map((ecole) => (
                    <tr key={ecole.id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-4 text-gray-800">{ecole.name}</td>
                      <td className="py-4 px-4 text-gray-800 hidden md:table-cell">{ecole.email}</td>
                      <td className="py-4 px-4 text-gray-800 hidden lg:table-cell">{ecole.phoneNumber}</td>
                      <td className="py-4 px-4 text-gray-800 hidden xl:table-cell">{ecole.city}</td>
                      <td className="py-4 px-4 text-gray-800 hidden xl:table-cell">Pas encore</td>
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
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href=''
                                      className={`${
                                        active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                                      } group flex rounded-md items-center px-2 py-2 text-sm`}
                                    >
                                      Modifier
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href=''
                                      className={`${
                                        active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                                      } group flex rounded-md items-center px-2 py-2 text-sm`}
                                    >
                                      Supprimer
                                    </a>
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
            <p className="text-center text-xl font-medium text-gray-600">Aucune auto-école trouvée.</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default ListeEcolesPage;
