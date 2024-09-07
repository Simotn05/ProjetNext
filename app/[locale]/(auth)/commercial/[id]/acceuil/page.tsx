'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '../components/sidebar'; // Assurez-vous que le chemin est correct
import { FaChartBar,FaUser } from 'react-icons/fa'; // Icône pour la section de statistiques
import DashboardHeader from '../components/dashboardHeader';
import { Building2, Mails, Ticket, UserRoundCheck } from 'lucide-react';

const CommercialPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [commercial, setCommercial] = useState<{ name: string, clients: any[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Définir les liens de navigation avec l'ID du commercial


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



  return (
    <>
    
    
</>
  );
};

export default CommercialPage;
