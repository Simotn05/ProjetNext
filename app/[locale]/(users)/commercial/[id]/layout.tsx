'use client';

import { Car, Home, Mails, BarChart } from 'lucide-react';
import DashboardHeader from './components/dashboardHeader';
import Sidebar from './components/sidebar';
import { NavLink } from '@/types';
import { useParams } from 'next/navigation';
import { StudentProvider } from '@/contexts/StudentContext'; // Assurez-vous du bon chemin

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();  // Récupère l'ID du commercial

  const navLinks: NavLink[] = [
    {
      icon: <Home />,
      label: 'Accueil',
      href: `/commercial/${params.id}/acceuil`,  // URL dynamique
    },
    {
      icon: <Car />,
      label: 'Profile',
      href: `/commercial/${params.id}/profile`,  // URL dynamique
    },
    {
      icon: <Mails />,
      label: 'Liste des étudiants',
      href: `/commercial/${params.id}/liste-etudiants`,  // URL dynamique
    },
    {
      icon: <Mails />,
      label: 'Liste des auto-écoles',
      href: `/commercial/${params.id}/liste-ecoles`,  // URL dynamique
    },
    {
      icon: <BarChart />,
      label: 'Statistiques',
      href: `/commercial/${params.id}/stats`,  // URL dynamique
    },
  ];

  return (
    <StudentProvider> {/* Enveloppe le contenu avec StudentProvider */}
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
