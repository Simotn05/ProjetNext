'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; // Import de l'icône

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authRes = await fetch('/api2/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!authRes.ok) {
          router.push('/connexion');
          return;
        }

        const authData = await authRes.json();
        const userId = authData.user?.id;

        if (userId && userId.toString() === params.id) {
          const userRes = await fetch(`/api2/profile/${params.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData);
          } else {
            setError('Utilisateur non trouvé.');
          }
        } else {
          router.push('/errorPage');
        }
      } catch (err) {
        setError('Impossible de charger les informations utilisateur. Veuillez vérifier votre connexion.');
      }
    };

    fetchUser();
  }, [params.id, router]);

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto my-8 shadow-xl rounded-lg bg-white">
        <CardContent className="p-6">
          <p className="text-red-600 text-center text-lg font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 shadow-xl rounded-lg bg-white">
      <CardContent className="p-6 relative">
   
        <h1 className="text-3xl font-bold mb-6 mt-3 text-center text-black-800">Profile de {user?.username} :</h1>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Domaine</th>
                <th className="px-1 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Information</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user ? (
                <>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Nom d'utilisateur :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.username}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Email :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.email}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Numéro :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.number}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Date de naissance :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'Non spécifiée'}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Type de Permis :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.drivingLicenseType}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Région :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.ville?.region?.name || 'Non spécifiée (veuillez contacter le support)'}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Ville :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.ville?.name || 'Non spécifiée (veuillez contacter le support)'}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Date de création du compte :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Date invalide'}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Auto-école :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800"> {user.ecole ? user.ecole.name : 'Pas encore'}
                    </td>
                  </tr>
                  {/* <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Assistant :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.commercial?.name || 'Non spécifiée'}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Num de téléphone de l'assistant :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.commercial?.phoneNumber || 'Non spécifiée'}</td>
                  </tr> */}
                  <tr className="mb-2">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-red-600">Nombre de séance restante :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800"></td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-gray-800" colSpan={2}>Chargement des informations...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <Link 
            href={`/edit-profile/${user?.id}`} 
            className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
          >
            Modifier le profil
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
