'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Assurez-vous d'importer useRouter
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ListeCommercials: React.FC = () => {
  const [commercials, setCommercials] = useState<{ id: number; name: string; email: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Utiliser useRouter pour la navigation

  useEffect(() => {
    const fetchCommercials = async () => {
      try {
        const response = await fetch('/api3/list-commercial');
        if (!response.ok) {
          throw new Error('Réponse réseau non ok');
        }
        const data = await response.json();
        console.log('Data reçue:', data); // Pour vérifier les données reçues
        setCommercials(data.commercials);
      } catch (err) {
        console.error('Erreur lors du chargement des commerciaux:', err); // Pour afficher l'erreur
        setError('Erreur lors du chargement des commerciaux.');
      }
    };

    fetchCommercials();
  }, []);

  return (
    <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
      <CardContent className="p-10">
        <h1 className="text-2xl font-bold mb-6">Liste des Commerciaux</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {commercials.length === 0 && !error ? (
          <p className="text-gray-500">Aucun commercial à afficher.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Nom</th>
                <th className="border p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {commercials.map((commercial) => (
                <tr key={commercial.id}>
                  <td className="border p-2">{commercial.name}</td>
                  <td className="border p-2">{commercial.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Button className="mt-6" onClick={() => router.push('/gestion-commercial')}>
          Retour
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListeCommercials;
