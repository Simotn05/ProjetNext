'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from '../components/sidebar'; // Assurez-vous que le chemin est correct
import { FaChartBar, FaUser } from 'react-icons/fa'; // Icône pour la liste des étudiants
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; // Icône pour la flèche du dropdown
import DashboardHeader from '../components/dashboardHeader';

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

  if (error) {
    return (
      <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
        <CardContent className="p-10">
          <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const navLinks = [
    { href: `/commercial/${params.id}`, label: 'Accueil', icon: <FaUser /> },
    { href: `/commercial/${params.id}/profile`, label: 'Profile', icon: <FaChartBar /> },
    { href: `/commercial/${params.id}/liste-etudiants`, label: 'Liste des étudiants', icon: <FaChartBar />, disabled: true }, // Marqué comme désactivé si vous êtes déjà sur cette page
    { href: `/commercial/${params.id}/liste-ecoles`, label: 'Liste des auto-écoles', icon: <FaChartBar /> },
    { href: `/commercial/${params.id}/stats`, label: 'Statistiques', icon: <FaChartBar /> },
  ];

  return (
    <>
    <DashboardHeader/>
    <div className="flex min-h-screen bg-white-100">
      <Sidebar navLinks={navLinks} /> {/* Passer les liens de navigation ici */}
      <div className="flex-1 flex flex-col ml-64"> {/* Marge gauche pour laisser de l'espace pour la Sidebar */}
        {/* <header className="flex items-center justify-between p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Liste des Étudiants</h1>
        </header> */}
        <main className="flex-1 p-6">
          <Card className="bg-white shadow-xl rounded-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center text-black mb-6">Liste des Étudiants</h2>
              {students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Nom</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Numéro</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Date de naissance</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Ville</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Auto-école</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Permis</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((etudiant) => (
                        <tr key={etudiant.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                          <td className="py-4 px-4 text-gray-800">{etudiant.username}</td>
                          <td className="py-4 px-4 text-gray-800">{etudiant.email}</td>
                          <td className="py-4 px-4 text-gray-800">{etudiant.number}</td>
                          <td className="py-4 px-4 text-gray-800">{new Date(etudiant.birthdate).toLocaleDateString()}</td>
                          <td className="py-4 px-4 text-gray-800">{etudiant.ville?.name || 'Non spécifié'}</td>
                          <td className="py-4 px-4 text-gray-800">{etudiant.autoEcole || 'Non spécifié Non spécifiéNon spécifié'}</td>
                          <td className="py-4 px-4 text-gray-800">{etudiant.drivingLicenseType}</td>
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
                                        href={`/commercial/${params.id}/assign-school/${etudiant.id}`}
                                        className={`${
                                          active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                                        } group flex rounded-md items-center px-2 py-2 text-sm`}
                                      >
                                        Attribuer une école
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href={`/commercial/${params.id}/delete/${etudiant.id}`}
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
                <p className="text-center text-xl font-medium text-gray-600">Aucun étudiant trouvé.</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
    </>
  );
};

export default ListeEtudiantsPage;
