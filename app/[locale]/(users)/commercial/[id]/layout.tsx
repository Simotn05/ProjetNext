'use client';

import { Car, Home, Mails, BarChart, User, Menu } from 'lucide-react';
import DashboardHeader from '../../userpage/[id]/components/dashboardHeader';
import Sidebar from '../../userpage/[id]/components/sidebar';
import { NavLink } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { StudentProvider } from '@/contexts/StudentContext'; 
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
          router.push('/connexion');
        } else if (data.user.role !== 'commercial') {
          router.push('/errorPage');
        } else {
          setIsAuthenticated(true);
          setUserId(data.user.id); 
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
  
      if (Array.isArray(params.id)) {
        idFromParams = params.id[0]; 
      } else {
        idFromParams = params.id; 
      }
      if (parseInt(idFromParams) !== userId) {
        router.push('/errorPage'); 
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
      href: `/commercial/${params.id}/acceuil`,  
    },
    {
      icon: <Menu />,
      label: 'Profile',
      href: `/commercial/${params.id}/profile`,  
    },
    {
      icon: <User />,
      label: 'Liste des étudiants',
      href: `/commercial/${params.id}/liste-etudiants`,  
    },
    {
      icon: <Car />,
      label: 'Liste des auto-écoles',
      href: `/commercial/${params.id}/liste-ecoles`,  
    },
    {
      icon: <BarChart />,
      label: 'Statistiques',
      href: `/commercial/${params.id}/stats`,  
    },
  ];

  return (
    <StudentProvider> 
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar navLinks={navLinks} />
        <div className="flex flex-col">
          <DashboardHeader navLinks={navLinks} />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 xl:p-8 xl:gap-8">
            {children}
          </main>
        </div>
      </div>
    </StudentProvider>
  );
}
