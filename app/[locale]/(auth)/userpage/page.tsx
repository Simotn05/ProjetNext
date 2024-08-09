'use client'; // Assurez-vous que cette ligne est la première du fichier

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const UserPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api2/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardContent className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Bienvenue sur votre page utilisateur</h1>
        <p className="text-center mb-4">Vous êtes connecté en tant qu'utilisateur.</p>
        <button 
          onClick={handleLogout} 
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-dark transition"
        >
          Se déconnecter
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Vous souhaitez modifier vos informations ?{' '}
            <Link href="/profile" className="text-primary hover:underline">
              Accédez à votre profil
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPage;
