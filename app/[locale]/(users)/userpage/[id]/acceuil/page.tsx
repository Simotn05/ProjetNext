'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Car, Mails, Timer, UserRoundCheck } from 'lucide-react';
import { FaCity } from 'react-icons/fa';

const UserPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
       
            const userRes = await fetch(`/api2/user/${params.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });

            if (userRes.ok) {
              const userData = await userRes.json();
              setUser(userData.user);
            } else {
              setError('Utilisateur non trouvé ou accès non autorisé.');
            }
          
      } catch (err) {
        setError('Impossible de vérifier l’authentification. Veuillez vérifier votre connexion Internet.');
      }
    };

    const updateCurrentDate = () => {
      const now = new Date();
      const formattedDate = now.toLocaleString(); // Vous pouvez personnaliser le format selon vos besoins
      setCurrentDate(formattedDate);
    };

    fetchUser();
    updateCurrentDate(); // Update current date when component mounts
    const intervalId = setInterval(updateCurrentDate, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [params.id, router]);

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
    <div className="flex flex-wrap justify-center gap-6 mt-2">
      <Card x-chunk="dashboard-01-chunk-2" className="flex flex-col items-center max-w-md w-60 h-45">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
          <CardTitle className="text-lg font-medium">
            Bienvenue :
          </CardTitle>
          <div className="ml-auto">
            <UserRoundCheck className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center h-full">
          <div className="text-3xl font-bold"></div>
          <p className="text-base text-muted-foreground mt-2">
            {user?.username || 'Chargement...'}
          </p>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-1" className="flex flex-col items-center max-w-md w-60 h-45">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
          <CardTitle className="text-lg font-medium">
            Ville :
          </CardTitle>
          <div className="ml-auto">
            <FaCity className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center h-full">
          <div className="text-3xl font-bold"></div>
          <p className="text-base text-muted-foreground mt-2">
            {user?.ville?.name || 'Chargement...' }
          </p>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-3" className="flex flex-col items-center max-w-md w-60 h-45">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
          <CardTitle className="text-lg font-medium">
            Auto-école :
          </CardTitle>
          <div className="ml-auto">
            <Car className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center h-full">
          <div className="text-3xl font-bold"></div>
          <p className="text-base text-muted-foreground mt-2">
            {user?.ecole?.name || 'En attente'}
          </p>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-1" className="flex flex-col items-center max-w-md w-60 h-45">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
          <CardTitle className="text-lg font-medium">
            Date, heure :
          </CardTitle>
          <div className="ml-auto">
            <Timer className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center h-full">
          <div className="text-3xl font-bold"></div>
          <p className="text-base text-muted-foreground mt-2">
            {currentDate}
          </p>
        </CardContent>
      </Card>

    </div>
  );
};

export default UserPage;
