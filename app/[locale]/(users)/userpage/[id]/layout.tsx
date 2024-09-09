'use client';

import { Car, Home, Mails, BarChart, Contact } from "lucide-react";

import { NavLink } from "@/types";
import { useParams } from 'next/navigation';
import DashboardHeader from "../../commercial/[id]/components/dashboardHeader";
import Sidebar from "../../commercial/[id]/components/sidebar";
import { Book, Phone } from "react-feather";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();  // Récupère l'ID du commercial
  

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