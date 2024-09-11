'use client';

import { Car, Home, Mails, BarChart, Contact, User, Menu } from "lucide-react";

import { NavLink } from "@/types";
import { useParams } from 'next/navigation';

import { Book, Phone } from "react-feather";
import DashboardHeader from "../../userpage/[id]/components/dashboardHeader";
import Sidebar from "../../userpage/[id]/components/sidebar";
import { Stats } from "fs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();  // Récupère l'ID 
  

  const navLinks: NavLink[] = [
    {
      icon: <Home />,
      label: "Accueil",
      href: `/ecole/${params.id}/acceuil`,  
    },
    {
      icon: <Menu />,
      label: "Profile",
      href: `/ecole/${params.id}/profile`,  
    }, 
    {
      icon: <User />,
      label: "Gestion des étudiants",
      href: `/ecole/${params.id}/liste-etudiants`,  
    }, 
    // {
    //   icon: <Car />,
    //   label: "Gestion des véhicules",
    //   href: `/ecole/${params.id}/liste-vehicules`,  
    // }, 
    {
      icon: <BarChart />,
      label: "Statistiques",
      href: `/ecole/${params.id}/stats`,  
    },
    {
      icon: <Phone />,
      label: "Contactez-nous",
      href: `/ecole/${params.id}/contact`,  
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