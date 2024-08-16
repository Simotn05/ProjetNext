'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const UserPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<{ username: string } | null>(null);
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

          if (userId) {
            if (userId.toString() !== params.id) {
              router.push('/errorPage');
              return;
            }

            const userRes = await fetch(`/api2/user/${params.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });

            if (userRes.ok) {
              const userData = await userRes.json();
              setUser(userData.user);
            } else {
              setError('Utilisateur non trouvé ou accès non autorisé.');
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

    fetchUser();
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

  if (!user) {
    return (
      <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
        <CardContent className="p-10">
          <p className="text-center text-xl font-medium text-gray-600">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-16 shadow-xl rounded-lg relative bg-white">
  <button 
    onClick={handleLogout} 
    className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-800 transition duration-200"
  >
    Se déconnecter
  </button>
  <CardContent className="p-12">
    <h1 className="text-5xl font-bold mb-8 text-center text-black-800">Bienvenue, {user.username} !</h1>
    <p className="text-center mb-8 text-xl text-red-600">
      Si vous voulez accéder à votre profil, cliquez sur le bouton ci-dessous :
    </p>
    <div className="flex justify-center">
      <Link 
        href={`/profile/${params.id}`} 
        className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
      >
        Accédez à votre profil
      </Link>
    </div>
  </CardContent>
</Card>

  );
};

export default UserPage;
