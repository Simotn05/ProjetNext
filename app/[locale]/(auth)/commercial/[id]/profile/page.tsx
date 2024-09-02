'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from '../components/sidebar'; // Assurez-vous que le chemin est correct
import { FaChartBar, FaUser } from 'react-icons/fa'; // Icône pour le profil

const ProfilePage: React.FC = () => {
  const router = useRouter();
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
  }, [params.id, router]);

  if (error) {
    return (
      <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
        <CardContent className="p-10 text-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!commercial) {
    return (
      <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
        <CardContent className="p-10 text-center">
          <p className="text-gray-500 text-lg font-semibold">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  const navLinks = [
    { href: '/', label: 'Accueil', icon: <FaUser /> },
    { href: `/commercial/${params.id}/profile`, label: 'Profile', icon: <FaChartBar /> },
    { href: `/commercial/${params.id}/liste-etudiants`, label: 'Liste des étudiants', icon: <FaChartBar />, disabled: true },
    { href: `/commercial/${params.id}/liste-ecoles`, label: 'Liste des auto-écoles', icon: <FaChartBar /> },
    { href: `/commercial/${params.id}/stats`, label: 'Statistiques', icon: <FaChartBar /> },
  ];

  return (
<div className="flex min-h-screen bg-gray-100">
      <Sidebar navLinks={navLinks} /> {/* Passer les liens de navigation ici */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 bg-white shadow-md">
          <h1 className="text-2xl center font-bold text-gray-800">Profil du Commercial</h1>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-5xl shadow-xl rounded-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center text-black mb-6">Informations du Commercial</h2>
              <div className="space-y-4">
                <div>
                  <strong className="text-gray-700">Nom :</strong>
                  <p className="text-gray-900">{commercial.name}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Email :</strong>
                  <p className="text-gray-900">{commercial.email}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Téléphone :</strong>
                  <p className="text-gray-900">{commercial.phoneNumber}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Régions :</strong>
                  <ul className="text-gray-900 list-disc list-inside">
                    {commercial.regions.length > 0 ? (
                      commercial.regions.map((region: any) => (
                        <li key={region.id}>{region.name}</li>
                      ))
                    ) : (
                      <li>Non spécifié</li>
                    )}
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-700">Nombre de clients :</strong>
                  <p className="text-gray-900">{commercial.clients.length}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Clients :</strong>
                  <ul className="text-gray-900 list-disc list-inside">
                    {commercial.clients.length > 0 ? (
                      commercial.clients.map((client: any) => (
                        <li key={client.id}>
                          {client.username} - {client.email}
                        </li>
                      ))
                    ) : (
                      <li>Non spécifié</li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
