// Exemple de page avec Sidebar fixe
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from '../components/sidebar'; // Assurez-vous que le chemin est correct
import { FaChartBar, FaUser } from 'react-icons/fa'; // Icône pour la liste des étudiants

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
    { href: '/', label: 'Accueil', icon: <FaUser /> },
    { href: `/commercial/${params.id}/profile`, label: 'Profile', icon: <FaChartBar /> },
    { href: `/commercial/${params.id}/liste-etudiants`, label: 'Liste des étudiants', icon: <FaChartBar />, disabled: true }, // Marqué comme désactivé si vous êtes déjà sur cette page
    { href: `/commercial/${params.id}/liste-ecoles`, label: 'Liste des auto-écoles', icon: <FaChartBar /> },
    { href: `/commercial/${params.id}/stats`, label: 'Statistiques', icon: <FaChartBar /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar navLinks={navLinks} /> {/* Passer les liens de navigation ici */}
      <div className="flex-1 flex flex-col ml-64"> {/* Marge gauche pour laisser de l'espace pour la Sidebar */}
        <header className="flex items-center justify-between p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Liste des Étudiants</h1>
        </header>
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
                          <td className="py-4 px-4 text-gray-800">{etudiant.autoEcole || 'Non spécifié'}</td>
                          <td className="py-4 px-4 text-gray-800">{etudiant.drivingLicenseType}</td>
                          <td className="py-4 px-4 flex space-x-2">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                              Attribuer une école
                            </button>
                            <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors duration-200">
                              Ajouter une note
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200">
                              Supprimer
                            </button>
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
  );
};

export default ListeEtudiantsPage;
