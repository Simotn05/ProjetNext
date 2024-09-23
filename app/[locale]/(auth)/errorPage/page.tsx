import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card'; 

const NotFoundPage: React.FC = () => {
  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardContent className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Page non trouvée</p>
        <p className="mb-6">La page que vous recherchez n'existe pas.</p>
        <Link href="/">
          <p className="bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition">
            Retourner à la page d'accueil
          </p>
        </Link>
      </CardContent>
    </Card>
  );
};

export default NotFoundPage;
