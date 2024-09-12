'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, User, BarChart, Phone, Menu } from 'lucide-react';
import DashboardHeader from '../../userpage/[id]/components/dashboardHeader';
import Sidebar from '../../userpage/[id]/components/sidebar';
import { NavLink } from '@/types';

export default function EcoleDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api2/check-auth', { method: 'GET' });
        const data = await res.json();

        if (!data.user) {
          // Redirige si non authentifié
          router.push('/connexion');
        } else if (data.user.role !== 'ecole') {
          // Redirige si l'utilisateur n'est pas du rôle "ecole"
          router.push('/errorPage');
        } else {
          setIsAuthenticated(true);
          setUserId(data.user.id); // Stocke l'ID de l'utilisateur authentifié
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l’authentification:', error);
        router.push('/connexion');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (userId !== null && params.id) {
      let idFromParams: string;
  
      // Vérifie si params.id est un tableau ou une simple chaîne
      if (Array.isArray(params.id)) {
        idFromParams = params.id[0]; // Utilise la première valeur si c'est un tableau
      } else {
        idFromParams = params.id; // Utilise la valeur directement si c'est une chaîne
      }
  
      // Compare l'ID dans l'URL avec l'ID de l'utilisateur connecté
      if (parseInt(idFromParams) !== userId) {
        router.push('/errorPage'); // Redirige si l'ID ne correspond pas
      }
    }
  }, [userId, params.id, router]);
  

 

  if (!isAuthenticated) {
    return null;
  }

  const navLinks: NavLink[] = [
    {
      icon: <Home />,
      label: 'Accueil',
      href: `/ecole/${params.id}/acceuil`,
    },
    {
      icon: <Menu />,
      label: 'Profile',
      href: `/ecole/${params.id}/profile`,
    },
    {
      icon: <User />,
      label: 'Gestion des étudiants',
      href: `/ecole/${params.id}/liste-etudiants`,
    },
    {
      icon: <BarChart />,
      label: 'Statistiques',
      href: `/ecole/${params.id}/stats`,
    },
    {
      icon: <Phone />,
      label: 'Contactez-nous',
      href: `/ecole/${params.id}/contact`,
    },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navLinks={navLinks} />
      <div className="flex flex-col">
        <DashboardHeader navLinks={navLinks} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 xl:p-8 xl:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
