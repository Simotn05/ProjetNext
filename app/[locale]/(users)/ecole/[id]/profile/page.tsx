'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from '../../../userpage/[id]/components/sidebar'; // Assurez-vous que le chemin est correct
import { MdPhone, MdEmail, MdLocationCity } from 'react-icons/md'; // Icônes pour téléphone, email et ville
import DashboardHeader from '../../../userpage/[id]/components/dashboardHeader'; // Assurez-vous que le chemin est correct

const AutoEcoleProfile: React.FC = () => {
  const params = useParams();
  const [ecole, setEcole] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEcole = async () => {
      try {
        const res = await fetch(`/api2/dashboard_ecole/profile/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setEcole(data);
        } else {
          setError('Erreur lors de la récupération des données de l\'auto-école.');
        }
      } catch (err) {
        setError('Impossible de récupérer les données de l\'auto-école. Veuillez vérifier votre connexion Internet.');
      }
    };

    fetchEcole();
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

  const ecoleName = ecole?.name || 'Non spécifié';
  const ecoleEmail = ecole?.email || 'Non spécifié';
  const ecolePhone = ecole?.phoneNumber || 'Non spécifié';
  const ecoleCity = ecole?.city || 'Non spécifié';
  const students = ecole?.students.length > 0 ? ecole.students : [];
  const vehicles = ecole?.vehiclesPerType.length > 0 ? ecole.vehiclesPerType : [];

  return (
    <>
      <div className="flex min-h-screen bg-white-100">
        <main className="flex-1 p-6">
          <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Profil de l'Auto-École</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Détails du Profil</h3>
                  <div className="flex items-center mb-4">
                    <MdLocationCity className="text-indigo-500 mr-3" />
                    <p className="text-lg font-medium text-gray-900">Nom : {ecoleName}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <MdEmail className="text-indigo-500 mr-3" />
                    <p className="text-lg font-medium text-gray-900">Email : {ecoleEmail}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <MdPhone className="text-indigo-500 mr-3" />
                    <p className="text-lg font-medium text-gray-900">Téléphone : {ecolePhone}</p>
                  </div>
                  <div className="flex items-center">
                    <MdLocationCity className="text-indigo-500 mr-3" />
                    <p className="text-lg font-medium text-gray-900">Ville : {ecoleCity}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations Complémentaires</h3>
                  <div className="mb-4">
                    <strong className="text-gray-700">Nombre d'étudiants :</strong>
                    <p className="text-gray-900 text-lg">{students.length}</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">Véhicules disponibles :</strong>
                    <p className="text-gray-900 text-lg">{vehicles.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default AutoEcoleProfile;
