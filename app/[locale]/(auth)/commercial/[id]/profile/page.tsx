'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from '../components/sidebar'; // Assurez-vous que le chemin est correct
import { FaChartBar, FaUser } from 'react-icons/fa'; // Icône pour le profil
import { MdPhone, MdEmail, MdPerson } from 'react-icons/md'; // Icônes pour téléphone, email et profil
import DashboardHeader from '../components/dashboardHeader';

const ProfilePage: React.FC = () => {
  const params = useParams();
  const [commercial, setCommercial] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommercial = async () => {
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
          setCommercial(data.commercial);
        } else {
          setError('Erreur lors de la récupération des données du commercial.');
        }
      } catch (err) {
        setError('Impossible de récupérer les données du commercial. Veuillez vérifier votre connexion Internet.');
      }
    };

    fetchCommercial();
  }, [params.id]);

  if (error) {
    return (
      <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
        <CardContent className="p-10 text-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const commercialName = commercial?.name || 'Non spécifié';
  const commercialEmail = commercial?.email || 'Non spécifié';
  const commercialPhone = commercial?.phoneNumber || 'Non spécifié';
  const regions = commercial?.regions.length > 0 ? commercial.regions : [{ name: 'Non spécifié' }];
  const clients = commercial?.clients.length > 0 ? commercial.clients : [];

  const navLinks = [
    { href: `/commercial/${params.id}`, label: 'Accueil', icon: <FaUser /> },
    { href: `/commercial/${params.id}/profile`, label: 'Profile', icon: <FaChartBar /> },
    { href: `/commercial/${params.id}/liste-etudiants`, label: 'Liste des étudiants', icon: <FaChartBar />, disabled: true },
    { href: `/commercial/${params.id}/liste-ecoles`, label: 'Liste des auto-écoles', icon: <FaChartBar /> },
    { href: `/commercial/${params.id}/stats`, label: 'Statistiques', icon: <FaChartBar /> },
  ];

  return (
    <>
    <DashboardHeader/>
    <div className="flex min-h-screen bg-white-100">
      <Sidebar navLinks={navLinks} /> 
      <div className="flex-1 ml-64 flex flex-col">
        {/* <header className="w-full bg-white shadow-md">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Profile du Commercial</h1>
          </div>
        </header> */}
        <main className="flex-1 p-6">
          <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Informations du Commercial</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Détails du Profile</h3>
                  <div className="flex items-center mb-4">
                    <MdPerson className="text-indigo-500 mr-3" />
                    <p className="text-lg font-medium text-gray-900">Nom : {commercialName}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <MdEmail className="text-indigo-500 mr-3" />
                    <p className="text-lg font-medium text-gray-900">Email : {commercialEmail}</p>
                  </div>
                  <div className="flex items-center">
                    <MdPhone className="text-indigo-500 mr-3" />
                    <p className="text-lg font-medium text-gray-900">Téléphone : {commercialPhone}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations Complémentaires</h3>
                  <div className="mb-4">
                    <strong className="text-gray-700">Régions :</strong>
                    <ul className="text-gray-900 list-disc list-inside mt-2">
                      {regions.map((region: any, index: number) => (
                        <li key={index} className="text-lg">{region.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-gray-700">Nombre de clients :</strong>
                    <p className="text-gray-900 text-lg">{clients.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
