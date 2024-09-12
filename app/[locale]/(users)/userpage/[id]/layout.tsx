'use client';

import { Car, Home, Mails, BarChart, Contact } from "lucide-react";

import { NavLink } from "@/types";
import { useParams, useRouter } from 'next/navigation';
import DashboardHeader from "./components/dashboardHeader";
import Sidebar from "./components/sidebar";
import { Book, Phone } from "react-feather";
import { useEffect, useState } from "react";

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
          // Redirige si non authentifié
          router.push('/connexion');
        } else if (data.user.role !== 'etudiant') {
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
      label: "Accueil",
      href: `/userpage/${params.id}/acceuil`,  
    },
    {
      icon: <Car />,
      label: "Profile",
      href: `/userpage/${params.id}/profile`,  
    }, 
    {
      icon: <Book />,
      label: "Code de la route",
      href: `/userpage/${params.id}/code`,  
    }, 
    {
      icon: <Phone />,
      label: "Contactez-nous",
      href: `/userpage/${params.id}/contact`,  
    }
    
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