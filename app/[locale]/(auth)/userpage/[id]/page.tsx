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
        // Vérifiez si un jeton d'authentification est présent dans les cookies
        const authRes = await fetch('/api2/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Assurez-vous que les cookies sont envoyés
        });

        if (authRes.ok) {
          const authData = await authRes.json();
          const userId = authData.user?.id;

          if (userId) {
            // Vérifiez si l'ID de la page correspond à l'ID de l'utilisateur connecté
            if (userId.toString() !== params.id) {
              router.push('/errorPage');
              return;
            }

            // Si les ID correspondent, chargez les informations utilisateur
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
            // Redirigez vers la page de connexion si l'utilisateur n'est pas authentifié
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
        router.push('/connexion'); // Redirige vers la page de connexion après la déconnexion
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
      <Card className="w-full max-w-lg mx-auto my-8">
        <CardContent className="p-8">
          <p className="text-center">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-lg mx-auto my-8">
        <CardContent className="p-8">
          <p className="text-red-500 text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-lg mx-auto my-8">
        <CardContent className="p-8">
          <p className="text-center">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardContent className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Bienvenue, {user.username} !</h1>
        <p className="text-center mb-4">Vous êtes connecté en tant qu'utilisateur.</p>
        <button 
          onClick={handleLogout} 
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-dark transition"
        >
          Se déconnecter
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Vous souhaitez modifier vos informations ?{' '}
            <Link href={`/profile/${params.id}`} className="text-primary hover:underline">
              Accédez à votre profil
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPage;
