'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; // Import de l'icône

const ContactPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
  
        if (!authRes.ok) {
          router.push('/connexion');
          return;
        }
  
        const authData = await authRes.json();
        const userId = authData.user?.id;
  
        if (userId && params.id && userId.toString() === params.id) {
          const commercialRes = await fetch(`/api2/profile/${params.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
  
          if (commercialRes.ok) {
            const commercialData = await commercialRes.json();
            console.log('Commercial Data:', commercialData); 
            setUser(commercialData);
          } else {
            setError('Commercial non trouvé.');
          }
        } else {
          router.push('/errorPage');
        }
      } catch (err) {
        setError('Impossible de charger les informations du commercial. Veuillez vérifier votre connexion.');
      }
    };
  
    fetchCommercial();
  }, [params.id, router]);
  

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto my-8 shadow-xl rounded-lg bg-white">
        <CardContent className="p-6">
          <p className="text-red-600 text-center text-lg font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 shadow-xl rounded-lg bg-white">
      <CardContent className="p-6 relative">
        <h1 className="text-3xl font-bold mb-6 mt-3 text-center text-black-800">Contact du Commercial</h1>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-9 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Domaine</th>
                <th className="px-1 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Information</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user ? (
                <>
                  <tr className="mb-2">
                    <td className="px-9 py-4 whitespace-nowrap font-semibold text-red-600">Nom :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.commercial?.name || 'Non spécifiée' }</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-9 py-4 whitespace-nowrap font-semibold text-red-600">Email :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.commercial?.email || 'Non spécifiée'}</td>
                  </tr>
                  <tr className="mb-2">
                    <td className="px-9 py-4 whitespace-nowrap font-semibold text-red-600">Téléphone :</td>
                    <td className="px-1 py-4 whitespace-nowrap text-gray-800">{user.commercial?.phoneNumber || 'Non spécifiée'} (Recommandé)</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-gray-800" colSpan={2}>Chargement des informations...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </CardContent>
    </Card>
  );
};

export default ContactPage;
