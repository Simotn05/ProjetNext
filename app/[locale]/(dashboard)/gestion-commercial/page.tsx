'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GestionCommercial: React.FC = () => {
  const router = useRouter();

  return (
    <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
      <CardContent className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-6">Gestion des Commerciaux</h1>
        <div className="space-y-4">
          <Button 
            className="w-full" 
            onClick={() => router.push('/liste-commercials')} // Redirection vers la page de liste des commerciaux
          >
            Liste des Commerciaux
          </Button>
          <Button 
            className="w-full" 
            onClick={() => router.push('/add-commercial')} // Redirection vers la page d'ajout de commercial
          >
            Ajouter un Commercial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GestionCommercial;
