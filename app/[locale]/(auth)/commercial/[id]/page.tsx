'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from './components/sidebar'; // Assurez-vous que le chemin est correct
import { FaChartBar,FaUser } from 'react-icons/fa'; // Icône pour la section de statistiques

const CommercialPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [commercial, setCommercial] = useState<{ name: string, clients: any[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Définir les liens de navigation avec l'ID du commercial
  const navLinks = [
    { href: `/commercial/${params.id}`, label: 'Accueil', icon: <FaUser /> },
    { href: `${params.id}/profile`, label: 'Profile', icon: <FaChartBar /> },
    { href: `${params.id}/liste-etudiants`, label: 'Liste des étudiants', icon: <FaChartBar /> },
    { href: `${params.id}/liste-ecoles`, label: 'Liste des auto-écoles', icon: <FaChartBar /> },
    { href: `${params.id}/stats`, label: 'Statistiques', icon: <FaChartBar /> },
  ];

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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar navLinks={navLinks} /> {/* Passer les liens de navigation ici */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-800 transition duration-200"
          >
            Se déconnecter
          </button>
        </header>
        <main className="flex-1 p-6">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Ajoutez vos composants de tableau ici */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default CommercialPage;
