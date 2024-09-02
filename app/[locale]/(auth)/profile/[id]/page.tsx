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
  const [loading, setLoading] = useState(true);

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

        if (authRes.ok) {
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
        } else {
          router.push('/connexion');
        }
      } catch (err) {
        setError('Impossible de charger les informations utilisateur. Veuillez vérifier votre connexion.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id, router]);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto my-16 shadow-xl rounded-lg bg-white">
        <CardContent className="p-12">
          <p className="text-center text-xl font-medium text-black-600">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto my-16 shadow-xl rounded-lg bg-white">
        <CardContent className="p-12">
          <p className="text-red-600 text-center text-lg font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-4xl mx-auto my-16 shadow-xl rounded-lg bg-white">
        <CardContent className="p-12">
          <p className="text-center text-xl font-medium text-red-600">Aucun utilisateur trouvé.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-16 shadow-xl rounded-lg bg-white">
      <CardContent className="p-12 relative">
        <Link href={`/userpage/${user.id}`} className="absolute top-4 left-4">
          <button className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-4xl font-bold mb-6 text-center text-black-800">Profile de {user.username} :</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Domaine</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Information</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Nom d'utilisateur :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.username}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Email :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.email}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Numéro :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.number}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Date de naissance :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{new Date(user.birthdate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Type de Permis :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.drivingLicenseType}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Région :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.ville?.region?.name || 'Non spécifiée (veuillez contacter le support)'}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Ville :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.ville?.name || 'Non spécifiée (veuillez contacter le support)'}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Date de création du compte :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{new Date(user.createdAt).toLocaleDateString() || 'Date invalide'}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Auto-ecole :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800"></td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Assistant :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.commercial?.name || 'Non spécifiée'} </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Numéro de télephone de l'assistant :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800"> {user.commercial?.phoneNumber || 'Non spécifiée'}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">Nombre de séance restante :</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <Link 
            href={`/edit-profile/${user.id}`} 
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
