'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

const CommercialPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [commercial, setCommercial] = useState<{ name: string, clients: any[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommercial = async () => {
      try {
        const authRes = await fetch('/api2/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (authRes.ok) {
          const authData = await authRes.json();
          const userId = authData.user?.id;
          const userRole = authData.user?.role;
          const token = authData.token;

          if (userRole !== 'commercial') {
            router.push('/errorPage');
            return;
          }

          if (userId) {
            if (userId.toString() !== params.id) {
              router.push('/errorPage');
              return;
            }

            const commercialRes = await fetch(`/api2/commercial/${params.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              credentials: 'include',
            });

            if (commercialRes.ok) {
              const commercialData = await commercialRes.json();
              setCommercial(commercialData.commercial);
            } else {
              setError('Commercial non trouvé ou accès non autorisé.');
            }
          } else {
            router.push('/connexion');
          }
        } else {
          router.push('/connexion');
        }
      } catch (err) {
        setError('Impossible de vérifier l’authentification. Veuillez vérifier votre connexion Internet.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommercial();
  }, [params.id, router]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api2/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (res.ok) {
        router.push('/connexion');
      } else {
        const result = await res.json();
        setError(result.message || 'Une erreur est survenue lors de la déconnexion.');
      }
    } catch (err) {
      setError('Impossible de se déconnecter. Veuillez vérifier votre connexion Internet.');
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
        <CardContent className="p-10">
          <p className="text-center text-xl font-medium text-gray-600">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
        <CardContent className="p-10">
          <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
    <button 
      onClick={handleLogout} 
      className="fixed top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-800 transition duration-200 z-10"
    >
      Se déconnecter
    </button>
    <Card className="w-full max-w-8xl mx-auto my-16 shadow-xl rounded-lg bg-gray-50">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Liste des Étudiants</h2>
        {commercial ? (
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
                {commercial.clients.map((etudiant) => (
                  <tr key={etudiant.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-4 text-gray-800">{etudiant.username}</td>
                    <td className="py-4 px-4 text-gray-800">{etudiant.email}</td>
                    <td className="py-4 px-4 text-gray-800">{etudiant.number}</td>
                    <td className="py-4 px-4 text-gray-800">{new Date(etudiant.birthdate).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-gray-800">{etudiant.ville?.name || 'Non spécifié'}</td>
                    <td className="py-4 px-4 text-gray-800">'Non spécifié'</td>
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
  </div>
  
  
  );
};

export default CommercialPage;
