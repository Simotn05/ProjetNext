'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GestionEcole: React.FC = () => {
  const router = useRouter();

  return (
    <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
      <CardContent className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-6">Gestion des auto-écoles</h1>
        <div className="space-y-4">
          <Button 
            className="w-full" 
            onClick={() => router.push('/liste-ecoles')} 
          >
            Liste des auto-écoles
          </Button>
          <Button 
            className="w-full" 
            onClick={() => router.push('/add-ecole')} 
          >
            Ajouter une auto-école
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GestionEcole;
